const util = require("util")

const { Command, flags } = require('@oclif/command')
const { getLastCommit } = require("git-last-commit")

const { push, exist, imageName } = require("../../lib/docker")
const service = require("../../service")

const { registry } = service;
const lastCommit = util.promisify(getLastCommit)

class Push extends Command {
  async run() {
    const { flags } = this.parse(Push)
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
    const img = imageName(registry, name, tag);

    await exist(img)
    const res = await push(img)
    this.log("Push -> run -> res", res)

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
