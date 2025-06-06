const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // ระบุ path ของไฟล์เทสต์
    specPattern: '{e2e,component}/**/*.cy.js',
    supportFile: 'support/e2e.js',
    // baseUrl: 'http://localhost:3000', // เปลี่ยนตามโปรเจกต์ของคุณ
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true
    },
    setupNodeEvents(on, config) {
      // No node events needed
    },
    viewportWidth: 1536, // macbook-16 width
    viewportHeight: 960, // macbook-16 height
  },
  screenshotsFolder: 'cypress/screenshots',
  video: false // ปิดการบันทึกวิดีโอ (ถ้าไม่ต้องการ)
});
