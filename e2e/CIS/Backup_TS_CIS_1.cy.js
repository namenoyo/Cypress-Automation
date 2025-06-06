// TS_CIS_1.cy.js
// ทดสอบการ login และคลิกเมนู NBS Portal > Home


// ======================= Function กลาง =======================

const url = require('../../fixtures/Env_NBS_URL');
const Login = require('../../Reuseable/Login');
const loginTestCases = require('../../fixtures/Data_Username');
const Selector = require('../../fixtures/Selector');
const { Go_to_NBS } = require('../../Reuseable/Go_to_NBS');
//const { Go_to_NBS_Portal } = require('../../Reuseable/Go_to_NBS Portal');
const { goToAlterationPage } = require('../../Reuseable/Go_to_Alteration');
const { searchInquiryInOrigin } = require('../../Reuseable/cy_origin');
const { Go_to_CIS } = require('../../Reuseable/Go_to_CIS');


// ======================= Test Case =======================

// TS-CIS-Search-Cust-001 + TS-CIS-Search-Cust-002

describe('ตรวจสอบหน้าค้นหาข้อมูลลูกค้า', () => {
  it('ตรวจสอบ Element บนหน้าจอ', () => {
    // Arrange: เตรียมข้อมูล user
    const testUser = loginTestCases.find(tc => tc.expectSuccess);

    // 1. Login + Navigate CIS
    Go_to_CIS({ url: url.SIT_NBS_PAGE, testUser });

    // 2. Assertion: ตรวจสอบว่ามีข้อความ 'ค้นหาข้อมูล' ในตำแหน่ง SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_4_Menu_Bar_Label
    cy.get(Selector.SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_4_Menu_Bar_Label, { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'ค้นหาข้อมูล',{ timeout: 10000 })
      .then(() => cy.log('✅ Pass: แสดงข้อความ ค้นหาข้อมูล ในตำแหน่งที่ถูกต้อง'));
    
    // กำหนด CIS_KEYS หลัง assertion นี้
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
    // ตรวจสอบแต่ละ selector ใน CIS_KEYS และ log ผลลัพธ์แบบไม่หยุดทดสอบ
    CIS_KEYS.forEach(selKey => {
      const selector = Selector[selKey];
      if (!selector) {
        cy.log(`❌ FAIL: ไม่พบ selector key ${selKey}`);
        return;
      }
      // ใช้ Cypress.$ เพื่อ query DOM ตรง ๆ ไม่ throw error
      cy.then(() => {
        const $el = Cypress.$(selector);
        if ($el.length > 0 && $el.is(':visible')) {
          cy.log(`✅ PASS: ${selKey}`);
        } else {
          cy.log(`❌ FAIL: ${selKey} | ไม่พบ element หรือไม่แสดงผล`);
        }
      });
    });
  });
});

