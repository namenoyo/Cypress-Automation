// TS_LOGIN.cy.js
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

  it('TC-Search-Cust-001', () => {
    Go_to_CIS();
    cy.get(Selector.SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_4_Menu_Bar_Label, { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'ค้นหาข้อมูล', { timeout: 10000 })
      .then(() => cy.log('✅ Pass: แสดงข้อความ ค้นหาข้อมูล ในตำแหน่งที่ถูกต้อง'));

    const CIS_KEYS = [
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_4_Menu_Bar_Label',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_5_Input_Text',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_6_Input_Text',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_7_Input_Text',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_8_Input_Text',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_9_Input_Text',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_10_Head_Column_Data_Grid',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_11_Head_Column_Data_Grid',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_12_Head_Column_Data_Grid',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_13_Head_Column_Data_Grid',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_14_Head_Column_Data_Grid',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_15_Head_Column_Data_Grid',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_16_Head_Column_Data_Grid',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_17_Head_Column_Data_Grid',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_18_Button',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_19_Button',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_20_Button',
    ];
    CIS_KEYS.forEach(selKey => {
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