// emailnoti.cy.js
// ======================= Assertion กลาง =======================
const assertion = require('../../fixtures/assertion');
const loginTestCases = require('../../fixtures/Data_Username');
const url = require('../../fixtures/Env_NBS_URL');
const Var_DDMMYYYY = require('../../fixtures/Var_DDMMYYYY');
const Selector = require('../../fixtures/Selector');
const Login = require('../../Reuseable/Login');

// ======================= Test Case: Emailnoti Access (Loop) =======================
describe.only('Emailnoti Access (Loop)', () => {
  loginTestCases.forEach((tc) => {
    it(`access emailnoti as ${tc.username} should ${tc.expectSuccess ? 'pass' : 'fail'}`, { retries: 0 }, () => {
      // 1. Login ก่อน
      Login.login(tc.username, tc.password, url.LOGIN_PAGE);
      cy.wait(2000);
      if (tc.expectSuccess) {
        cy.get(Selector.body).then(($body) => {
          if ($body.find(assertion.USER_LOGIN_SINCE_ID).length > 0) {
            cy.get(assertion.USER_LOGIN_SINCE_ID).should('contain.text', tc.expectText);
            // 2. คลิกเมนู "ระบบงานให้บริการ"
            cy.contains('a,button,div,span', Selector.SERVICE_MENU.label).click({ force: true });
            cy.wait(1000);
            // 3. คลิกเมนู "ระบบ Email Notification"
            cy.contains('a,button,div,span', Selector.EMAIL_NOTIFICATION_MENU.label).click({ force: true });
            cy.wait(2000);
            cy.origin('https://intranet-api.ochi.link', {
              args: {
                label1: Selector.EMN_SUB_MENU_1.label,
                spanClass1: Selector.EMN_SUB_MENU_1.spanClass,
                label2: Selector.EMN_SUB_MENU_1_1.label,
                labelBtn: Selector.EMN_SUB_MENU_1_1_BTN_1.label,
                spanClassBtn: Selector.EMN_SUB_MENU_1_1_BTN_1.spanClass,
                monthInputId: Selector.EMN_SUB_MENU_1_1_LIST_1.inputId,
                yearInputId: Selector.EMN_SUB_MENU_1_1_LIST_2.inputId,
                months: Var_DDMMYYYY.months,
                years: Var_DDMMYYYY.years
              }
            }, ({ label1, spanClass1, label2, labelBtn, spanClassBtn, monthInputId, yearInputId, months, years }) => {
              let allPass = true;
              // 1. เข้าเมนู "ระบบออกจดหมาย"
              cy.get(Selector.spanClass(spanClass1)).contains(label1).should('be.visible').click({ force: true });
              // 2. เข้าเมนู "รายงานสรุปการออกจดหมาย"
              cy.contains('span,button,div,p', label2, { timeout: 10000 }).should('be.visible').click({ force: true });
              // 3. วนลูปปีและเดือน
              years.forEach((year) => {
                months.forEach((month) => {
                  // คลิก placeholder เดือนเพื่อเปิด dropdown
                  cy.get(Selector.monthInput(monthInputId)).click({ force: true });
                  cy.get(Selector.monthInput(monthInputId)).clear().type(month + '{enter}', { force: true });
                  // คลิก placeholder ปีเพื่อเปิด dropdown
                  cy.get(Selector.yearInput(yearInputId)).click({ force: true });
                  cy.get(Selector.yearInput(yearInputId)).clear().type(year.toString() + '{enter}', { force: true });
                  // คลิกปุ่มค้นหา
                  cy.get(Selector.spanClass(spanClassBtn)).contains(labelBtn).should('be.visible').click({ force: true });
                  // อาจใส่ assertion เพิ่มเติมหลังค้นหาแต่ละรอบได้ที่นี่
                  cy.wait(500); // รอให้ผลลัพธ์แสดง (ปรับเวลาได้)
                  cy.get(Selector.body).then($body => {
                    const text = $body.text();
                    // ถ้าไม่พบข้อมูล ถือว่าสำเร็จ
                    if (text.includes('ไม่พบข้อมูล')) {
                      // do nothing, pass
                    } else if (text.includes('Error') || text.includes('เกิดข้อผิดพลาด')) {
                      allPass = false;
                    }
                  });
                });
              });
              cy.then(() => {
                if (allPass) {
                  cy.log('Pass');
                } else {
                  cy.log('Fail');
                }
              });
            });
            // 4. ตรวจสอบว่าเข้าใช้งานได้ (ไม่มี Unauthorized)
           // cy.get('body').should('not.contain.text', 'Unauthorized');
            //cy.xpath('//*[@id="root"]/div/div/div[1]/div/div[1]/div/div/p').should('contain.text', 'Emailnotification');
          } else {
            cy.log('ไม่พบ ' + assertion.USER_LOGIN_SINCE_ID + ' จะ reload และลองใหม่');
            cy.reload();
            cy.wait(1000);
            Login.login(tc.username, tc.password, url.LOGIN_PAGE);
            cy.wait(2000);
          
            cy.contains('a,button,div,span', Selector.SERVICE_MENU.label).click({ force: true });
            cy.wait(1000);
            cy.contains('a,button,div,span', Selector.EMAIL_NOTIFICATION_MENU.label).click({ force: true });
            cy.wait(2000);
            cy.origin('https://intranet-api.ochi.link', {
              args: {
                label1: Selector.EMN_SUB_MENU_1.label,
                spanClass1: Selector.EMN_SUB_MENU_1.spanClass,
                label2: Selector.EMN_SUB_MENU_1_1.label,
                labelBtn: Selector.EMN_SUB_MENU_1_1_BTN_1.label,
                spanClassBtn: Selector.EMN_SUB_MENU_1_1_BTN_1.spanClass,
                monthInputId: Selector.EMN_SUB_MENU_1_1_LIST_1.inputId,
                yearInputId: Selector.EMN_SUB_MENU_1_1_LIST_2.inputId,
                months: Var_DDMMYYYY.months,
                years: Var_DDMMYYYY.years
              }
            }, ({ label1, spanClass1, label2, labelBtn, spanClassBtn, monthInputId, yearInputId, months, years }) => {
              cy.get(Selector.spanClass(spanClass1)).contains(label1).should('be.visible').click({ force: true });
              cy.contains('span,button,div,p', label2, { timeout: 10000 }).should('be.visible').click({ force: true });
              cy.get(Selector.monthInput(monthInputId)).clear().type(Var_DDMMYYYY.months[0], { force: true });
              cy.get(Selector.yearInput(yearInputId)).clear().type(Var_DDMMYYYY.years[0].toString(), { force: true });
              cy.get(Selector.spanClass(spanClassBtn)).contains(labelBtn).should('be.visible').click({ force: true });
            });
            // cy.get('body').should('not.contain.text', 'Unauthorized');
           // cy.xpath('//*[@id="root"]/div/div/div[1]/div/div[1]/div/div/p').should('contain.text', 'Emailnotification');
          }
        });
      } else {
        // ถ้า login ไม่ผ่าน ไม่ต้องเข้า emailnoti ให้ตรวจสอบข้อความผิดพลาด
        cy.get(Selector.body).should('contain.text', tc.expectText).or('contain.text', 'Unknown');
      }
    });
  });
});
// ======================= END =======================
