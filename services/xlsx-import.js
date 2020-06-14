'use strict';

const XLSX = require('xlsx');

exports.xlsxToJson = (inputFile) => {
  try {
    const workBook = XLSX.readFile(inputFile);
    const FIRST_SHEET_NAME = workBook.SheetNames[0]; // only import first sheet
    const workSheet = workBook.Sheets[FIRST_SHEET_NAME];
    const rowsWithoutTitleRow = XLSX.utils.sheet_to_json(workSheet);
    return rowsWithoutTitleRow;
  } catch (err) {
    console.error('Error opening file:', inputFile);
    process.exit();
  }
};
