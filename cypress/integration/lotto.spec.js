import { ERROR_MESSAGE, VALIDATION_MESSAGE } from '../../src/constants.js';

describe('step1 필수 요구사항', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500');
  });

  context('로또 구입 이전', () => {
    it('초기 화면에는 로또 구입 form만 보인다.', () => {
      cy.get('#input-price-form').should('be.visible');
      cy.get('#purchased-lottos').should('not.be.visible');
      cy.get('#input-lotto-nums').should('not.be.visible');
    });

    it('로또 구입 금액 input은 필수 입력이다.', () => {
      cy.get('#input-price-btn').click();
      cy.get('input:invalid').should('have.length', 1);
      cy.get('#input-price').then((input) => {
        expect(input[0].validationMessage).to.eq(
          VALIDATION_MESSAGE.valueMissing,
        );
      });
    });

    it('로또 구입 금액이 1000원 미만인 경우, 에러메세지를 호출한다.', () => {
      cy.get('#input-price').type(500);
      cy.get('#input-price-btn').click();
      cy.get('#input-price').then((input) => {
        expect(input[0].validationMessage).to.eq(
          VALIDATION_MESSAGE.rangeUnderflow,
        );
      });
    });

    it('로또 구입 금액이 1000원 단위가 아닌 경우, alert창을 호출한다.', () => {
      const stub = cy.stub();

      cy.on('window:alert', stub);

      cy.get('#input-price').type(1200);
      cy.get('#input-price-btn')
        .click()
        .then(() => {
          expect(stub.getCall(0).lastArg).to.contains(
            ERROR_MESSAGE.NOT_TYPE_UNIT_OF_THOUSAND,
          );
        });
    });

    it('구입 금액이 정상적으로 입력 된 경우, 구입한 로또와 당첨번호 입력 form이 나타난다.', () => {
      cy.get('#input-price').type(3000);
      cy.get('#input-price-btn').click();

      cy.get('#purchased-lottos').should('be.visible');
      cy.get('#input-lotto-nums').should('be.visible');
    });

    it('입력한 금액만큼의 로또를 자동 구매할 수 있다.', () => {
      cy.get('#input-price').type(2000);
      cy.get('#input-price-btn').click();

      cy.get('#total-purchased').should(
        'have.text',
        '총 2개를 구매하였습니다.',
      );
      cy.get('#lotto-icons').find('li').should('have.length', 2);
    });

    it('번호 보기 토글 버튼을 클릭 하면, 복권 번호를 볼 수 있다.', () => {
      cy.get('#input-price').type(1000);
      cy.get('#input-price-btn').click();
      cy.get('.switch').click();

      cy.get('.lotto-detail')
        .should('not.have.css', 'display', 'none')
        .invoke('text')
        .then((text) => {
          const { length } = text.split(',');
          expect(length).to.eq(7);
        });
    });
  });
});
