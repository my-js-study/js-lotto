import { $ } from '../utils/dom.js';
import View from './View.js';

export default class InputLottoNumsView extends View {
  constructor() {
    super($('#input-lotto-nums'));
  }
}
