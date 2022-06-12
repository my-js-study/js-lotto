Cypress.Commands.add('typeLottoInputNumbers', (formula) => {
  const bonusNumber = formula.pop(); // 제일 마지막 숫자가 보너스 숫자

  cy.get('.winning-number').each((value, index) => {
    cy.get(value).type(formula[index]);
  });

  cy.get('.bonus-number').type(bonusNumber);
});
