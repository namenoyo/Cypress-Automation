// support/addContextToTest.js
// Utility to add context to mochawesome report for each test

Cypress.Commands.add('addDetailLogToContext', (detailLog) => {
  // Attach detailLog to the current test context for mochawesome
  cy.once('test:after:run', (test, runnable) => {
    if (!test.context) test.context = '';
    test.context += `\n${detailLog}`;
  });
});
