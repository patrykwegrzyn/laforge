const { Command, flags } = require('@oclif/command')

class Container extends Command {
  async run() {
    const { flags } = this.parse(Container)
    const name = flags.name || 'world'
    this.log(`hello ${name} from ./src/commands/hello.js`)
  }
}

Container.description = `Describe the command here
...
Extra documentation goes here
`

Container.flags = {
  container: flags.string({ char: 'c', description: 'Container container' }),

}

module.exports = Container
