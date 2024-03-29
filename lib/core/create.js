const program = require('commander');

const {
  createProject,
  addComponent,
  addPage,
  addVue3Page,
  addStore
} = require('./actions');

const createCommands = () => {
  // 创建项目指令
  program
    .command('create <project> [otherArgs...]')
    .description('clone a repository into a newly created directory')
    .action(createProject);

  program
    .command('addcpn <name>')
    .description('add vue component, 例如: codersang addcpn NavBar [-d src/components]')
    .action(name => addComponent(name, program.dest || 'src/components'))

  program
    .command('addpage <name>')
    .description('add vue page, 例如: codersang addpage Home [-d dest]')
    .action(name => {
      addPage(name, program.dest || `src/pages/${name.toLowerCase()}`)
    })

  program
    .command('add3page <name>')
    .description('add vue page, 例如: codersang add3page Home [-d dest]')
    .action(name => {
      addVue3Page(name, program.dest || `src/views/${name.toLowerCase()}`)
    })

  program
    .command('addstore <name>')
    .description('add vue store, 例如: codersang addstore favor [-d dest]')
    .action(name => {
      addStore(name, program.dest || `src/store/modules/${name.toLowerCase()}`)
    })
}

module.exports = createCommands;
