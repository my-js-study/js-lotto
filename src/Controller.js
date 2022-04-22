import { CUSTOM_EVENT_NAME } from './constants.js';

export default class Controller {
  constructor({ inputPriceFormView, purchasedLottosView, inputLottoNumsView }) {
    this.inputPriceFormView = inputPriceFormView;
    this.purchasedLottosView = purchasedLottosView;
    this.inputLottoNumsView = inputLottoNumsView;
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
  }

  handleSubmitInputPriceForm(e) {
    const { value } = e.detail;

    this.purchasedLottosView.setNumberOfLottos(value);
    this.renderWholeView();
  }

  renderInitialView() {
    this.purchasedLottosView.hide();
    this.inputLottoNumsView.hide();
  }

  renderWholeView() {
    this.purchasedLottosView.show();
    this.inputLottoNumsView.show();
  }
}
