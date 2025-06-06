// ตัวอย่างไฟล์เทสต์สำหรับทดสอบ custom command cy.login
/*
describe('Login Custom Command', () => {
  it('should login with valid credentials', () => {
    // ใช้ custom command ที่สร้างไว้
    cy.login('test@email.com', 'password123');
    // ตรวจสอบว่าล็อกอินสำเร็จ (ตัวอย่าง: มีข้อความหรือ element ที่แสดงหลังล็อกอิน)
    cy.url().should('not.include', '/login');
    // cy.contains('Dashboard'); // แก้ไขตาม UI จริงของคุณ
  });
});
*/


// ======================= Function กลาง =======================
const assertion = require('../../fixtures/assertion');
const Selector = require('../../fixtures/Selector');
const Login = require('../../Reuseable/Login');
const loginTestCases = require('../../fixtures/Data_Username');
const url = require('../../fixtures/Env_NBS_URL');

// ======================= Test Case: Login NBS Web (Loop) =======================
describe('Login NBS Web (Loop)', () => {
  loginTestCases.forEach((tc) => {
    // เพิ่ม only/skip flag เพื่อให้เลือก run ได้
    const runCase = tc.only ? it.only : tc.skip ? it.skip : it;
    runCase(`login as ${tc.username} should ${tc.expectSuccess ? 'pass' : 'fail'}`, { retries: 0 }, () => {
      Login.login(tc.username, tc.password, url.LOGIN_PAGE);
      cy.wait(2000);
      if (tc.expectSuccess) {
        cy.get(Selector.body).then(($body) => {
          // ตรวจสอบ USER_LOGIN_SINCE_ID (commented out)
          if ($body.find(assertion.USER_LOGIN_SINCE_ID).length > 0) {
            cy.get(assertion.USER_LOGIN_SINCE_ID).should('contain.text', tc.expectText);
            cy.get('.user-action').should('contain.text', tc.expectUser);
          } else {
            cy.log('ไม่พบ ' + assertion.USER_LOGIN_SINCE_ID + ' จะ reload และลองใหม่');
            cy.reload();
            cy.wait(1000);
            Login.login(tc.username, tc.password, url.LOGIN_PAGE);
            cy.get(assertion.USER_LOGIN_SINCE_ID).should('contain.text', tc.expectText);
            cy.get('.user-action').should('contain.text', tc.expectUser);
          }
          // ...สามารถเพิ่ม assertion อื่น ๆ ได้ที่นี่...
        });
      } else {
        // ตรวจสอบข้อความผิดพลาด (แก้ไข ไม่ใช้ .or())
        cy.get('body').then($body => {
          const text = $body.text();
          expect(
            text.includes(tc.expectText) || text.includes('Unknown')
          ).to.be.true;
        });
      }
    });
  });
});
// ======================= END =======================

// เพิ่ม reporter และ screenshot อัตโนมัติเมื่อ fail
// 1. ติดตั้ง mochawesome reporter และตั้งค่าใน cypress.config.js
// 2. Cypress จะ capture screenshot อัตโนมัติเมื่อ fail อยู่แล้ว (default)
// 3. สามารถดูผลลัพธ์ได้ที่ cypress/reports และ cypress/screenshots
// ดูรายละเอียดใน README หรือคู่มือ Cypress
