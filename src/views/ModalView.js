import {
  CUSTOM_EVENT_NAME,
  LOTTO_PRICE,
  RANKING,
  WINNING_PRICE,
} from '../constants.js';
import { $, $$ } from '../utils/dom.js';
import View from './View.js';

export default class ModalView extends View {
  constructor() {
    super($('.modal'));
    this.closeButton = $('.modal-close');
    this.restartButton = $('#restart');
    this.matchNumberCounts = $$('.match-number-count');
    this.yield = $('#yield');

    this.bindEvents();
  }

  bindEvents() {
    this.closeButton.addEventListener('click', () => {
      this.hide();
    });
    this.restartButton.addEventListener('click', () => {
      this.emit(CUSTOM_EVENT_NAME.RESTART, {});
    });
  }

  getRankings(winningNumber, purchasedLottos) {
    const matchCount = { 3: 0, 4: 0, 5: 0, 5.5: 0, 6: 0 };
    const bonusNumber = winningNumber.pop();

    purchasedLottos.forEach((numbers) => {
      const { length: matchLottoCount } = numbers.filter((number) =>
        winningNumber.includes(number),
      );

      if (matchLottoCount === RANKING.THRID && numbers.includes(bonusNumber))
        matchCount[RANKING.SECOND] += 1;

      if (matchLottoCount >= RANKING.FIFTH) matchCount[matchLottoCount] += 1;
    });

    return matchCount;
  }

  getYieldPrice(matchNumbers) {
    return Object.entries(matchNumbers).reduce(
      (prev, [key, value]) => prev + WINNING_PRICE[key] * value,
      0,
    );
  }

  show() {
    this.element.style.visibility = 'visible';
    this.element.style.opacity = '1';
  }

  hide() {
    this.element.style.visibility = 'hidden';
    this.element.style.opacity = '0';
  }

  getMatchNumberCounts(count) {
    return `${count}개`;
  }

  getYield(yieldPrice, purchasedLottoCounts) {
    return `당신의 총 수익률은 ${(
      (yieldPrice / (purchasedLottoCounts * LOTTO_PRICE)) * 100 -
      100
    ).toFixed(2)}% 입니다.`;
  }
}
