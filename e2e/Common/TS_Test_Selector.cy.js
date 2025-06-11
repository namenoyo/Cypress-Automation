// TS_Test_Selector.cy.js
// ทดสอบการ login และคลิกเมนู NBS Portal > Home


// ======================= Function กลาง =======================

const Selector = require('../../fixtures/Selector');
const { Go_to_NBS } = require('../../Reuseable/Go_to_NBS');
const { Go_to_CIS } = require('../../Reuseable/Go_to_CIS');

const loginTestCases = require('../../fixtures/Data_Username');
const url = require('../../fixtures/Env_NBS_URL');

// ดึง user ที่ expectSuccess เป็น true ตัวแรกมาใช้
const testUser = loginTestCases.find(tc => tc.expectSuccess);

// กำหนด เลือก ENV
const NBS_URL = url.ENV_SIT_NBS;   
//const NBS_URL = url.ENV_UAT_NBS;


// ======================= Test Case =======================
describe('ตรวจสอบหน้าค้นหาข้อมูลลูกค้า', () => {
  beforeEach(() => {
    cy.viewport('macbook-16');
    Go_to_NBS({
      url: NBS_URL,
      userIndex: loginTestCases.findIndex(u => u.username === testUser.username)
    });
  });

  it('TC-Test_Selector-001', () => { 
    Go_to_CIS();
    cy.get(Selector.SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_1_Menu_Bar_Label, { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'ค้นหาข้อมูล', { timeout: 10000 })
      .then(() => cy.log('✅ Pass: แสดงข้อความ ค้นหาข้อมูล ในตำแหน่งที่ถูกต้อง'));

      const policyNo = '1652002';
          cy.get(Selector.SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_6_Input_Text).type(policyNo, { force: true });
          cy.wait(1000);
          // ปรับ selector ปุ่มค้นหา (ควรเป็น In_Page_16_Button ไม่ใช่ In_Page_19_Button)
          cy.get(Selector.SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_16_Button).first().click({ force: true });
          cy.wait(3000);
          // เพิ่ม: กดปุ่ม In_Page_19_Button หลังจาก In_Page_16_Button
          cy.get(Selector.SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_19_Button).first().click({ force: true });
          cy.wait(2000);

    
    // ตรวจสอบ CIS Detail Menu Bar Labels (In_Page_1 ถึง In_Page_10)
    const CIS_DETAIL_MENU_KEYS = [
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_In_Page_1_Menu_Bar_Label',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_In_Page_2_Menu_Bar_Label',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_In_Page_3_Menu_Bar_Label',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_In_Page_4_Menu_Bar_Label',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_In_Page_5_Menu_Bar_Label',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_In_Page_6_Menu_Bar_Label',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_In_Page_7_Menu_Bar_Label',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_In_Page_8_Menu_Bar_Label',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_In_Page_9_Menu_Bar_Label',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_In_Page_10_Menu_Bar_Label',
    ];
    CIS_DETAIL_MENU_KEYS.forEach(selKey => {
      const selector = Selector[selKey];
      if (!selector) {
        cy.log(`❌ FAIL: ไม่พบ selector key ${selKey}`);
        cy.task('logToReport', `❌ FAIL: ไม่พบ selector key ${selKey}`);
        return;
      }
      cy.then(() => {
        const $el = Cypress.$(selector);
        if ($el.length > 0 && $el.is(':visible')) {
          cy.log(`✅ PASS: ${selKey}`);
          cy.task('logToReport', `✅ PASS: ${selKey}`);
        } else {
          cy.log(`❌ FAIL: ${selKey} | ไม่พบ element หรือไม่แสดงผล`);
          cy.task('logToReport', `❌ FAIL: ${selKey} | ไม่พบ element หรือไม่แสดงผล`);
        }
      });
    });
  });
});