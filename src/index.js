import Controller from './Controller.js';
import InputLottoNumsView from './views/InputLottoNumsView.js';
import InputPriceFormView from './views/InputPriceFormView.js';
import PurchasedLottosView from './views/PurchasedLottosView.js';

const lottoController = new Controller({
  inputPriceFormView: new InputPriceFormView(),
  purchasedLottosView: new PurchasedLottosView(),
  inputLottoNumsView: new InputLottoNumsView(),
});

lottoController.initialize();
