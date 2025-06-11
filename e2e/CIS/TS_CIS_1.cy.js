// TS_CIS_1.cy.js
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
    cy.viewport('macbook-16'); // ให้เห็นหน้าจอ 100%
    // 1. Login + Navigate CIS (Go_to_CIS จะจัดการ login และเมนูทั้งหมด)
    Go_to_NBS({
      url: NBS_URL,
      testUser
    });
  });

  it('TC-Search-Cust-001', () => {           //ตรวจสอบหน้าค้นหาข้อมูลลูกค้า และตรวจสอบ Element บนหน้าจอ
      Go_to_CIS();
      // Assertion: ตรวจสอบว่ามีข้อความ 'ค้นหาข้อมูล' ในตำแหน่งใหม่
      cy.get(Selector.SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_1_Menu_Bar_Label, { timeout: 10000 })
        .should('be.visible')
        .and('contain.text', 'ค้นหาข้อมูล', { timeout: 10000 })
        .then(() => cy.log('✅ Pass: แสดงข้อความ ค้นหาข้อมูล ในตำแหน่งที่ถูกต้อง'));
      // ใช้ CIS_KEYS ใหม่
      const CIS_KEYS = [
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_1_Menu_Bar_Label',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_2_Input_Text',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_3_Input_Text',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_4_Input_Text',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_5_Input_Text',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_6_Input_Text',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_7_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_8_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_9_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_10_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_11_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_12_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_13_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_14_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_15_Button',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_16_Button',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_17_Button',
      
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

  it('TC-Search-Cust-002 ', () => {         //ตรวจสอบหน้าค้นหาข้อมูลลูกค้า และค้นหาด้วยเลขกรมธรรม์
    
      // ใช้ฟังก์ชัน Go_to_CIS ที่จัดการการเข้าเมนู CIS
      Go_to_CIS();
    cy.get(Selector.SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_1_Menu_Bar_Label, { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'ค้นหาข้อมูล', { timeout: 10000 })
      .then(() => cy.log('✅ Pass: แสดงข้อความ ค้นหาข้อมูล ในตำแหน่งที่ถูกต้อง'));
    // Step 3: ระบุเลขกรมธรรม์และกดปุ่มค้นหา
    const policyNo = '1652002';
    cy.get(Selector.SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_6_Input_Text).type(policyNo, { force: true });
    cy.wait(1000);
    // ปรับ selector ปุ่มค้นหา (ควรเป็น In_Page_16_Button ไม่ใช่ In_Page_19_Button)
    cy.get(Selector.SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_16_Button).first().click({ force: true });
    cy.wait(3000);
    cy.log('✅ Pass: กรอกเลขกรมธรรม์และกดค้นหาเรียบร้อย');
    cy.wait(3000);
    cy.window().then((win) => {
      win.document.querySelector('body').scrollLeft = 1000;
    });
    const CIS_KEYS = [
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_1_Menu_Bar_Label',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_2_Input_Text',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_3_Input_Text',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_4_Input_Text',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_5_Input_Text',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_6_Input_Text',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_7_Head_Column_Data_Grid',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_8_Head_Column_Data_Grid',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_9_Head_Column_Data_Grid',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_10_Head_Column_Data_Grid',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_11_Head_Column_Data_Grid',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_12_Head_Column_Data_Grid',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_13_Head_Column_Data_Grid',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_14_Head_Column_Data_Grid',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_15_Button',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_16_Button',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_17_Button',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_18_Menu_Bar_Label',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_19_Button',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_20_Data_Grid',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_21_Data_Grid',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_22_Data_Grid',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_23_Data_Grid',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_24_Data_Grid',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_25_Data_Grid',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_26_Data_Grid',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_27_Data_Grid',
      'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_28_Data_Grid',
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

