// upload-to-sheet.js
// อัปโหลดผลทดสอบจาก Cypress (mochawesome.json) ไปยัง Google Sheet ด้วย Google Apps Script Webhook
// *** ต้องสร้าง Apps Script Webhook ใน Google Sheet ก่อน (ดูวิธีในคอมเมนต์ด้านล่าง) ***

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// ====== CONFIG ======
const WEBHOOK_URL = 'https://script.google.com/a/macros/ocean.co.th/s/AKfycbxvHs40zb-RPaitCDHVucWdxunaPnKvaA2r4Eo9aPw6IRq6lufbCrDSk9v5uO8VX58mYw/exec'; // ใส่ URL ที่ได้จาก Deploy Apps Script Web App
const REPORT_PATH = path.join(__dirname, '../cypress/reports/.jsons/mochawesome_004.json'); // path ไปยังไฟล์ report ที่ถูกต้อง

// ====== LOAD TEST RESULT ======
const report = JSON.parse(fs.readFileSync(REPORT_PATH));

// ดึงข้อมูล test summary และรายละเอียดแต่ละ test
const tests = [];
(report.results || []).forEach(suite => {
  (suite.suites || []).forEach(subsuite => {
    (subsuite.tests || []).forEach(test => {
      tests.push([
        test.fullTitle || test.title,
        test.state,
        test.duration,
        test.err && test.err.message ? test.err.message : '',
      ]);
    });
  });
});

// เตรียม header + ข้อมูล
const values = [
  ['Test Name', 'Status', 'Duration(ms)', 'Error Message'],
  ...tests,
];

// ====== POST TO APPS SCRIPT WEBHOOK ======
fetch(WEBHOOK_URL, {
  method: 'POST',
  body: JSON.stringify(values),
  headers: { 'Content-Type': 'application/json' }
})
  .then(res => res.text())
  .then(text => {
    console.log('✅ อัปโหลดผลทดสอบขึ้น Google Sheet ผ่าน Apps Script:', text);
  })
  .catch(err => {
    console.error('❌ อัปโหลด Google Sheet ผ่าน Apps Script ล้มเหลว:', err.message);
  });

// ====== วิธีใช้งาน ======
// 1. เปิด Google Sheet > Extensions > Apps Script
// 2. วางโค้ดนี้ใน Apps Script:
// function doPost(e) {
//   var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('upload-to-sheet');
//   var data = JSON.parse(e.postData.contents);
//   sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
//   return ContentService.createTextOutput("OK");
// }
// 3. Deploy > New deployment > Web app > Anyone can access
// 4. นำ URL ที่ได้มาใส่ใน WEBHOOK_URL
// 5. npm install node-fetch
// 6. รัน: node e2e/upload-to-sheet.js
