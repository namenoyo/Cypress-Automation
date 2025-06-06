// emailnoti.cy.js
// ======================= Assertion กลาง =======================
const assertion = require('../fixtures/assertion');
const loginTestCases = require('../../fixtures/Data_Username');
const url = require('../../fixtures/Env_NBS_URL');
const Menu = require('../../fixtures/Menu');

// ======================= Test Case: Emailnoti Access (Loop) =======================
describe.only('Emailnoti Access (Loop)', () => {
  loginTestCases.forEach((tc) => {
    it(`access emailnoti as ${tc.username} should ${tc.expectSuccess ? 'pass' : 'fail'}`, { retries: 0 }, () => {
      // 1. Login ก่อน
      cy.visit(url.LOGIN_PAGE);
      cy.wait(1000);
      cy.get('#username').type(tc.username, { delay: 200 });
      cy.wait(1000);
      cy.get('#password').type(tc.password, { delay: 200 });
      cy.wait(1000);
      cy.get('button[name="loginButton"]').click();
      cy.wait(2000);
      if (tc.expectSuccess) {
        cy.get('body').then(($body) => {
          if ($body.find(assertion.USER_LOGIN_SINCE_ID).length > 0) {
            cy.get(assertion.USER_LOGIN_SINCE_ID).should('contain.text', tc.expectText);
           // cy.get('.user-action').should('contain.text', tc.expectUser);
            // 2. คลิกเมนู "ระบบงานให้บริการ"
            cy.contains('a,button,div,span', Menu.SERVICE_MENU.label).click({ force: true });
            cy.wait(1000);
            // 3. คลิกเมนู "ระบบ Email Notification"
            cy.contains('a,button,div,span', Menu.EMAIL_NOTIFICATION_MENU.label).click({ force: true });
            cy.wait(2000);
            
            // ใช้ cy.origin สำหรับ cross-origin EMN_SUB_MENU
            cy.origin('https://intranet-api.ochi.link', { args: { label: Menu.EMN_SUB_MENU.label, spanClass: Menu.EMN_SUB_MENU.spanClass } }, ({ label, spanClass }) => {
              cy.get('span.' + spanClass)
                .contains(label)
                .should('be.visible')
                .click({ force: true });
            });
            // 4. ตรวจสอบว่าเข้าใช้งานได้ (ไม่มี Unauthorized)
           // cy.get('body').should('not.contain.text', 'Unauthorized');
            //cy.xpath('//*[@id="root"]/div/div/div[1]/div/div[1]/div/div/p').should('contain.text', 'Emailnotification');
          } else {
            cy.log('ไม่พบ ' + assertion.USER_LOGIN_SINCE_ID + ' จะ reload และลองใหม่');
            cy.reload();
            cy.wait(1000);
            cy.get('#username').type(tc.username, { delay: 200 });
            cy.wait(1000);
            cy.get('#password').type(tc.password, { delay: 200 });
            cy.wait(1000);
            cy.get('button[name="loginButton"]').click();
            cy.wait(2000);
          
            cy.contains('a,button,div,span', Menu.SERVICE_MENU.label).click({ force: true });
            cy.wait(1000);
            cy.contains('a,button,div,span', Menu.EMAIL_NOTIFICATION_MENU.label).click({ force: true });
            cy.wait(2000);
            cy.origin('https://intranet-api.ochi.link', () => {
              const Menu = require('../../fixtures/Menu');
              cy.get('span.' + Menu.EMN_SUB_MENU.spanClass)
                .contains(Menu.EMN_SUB_MENU.label)
                .should('be.visible')
                .click({ force: true });
            });
            // cy.get('body').should('not.contain.text', 'Unauthorized');
           // cy.xpath('//*[@id="root"]/div/div/div[1]/div/div[1]/div/div/p').should('contain.text', 'Emailnotification');
          }
        });
      } else {
        // ถ้า login ไม่ผ่าน ไม่ต้องเข้า emailnoti ให้ตรวจสอบข้อความผิดพลาด
        cy.get('body').should('contain.text', tc.expectText).or('contain.text', 'Unknown');
      }
    });
  });
});
// ======================= END =======================
