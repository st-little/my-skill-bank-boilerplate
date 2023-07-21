const docHelper = require("./doc-helper");

describe("作業期間", () => {
  test("プロジェクトに参画中の場合は、終了日を空文字で返す", () => {
    expect(docHelper.workPeriod(new Date("2021-01-01"))).toBe(
      "2021年01月 〜\n\n(参画中)"
    );
  });
  test("作業期間の開始日、終了日、経過年月を返す", () => {
    expect(
      docHelper.workPeriod(new Date("2021-01-01"), new Date("2022-11-30"))
    ).toBe("2021年01月 〜\n2022年11月\n(1年11ヶ月)");
  });
});

describe("作業期間の経過年月", () => {
  test("プロジェクトに参画中の場合は、参画中を返す", () => {
    expect(docHelper.dateElapsed(new Date("2022-01-01"))).toBe("(参画中)");
  });
  test("1年未満の場合は、月だけを返す", () => {
    expect(
      docHelper.dateElapsed(new Date("2022-01-01"), new Date("2022-11-30"))
    ).toBe("(11ヶ月)");
  });
  test("1年の場合は、年だけを返す", () => {
    expect(
      docHelper.dateElapsed(new Date("2022-01-01"), new Date("2022-12-31"))
    ).toBe("(1年)");
  });
  test("1年を超える場合は、年月を返す", () => {
    expect(
      docHelper.dateElapsed(new Date("2021-01-01"), new Date("2022-11-30"))
    ).toBe("(1年11ヶ月)");
  });
});
