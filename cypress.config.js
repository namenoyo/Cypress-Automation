const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // ระบุ path ของไฟล์เทสต์ให้ครอบคลุมทุกโฟลเดอร์ย่อย
    specPattern: 'e2e/**/*.cy.js',
    supportFile: 'support/e2e.js',
    // baseUrl: 'http://localhost:3000', // เปลี่ยนตามโปรเจกต์ของคุณ
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports', // เปลี่ยนเป็น path ง่ายสุดที่ root ของ workspace
      reportFilename: 'mochawesome', // บังคับชื่อไฟล์ .json
      overwrite: true, // ให้ overwrite ไฟล์เดิม
      html: true, // เปิดสร้าง HTML ด้วย (เพื่อให้ post-process ได้ง่าย)
      json: true,
      quiet: false
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on('task', {
        logToReport(msg) {
          console.log(msg);
          return null;
        }
      });
    },
    viewportWidth: 1536, // macbook-16 width
    viewportHeight: 960, // macbook-16 height
  },
  screenshotsFolder: 'cypress/screenshots',
  video: false // ปิดการบันทึกวิดีโอ (ถ้าไม่ต้องการ)
});
