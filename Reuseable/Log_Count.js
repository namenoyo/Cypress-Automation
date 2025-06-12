// Reuseable/Log_Count.js
/**
 * ตรวจสอบ selector ทั้งหมดใน keys, log ผล, และสรุปยอด pass/fail/skip
 * @param {string[]} keys - รายการ selector key
 * @param {object} Selector - object ที่เก็บ selector
 */
function logSelectorCheck(keys, Selector) {
  const notPassLogs = [];
  let passCount = 0;
  let notPassCount = 0;
  keys.forEach(selKey => {
    const selector = Selector[selKey];
    if (!selector) {
      const msg = `❌ FAIL: ไม่พบ selector key ${selKey}`;
      cy.log(msg);
      cy.task('logToReport', msg);
      notPassLogs.push(msg);
      notPassCount++;
      // Soft assert: do not throw here
      return;
    }
    cy.get('body').then($body => {
      if ($body.find(selector).length > 0) {
        cy.get(selector, { timeout: 10000 })
          .should('be.visible')
          .then(() => {
            const msg = `✅ PASS: ${selKey}`;
            cy.log(msg);
            cy.task('logToReport', msg);
            passCount++;
            // Soft assert: do not throw here
          }, () => {
            const msg = `❌ FAIL: ${selKey}`;
            cy.log(msg);
            cy.task('logToReport', msg);
            notPassLogs.push(msg);
            notPassCount++;
            // Soft assert: do not throw here
          });
      } else {
        const msg = `⚠️ SKIP: ไม่พบ element ใน DOM สำหรับ ${selKey}`;
        cy.log(msg);
        cy.task('logToReport', msg);
        notPassLogs.push(msg);
        notPassCount++;
        // Soft assert: do not throw here
      }
    });
  });
  cy.then(() => {
    let summaryMsg;
    const allLogs = [];
    if (notPassLogs.length > 0) {
      cy.log('==== สรุปผลที่ไม่ผ่าน (Fail/Skip) ทั้งหมด ====');
      notPassLogs.forEach(msg => cy.log(msg));
      summaryMsg = `==== รวมผล: ผ่าน ${passCount} ไม่ผ่าน/skip ${notPassCount} จากทั้งหมด ${keys.length} ====}`;
      cy.log(summaryMsg);
      cy.task('logToReport', `==== สรุปผลที่ไม่ผ่าน (Fail/Skip) ทั้งหมด ====:\n${notPassLogs.join('\n')}\n${summaryMsg}`);
    } else {
      summaryMsg = `==== รวมผล: ผ่าน ${passCount} ไม่ผ่าน/skip 0 จากทั้งหมด ${keys.length} ====}`;
      cy.log(summaryMsg);
      cy.task('logToReport', summaryMsg);
    }
    // Collect all selector results (pass/fail/skip)
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
    // Always show summary and all details in log
    cy.log(allLogs.join('\n'));
    // Throw only if there are fails/skips
    if (notPassLogs.length > 0) {
      throw new Error(`${summaryMsg}\n${allLogs.join('\n')}`);
    }
  });
}

module.exports = { logSelectorCheck };
