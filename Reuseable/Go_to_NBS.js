// Go_to_NBS.js
const Login = require('./Login');
// ฟังก์ชันกลางสำหรับ login เข้า NBS Portal เท่านั้น (ไม่คลิกเมนูใดๆ เพิ่ม)

function Go_to_NBS({ testUser, url }) {
  // 1. Login
  Login.login(testUser.username, testUser.password, url); // ใช้ url string
  cy.wait(2000);
}

module.exports = { Go_to_NBS };
