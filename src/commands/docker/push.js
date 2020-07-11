
const { Command, flags } = require('@oclif/command')

const { imageName, exist, push } = require("../../lib/docker")
const service = require("../../service")

const { registry } = service;

class Push extends Command {
  async run() {
    const { flags } = this.parse(Push)
    let { name } = flags
    name = name || service.name
    const img = await imageName(registry, name, flags)

    await exist(img)
    this.log(`\nPushing ${img}\n`);
    await push(img)

  }

  async catch(error) {
    this.log(error.message.split("\n")[1])
    throw error.message
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
