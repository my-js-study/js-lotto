import { CUSTOM_EVENT_NAME } from './constants.js';
import { getLottoNumbers } from './utils/getRandomLottoNumbers.js';

export default class Controller {
  constructor({
    inputPriceFormView,
    purchasedLottosView,
    inputLottoFormView,
    modalView,
  }) {
    this.inputPriceFormView = inputPriceFormView;
    this.purchasedLottosView = purchasedLottosView;
    this.inputLottoFormView = inputLottoFormView;
    this.modalView = modalView;

    this.purchasedLottos = [];
    this.winningNumber = [];
  }

  initialize() {
    this.renderInitialView();
    this.subscribeViewEvents();
  }

  subscribeViewEvents() {
    this.inputPriceFormView.addEventListener(
      CUSTOM_EVENT_NAME.INPUT_PRICE_FORM_SUBMIT,
      this.handleSubmitInputPriceForm.bind(this),
    );

    this.inputLottoFormView.addEventListener(
      CUSTOM_EVENT_NAME.GET_WINNING_RESULT,
      this.handleShowWinningResult.bind(this),
    );

    this.modalView.addEventListener(
      CUSTOM_EVENT_NAME.RESTART,
      this.handleClickRestartButton.bind(this),
    );
  }

  setWinningNumber(winningNumber, purchasedLottos) {
    const matchNumbers = this.modalView.getRankings(
      winningNumber,
      purchasedLottos,
    );
    const yieldPrice = this.modalView.getYieldPrice(matchNumbers);

    this.modalView.matchNumberCounts.forEach((el, index) => {
      el.textContent = this.modalView.getMatchNumberCounts(
        Object.values(matchNumbers)[index],
      );
    });

    this.modalView.yield.textContent = this.modalView.getYield(
      yieldPrice,
      purchasedLottos.length,
    );
  }

  handleClickRestartButton() {
    this.inputPriceFormView.initialize();
    this.inputLottoFormView.initialize();
    this.purchasedLottosView.initialize();
    this.renderInitialView();
    this.modalView.hide();
  }

  handleSubmitInputPriceForm(e) {
    const { value } = e.detail;

    this.purchasedLottosView.setNumberOfLottos(value);
    this.purchasedLottos = getLottoNumbers(e.detail.value);
    this.renderAfterInputPrice();
  }

  handleShowWinningResult(e) {
    this.winningNumber = e.detail.value;
    this.setWinningNumber(this.winningNumber, this.purchasedLottos);
    this.renderModal();
  }

  renderInitialView() {
    this.purchasedLottosView.hide();
    this.inputLottoFormView.hide();
  }

  renderAfterInputPrice() {
    this.purchasedLottosView.show(this.purchasedLottos);
    this.inputLottoFormView.show();
  }

  renderModal() {
    this.modalView.show();
  }
}
