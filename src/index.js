const yargs = require('yargs')
  .alias({
    h: 'help',
    v: 'version',
    d: 'debug',
  })
  .help('h')

const cliConfig = {
  debug: !!yargs.argv.debug, // 调试模式
}

const command = yargs.argv._[0]

if (command === undefined || command === 'gen') {
  require('./generator')(cliConfig)
}
