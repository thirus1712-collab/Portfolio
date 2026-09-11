const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

// Store Excel file reliably in the project root directory
const excelFilePath = path.resolve(__dirname, '../../portfolio_contacts.xlsx');

/**
 * Appends a new contact submission to the portfolio_contacts.xlsx file.
 * Creates the workbook and sheet if it does not already exist.
 */
function appendContactToExcel({ name, email, message, date, time }) {
  try {
    let workbook;
    let data = [];

    const newRecord = {
      Name: name,
      Email: email,
      Message: message,
      Date: date,
      Time: time,
    };

    if (fs.existsSync(excelFilePath)) {
      try {
        workbook = xlsx.readFile(excelFilePath);
        const firstSheetName = workbook.SheetNames[0] || 'Contacts';
        const worksheet = workbook.Sheets[firstSheetName];
        if (worksheet) {
          data = xlsx.utils.sheet_to_json(worksheet);
        }
      } catch (readErr) {
        console.warn('Could not parse existing Excel file, creating fresh workbook:', readErr.message);
        workbook = xlsx.utils.book_new();
      }
    } else {
      workbook = xlsx.utils.book_new();
    }

    data.push(newRecord);

    const updatedWorksheet = xlsx.utils.json_to_sheet(data, {
      header: ['Name', 'Email', 'Message', 'Date', 'Time'],
    });

    // Auto-adjust column widths
    updatedWorksheet['!cols'] = [
      { wch: 22 }, // Name
      { wch: 30 }, // Email
      { wch: 45 }, // Message
      { wch: 15 }, // Date
      { wch: 15 }, // Time
    ];

    const sheetName = 'Contacts';
    workbook.Sheets[sheetName] = updatedWorksheet;
    if (!workbook.SheetNames.includes(sheetName)) {
      workbook.SheetNames.push(sheetName);
    }

    xlsx.writeFile(workbook, excelFilePath);
    console.log(`[Excel] Contact saved successfully to: ${excelFilePath}`);
    return { success: true, filePath: excelFilePath };
  } catch (error) {
    console.error('[Excel] Error writing to Excel file:', error.message);
    return { success: false, error: error.message };
  }
}

function getExcelFilePath() {
  return excelFilePath;
}

module.exports = {
  appendContactToExcel,
  getExcelFilePath,
};
