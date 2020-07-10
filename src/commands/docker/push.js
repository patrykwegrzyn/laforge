const util = require("util")

const { Command, flags } = require('@oclif/command')
const { getLastCommit } = require("git-last-commit")

const { execShellCommand } = require("../../utils")
const service = require("../../service")

const { registry } = service;
const lastCommit = util.promisify(getLastCommit)

class Push extends Command {
  async run() {
    const { flags } = this.parse(Push)
    console.log("Push -> run -> flags", flags)
    let { name, tag, short } = flags
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

    console.log("Push -> run -> img", img)
    const cmd = `docker push ${img}`
    const res = await execShellCommand(cmd)
    this.log("Push -> run -> res", res)

    this.log(`cmd ${cmd}`)
  }
}

Push.description = `Describe the command here
...
      Extra documentation goes here
      `

Push.flags = {

  name: flags.string({ char: 'n', description: 'Name of Container image' }),
  tag: flags.string({ char: 't', description: 'Container tag' }),
  short: flags.boolean({ char: 's', description: "Provide short version of git commit hash" }),
}

module.exports = Push
