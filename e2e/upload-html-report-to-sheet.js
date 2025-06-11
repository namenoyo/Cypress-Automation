// upload-html-report-to-sheet.js
// ดึงข้อมูลจาก reports/mochawesome.html แล้วส่งไป Google Sheet ผ่าน Apps Script Webhook

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// ====== CONFIG ======
const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwRrCBTxh-WGK92NMGIxcqR_IxZ6fWoQ-T8aQu6RzlKkCG-lTbnZVR2TECoXxV38wrSrg/exec';

const REPORT_PATH = path.join(__dirname, '../cypress/reports/mochawesome.html');


// ====== LOAD HTML & PARSE ======
const html = fs.readFileSync(REPORT_PATH, 'utf8');
const $ = cheerio.load(html);
const dataRaw = $('body').attr('data-raw');

const TESTER = 'CYPRESS_RUN'; // ปรับเป็นชื่อจริงของผู้ทดสอบ
const tests = [];

if (dataRaw) {
  const report = JSON.parse(dataRaw);
  for (const result of report.results) {
    for (const suite of result.suites) {
      const suiteName = suite.title;
      for (const test of suite.tests) {
        if (!test.title) continue;

        // 🔍 รวม Assertion Log
        let assertionLog = '';
        if (test.context) {
          try {
            const ctx = typeof test.context === 'string' ? JSON.parse(test.context) : test.context;
            if (Array.isArray(ctx)) {
              assertionLog = ctx.map(log => (typeof log === 'string' ? log : log.value || '')).join('\n');
            } else if (ctx.value) {
              assertionLog = ctx.value;
            } else {
              assertionLog = typeof ctx === 'string' ? ctx : JSON.stringify(ctx);
            }
          } catch (err) {
            assertionLog = String(test.context);
          }
        }
        if (test.err && test.err.message) {
          assertionLog += (assertionLog ? '\n' : '') + test.err.message;
        }
        tests.push([
          suiteName, // Test Suite (describe)
          test.title, // Test Case (it)
          assertionLog, // Assertion Log (รวม log/context/error)
          test.state,
          test.start ? new Date(test.start).toLocaleString('sv-SE', { hour12: false }) : '', // Test Time (ISO format, 24h)
          TESTER, // Tester
          test.duration,
          test.err && test.err.message ? test.err.message : ''
        ]);
      }
    }
  }
}

// ====== PREPARE DATA ======
const values = [
  ['Test Suite', 'Test Case', 'Assertion Log','Status', 'Test Time', 'Tester','Duration(ms)', 'Error Message' ],
  ...tests,
];

console.log('values:', values);
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

// วิธีใช้งาน:
// 1. npm install cheerio
// 2. รัน: node e2e/upload-html-report-to-sheet.js
