const program = require('commander');

const helpOptions = () => {
  program.option('-w --why', 'a codersang option');

  program.option('-s --src <src>', 'a source folder');
  program.option('-d --dest <dest>', 'a destination folder, 例如: -d src/pages, 错误/src/pages');
  program.option('-f --framework <framework>', 'your framework name');

  program.on('--help', function() {
    console.log("");
    console.log("usage");
    console.log("   codersang -v");
    console.log("   codersang -version");
  })
}

module.exports = helpOptions;
