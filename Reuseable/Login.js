// Login.js
// ฟังก์ชัน reusable สำหรับการ Login
const Selector = require('../fixtures/Selector');
// ฟังก์ชันสำหรับการ Login
// ใช้ Cypress เพื่อทำการ Login เข้าสู่ระบบ NBS Portal
function login(username, password, url) {
  cy.visit(url);
  cy.wait(100);
  cy.get(Selector.usernameInput).type(username, { delay: 50 });
  cy.wait(100);
  cy.get(Selector.passwordInput).type(password, { delay: 50 });
  cy.wait(100);
  cy.get(Selector.loginButton).click();
  cy.wait(1000);
}


module.exports = { login };
