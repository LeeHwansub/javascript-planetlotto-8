const ErrorMessage = {
  PURCHASE_AMOUNT_EMPTY: '로또 구입 금액을 입력해 주세요.',
  PURCHASE_AMOUNT_NOT_NUMBER: '로또의 구입금액은 500원 단위 숫자여야 합니다.',
  PURCHASE_AMOUNT_NOT_DIVISIBLE: '로또의 구입금액은 500원 단위여야 합니다.',
  PURCHASE_AMOUNT_NOT_POSITIVE: "로또의 구입금액은 500원 단위 양수여야 합니다.",

  WINNING_NUMBERS_EMPTY: '로또 당첨번호를 입력해 주세요.',
  WINNING_NUMBERS_INVALID_COUNT: '로또 번호는 5개여야 합니다.',
  WINNING_NUMBERS_INVALID_RANGE: '로또 번호는 1부터 30 사이의 숫자여야 합니다.',
  WINNING_NUMBERS_DUPLICATE: '로또 당첨 번호에 중복된 숫자가 있습니다.',

  BONUS_NUMBER_EMPTY: '보너스 번호를 입력해 주세요.',
  BONUS_NUMBER_INVALID_RANGE: '보너스 번호는 1부터 30 사이의 정수여야 합니다.',
  BONUS_NUMBER_DUPLICATE: '보너스 번호는 당첨 번호와 중복될 수 없습니다.',
};

export default ErrorMessage;
