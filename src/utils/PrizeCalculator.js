import PrizeConstants from "../constants/PrizeConstants.js";

class PrizeCalculator {
  static determineRank(matchCount, hasBonus) {
    if (matchCount === PrizeConstants.MATCH_COUNT.FIRST) {
      return PrizeConstants.RANK.FIRST;
    }
    if (
      matchCount === PrizeConstants.MATCH_COUNT.SECOND &&
      hasBonus
    ) {
      return PrizeConstants.RANK.SECOND;
    }
    if (matchCount === PrizeConstants.MATCH_COUNT.THIRD) {
      return PrizeConstants.RANK.THIRD;
    }
    if (matchCount === PrizeConstants.MATCH_COUNT.FOURTH &&
      hasBonus
    ) {
      return PrizeConstants.RANK.FOURTH;
    }
    if (matchCount === PrizeConstants.MATCH_COUNT.FIFTH &&
      hasBonus
    ) {
      return PrizeConstants.RANK.FIFTH;
    }
    return PrizeConstants.RANK.NONE;
  }

  static calculatePrizeAmount(rank) {
    if (rank === PrizeConstants.RANK.NONE) {
      return 0;
    }
    return PrizeConstants.PRIZE_AMOUNTS[rank];
  }

  static calculateStatistics(lottos, winningNumbers, bonusNumber) {
    const statistics = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    lottos.forEach((lotto) => {
      const matchCount = lotto.countMatchingNumbers(winningNumbers);
      const hasBonus = lotto.hasBonusNumber(bonusNumber);
      const rank = PrizeCalculator.determineRank(matchCount, hasBonus);

      if (rank !== PrizeConstants.RANK.NONE) {
        statistics[rank]++;
      }
    });

    return statistics;
  }

  static calculateTotalPrizeAmount(statistics) {
    let totalAmount = 0;
    Object.keys(statistics).forEach((rank) => {
      const count = statistics[rank];
      const prizeAmount = PrizeCalculator.calculatePrizeAmount(Number(rank));
      totalAmount += count * prizeAmount;
    });
    return totalAmount;
  }

  static calculateProfitRate(totalPrize, purchaseAmount) {
    const profitRate =
      (totalPrize / purchaseAmount) *
      PrizeConstants.PROFIT_RATE_MULTIPLIER;
    return Number(profitRate.toFixed(PrizeConstants.PROFIT_RATE_DECIMAL_PLACES));
  }
}

export default PrizeCalculator;