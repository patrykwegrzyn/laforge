const fs = require('fs');
const YAML = require("json-to-pretty-yaml")
const path = require("path")
const handlebars = require("handlebars")


function execShellCommand(cmd) {
  const exec = require('child_process').exec;
  return new Promise((resolve, reject) => {
    const c = exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      resolve(stdout ? stdout : stderr);
    });
    c.stdout.on("data", (data) => {
      console.log(data.substring(0, data.lastIndexOf('\n')))
    })
  });
}

function template(type) {
  const fpath = path.join(process.env.PWD, `.laforge/templates/${type}.yaml`)
  const templateString = fs.readFileSync(fpath, "utf8")
  return handlebars.compile(templateString)
}

function jsonToYamlFile(path, json) {
  const yamlStr = YAML.stringify(json)
  console.log("path", path, "json", json, yamlStr)
  fs.writeFileSync(path, yamlStr)
}

const templates = {
  svc: require("./templates/svc.json"),
  deployment: require("./templates/deployment.json")
}

exports.jsonToYamlFile = jsonToYamlFile;
exports.template = template
exports.templates = templates
exports.execShellCommand = execShellCommand
