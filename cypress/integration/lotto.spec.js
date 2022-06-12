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
  });

  context('로또 구입 이후', () => {
    beforeEach(() => {
      cy.get('#input-price').type(1000);
      cy.get('#input-price-btn').click();
    });

    it('구입 금액이 정상적으로 입력 된 경우, 구입한 로또와 당첨번호 입력 form이 나타난다.', () => {
      cy.get('#purchased-lottos').should('be.visible');
      cy.get('#input-lotto-nums').should('be.visible');
    });

    it('입력한 금액만큼의 로또를 자동 구매할 수 있다.', () => {
      cy.get('#total-purchased').should(
        'have.text',
        '총 1개를 구매하였습니다.',
      );
      cy.get('#lotto-icons').find('li').should('have.length', 1);
    });

    it('번호 보기 토글 버튼을 클릭 하면, 복권 번호를 볼 수 있다.', () => {
      cy.get('.switch').click();

      cy.get('.lotto-detail')
        .should('not.have.css', 'display', 'none')
        .invoke('text')
        .then((text) => {
          const { length } = text.split(',');
          expect(length).to.eq(7);
        });
    });

    it('당첨번호를 모두 입력하지 않으면 alert창을 호출한다.', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);

      cy.get('.open-result-modal-button')
        .click()
        .then(() => {
          expect(stub.getCall(0).lastArg).to.contains('숫자를 입력해주세요.');
        });
    });

    it('당첨번호 중 중복된 숫자가 있으면 alert창을 호출한다.', () => {
      cy.typeLottoInputNumbers([1, 1, 1, 1, 1, 1, 1]);
      const stub = cy.stub();
      cy.on('window:alert', stub);

      cy.get('.open-result-modal-button')
        .click()
        .then(() => {
          expect(stub.getCall(0).lastArg).to.contains(
            '로또 번호에는 중복된 숫자를 입력할 수 없습니다.',
          );
        });
    });

    it('당첨번호를 정상적으로 입력을 완료하면 모달창을 호출한다.', () => {
      cy.typeLottoInputNumbers([1, 2, 3, 4, 5, 6, 7]);
      cy.get('.open-result-modal-button').click();

      cy.get('.modal').should('be.visible');
    });

    it('당첨된 경우, 모달창에 해당하는 등수와 수익률이 갱신된다.', () => {
      cy.typeLottoInputNumbers([1, 2, 3, 4, 5, 6, 7]);
      cy.get('.open-result-modal-button').click();

      cy.get('#yield').then(($el) => {
        const resultText = $el.text().split(' ')[3];
        const isNumber = !Number.isNaN(
          resultText.substring(0, resultText.length - 1),
        );
        expect(isNumber).to.be.true;
      });

      cy.get('.match-number-count').each(($el) => {
        const rankText = $el.text();
        const isNumber = !Number.isNaN(
          rankText.substring(0, rankText.length - 1),
        );
        expect(isNumber).to.be.true;
      });
    });

    it('모달 창의 다시 시작하기 버튼을 누르면 처음부터 다시 시작한다.', () => {
      cy.typeLottoInputNumbers([1, 2, 3, 4, 5, 6, 7]);
      cy.get('.open-result-modal-button').click();

      cy.get('#restart').click();

      cy.get('#input-price').invoke('val').should('eq', '');
      cy.get('#purchased-lottos').should('be.not.visible');
      cy.get('#input-lotto-nums').should('be.not.visible');
    });
  });
});
