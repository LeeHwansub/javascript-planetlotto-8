export const ErrorMessages = {
  PURCHSE_AOUNT: {
    EMPTY: '[ERROR] 로또 구입 금액을 입력해 주세요.',
    NOT_NUMBER: '[ERROR] 로또의 구입금액은 500원 단위 숫자여야 합니다.',
    NOT_DIVISIBLE: '[ERROR] 로또의 구입금액은 500원 단위여야 합니다.',
    NOT_POSITIVE: "[ERROR] 로또의 구입금액은 500원 단위 양수여야 합니다.",
  },

  WINNING_NUMBERS: {
    EMPTY: '[ERROR] 로또 당첨번호를 입력해 주세요.',
    INVALID_COUNT: '[ERROR] 로또 번호는 5개여야 합니다.',
    INVALID_RANGE: '[ERROR] 로또 번호는 1부터 30 사이의 숫자여야 합니다.',
    DUPLICATE: '[ERROR] 로또 당첨 번호에 중복된 숫자가 있습니다.',
  },

  BONUS_NUMBER: {
    EMPTY: '[ERROR] 보너스 번호를 입력해 주세요.',
    INVALID_RANGE: '[ERROR] 보너스 번호는 1부터 30 사이의 정수여야 합니다.',
    DUPLICATE: '[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.'
  },
};
