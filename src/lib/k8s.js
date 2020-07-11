const { execShellCommand } = require("../utils")


async function version() {
  const cmd = `kubectl version --short`
  return execShellCommand(cmd)
}

module.exports = {
  version
}