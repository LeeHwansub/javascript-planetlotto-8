import InputView from "../view/view.js";
import OutputView from "../view/view.js";
import InputValidator from "../utils/InputValidator.js";
import PrizeCalculator from "../utils/PrizeCalculator.js";
import LottoConstants from "../constants/LottoConstants.js";
import LottoGenerator from "../utils/Lottogenerator.js";
import view from "../view/view.js";

class LottoController {
  async run() {
    const lottos = await this.purchaseLottos();
    OutputView.OutputView.printPurchasedLottos(lottos);

    const winningNumbers = await this.getWinningNumbers();
    const bonusNumber = await this.getBonusNumber(winningNumbers);

    this.calculateResults(lottos, winningNumbers, bonusNumber);
  }

  async purchaseLottos() {
    while (true) {
      try {
        const input = await InputView.InputView.askAmount();
        InputValidator.validatePurchaseAmount(input);

        const purchaseAmount = Number(input);
        const lottoCount = this.calculateLottoCount(purchaseAmount);
        return LottoGenerator.generateLottos(lottoCount);
      } catch (error) {
        view.OutputView.printErrorMessage(error.message);
      }
    }
  }

  calculateLottoCount(purchaseAmount) {
    return purchaseAmount / LottoConstants.LOTTO_PRICE;
  }

  async getWinningNumbers() {
    while (true) {
      try {
        const input = await InputView.readWinningNumbers();
        return InputValidator.validateWinningNumbers(input);
      } catch (error) {
        view.OutputView.printErrorMessage(message);
      }
    }
  }

  async getBonusNumber(winningNumbers) {
    while (true) {
      try {
        const input = await InputView.readBonusNumber();
        return InputValidator.validateBonusNumber(input, winningNumbers);
      } catch (error) {
        view.OutputView.printErrorMessage(message);
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
    OutputView.printStatisticsHeader();
    OutputView.printPrizeStatistics(statistics);

    const totalPrize = PrizeCalculator.calculateTotalPrizeAmount(statistics);
    const purchaseAmount = lottoCount * LottoConstants.LOTTO_PRICE;
    const profitRate = PrizeCalculator.calculateProfitRate(
      totalPrize,
      purchaseAmount
    );

    OutputView.printResult(profitRate);
  }
}

export default LottoController;