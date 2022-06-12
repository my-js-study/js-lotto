import { $, $$ } from '../utils/dom.js';
import View from './View.js';

export default class PurchasedLottosView extends View {
  constructor() {
    super($('#purchased-lottos'));
    this.totalPurchased = $('#total-purchased');
    this.lottoIcons = $('#lotto-icons');
    this.numberViewSwitch = $('.lotto-numbers-toggle-button');

    this.numberOfLottos = 0;

    this.bindEvents();
  }

  bindEvents() {
    this.numberViewSwitch.addEventListener(
      'change',
      this.handleChangeNumberViewSwitch.bind(this),
    );
  }

  initialize() {
    this.numberViewSwitch.checked = false;

    const lottoDetails = $$('.lotto-detail');

    this.lottoIcons.classList.remove('flex-col');
    lottoDetails.forEach((el) => {
      el.classList.remove('lotto-details-display-show');
    });
  }

  handleChangeNumberViewSwitch() {
    const { checked } = this.numberViewSwitch;

    const lottoDetails = $$('.lotto-detail');

    if (checked) {
      this.lottoIcons.classList.add('flex-col');
      lottoDetails.forEach((el) => {
        el.classList.add('lotto-details-display-show');
      });
      return;
    }

    this.lottoIcons.classList.remove('flex-col');
    lottoDetails.forEach((el) => {
      el.classList.remove('lotto-details-display-show');
    });
  }

  setNumberOfLottos(numberOfLottos) {
    this.numberOfLottos = numberOfLottos;
  }

  show(purchasedLottos) {
    this.totalPurchased.innerHTML = this.getNumberOfLotteries(
      this.numberOfLottos,
    );

    this.lottoIcons.innerHTML = this.getLottoList(purchasedLottos);
    super.show();
  }

  getNumberOfLotteries(numberOfLottos) {
    return `총 ${numberOfLottos}개를 구매하였습니다.`;
  }

  getLottoList(number) {
    return number.map((arr) => this._getLottoListItem(arr)).join('');
  }

  _getLottoListItem(lotto) {
    return `
      <li class="mx-1">
        <span class="lotto-icon text-4xl">🎟️ </span>
        <span class="lotto-detail text-4xl">${lotto}</span>
      </li>
    `;
  }
}
