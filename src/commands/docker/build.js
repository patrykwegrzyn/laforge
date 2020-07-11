
const { Command, flags } = require('@oclif/command')

const service = require("../../service")
const { build, imageName } = require("../../lib/docker")
const { registry } = service;
process.stdin.on('data', function (data) {
  console.log(data.length);
});
class Build extends Command {
  async run() {
    const { flags } = this.parse(Build)
    let { name, context = "." } = flags
    name = name || service.name
    const img = await imageName(registry, name, flags)
    await build(img, context)
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
