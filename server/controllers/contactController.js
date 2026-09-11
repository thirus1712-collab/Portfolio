const fs = require('fs');
const { saveContactToMySQL, getContactsFromMySQL } = require('../config/mysql');
const { appendContactToExcel, getExcelFilePath } = require('../utils/excelHandler');
const { MongoContact } = require('../models/PortfolioModels');
const { getMongoStatus } = require('../config/mongodb');

/**
 * Validates email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Handles contact form POST submission
 */
async function handleContactSubmit(req, res) {
  try {
    const { name, email, message } = req.body || {};

    // Validate Name
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        field: 'name',
        message: 'Name is required.',
      });
    }

    // Validate Email
    if (!email || typeof email !== 'string' || email.trim().length === 0) {
      return res.status(400).json({
        success: false,
        field: 'email',
        message: 'Email is required.',
      });
    }

    if (!isValidEmail(email.trim())) {
      return res.status(400).json({
        success: false,
        field: 'email',
        message: 'Please provide a valid email address.',
      });
    }

    // Validate Message
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        field: 'message',
        message: 'Message is required.',
      });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    // Format Date and Time
    const now = new Date();
    const submitted_date = now.toISOString().split('T')[0];
    const submitted_time = now.toTimeString().split(' ')[0];

    // 🔍 Debug - Check what is being sent to MySQL
    console.log("MySQL Insert Data:", {
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
    });

    // 1. Save to MySQL Table: portfolio_contacts
    const mysqlResult = await saveContactToMySQL({
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
      submitted_date,
      submitted_time,
    });

    // 2. Automatically Append to Excel File: portfolio_contacts.xlsx
    const excelResult = appendContactToExcel({
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
      date: submitted_date,
      time: submitted_time,
    });

    // 3. Save to MongoDB if available
    const mongoStatus = getMongoStatus();
    if (mongoStatus.connected) {
      try {
        await MongoContact.create({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
          submitted_date,
          submitted_time,
        });
      } catch (mongoErr) {
        console.warn('[MongoDB Contact] Non-fatal save error:', mongoErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been received successfully.',
      data: {
        name: trimmedName,
        email: trimmedEmail,
        date: submitted_date,
        time: submitted_time,
        mysqlSaved: mysqlResult.success,
        excelSaved: excelResult.success,
      },
    });
  } catch (error) {
    console.error('[Contact Submit Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'An internal error occurred while submitting your message. Please try again.',
      error: error.message,
    });
  }
}

/**
 * Allows downloading the live portfolio_contacts.xlsx file directly
 */
function downloadExcelFile(req, res) {
  const filePath = getExcelFilePath();
  if (fs.existsSync(filePath)) {
    return res.download(filePath, 'portfolio_contacts.xlsx', (err) => {
      if (err) {
        console.error('[Excel Download Error]:', err.message);
      }
    });
  }

  // If no submissions yet, create an empty template and serve
  appendContactToExcel({
    name: 'Sample Contact',
    email: 'contact@example.com',
    message: 'Initial portfolio contact sheet',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString(),
  });

  return res.download(filePath, 'portfolio_contacts.xlsx');
}

/**
 * Returns all contacts list (JSON)
 */
async function getContacts(req, res) {
  try {
    const contacts = await getContactsFromMySQL();
    return res.json({ success: true, count: contacts.length, data: contacts });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = {
  handleContactSubmit,
  downloadExcelFile,
  getContacts,
};
