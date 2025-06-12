// Reuseable/Log_Count.js
/**
 * ตรวจสอบ selector ทั้งหมดใน keys, log ผล, และสรุปยอด pass/fail/skip
 * @param {string[]} keys - รายการ selector key
 * @param {object} Selector - object ที่เก็บ selector
 */
function logSelectorCheck(keys, Selector) {
  const notPassLogs = [];
  const passLogs = [];
  let passCount = 0;
  let notPassCount = 0;
  keys.forEach(selKey => {
    const selector = Selector[selKey];
    cy.get('body').then($body => {
      if ($body.find(selector).length > 0) {
        cy.get(selector, { timeout: 10000 }).then($els => {
          if ($els.length === 1) {
            cy.wrap($els)
              .scrollIntoView()
              .should('be.visible')
              .then(() => {
                const msg = `✅ PASS: ${selKey} (single element)`;
                cy.log(msg);
                cy.task('logToReport', msg);
                passLogs.push(msg);
                passCount++;
              }, () => {
                const msg = `❌ FAIL: ${selKey} (single element)`;
                cy.log(msg);
                cy.task('logToReport', msg);
                notPassLogs.push(msg);
                notPassCount++;
              });
          } else if ($els.length >= 2) {
            cy.wrap($els.eq(1))
              .scrollIntoView()
              .should('be.visible')
              .then(() => {
                const msg = `✅ PASS: ${selKey} (element index 2)`;
                cy.log(msg);
                cy.task('logToReport', msg);
                passLogs.push(msg);
                passCount++;
              }, () => {
                const msg = `❌ FAIL: ${selKey} (element index 2)`;
                cy.log(msg);
                cy.task('logToReport', msg);
                notPassLogs.push(msg);
                notPassCount++;
              });
          } else {
            const msg = `⚠️ SKIP: ไม่พบ element ใน DOM สำหรับ ${selKey}`;
            cy.log(msg);
            cy.task('logToReport', msg);
            notPassLogs.push(msg);
            notPassCount++;
            }
            // Soft assert: do not throw here
          });
      } else {
        const msg = `⚠️ SKIP: ไม่พบ element ใน DOM สำหรับ ${selKey}`;
        cy.log(msg);
        cy.task('logToReport', msg);
        notPassLogs.push(msg);
        notPassCount++;
      }
    });
  });
  cy.then(() => {
    let summaryMsg;
    const allLogs = [];
    // Collect all selector results (pass/fail/skip) BEFORE logging
    keys.forEach(selKey => {
      const selector = Selector[selKey];
      if (!selector) {
        allLogs.push(`❌ FAIL: ไม่พบ selector key ${selKey}`);
      } else if (notPassLogs.find(msg => msg.includes(selKey))) {
        allLogs.push(notPassLogs.find(msg => msg.includes(selKey)));
      } else {
        allLogs.push(`✅ PASS: ${selKey}`);
      }
    });
    // รวม log ทั้งหมด (PASS/FAIL/SKIP) กับ summaryMsg แล้วส่งไป logToReport ทีเดียว
    const detailLog = allLogs.join('\n');
    if (notPassLogs.length > 0) {
      cy.log('==== สรุปผลที่ไม่ผ่าน (Fail/Skip) ทั้งหมด ====');
      notPassLogs.forEach(msg => cy.log(msg));
      summaryMsg = `==== รวมผล: ผ่าน ${passCount} ไม่ผ่าน/skip ${notPassCount} จากทั้งหมด ${keys.length} ====}`;
      cy.log(summaryMsg);
      cy.log(detailLog);
      cy.task('logToReport', `${detailLog}\n${summaryMsg}`);
    } else {
      summaryMsg = `==== รวมผล: ผ่าน ${passCount} ไม่ผ่าน/skip 0 จากทั้งหมด ${keys.length} ====}`;
      cy.log(summaryMsg);
      cy.log(detailLog);
      cy.task('logToReport', `${detailLog}\n${summaryMsg}`);
    }
    // เพิ่ม log รายละเอียดเข้า context ของ test เพื่อให้ mochawesome export ไป Google Sheet
    if (Cypress && Cypress.Commands) {
      cy.addDetailLogToContext(`${detailLog}\n${summaryMsg}`);
    }
    if (notPassLogs.length > 0) {
      throw new Error(`${summaryMsg}\n${detailLog}`);
    }
  });
}

module.exports = { logSelectorCheck };
