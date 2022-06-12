export const ERROR_MESSAGE = {
  NO_SELECTOR: '선택자를 설정해주세요.',
  NOT_TYPE_UNIT_OF_THOUSAND: '로또 구입 금액을 1,000원 단위로 입력해 주세요.',
  NOT_TYPE_LOTTO_NUMBER_DUPLICATION:
    '로또 번호에는 중복된 숫자를 입력할 수 없습니다.',
  NOT_TYPE_NUMBER: '숫자를 입력해주세요.',
};

export const CUSTOM_EVENT_NAME = {
  INPUT_PRICE_FORM_SUBMIT: '@inputPriceFormSubmit',
  GET_WINNING_RESULT: '@getWinningResult',
  RESTART: '@restart',
};

export const MIN_INPUT_PRICE = 1000;
export const LOTTO_PRICE = 1000;

export const VALIDATION_MESSAGE = {
  valueMissing: '필수 입력입니다.',
  rangeUnderflow: `최소 입력 금액은 ${MIN_INPUT_PRICE}원 입니다.`,
};

export const RANKING = {
  FIRST: 6,
  SECOND: 5.5,
  THRID: 5,
  FOURTH: 4,
  FIFTH: 3,
};

export const WINNING_PRICE = {
  [RANKING.FIRST]: 2000000000,
  [RANKING.SECOND]: 30000000, // 5 + bonus
  [RANKING.THRID]: 1500000,
  [RANKING.FOURTH]: 50000,
  [RANKING.FIFTH]: 5000,
};
