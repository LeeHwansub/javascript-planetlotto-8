import view from "../view/view.js";
import InputValidator from "../utils/InputValidator.js";
import PrizeCalculator from "../utils/PrizeCalculator.js";
import LottoConstants from "../constants/LottoConstants.js";
import LottoGenerator from "../utils/LottoGenerator.js";
import PrizeConstants from "../constants/PrizeConstants.js";

const { InputView, OutputView } = view;

class LottoController {
  async run() {
    const lottos = await this.purchaseLottos();
    this.printLottos(lottos);

    const winningNumbers = await this.getWinningNumbers();
    const bonusNumber = await this.getBonusNumber(winningNumbers);

    this.calculateResults(lottos, winningNumbers, bonusNumber);
  }

  printLottos(lottos) {
    const lottoNumbers = lottos.map(lotto => lotto.getNumbers());
    OutputView.printPurchasedLottos(lottoNumbers);
  }

  async purchaseLottos() {
    while (true) {
      try {
        const amount = await InputView.askAmount();
        InputValidator.validatePurchaseAmount(amount);

        const lottoCount = this.calculateLottoCount(amount);
        return LottoGenerator.generateLottos(lottoCount);
      } catch (error) {
        OutputView.printErrorMessage(error.message);
      }
    }
  }

  calculateLottoCount(purchaseAmount) {
    return purchaseAmount / LottoConstants.LOTTO_PRICE;
  }

  async getWinningNumbers() {
    while (true) {
      try {
        const numbers = await InputView.askWinningLotto();
        // InputValidator의 개별 검증 메서드 사용
        InputValidator.validateNumberCount(numbers);
        InputValidator.validateNumberRange(numbers);
        InputValidator.validateUniqueNumbers(numbers);
        return numbers;
      } catch (error) {
        OutputView.printErrorMessage(error.message);
      }
    }
  }

  async getBonusNumber(winningNumbers) {
    while (true) {
      try {
        const bonusNumber = await InputView.askBonusNumber();
        InputValidator.validateBonusRange(bonusNumber);
        InputValidator.validateBonusDuplicate(bonusNumber, winningNumbers);
        return bonusNumber;
      } catch (error) {
        OutputView.printErrorMessage(error.message);
      }
    }
  }

  calculateResults(lottos, winningNumbers, bonusNumber) {
    const statistics = PrizeCalculator.calculateStatistics(
      lottos,
      winningNumbers,
      bonusNumber
    );
    this.printResults(statistics, lottos.length);
  }

  printResults(statistics, lottoCount) {
    // Map 형식으로 변환 (0~5 등급)
    const countsByRank = new Map();
    const totalWinning = (statistics[1] || 0) + (statistics[2] || 0) + (statistics[3] || 0) + (statistics[4] || 0) + (statistics[5] || 0);
    const noMatchCount = lottoCount - totalWinning;

    countsByRank.set(0, noMatchCount);
    countsByRank.set(1, statistics[1] || 0);
    countsByRank.set(2, statistics[2] || 0);
    countsByRank.set(3, statistics[3] || 0);
    countsByRank.set(4, statistics[4] || 0);
    countsByRank.set(5, statistics[5] || 0);

    OutputView.printResult(countsByRank);
  }
}

export default LottoController;