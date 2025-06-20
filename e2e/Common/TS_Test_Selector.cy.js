// TS_Test_Selector.cy.js
// ทดสอบการ login และคลิกเมนู NBS Portal > Home


// ======================= Function กลาง =======================

const Selector = require('../../fixtures/Selector');
const { Go_to_NBS } = require('../../Reuseable/Go_to_NBS');
const { Go_to_CIS } = require('../../Reuseable/Go_to_CIS');
const { searchAndOpenCisPolicyDetail } = require('../../Reuseable/cis_Policy_Detail');
const { waitForCustomerInfoAndClaimHistory } = require('../../Reuseable/API_Wait');
const { logSelectorCheck } = require('../../Reuseable/Log_Count');

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

  it('TC-Test_Selector-Main-Label-001', () => { //ตรวจสอบวัตถุต่างๆ ใน selector CIS_MENU_SUB_1_SEARCH_1_Detail_1
    Go_to_CIS();
    cy.intercept('POST', '**/customerSearch/customerInfoList.html').as('getCustomerInfoList');
    const policyNo = testData[0].ORD_Policy_no;
    searchAndOpenCisPolicyDetail(policyNo);
    waitForCustomerInfoAndClaimHistory(Selector.SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_1_Header_Panel).then(() => {
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
      const resolvedSelectors = CIS_DETAIL_MENU_KEYS.map(key => {
        const sel = Selector[key];
        if (typeof sel === 'function') {
          return { selector: sel(policyNo), label: key };
        }
        if (typeof sel === 'string') {
          return { selector: sel, label: key };
        }
        console.warn('Selector for key', key, 'is not a function or string:', sel);
        return { selector: '', label: key };
      });
      logSelectorCheck(
        resolvedSelectors.map(x => x.selector),
        resolvedSelectors.map(x => x.label)
      );
    });
  });

  it('TC-Test_Selector-001', () => { // ตรวจสอบวัตถุต่างๆ ใน selector CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1
    Go_to_CIS();
    cy.intercept('POST', '**/customerSearch/customerInfoList.html').as('getCustomerInfoList');
    const policyNo = testData[0].ORD_Policy_no;
    searchAndOpenCisPolicyDetail(policyNo);
    waitForCustomerInfoAndClaimHistory(Selector.SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_1_Header_Panel).then(({ customerId }) => {
      const PANEL001_KEYS = [
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
      const resolvedSelectors = PANEL001_KEYS.map(key => {
        const sel = Selector[key];
        if (typeof sel === 'function') {
          return { selector: sel(policyNo), label: key };
        }
        if (typeof sel === 'string') {
          return { selector: sel, label: key };
        }
        console.warn('Selector for key', key, 'is not a function or string:', sel);
        return { selector: '', label: key };
      });
      logSelectorCheck(
        resolvedSelectors.map(x => x.selector),
        resolvedSelectors.map(x => x.label)
      );
    });
  });

  it('TC-Test_Selector-002', () => { //ตรวจสอบวัตถุต่างๆ ใน selector CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_2
    Go_to_CIS();
    cy.intercept('POST', '**/customerSearch/customerInfoList.html').as('getCustomerInfoList');
    const policyNo = testData[0].ORD_Policy_no;
    searchAndOpenCisPolicyDetail(policyNo);
    waitForCustomerInfoAndClaimHistory(Selector.SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_1_In_Page_1_Header_Panel).then(({ customerId }) => {
      const PANEL002_KEYS = [
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_2_In_Page_1_Header_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_2_In_Page_2_Button',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_2_In_Page_3_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_2_In_Page_4_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_2_In_Page_5_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_2_In_Page_6_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_2_In_Page_7_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_2_In_Page_8_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_2_In_Page_9_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_2_In_Page_10_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_2_In_Page_11_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_2_In_Page_12_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_2_In_Page_13_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_2_In_Page_14_Data_Grid',
      ];
      const resolvedSelectors = PANEL002_KEYS.map(key => {
        const sel = Selector[key];
        if (typeof sel === 'function') {
          return { selector: sel(policyNo), label: key };
        }
        if (typeof sel === 'string') {
          return { selector: sel, label: key };
        }
        console.warn('Selector for key', key, 'is not a function or string:', sel);
        return { selector: '', label: key };
      });
      logSelectorCheck(
        resolvedSelectors.map(x => x.selector),
        resolvedSelectors.map(x => x.label)
      );
    });
  });

  it('TC-Test_Selector-003', () => { //ตรวจสอบวัตถุต่างๆ ใน selector CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_3
    Go_to_CIS();
    cy.intercept('POST', '**/customerSearch/customerInfoList.html').as('getCustomerInfoList');
    const policyNo = testData[0].ORD_Policy_no;
    searchAndOpenCisPolicyDetail(policyNo);
    waitForCustomerInfoAndClaimHistory(Selector.SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_3_In_Page_1_Header_Panel).then(({ customerId }) => {
      const PANEL003_KEYS = [
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_3_In_Page_1_Header_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_3_In_Page_2_Button',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_3_In_Page_3_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_3_In_Page_4_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_3_In_Page_5_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_3_In_Page_6_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_3_In_Page_7_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_3_In_Page_8_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_3_In_Page_9_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_3_In_Page_10_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_3_In_Page_11_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_3_In_Page_12_Data_Grid',
      ];
      const resolvedSelectors = PANEL003_KEYS.map(key => {
        const sel = Selector[key];
        if (typeof sel === 'function') {
          return { selector: sel(policyNo), label: key };
        }
        if (typeof sel === 'string') {
          return { selector: sel, label: key };
        }
        console.warn('Selector for key', key, 'is not a function or string:', sel);
        return { selector: '', label: key };
      });
      logSelectorCheck(
        resolvedSelectors.map(x => x.selector),
        resolvedSelectors.map(x => x.label)
      );
    });
  });

  it('TC-Test_Selector-004', () => { //ตรวจสอบวัตถุต่างๆ ใน selector CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_4
    Go_to_CIS();
    cy.intercept('POST', '**/customerSearch/customerInfoList.html').as('getCustomerInfoList');
    const policyNo = testData[0].ORD_Policy_no;
    searchAndOpenCisPolicyDetail(policyNo);
    waitForCustomerInfoAndClaimHistory(Selector.SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_4_In_Page_1_Header_Panel).then(({ customerId }) => {
      cy.get(Selector.SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_4_In_Page_1_Header_Panel).click({ force: true });
      const PANEL004_KEYS = [
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_4_In_Page_1_Header_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_4_In_Page_2_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_4_In_Page_3_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_4_In_Page_4_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_4_In_Page_5_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_4_In_Page_6_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_4_In_Page_7_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_4_In_Page_8_Head_Column_Data_Grid',
      ];
      const resolvedSelectors = PANEL004_KEYS.map(key => {
        const sel = Selector[key];
        if (typeof sel === 'function') {
          return { selector: sel(policyNo), label: key };
        }
        if (typeof sel === 'string') {
          return { selector: sel, label: key };
        }
        console.warn('Selector for key', key, 'is not a function or string:', sel);
        return { selector: '', label: key };
      });
      logSelectorCheck(
        resolvedSelectors.map(x => x.selector),
        resolvedSelectors.map(x => x.label)
      );
    });
  });

  it('TC-Test_Selector-005', () => { //ตรวจสอบวัตถุต่างๆ ใน selector CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_5
    Go_to_CIS();
    cy.intercept('POST', '**///customerSearch/customerInfoList.html').as('getCustomerInfoList');
   const policyNo = testData[0].ORD_Policy_no;
    searchAndOpenCisPolicyDetail(policyNo);
    waitForCustomerInfoAndClaimHistory(Selector.SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_5_In_Page_1_Header_Panel).then(({ customerId }) => {
      cy.get(Selector.SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_5_In_Page_1_Header_Panel).click({ force: true }).wait(2000);
      
      const PANEL005_KEYS = [
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_5_In_Page_1_Header_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_5_In_Page_2_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_5_In_Page_3_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_5_In_Page_4_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_5_In_Page_5_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_5_In_Page_6_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_5_In_Page_7_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_5_In_Page_8_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_5_In_Page_9_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_5_In_Page_10_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_5_In_Page_11_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_5_In_Page_12_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_5_In_Page_13_Head_Column_Data_Grid',
      ];
      const resolvedSelectors = PANEL005_KEYS.map(key => {
        const sel = Selector[key];
        if (typeof sel === 'function') {
          return { selector: sel(policyNo), label: key };
        }
        if (typeof sel === 'string') {
          return { selector: sel, label: key };
        }
        console.warn('Selector for key', key, 'is not a function or string:', sel);
        return { selector: '', label: key };
      });
      logSelectorCheck(
        resolvedSelectors.map(x => x.selector),
        resolvedSelectors.map(x => x.label)
      );
    });
  })


  it.only('TC-Test_Selector-006', () => { // Selector panel_6
    // ตรวจสอบวัตถุต่างๆ ใน selector CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_6
    Go_to_CIS();
    cy.intercept('POST', '**/customerSearch/customerInfoList.html').as('getCustomerInfoList');
    const policyNo = testData[0].ORD_Policy_no;
    searchAndOpenCisPolicyDetail(policyNo);
    // ต้องรอโหลดข้อมูลก่อน (เหมือนเดิม)
    waitForCustomerInfoAndClaimHistory(Selector.SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_6_In_Page_1_Header_Panel).then(() => {
      const PANEL006_KEYS = [
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_6_In_Page_1_Header_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_6_In_Page_2_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_6_In_Page_4_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_6_In_Page_6_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_6_In_Page_8_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_6_In_Page_10_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_6_In_Page_12_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_6_In_Page_14_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_6_In_Page_16_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_6_In_Page_18_Detail_Panel',
      ];
      const resolvedSelectors = PANEL006_KEYS.map(key => {
        const sel = Selector[key];
        if (typeof sel === 'function') {
          return { selector: sel(policyNo), label: key };
        }
        if (typeof sel === 'string') {
          return { selector: sel, label: key };
        }
        console.warn('Selector for key', key, 'is not a function or string:', sel);
        return { selector: '', label: key };
      });
      logSelectorCheck(
        resolvedSelectors.map(x => x.selector),
        resolvedSelectors.map(x => x.label)
      );
    });
  });


  it('TC-Test_Selector-007', () => {
    Go_to_CIS();
    cy.intercept('POST', '**/customerSearch/customerInfoList.html').as('getCustomerInfoList');
    const policyNo = testData[0].ORD_Policy_no;
    searchAndOpenCisPolicyDetail(policyNo);
    waitForCustomerInfoAndClaimHistory(Selector.SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_7_In_Page_1_Header_Panel).then(() => {
      const PANEL007_KEYS = [
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_7_In_Page_1_Header_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_7_In_Page_2_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_7_In_Page_3_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_7_In_Page_4_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_7_In_Page_5_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_7_In_Page_6_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_7_In_Page_7_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_7_In_Page_8_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_7_In_Page_9_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_7_In_Page_10_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_7_In_Page_11_Head_Column_Data_Grid',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_7_In_Page_12_Head_Column_Data_Grid',
      ];
      const resolvedSelectors = PANEL007_KEYS.map(key => {
        const sel = Selector[key];
        if (typeof sel === 'function') {
          return { selector: sel(policyNo), label: key };
        }
        if (typeof sel === 'string') {
          return { selector: sel, label: key };
        }
        console.warn('Selector for key', key, 'is not a function or string:', sel);
        return { selector: '', label: key };
      });
      logSelectorCheck(
        resolvedSelectors.map(x => x.selector),
        resolvedSelectors.map(x => x.label)
      );
    });
  });

  it('TC-Test_Selector-008', () => { // Selector Dynamic 
    // ตรวจสอบวัตถุต่างๆ ใน selector CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_8
    Go_to_CIS();
    cy.intercept('POST', '**/customerSearch/customerInfoList.html').as('getCustomerInfoList');
    const policyNo = testData[0].ORD_Policy_no;
    searchAndOpenCisPolicyDetail(policyNo);
    // ต้องรอโหลดข้อมูลก่อน (เหมือนเดิม)
    waitForCustomerInfoAndClaimHistory(Selector.SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_8_In_Page_1_Header_Panel(policyNo)).then(() => {
      const PANEL008_KEYS = [
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_8_In_Page_1_Header_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_8_In_Page_2_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_8_In_Page_3_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_8_In_Page_4_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_8_In_Page_5_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_8_In_Page_6_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_8_In_Page_7_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_8_In_Page_8_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_8_In_Page_9_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_8_In_Page_10_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_8_In_Page_11_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_8_In_Page_12_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_8_In_Page_13_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_8_In_Page_14_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_8_In_Page_15_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_8_In_Page_16_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_8_In_Page_17_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_8_In_Page_18_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_8_In_Page_19_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_8_In_Page_20_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_8_In_Page_21_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_8_In_Page_22_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_8_In_Page_23_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_8_In_Page_24_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_8_In_Page_25_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_8_In_Page_26_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_8_In_Page_27_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_8_In_Page_28_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_8_In_Page_29_Detail_Panel_Data',
      ];
      // map key เป็น selector string ที่ resolve ด้วย policyNo แล้วส่ง array นี้เข้า logSelectorCheck
      const resolvedSelectors = PANEL008_KEYS.map(key => {
        const sel = Selector[key];
        if (typeof sel === 'function') {
          return { selector: sel(policyNo), label: key };
        }
        if (typeof sel === 'string') {
          return { selector: sel, label: key };
        }
        console.warn('Selector for key', key, 'is not a function or string:', sel);
        return { selector: '', label: key };
      });
      logSelectorCheck(
        resolvedSelectors.map(x => x.selector),
        resolvedSelectors.map(x => x.label)
      );
    });

  });

  it('TC-Test_Selector-009', () => { // Selector Dynamic
    // ตรวจสอบวัตถุต่างๆ ใน selector CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_9
    Go_to_CIS();
    cy.intercept('POST', '**/customerSearch/customerInfoList.html').as('getCustomerInfoList');
    const policyNo = testData[0].ORD_Policy_no;
    searchAndOpenCisPolicyDetail(policyNo);
    // ต้องรอโหลดข้อมูลก่อน (เหมือนเดิม)
    waitForCustomerInfoAndClaimHistory(Selector.SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_9_In_Page_1_Header_Panel(policyNo)).then(() => {
      const PANEL009_KEYS = [
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_9_In_Page_1_Header_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_9_In_Page_2_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_9_In_Page_3_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_9_In_Page_4_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_9_In_Page_5_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_9_In_Page_6_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_9_In_Page_7_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_9_In_Page_8_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_9_In_Page_9_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_9_In_Page_10_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_9_In_Page_11_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_9_In_Page_12_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_9_In_Page_13_Detail_Panel_Data',
      ];
      // map key เป็น selector string ที่ resolve ด้วย policyNo แล้วส่ง array นี้เข้า logSelectorCheck
      const resolvedSelectors = PANEL009_KEYS.map(key => {
        const sel = Selector[key];
        if (typeof sel === 'function') {
          return { selector: sel(policyNo), label: key };
        }
        if (typeof sel === 'string') {
          return { selector: sel, label: key };
        }
        console.warn('Selector for key', key, 'is not a function or string:', sel);
        return { selector: '', label: key };
      });
      logSelectorCheck(
        resolvedSelectors.map(x => x.selector),
        resolvedSelectors.map(x => x.label)
      );
    });
  });

  it('TC-Test_Selector-010', () => { // Selector Dynamic
    // ตรวจสอบวัตถุต่างๆ ใน selector CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_10
    Go_to_CIS();
    cy.intercept('POST', '**/customerSearch/customerInfoList.html').as('getCustomerInfoList');
    const policyNo = testData[0].ORD_Policy_no;
    searchAndOpenCisPolicyDetail(policyNo);
    // ต้องรอโหลดข้อมูลก่อน (เหมือนเดิม)
    waitForCustomerInfoAndClaimHistory(Selector.SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_10_In_Page_1_Header_Panel(policyNo)).then(() => {
      const PANEL010_KEYS = [
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_10_In_Page_1_Header_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_10_In_Page_2_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_10_In_Page_3_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_10_In_Page_4_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_10_In_Page_5_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_10_In_Page_6_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_10_In_Page_7_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_10_In_Page_8_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_10_In_Page_9_Detail_Panel_Data',
      ];
      // map key เป็น selector string ที่ resolve ด้วย policyNo แล้วส่ง array นี้เข้า logSelectorCheck
      const resolvedSelectors = PANEL010_KEYS.map(key => {
        const sel = Selector[key];
        if (typeof sel === 'function') {
          return { selector: sel(policyNo), label: key };
        }
        if (typeof sel === 'string') {
          return { selector: sel, label: key };
        }
        console.warn('Selector for key', key, 'is not a function or string:', sel);
        return { selector: '', label: key };
      });
      logSelectorCheck(
        resolvedSelectors.map(x => x.selector),
        resolvedSelectors.map(x => x.label)
      );
    });
  });

  it('TC-Test_Selector-011', () => { // Selector panel_11
    // ตรวจสอบวัตถุต่างๆ ใน selector CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_11
    Go_to_CIS();
    cy.intercept('POST', '**/customerSearch/customerInfoList.html').as('getCustomerInfoList');
    const policyNo = testData[0].ORD_Policy_no;
    searchAndOpenCisPolicyDetail(policyNo);
    // ต้องรอโหลดข้อมูลก่อน (เหมือนเดิม)
    waitForCustomerInfoAndClaimHistory(Selector.SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_11_In_Page_1_Header_Panel(policyNo)).then(() => {
      const PANEL011_KEYS = [
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_11_In_Page_1_Header_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_11_In_Page_2_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_11_In_Page_3_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_11_In_Page_4_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_11_In_Page_5_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_11_In_Page_6_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_11_In_Page_7_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_11_In_Page_8_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_11_In_Page_9_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_11_In_Page_10_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_11_In_Page_11_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_11_In_Page_12_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_11_In_Page_13_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_11_In_Page_14_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_11_In_Page_15_Detail_Panel_Data',
      ];
      // map key เป็น selector string ที่ resolve ด้วย policyNo ถ้าเป็น function, ถ้าเป็น string ให้ใช้ตรงๆ
      const resolvedSelectors = PANEL011_KEYS.map(key => {
        const sel = Selector[key];
        if (typeof sel === 'function') {
          return { selector: sel(policyNo), label: key };
        }
        if (typeof sel === 'string') {
          return { selector: sel, label: key };
        }
        console.warn('Selector for key', key, 'is not a function or string:', sel);
        return { selector: '', label: key };
      });
      logSelectorCheck(
        resolvedSelectors.map(x => x.selector),
        resolvedSelectors.map(x => x.label)
      );
    });
  });

  it('TC-Test_Selector-012', () => { // Selector panel_12
    // ตรวจสอบวัตถุต่างๆ ใน selector CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_12
    Go_to_CIS();
    cy.intercept('POST', '**/customerSearch/customerInfoList.html').as('getCustomerInfoList');
    const policyNo = testData[0].ORD_Policy_no;
    searchAndOpenCisPolicyDetail(policyNo);
    // ต้องรอโหลดข้อมูลก่อน (เหมือนเดิม)
    waitForCustomerInfoAndClaimHistory(Selector.SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_12_In_Page_1_Header_Panel(policyNo)).then(() => {
      const PANEL012_KEYS = [
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_12_In_Page_1_Header_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_12_In_Page_2_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_12_In_Page_3_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_12_In_Page_4_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_12_In_Page_5_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_12_In_Page_6_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_12_In_Page_7_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_12_In_Page_8_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_12_In_Page_9_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_12_In_Page_10_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_12_In_Page_11_Detail_Panel_Data',
      ];
      // map key เป็น selector string ที่ resolve ด้วย policyNo ถ้าเป็น function, ถ้าเป็น string ให้ใช้ตรงๆ
      const resolvedSelectors = PANEL012_KEYS.map(key => {
        const sel = Selector[key];
        if (typeof sel === 'function') {
          return { selector: sel(policyNo), label: key };
        }
        if (typeof sel === 'string') {
          return { selector: sel, label: key };
        }
        console.warn('Selector for key', key, 'is not a function or string:', sel);
        return { selector: '', label: key };
      });
      logSelectorCheck(
        resolvedSelectors.map(x => x.selector),
        resolvedSelectors.map(x => x.label)
      );
    });
  });

  it('TC-Test_Selector-013', () => { // Selector panel_13
    // ตรวจสอบวัตถุต่างๆ ใน selector CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_13
    Go_to_CIS();
    cy.intercept('POST', '**/customerSearch/customerInfoList.html').as('getCustomerInfoList');
    const policyNo = testData[0].ORD_Policy_no;
    searchAndOpenCisPolicyDetail(policyNo);
    // ต้องรอโหลดข้อมูลก่อน (เหมือนเดิม)
    waitForCustomerInfoAndClaimHistory(Selector.SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_13_In_Page_1_Header_Panel(policyNo)).then(() => {
      const PANEL013_KEYS = [
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_13_In_Page_1_Header_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_13_In_Page_2_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_13_In_Page_3_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_13_In_Page_4_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_13_In_Page_5_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_13_In_Page_6_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_13_In_Page_7_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_13_In_Page_8_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_13_In_Page_9_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_13_In_Page_10_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_13_In_Page_11_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_13_In_Page_12_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_13_In_Page_13_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_13_In_Page_14_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_13_In_Page_15_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_13_In_Page_16_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_13_In_Page_17_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_13_In_Page_18_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_13_In_Page_19_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_13_In_Page_20_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_13_In_Page_21_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_13_In_Page_22_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_13_In_Page_23_Detail_Panel_Data',
      ];
      // map key เป็น selector string ที่ resolve ด้วย policyNo ถ้าเป็น function, ถ้าเป็น string ให้ใช้ตรงๆ
      const resolvedSelectors = PANEL013_KEYS.map(key => {
        const sel = Selector[key];
        if (typeof sel === 'function') {
          return { selector: sel(policyNo), label: key };
        }
        if (typeof sel === 'string') {
          return { selector: sel, label: key };
        }
        console.warn('Selector for key', key, 'is not a function or string:', sel);
        return { selector: '', label: key };
      });
      logSelectorCheck(
        resolvedSelectors.map(x => x.selector),
        resolvedSelectors.map(x => x.label)
      );
    });
  });

  it('TC-Test_Selector-014', () => { // Selector panel_14
    // ตรวจสอบวัตถุต่างๆ ใน selector CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_14
    Go_to_CIS();
    cy.intercept('POST', '**/customerSearch/customerInfoList.html').as('getCustomerInfoList');
    const policyNo = testData[0].ORD_Policy_no;
    searchAndOpenCisPolicyDetail(policyNo);
    // ต้องรอโหลดข้อมูลก่อน (เหมือนเดิม)
    waitForCustomerInfoAndClaimHistory(Selector.SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_14_In_Page_1_Header_Panel(policyNo)).then(() => {
      const PANEL014_KEYS = [
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_14_In_Page_1_Header_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_14_In_Page_2_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_14_In_Page_3_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_14_In_Page_4_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_14_In_Page_5_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_14_In_Page_6_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_14_In_Page_7_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_14_In_Page_8_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_14_In_Page_9_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_14_In_Page_10_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_14_In_Page_11_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_14_In_Page_12_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_14_In_Page_13_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_14_In_Page_14_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_14_In_Page_15_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_14_In_Page_16_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_14_In_Page_17_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_14_In_Page_18_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_14_In_Page_19_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_14_In_Page_20_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_14_In_Page_21_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_14_In_Page_22_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_14_In_Page_23_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_14_In_Page_24_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_14_In_Page_25_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_14_In_Page_26_Detail_Panel',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_14_In_Page_27_Detail_Panel_Data',
        'SELECTOR_CIS_MENU_SUB_1_SEARCH_1_Detail_1_panel_14_In_Page_28_Button',
      ];
      // map key เป็น selector string ที่ resolve ด้วย policyNo ถ้าเป็น function, ถ้าเป็น string ให้ใช้ตรงๆ
      const resolvedSelectors = PANEL014_KEYS.map(key => {
        const sel = Selector[key];
        if (typeof sel === 'function') {
          return { selector: sel(policyNo), label: key };
        }
        if (typeof sel === 'string') {
          return { selector: sel, label: key };
        }
        console.warn('Selector for key', key, 'is not a function or string:', sel);
        return { selector: '', label: key };
      });
      logSelectorCheck(
        resolvedSelectors.map(x => x.selector),
        resolvedSelectors.map(x => x.label)
      );
    });
  });

});