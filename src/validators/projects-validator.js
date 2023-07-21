const fs = require("fs");

const Ajv = require("ajv");
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

const projectsSchema = JSON.parse(
  fs.readFileSync("src/schemas/projects-schema.json", "utf8")
);
const projectsData = JSON.parse(
  fs.readFileSync("src/data/projects.json", "utf8")
);
const projectsValidate = ajv.compile(delete projectsSchema.$schema);
const projectsValid = projectsValidate(projectsData);
if (projectsValid) {
  console.log("projects... OK");
} else {
  console.log("projects... NG");
  console.log(projectsValidate.errors);
}
