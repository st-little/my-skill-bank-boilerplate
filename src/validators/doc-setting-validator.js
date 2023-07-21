const fs = require("fs");

const Ajv = require("ajv");
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

const settingSchema = JSON.parse(
  fs.readFileSync("src/schemas/doc-setting-schema.json", "utf8")
);
const settingData = JSON.parse(
  fs.readFileSync("src/data/doc-setting.json", "utf8")
);
const settingValidate = ajv.compile(delete settingSchema.$schema);
const settingValid = settingValidate(settingData);
if (settingValid) {
  console.log("doc-setting... OK");
} else {
  console.log("doc-setting... NG");
  console.log(settingValidate.errors);
}
