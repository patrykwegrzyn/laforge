const fs = require('fs');
const path = require("path")
const handlebars = require("handlebars")
function mkdir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

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
  const templateString = fs.readFileSync(path.join(process.env.PWD, `.laforge/templates/${type}.yaml`), "utf8")
  return handlebars.compile(templateString)
}

exports.template = template
exports.mkdir = mkdir
exports.execShellCommand = execShellCommand