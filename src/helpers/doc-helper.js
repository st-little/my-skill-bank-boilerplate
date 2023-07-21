const dateHelper = require("./date-helper");

/**
 * 作業期間を取得します。
 * @param {Date} startDate 開始日付
 * @param {Date | undefined} endDate 終了日付
 * @returns {string} 作業期間
 */
exports.workPeriod = (startDate, endDate) => {
  const start = dateHelper.dateFormatJP(startDate);
  const end = endDate ? dateHelper.dateFormatJP(endDate) : "";
  const elapsed = this.dateElapsed(startDate, endDate);

  return `${start} 〜\n${end}\n${elapsed}`;
};

/**
 * 作業期間の経過年月を取得します。
 * @param {Date} startDate 開始日付
 * @param {Date | undefined} endDate 終了日付
 * @returns {string} 経過年月
 */
exports.dateElapsed = (startDate, endDate) => {
  if (!endDate) {
    // プロジェクトに参画中の場合は終了日が存在しない
    return `(参画中)`;
  }

  const dateElapsed = dateHelper.dateElapsed(startDate, endDate);
  if (dateElapsed.year) {
    if (dateElapsed.month) {
      return `(${dateElapsed.year}年${dateElapsed.month}ヶ月)`;
    } else {
      return `(${dateElapsed.year}年)`;
    }
  } else {
    return `(${dateElapsed.month}ヶ月)`;
  }
};
