import LottoConstants from "../constants/LottoConstants.js";
import ErrorMessage from "../constants/ErrorMesssage.js";

class InputValidator {

  static validatePurchaseAmount(amount) {
    this.validateAmountType(amount);
    this.validateAmountDivisible(amount);
    this.validateAmountPositive(amount);
  }

  static validateAmountType(amount) {
    const trimmedAmount = String(amount).trim();
    if (trimmedAmount === "") {
      throw new Error(ErrorMessage.PURCHASE_AMOUNT_EMPTY);
    }

    const amountNumber = Number(trimmedAmount);
    if (isNaN(amountNumber)) {
      throw new Error(ErrorMessage.PURCHASE_AMOUNT_NOT_NUMBER);
    }

    if (!Number.isInteger(amountNumber)) {
      throw new Error(ErrorMessage.PURCHASE_AMOUNT_NOT_NUMBER);
    }
  }

  static validateAmountDivisible(amount) {
    const amountNumber = Number(amount);
    if (amountNumber % LottoConstants.LOTTO_PRICE !== 0) {
      throw new Error(ErrorMessage.PURCHASE_AMOUNT_NOT_DIVISIBLE);
    }
  }

  static validateAmountPositive(amount) {
    const amountNumber = Number(amount);
    if (amountNumber <= 0) {
      throw new Error(ErrorMessage.PURCHASE_AMOUNT_NOT_POSITIVE);
    }
  }

  static validateWinningNumbers(input) {
    const numbers = this.parseWinningNumbers(input);
    this.validateNumberCount(numbers);
    this.validateNumberRange(numbers);
    this.validateUniqueNumbers(numbers);
    return numbers;
  }

  static parseWinningNumbers(input) {
    if (!input || input.trim() === "") {
      throw new Error(ErrorMessage.WINNING_NUMBERS_EMPTY);
    }

    const numbers = input.split(",").map((number) => {
      const trimmed = number.trim();
      if (trimmed === "") {
        throw new Error(ErrorMessage.WINNING_NUMBERS_INVALID_COUNT);
      }

      const parsed = Number(trimmed);
      if (isNaN(parsed)) {
        throw new Error(ErrorMessage.WINNING_NUMBERS_INVALID_RANGE);
      }

      if (!Number.isInteger(parsed)) {
        throw new Error(ErrorMessage.WINNING_NUMBERS_INVALID_RANGE);
      }

      return parsed;
    });

    return numbers;
  }

  static validateNumberCount(numbers) {
    if (numbers.length !== LottoConstants.LOTTO_NUMBER_COUNT) {
      throw new Error(ErrorMessage.WINNING_NUMBERS_INVALID_COUNT);
    }
  }

  static validateNumberRange(numbers) {
    const outOfRange = numbers.some(
      (number) =>
        number < LottoConstants.MIN_NUMBER ||
        number > LottoConstants.MAX_NUMBER
    );
    if (outOfRange) {
      throw new Error(ErrorMessage.WINNING_NUMBERS_INVALID_RANGE);
    }
  }

  static validateUniqueNumbers(numbers) {
    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== numbers.length) {
      throw new Error(ErrorMessage.WINNING_NUMBERS_DUPLICATE);
    }
  }

  static validateBonusNumber(input, winningNumbers) {
    const bonusNumber = this.parseBonusNumber(input);
    this.validateBonusRange(bonusNumber);
    this.validateBonusDuplicate(bonusNumber, winningNumbers);
    return bonusNumber;
  }

  static parseBonusNumber(input) {
    const trimmedInput = input.trim();

    if (trimmedInput === "") {
      throw new Error(ErrorMessage.BONUS_NUMBER_EMPTY);
    }

    const bonusNumber = Number(trimmedInput);
    if (isNaN(bonusNumber)) {
      throw new Error(ErrorMessage.BONUS_NUMBER_INVALID_RANGE);
    }

    if (!Number.isInteger(bonusNumber)) {
      throw new Error(ErrorMessage.BONUS_NUMBER_INVALID_RANGE);
    }

    return bonusNumber;
  }

  static validateBonusRange(bonusNumber) {
    if (
      bonusNumber < LottoConstants.MIN_NUMBER ||
      bonusNumber > LottoConstants.MAX_NUMBER
    ) {
      throw new Error(ErrorMessage.BONUS_NUMBER_INVALID_RANGE);
    }
  }

  static validateBonusDuplicate(bonusNumber, winningNumbers) {
    if (winningNumbers.includes(bonusNumber)) {
      throw new Error(ErrorMessage.BONUS_NUMBER_DUPLICATE);
    }
  }
}

export default InputValidator;