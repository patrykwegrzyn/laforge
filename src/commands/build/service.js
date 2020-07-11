
const { Command, flags } = require('@oclif/command')

const service = require("../../service")

const { template } = require("../../utils")
class Service extends Command {
  async run() {
    const { flags } = this.parse(Service);
    console.log("Service -> run -> flags", flags)
    const t = template("svc")

    const rt = t(service.project)
    if (flags["dry-run"]) {
      this.log("rt", rt)
    }
  }
}

Service.description = `Describe the command here
...
      Extra documentation goes here
      `

Service.flags = {
  "dry-run": flags.boolean({ char: "d", description: "Docker context default ." })
}

module.exports = Service
