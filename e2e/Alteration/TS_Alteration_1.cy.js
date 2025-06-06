// TS_Alteration_1.cy.js
// ทดสอบการ login และคลิกเมนู NBS Portal > Home

const url = require('../../fixtures/Env_NBS_URL');
const Login = require('../../Reuseable/Login');
const loginTestCases = require('../../fixtures/Data_Username');
const Selector = require('../../fixtures/Selector');
const { Go_to_NBS } = require('../../Reuseable/Go_to_NBS');
const { Go_to_NBS_Portal } = require('../../Reuseable/Go_to_NBS Portal');
const { goToAlterationPage } = require('../../Reuseable/Go_to_Alteration');
const { searchInquiryInOrigin } = require('../../Reuseable/cy_origin');

console.log('Selector loaded:', Selector);
// ดึง user ที่ expectSuccess เป็น true ตัวแรกมาใช้
const testUser = loginTestCases.find(tc => tc.expectSuccess);

// ======================= Test Case =======================
// ย้าย Go_to_NBS_Portal เข้า before() เพื่อให้ทุกอย่างอยู่ใน session เดียวกัน

describe('Alteration - ดำเนินการหลัง goToAlterationPage', () => {
  it('ควร login, go to NBS Portal, ไปหน้า alteration และคลิกเมนู ALTERNATION_MENU_SUB_1 (ค้นหาใบสอบถาม) (ผ่าน cy.origin)', () => {
    // 1. Login NBS
    Go_to_NBS({
      url: url.SIT_NBS_PAGE,
      Login,
      testUser
    });

    
    // 2. ไปหน้า NBS Portal > Home > Alteration
    Go_to_NBS_Portal({
      url: url.SIT_NBS_PAGE,
      Login,
      testUser,
      Menu: Selector,
      goToAlterationPage
    });

    // 3. ไปหน้า Automatic Alteration (ซึ่งจะคลิกเมนู Automatic Alteration)
    //goToAlterationPage();
    // 4. คลิกเมนูค้นหาใบสอบถาม
    const menu = Selector.ALTERNATION_MENU_SUB_1;
    cy.origin('https://intranet-api.ochi.link', { args: { menu } }, ({ menu }) => {
      cy.get('span.MuiButton-label', { timeout: 10000 })
        .contains(menu.label)
        .click({ force: true });
      cy.log(`คลิกเมนู: ${menu.label}`);
      cy.contains('div', 'Automatic Alteration', { timeout: 10000 })
        .should('exist');
    });
    // 5. ตรวจสอบ selector Automatic_Alteration_SEARCH_1 ถึง 10 ว่าใช้ได้หรือไม่
    const searchSelectorKeys = [
      'Automatic_Alteration_SEARCH_1',
      'Automatic_Alteration_SEARCH_2',
      'Automatic_Alteration_SEARCH_3',
      'Automatic_Alteration_SEARCH_4',
      'Automatic_Alteration_SEARCH_5',
      'Automatic_Alteration_SEARCH_6',
      'Automatic_Alteration_SEARCH_7',
      'Automatic_Alteration_SEARCH_8',
      'Automatic_Alteration_SEARCH_9',
      'Automatic_Alteration_SEARCH_10',
    ];
    const searchSelectors = searchSelectorKeys.map(key => Selector[key] || null);
    cy.origin('https://intranet-api.ochi.link', { args: { searchSelectorKeys, searchSelectors } }, ({ searchSelectorKeys, searchSelectors }) => {
      searchSelectorKeys.forEach((key, idx) => {
        const sel = searchSelectors[idx];
        if (!sel) {
          cy.log(`${key}: ❌ ไม่พบ selector ใน Selector.js`);
          return;
        }
        // ตรวจสอบว่า sel เป็น valid CSS selector (ไม่ใช่ innerHTML fragment)
        try {
          cy.document().then(doc => {
            let found = null;
            try {
              found = doc.querySelector(sel);
            } catch (e) {
              cy.log(`${key}: ❌ FAIL (Invalid selector)`);
              cy.log(`${key} selector: ${sel}`);
              cy.log(`${key} element: NOT FOUND`);
              return;
            }
            if (found) {
              cy.log(`${key}: ✅ PASS`);
              cy.log(`${key} selector: ${sel}`);
              cy.log(`${key} element: ${found.outerHTML}`);
            } else {
              cy.log(`${key}: ❌ FAIL`);
              cy.log(`${key} selector: ${sel}`);
              cy.log(`${key} element: NOT FOUND`);
            }
          });
        } catch (err) {
          cy.log(`${key}: ❌ FAIL (Exception)`);
          cy.log(`${key} selector: ${sel}`);
        }
      });
    });
  });
});





