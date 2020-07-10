const util = require("util")

const { Command, flags } = require('@oclif/command')
const { getLastCommit } = require("git-last-commit")

const { execShellCommand } = require("../../utils")
const service = require("../../service")
const { registry } = service;
const lastCommit = util.promisify(getLastCommit)

class Build extends Command {
  async run() {
    const { flags } = this.parse(Build)
    console.log("Build -> run -> flags", flags)
    let { name, tag, context = ".", short } = flags
    if (!name) {
      name = service.name
    }
    if (!tag) {
      const commit = await lastCommit()
      let { hash } = commit;
      if (short) {
        hash = commit.shortHash
      }
      tag = hash
    }
    const img = `${registry}/${name}:${tag}`
    const cmd = `docker build -t ${img} ${context}`
    const res = await execShellCommand(cmd)
    this.log("Build -> run -> res", res)

    this.log(`cmd ${cmd}`)
  }
}

Build.description = `Describe the command here
...
      Extra documentation goes here
      `

Build.flags = {

  name: flags.string({ char: 'n', description: 'Name of Container image' }),
  tag: flags.string({ char: 't', description: 'Container tag' }),
  short: flags.boolean({ char: 's', description: "Provide short version of git commit hash" }),
  context: flags.string({ char: "c", description: "Docker context default ." })
}

module.exports = Build
