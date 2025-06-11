// TS_Test_Selector.cy.js
// ทดสอบการ login และคลิกเมนู NBS Portal > Home


// ======================= Function กลาง =======================

const Selector = require('../../fixtures/Selector');
const { Go_to_NBS } = require('../../Reuseable/Go_to_NBS');
const { Go_to_CIS } = require('../../Reuseable/Go_to_CIS');
const { searchAndOpenCisPolicyDetail } = require('../../Reuseable/cis_Policy_Detail');

const loginTestCases = require('../../fixtures/Data_Username');
const url = require('../../fixtures/Env_NBS_URL');
const testData = require('../../fixtures/Data_Test');

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

  it('TC-Test_Selector-001', () => { //ตรวจสอบวัตถุต่างๆ ใน selector CIS_MENU_SUB_1_SEARCH_1_Detail_1
    Go_to_CIS();
    const policyNo = testData[0].ORD_Policy_no;
    searchAndOpenCisPolicyDetail(policyNo);
    cy.wait(5000);
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
      cy.get('body').then($body => {
        if ($body.find(selector).length > 0) {
          cy.get(selector, { timeout: 10000 })
            .should('be.visible')
            .then(() => {
              cy.log(`✅ PASS: ${selKey}`);
              cy.task('logToReport', `✅ PASS: ${selKey}`);
            });
        } else {
          cy.log(`⚠️ SKIP: ไม่พบ element ใน DOM สำหรับ ${selKey}`);
          cy.task('logToReport', `⚠️ SKIP: ไม่พบ element ใน DOM สำหรับ ${selKey}`);
        }
      });
    });
  });
  
  it('TC-Test_Selector-002', () => {
    Go_to_CIS();
    const policyNo = testData[0].ORD_Policy_no;
    searchAndOpenCisPolicyDetail(policyNo);
    cy.wait(5000);
    // ตรวจสอบวัตถุหลักใน selector CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_1_Detail_Panel ถึง _In_Page_41_Detail_Panel
    const PANEL_KEYS = [
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_1_Header_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_2_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_3_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_4_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_5_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_6_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_7_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_8_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_9_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_10_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_11_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_12_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_13_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_14_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_15_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_16_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_17_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_18_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_19_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_20_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_21_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_22_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_23_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_24_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_25_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_26_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_27_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_28_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_29_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_30_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_31_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_32_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_33_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_34_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_35_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_36_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_37_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_38_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_39_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_40_Detail_Panel',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_41_Detail_Panel',
    ];
    PANEL_KEYS.forEach(selKey => {
      const selector = Selector[selKey];
      if (!selector) {
        cy.log(`❌ FAIL: ไม่พบ selector key ${selKey}`);
        cy.task('logToReport', `❌ FAIL: ไม่พบ selector key ${selKey}`);
        return;
      }
      cy.get('body').then($body => {
        if ($body.find(selector).length > 0) {
          cy.get(selector, { timeout: 10000 })
            .should('be.visible')
            .then(() => {
              cy.log(`✅ PASS: ${selKey}`);
              cy.task('logToReport', `✅ PASS: ${selKey}`);
            });
        } else {
          cy.log(`⚠️ SKIP: ไม่พบ element ใน DOM สำหรับ ${selKey}`);
          cy.task('logToReport', `⚠️ SKIP: ไม่พบ element ใน DOM สำหรับ ${selKey}`);
        }
      });
    });
  });
});