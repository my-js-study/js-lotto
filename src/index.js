import Controller from './Controller.js';
import InputLottoFormView from './views/InputLottoFormView.js';
import InputPriceFormView from './views/InputPriceFormView.js';
import ModalView from './views/ModalView.js';
import PurchasedLottosView from './views/PurchasedLottosView.js';

const lottoController = new Controller({
  inputPriceFormView: new InputPriceFormView(),
  purchasedLottosView: new PurchasedLottosView(),
  inputLottoFormView: new InputLottoFormView(),
  modalView: new ModalView(),
});

lottoController.initialize();
