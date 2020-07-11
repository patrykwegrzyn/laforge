const util = require("util")
const { execShellCommand } = require("../utils");
const { getLastCommit } = require("git-last-commit")
const lastCommit = util.promisify(getLastCommit)

function push(img) {
  const cmd = `docker push ${img}`
  return execShellCommand(cmd)
}

function build(img, context) {
  const cmd = `docker build -t ${img} ${context}`
  return execShellCommand(cmd)
}

function exist(img) {
  const cmd = `docker inspect --type=image --format='{{.Config.Image}}' ${img}`
  return execShellCommand(cmd)
}

async function imageName(registry, name, flags) {
  let { tag, short } = flags
  if (!tag) {
    const commit = await lastCommit()
    tag = short ? commit.shortHash : commit.hash

  }
  return `${registry}/${name}:${tag}`
}

exports.build = build;
exports.push = push;
exports.exist = exist
exports.imageName = imageName;