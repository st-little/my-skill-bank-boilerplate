const fs = require("fs");
const dateHelper = require("../helpers/date-helper.js");
const docHelper = require("../helpers/doc-helper.js");

const setting = JSON.parse(
  fs.readFileSync("src/data/doc-setting.json", "utf8")
);
const definition = JSON.parse(
  fs.readFileSync("src/data/doc-definition.json", "utf8")
);
const resume = JSON.parse(fs.readFileSync("src/data/resume.json", "utf8"));
const projects = JSON.parse(fs.readFileSync("src/data/projects.json", "utf8"));

const fonts = {
  myFont: {
    normal: `src/fonts/${setting.fontName}`,
  },
};

const PdfPrinter = require("pdfmake");
const printer = new PdfPrinter(fonts);

const docDefinition = {
  info: definition,
  pageSize: "A4",
  header: {
    text: "スキルシート",
    alignment: "center",
    fontSize: 14,
    margin: [0, 14, 0, 0],
  },
  footer: function (currentPage, pageCount) {
    // you can apply any logic and return any valid pdfmake element
    const pagination = currentPage.toString() + " of " + pageCount;
    return [{ text: pagination, alignment: "center" }];
  },
  defaultStyle: {
    font: "myFont",
    fontSize: 8,
  },
  styles: {
    tableHeader: {
      fillColor: setting.tableHeaderColor,
      alignment: "center",
    },
    tableData: { alignment: "justify" },
  },
  content: [
    {
      table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 0,
        heights: [
          10, // ふりがな
          10, // 氏名
          10, // 住所
          10, // メールアドレス
          20, // 保有資格
          20, // 保有技術
          20, // 職務要約
          20, // 自己PR
          10, // HP等
        ],
        widths: [60, "*", 60, 100],
        body: [
          [
            { text: "ふりがな", style: "tableHeader" },
            { text: resume.nameKana, style: "tableData" },
            { text: "年齢", style: "tableHeader" },
            {
              text: `${dateHelper.age(new Date(resume.birthday))}歳`,
              style: "tableData",
            },
          ],
          [
            { text: "氏名", style: "tableHeader" },
            { text: resume.nameKanji, style: "tableData" },
            { text: "性別", style: "tableHeader" },
            { text: resume.gender, style: "tableData" },
          ],
          [
            { text: "住所", style: "tableHeader" },
            { text: resume.address, style: "tableData" },
            { text: "最寄駅", style: "tableHeader" },
            { text: resume.closestStation, style: "tableData" },
          ],
          [
            { text: "メールアドレス", style: "tableHeader" },
            { text: resume.emailAddress, style: "tableData" },
            { text: "電話番号", style: "tableHeader" },
            { text: resume.phoneNumber, style: "tableData" },
          ],
          [
            { text: "保有資格", style: "tableHeader" },
            { text: resume.qualification, style: "tableData", colSpan: 3 },
          ],
          [
            { text: "保有技術", style: "tableHeader" },
            { text: resume.skill, style: "tableData", colSpan: 3 },
          ],
          [
            { text: "職務要約", style: "tableHeader" },
            { text: resume.jobSummary, style: "tableData", colSpan: 3 },
          ],
          [
            { text: "自己PR", style: "tableHeader" },
            { text: resume.selfPromotion, style: "tableData", colSpan: 3 },
          ],
          [
            { text: "HP等", style: "tableHeader" },
            {
              text: (resume.bioLinks || [])
                .map((bioLink) => {
                  return `${bioLink.name}: ${bioLink.url}`;
                })
                .join("\n"),
              style: "tableData",
              colSpan: 3,
            },
          ],
        ],
      },
    },
    { text: "", margin: [0, 14, 0, 0] },
    {
      table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 1,
        dontBreakRows: true,
        // heights: [20, 20, 20,20,40,40],
        widths: [16, 60, "*", 60, 60, 60],
        margin: [0, 12, 0, 0],
        body: [
          [
            { text: "No.", style: "tableHeader" },
            { text: "作業期間", style: "tableHeader" },
            { text: "業務内容", style: "tableHeader" },
            { text: "担当業務", style: "tableHeader" },
            { text: "環境/言語等", style: "tableHeader" },
            { text: "役割/規模", style: "tableHeader" },
          ],
          ...projects.map((project, index) => {
            return [
              { text: String(index + 1), style: "tableData" },
              {
                text: `${docHelper.workPeriod(
                  new Date(project.workPeriod.start),
                  project.workPeriod.end
                    ? new Date(project.workPeriod.end)
                    : undefined
                )}`,
                style: "tableData",
              },
              { text: project.jobDescription, style: "tableData" },
              { text: project.jobRole, style: "tableData" },
              { text: project.envLang, style: "tableData" },
              { text: project.roleScale, style: "tableData" },
            ];
          }),
        ],
      },
    },
  ],
};

const options = {
  // ...
};

const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
pdfDoc.pipe(fs.createWriteStream(`output/${setting.docName}`));
pdfDoc.end();
