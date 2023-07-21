const fns = require("date-fns");

/**
 * 年齢を取得します。
 * @param {Date} birthday 誕生日
 * @returns {number} 年齢
 */
exports.age = (birthday) => {
  const today = new Date();
  return fns.getYear(today) - fns.getYear(birthday) - 1;
};

/**
 * 日付のフォーマットを日本語にします。
 * @param {Date} date 日付
 * @returns {string} 日本語にフォーマットした日付
 */
exports.dateFormatJP = (date) => {
  return fns.format(date, "yyyy年MM月");
};

/**
 * 経過した年月日を取得します。
 * @param {Date} startDate 開始日付
 * @param {Date | undefined} endDate 終了日付
 * @returns {Object} 経過した年月日を数値型で保持するオブジェクト
 */
exports.dateElapsed = (startDate, endDate) => {
  const end =
    fns.getDate(startDate) === fns.getDate(endDate)
      ? endDate
      : fns.addDays(endDate, 1);

  const duration = fns.intervalToDuration({
    start: startDate,
    end,
  });

  return {
    year: duration.years,
    month: duration.months,
    day: duration.days,
  };
};
