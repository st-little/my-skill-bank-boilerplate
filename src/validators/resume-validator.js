const fs = require("fs");

const Ajv = require("ajv");
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

const resumeSchema = JSON.parse(
  fs.readFileSync("src/schemas/resume-schema.json", "utf8")
);
const resumeData = JSON.parse(fs.readFileSync("src/data/resume.json", "utf8"));
const resumeValidate = ajv.compile(delete resumeSchema.$schema);
const resumeValid = resumeValidate(resumeData);
if (resumeValid) {
  console.log("resume... OK");
} else {
  console.log("resume... NG");
  console.log(resumeValidate.errors);
}
