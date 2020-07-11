const { execShellCommand } = require("../utils");

function push(img) {
  const cmd = `docker push ${img}`
  return execShellCommand(cmd)
}

function build(img, context) {
  const cmd = `docker build -t ${img} ${context}`
  return execShellCommand(cmd)
}

function exist(img) {
  const cmd = `docker inspect --type=image ${img}`
  return execShellCommand(cmd)
}

function imageName(registry, name, version) {
  return `${registry}/${name}:${version}`
}

exports.build = build;
exports.push = push;
exports.exist = exist
exports.imageName = imageName;