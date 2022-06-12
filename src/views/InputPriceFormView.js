import {
  CUSTOM_EVENT_NAME,
  ERROR_MESSAGE,
  MIN_INPUT_PRICE,
  VALIDATION_MESSAGE,
} from '../constants.js';
import { $ } from '../utils/dom.js';
import View from './View.js';

export default class InputPriceFormView extends View {
  constructor() {
    super($('#input-price-form'));

    this.inputPrice = $('#input-price');

    this.bindEvents();
  }

  bindEvents() {
    this.element.addEventListener('submit', this.handleSubmit.bind(this));
    this.inputPrice.addEventListener(
      'invalid',
      this.handleInputValidation.bind(this),
    );
  }

  initialize() {
    this.inputPrice.value = '';
  }

  handleInputValidation(e) {
    this.inputPrice.setCustomValidity(
      this.getValidationMessage(e.target.validity) || '',
    );
  }

  getValidationMessage(validity) {
    const validationMessage = Object.keys(VALIDATION_MESSAGE)
      .filter((value) => validity[value])
      .map((value) => VALIDATION_MESSAGE[value]);

    return validationMessage.length > 0 ? validationMessage[0] : null;
  }

  handleSubmit(e) {
    e.preventDefault();
    const $input = e.target.elements['input-price'];
    const { value } = $input;

    if (value >= MIN_INPUT_PRICE && value % MIN_INPUT_PRICE) {
      alert(ERROR_MESSAGE.NOT_TYPE_UNIT_OF_THOUSAND);
      this.inputPrice.value = '';
      return;
    }

    const numberOfLottos = value / MIN_INPUT_PRICE;
    this.emit(CUSTOM_EVENT_NAME.INPUT_PRICE_FORM_SUBMIT, {
      value: numberOfLottos,
    });
  }
}
