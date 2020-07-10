const util = require("util")

const { Command, flags } = require('@oclif/command')
const { getLastCommit } = require("git-last-commit")

const { execShellCommand } = require("../../utils")

const lastCommit = util.promisify(getLastCommit)

class Build extends Command {
  async run() {
    const { flags } = this.parse(Build)
    console.log("Build -> run -> flags", flags)
    const context = flags.context || "."
    let tag = flags.tag;
    if (!tag) {
      const commit = await lastCommit()
      let { hash } = commit;
      if (flags.short) {
        hash = commit.shortHash
      }
      tag = hash
    }
    console.log("Build -> run -> tag", tag)
    await execShellCommand(`docker build -t ${tag} ${context}`)
    this.log(`tag ${tag} ${context} ${__dirname}`)
  }
}

Build.description = `Describe the command here
...
Extra documentation goes here
`

Build.flags = {
  tag: flags.string({ char: 't', description: 'Container tag' }),
  short: flags.boolean({ char: 's', description: "Provide short version of git commit hash" }),
  context: flags.string({ char: "c", description: "Docker context default ." })
}

module.exports = Build
