// TS_Emailnoti.cy.js

/*
// ======================= Assertion กลาง =======================
const assertion = require('../../fixtures/assertion');
// ======================= Import Reuseable Functions =======================
const Selector = require('../../fixtures/Selector');
const { Go_to_NBS } = require('../../Reuseable/Go_to_NBS');
const { Go_to_Emailnot } = require('../../Reuseable/Go_to_Emailnot');

const loginTestCases = require('../../fixtures/Data_Username');
const url = require('../../fixtures/Env_NBS_URL');

const Var_DDMMYYYY = require('../../fixtures/Var_DDMMYYYY');


// กำหนด เลือก ENV
const NBS_URL = url.ENV_SIT_NBS;   
//const NBS_URL = url.ENV_UAT_NBS;

// ======================= Test Case: Emailnoti Access (Loop) =======================
describe.only('Emailnoti Access (Loop)', () => {
 
  loginTestCases.forEach((tc) => {
    it(`access emailnoti as ${tc.username} should ${tc.expectSuccess ? 'pass' : 'fail'}`, { retries: 0 }, () => {
      // 1. Login ก่อน
      Go_to_NBS({
        url: NBS_URL,
        userIndex: loginTestCases.findIndex(u => u.username === tc.username)
      });
      cy.wait(2000);
      if (tc.expectSuccess) {
        cy.get(Selector.body).then(($body) => {
          if ($body.find(assertion.USER_LOGIN_SINCE_ID).length > 0) {
            cy.get(assertion.USER_LOGIN_SINCE_ID).should('contain.text', tc.expectText);

            // 2. Navigate ไป Email Notification
            Go_to_Emailnot();
            
            cy.wait(2000);
            // ส่งฟังก์ชันที่จำเป็นเข้า cy.origin ผ่าน args ด้วย
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
                years: Var_DDMMYYYY.years,
                // ส่งฟังก์ชันเป็น string แล้ว eval ใน cy.origin
                spanClassFn: Selector.spanClass.toString(),
                monthInputFn: Selector.monthInput.toString(),
                yearInputFn: Selector.yearInput.toString(),
                bodySelector: Selector.body
              }
            }, ({ label1, spanClass1, label2, labelBtn, spanClassBtn, monthInputId, yearInputId, months, years, spanClassFn, monthInputFn, yearInputFn, bodySelector }) => {
              // eval ฟังก์ชันที่ส่งเข้ามา
              const spanClass = eval('(' + spanClassFn + ')');
              const monthInput = eval('(' + monthInputFn + ')');
              const yearInput = eval('(' + yearInputFn + ')');
              let allPass = true;
              // 1. เข้าเมนู "ระบบออกจดหมาย"
              cy.get(spanClass(spanClass1)).contains(label1).should('be.visible').click({ force: true });
              // 2. เข้าเมนู "รายงานสรุปการออกจดหมาย"
              cy.contains('span,button,div,p', label2, { timeout: 10000 }).should('be.visible').click({ force: true });
              // 3. วนลูปปีและเดือน
              years.forEach((year) => {
                months.forEach((month) => {
                  cy.get(monthInput(monthInputId)).click({ force: true });
                  cy.get(monthInput(monthInputId)).clear().type(month + '{enter}', { force: true });
                  cy.get(yearInput(yearInputId)).click({ force: true });
                  cy.get(yearInput(yearInputId)).clear().type(year.toString() + '{enter}', { force: true });
                  cy.get(spanClass(spanClassBtn)).contains(labelBtn).should('be.visible').click({ force: true });
                  cy.wait(500);
                  cy.get(bodySelector).then($body => {
                    const text = $body.text();
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

*/