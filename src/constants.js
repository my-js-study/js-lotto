export const ERROR_MESSAGE = {
  NO_SELECTOR: '선택자를 설정해주세요.',
  NOT_TYPE_UNIT_OF_THOUSAND: '로또 구입 금액을 1,000원 단위로 입력해 주세요.',
};

export const CUSTOM_EVENT_NAME = {
  INPUT_PRICE_FORM_SUBMIT: '@inputPriceFormSubmit',
};

export const MIN_INPUT_PRICE = 1000;

export const VALIDATION_MESSAGE = {
  valueMissing: '필수 입력입니다.',
  rangeUnderflow: `최소 입력 금액은 ${MIN_INPUT_PRICE}원 입니다.`,
};
