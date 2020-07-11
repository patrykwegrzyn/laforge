
const { Command, flags } = require('@oclif/command')

const { cli } = require("cli-ux")


const service = {
  "apiVersion": "v1",
  "kind": "Service",
  "metadata": {
    "name": "iot-login"
  },
  "spec": {
    "ports": [

    ],
    "type": "NodePort"
  }
}

const payload = {
  name: "",
  ingress: {

  }
}


async function servicePort() {
  const protocol = await cli.prompt('Enter service protocol (default)', { default: 'TCP' })
  const port = await cli.prompt('Enter service port (default)', { default: 80 })
  const targetPort = await cli.prompt('Enter service container port (default)', { default: 80 })
  service.spec.ports.push({
    protocol, port, targetPort
  })
  const needExtraPort = await cli.confirm("Need to set up extra port? (not required) )", { required: false })
  if (needExtraPort) {
    servicePort()
  }
}


class Build extends Command {
  async run() {
    const res = {}
    res.name = await cli.prompt('What is your project name?')

    const serviceiRequired = await cli.confirm("Does you project require service? (not required) )", { required: false })
    if (serviceiRequired) {
      service.metadata.name = res.name
      service.spec.type = await cli.prompt("What type of service (default) ", { default: "NodePort" })
      service.path = await cli.prompt("Enter service path (default)", { default: "/" })
      let ports = await servicePort()
      service.spec.ports.push(ports)
      res.service = service
    }



    this.log(`You entered: ${JSON.stringify(res, null, 2)}`)
  }
}

Build.description = `Describe the command here
...
      Extra documentation goes here
      `


module.exports = Build
