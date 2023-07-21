const fs = require("fs");

const Ajv = require("ajv");
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

const definitionSchema = JSON.parse(
  fs.readFileSync("src/schemas/doc-definition-schema.json", "utf8")
);
const definitionData = JSON.parse(
  fs.readFileSync("src/data/doc-definition.json", "utf8")
);
const definitionValidate = ajv.compile(delete definitionSchema.$schema);
const definitionValid = definitionValidate(definitionData);
if (definitionValid) {
  console.log("doc-definition... OK");
} else {
  console.log("doc-definition... NG");
  console.log(definitionValidate.errors);
}
