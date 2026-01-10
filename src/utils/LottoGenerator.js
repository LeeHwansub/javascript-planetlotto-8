import { MissionUtils } from "@woowacourse/mission-utils";
import Lotto from "../model/Lotto.js";
import LottoConstants from "../constants/LottoConstants.js";

class LottoGenerator {
  static generateLottoNumbers() {
    const numbers = MissionUtils.Random.pickUniqueNumbersInRange(
      LottoConstants.MIN_NUMBER,
      LottoConstants.MAX_NUMBER,
      LottoConstants.LOTTO_NUMBER_COUNT
    );
    return new Lotto(numbers);
  }

  static generateLottos(count) {
    const lottos = [];
    for (let i = 0; i < count; i++) {
      lottos.push(this.generateLottoNumbers());
    }
    return lottos;
  }
}

export default LottoGenerator;