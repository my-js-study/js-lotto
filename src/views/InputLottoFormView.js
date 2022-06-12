import { CUSTOM_EVENT_NAME, ERROR_MESSAGE } from '../constants.js';
import { $, $$ } from '../utils/dom.js';
import View from './View.js';

export default class InputLottoFormView extends View {
  constructor() {
    super($('#input-lotto-nums'));
    this.openResultModalButton = $('.open-result-modal-button');
    this.lottoInputNumbers = [...$$('.winning-number'), $('.bonus-number')];

    this.bindEvents();
  }

  bindEvents() {
    this.openResultModalButton.addEventListener(
      'click',
      this.handleClickOpenResultModalButton.bind(this),
    );
  }

  initialize() {
    this.lottoInputNumbers.forEach(($el) => {
      $el.value = '';
    });
  }

  handleClickOpenResultModalButton() {
    const isEmpty = this.lottoInputNumbers.some((el) => el.value === '');

    if (isEmpty) {
      alert(ERROR_MESSAGE.NOT_TYPE_NUMBER);
      return;
    }

    const lottoNums = Array.from(
      new Set(this.lottoInputNumbers.map((el) => el.value)),
    );

    if (lottoNums.length < this.lottoInputNumbers.length) {
      alert(ERROR_MESSAGE.NOT_TYPE_LOTTO_NUMBER_DUPLICATION);
      return;
    }

    this.emit(CUSTOM_EVENT_NAME.GET_WINNING_RESULT, {
      value: this.lottoInputNumbers.map((el) => Number(el.value)),
    });
  }
}
