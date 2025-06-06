// Go_to_CIS.js
// ฟังก์ชันกลางสำหรับเข้าเมนู CIS (หลัง login ด้วย Go_to_NBS)
const Selector = require('../fixtures/Selector');
const { Go_to_NBS } = require('./Go_to_NBS');

function Go_to_CIS({ url, testUser }) {
  // 1. Login NBS
  Go_to_NBS({ url, testUser });
  // 2. Click "ลูกค้าสัมพันธ์"
  cy.get(Selector.SELECTOR_CIS_MENU_SUB_1_Navigate_1_Menu_Bar_Label).click({ force: true });
  cy.wait(500);
  // 3. Click "ระบบ CIS"
  cy.get(Selector.SELECTOR_CIS_MENU_SUB_1_Navigate_2_Menu_Bar_Label).click({ force: true });
  cy.wait(1000);
  // 4. Click "ข้อมูลลูกค้า"
  cy.get(Selector.SELECTOR_CIS_MENU_SUB_1_Navigate_3_Menu_Bar_Label).click({ force: true });
  cy.wait(1000);
}

module.exports = { Go_to_CIS };
