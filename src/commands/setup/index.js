const path = require("path")
const fs = require("fs")
const { Command, flags } = require('@oclif/command')
const YAML = require("yamljs")
const { cli } = require("cli-ux")
const { execShellCommand, mkdir } = require("../../utils")
const { version } = require("../../lib/k8s")

const separator = `------------------------------`

class Build extends Command {
  async run() {
    const project = {}
    this.log(`K8s checks\n${separator}`)
    await version()
    this.log(`${separator}\n`)


    project.name = await cli.prompt('Project name')
    project.registryUrl = await cli.prompt('Docker registry url')
    project.type = await cli.prompt('Service type (default)', { default: "NodePort" })
    project.protocol = await cli.prompt('Service protocol (default)', { default: "TCP" })
    project.port = await cli.prompt('Service port (default)', { default: 80 })
    project.targetPort = await cli.prompt('Service container port (default)', { default: 80 })
    project.cpu = await cli.prompt('Cpu request (default)', { default: "0.1" })
    project.memory = await cli.prompt('Memory request (default)', { default: "100Mi" })
    project.max_cpu = await cli.prompt('Cpu limit (default)', { default: "0.1" })
    project.max_memory = await cli.prompt('Memory limit (default)', { default: "250Mi" })


    mkdir("./.laforge")
    mkdir("./.laforge/templates")
    mkdir("./.laforge/build")
    await execShellCommand(`cp -r ${path.join(process.env.PWD, "./src/templates/*.*")} ./.laforge/templates`)
    const yamlText = YAML.stringify({ project })
    console.log("Build -> run -> tamlTex\n", yamlText)
    fs.writeFileSync('.laforge.yaml', yamlText)

    this.log(`You entered: ${JSON.stringify(project, null, 2)}`)
  }
}

Build.description = `Describe the command here
...
      Extra documentation goes here
      `


module.exports = Build
