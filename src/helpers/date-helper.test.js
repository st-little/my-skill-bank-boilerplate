const dateHelper = require("./date-helper");

describe("年齢", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  test("システム日が 2022-01-01 の場合は 34 を返す", () => {
    jest.setSystemTime(new Date("2022-01-01"));
    expect(dateHelper.age(new Date("1987-01-01"))).toBe(34);
  });
  afterEach(() => {
    jest.useRealTimers();
  });
});

describe("日本語の日付フォーマット", () => {
  test("日付を漢字「年月」で返す", () => {
    expect(dateHelper.dateFormatJP(new Date("2022-01-01"))).toBe("2022年01月");
  });
});

describe("経過年月日", () => {
  test("経過年月日が１年未満の場合は、年は 0 を返す", () => {
    expect(
      dateHelper.dateElapsed(new Date("2022-01-01"), new Date("2022-05-10"))
    ).toEqual({ year: 0, month: 4, day: 10 });
  });
  test("経過年月日が１年以上の場合は、年を返す", () => {
    expect(
      dateHelper.dateElapsed(new Date("2022-01-01"), new Date("2023-01-01"))
    ).toEqual({ year: 1, month: 0, day: 0 });
  });
  test("経過年月日が１ヶ月の場合は、月を返す", () => {
    expect(
      dateHelper.dateElapsed(new Date("2015-07-01"), new Date("2015-07-31"))
    ).toEqual({ year: 0, month: 1, day: 0 });
  });
  test("経過年月日が１ヶ月未満場合は、日を返す", () => {
    expect(
      dateHelper.dateElapsed(new Date("2015-07-01"), new Date("2015-07-03"))
    ).toEqual({ year: 0, month: 0, day: 3 });
  });
});
