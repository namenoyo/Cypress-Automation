// Go_to_NBS Portal.js
// ฟังก์ชันกลางสำหรับ describe('NBS Portal Menu Navigation'...)
function Go_to_NBS_Portal({ testUser, url, Menu, goToAlterationPage, Login }) {
  // ฟังก์ชันนี้จะเน้นเฉพาะการคลิกเมนู NBS Portal > Home และไปหน้า Alteration เท่านั้น (ไม่รวม login)
  // ต้องแน่ใจว่า login ถูกเรียกจากที่อื่นก่อนใช้ฟังก์ชันนี้
  // 1. คลิกเมนู "ระบบงาน NBS Portal"
  cy.get(`a[href="${Menu.NBS_PORTAL_MENU.href}"]`).click({ force: true });
  cy.wait(500);
  // 2. คลิกปุ่ม Home ที่อยู่ภายใต้เมนู NBS Portal (หา Home ที่อยู่ในเมนูนี้เท่านั้น)
  cy.get(`a[href="${Menu.NBS_PORTAL_MENU.href}"]`).parent().within(() => {
    cy.contains('a,button,div,span', Menu.HOME_SUB_MENU.label).click({ force: true });
  });
  // 3. ไปหน้า Alteration
  goToAlterationPage();
}

module.exports = { Go_to_NBS_Portal };