import LottoConstants from "../constants/LottoConstants.js";
import ErrorMessage from "../constants/ErrorMesssage.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = [...numbers].sort((a, b) => a - b);
  }

  #validate(numbers) {
    this.#validateCount(numbers);
    this.#validateDuplicate(numbers);
    this.#validateRange(numbers);
  }

  #validateCount(numbers) {
    if (numbers.length !== LottoConstants.LOTTO_NUMBER_COUNT) {
      throw new Error(ErrorMessage.WINNING_NUMBERS_INVALID_COUNT);
    }
  }

  #validateDuplicate(numbers) {
    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== numbers.length) {
      throw new Error(ErrorMessage.WINNING_NUMBERS_DUPLICATE);
    }
  }

  #validateRange(numbers) {
    const outOfRange = numbers.some(
      (number) =>
        number < LottoConstants.MIN_NUMBER ||
        number > LottoConstants.MAX_NUMBER
    );
    if (outOfRange) {
      throw new Error(ErrorMessage.WINNING_NUMBERS_INVALID_RANGE);
    }
  }

  getNumbers() {
    return [...this.#numbers];
  }

  countMatchingNumbers(winningNumbers) {
    return this.#numbers.filter((number) =>
      winningNumbers.includes(number)
    ).length;
  }

  hasBonusNumber(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }
}

export default Lotto;