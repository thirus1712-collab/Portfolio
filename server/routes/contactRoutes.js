const express = require('express');
const router = express.Router();
const {
  handleContactSubmit,
  downloadExcelFile,
  getContacts,
} = require('../controllers/contactController');

// POST /api/contact - handles form submissions
router.post('/', handleContactSubmit);

// GET /api/contact/download-excel - downloads portfolio_contacts.xlsx
router.get('/download-excel', downloadExcelFile);

// GET /api/contact/list - inspect all contacts
router.get('/list', getContacts);

module.exports = router;
