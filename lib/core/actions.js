const path = require('path');
const open = require('open');

const log = require('../utils/log');
const terminal = require('../utils/terminal');
const { ejsCompile, writeFile, mkdirSync } = require('../utils/file');
const repoConfig = require('../config/repo_config');
// 导入模板
const createProject = async (project) => {
  // 1.提示信息
  log.hint('codersang helps you create your project, please wait a moment~');
  // 2.clone项目从仓库
  const child_process = require('child_process')
  child_process.execSync(`git clone -b origin/ant ${ repoConfig.vueGitRepo } ${project}`);

  // 3.执行终端命令npm install
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  await terminal.spawn(npm, ['install'], { cwd: `./${project}` });

  // 5.运行项目
  await terminal.spawn(npm, ['run', 'dev'], {cwd: `./${project}`});

  // 4.打开浏览器
  open('http://localhost:3000/');
}

const handleEjsToFile = async (name, dest, template, filename) => {
  // 1.获取模块引擎的路径
  const templatePath = path.resolve(__dirname, template);
  const cpnPath = dest.replace('router', 'views').replace("src", "@") + `/${name}.vue`
  const routePath = dest.replace('/router', '').replace('src', '')
  const result = await ejsCompile(templatePath, {name, lowerName: name.toLowerCase(), cpnPath, routePath});

  // 2.写入文件中
  // 判断文件不存在,那么就创建文件
  mkdirSync(dest);
  const targetPath = path.resolve(dest, filename);
  await writeFile(targetPath, result);
}
// 导入组件
const addComponent = async (name, dest) => {
  await handleEjsToFile(name, dest, '../template/component.vue.ejs', `${name}.vue`);
}
// 新增页面
const addPage = async (name, dest) => {
  await addComponent(name, dest);
  await handleEjsToFile(name, dest, '../template/vue-router.js.ejs', 'router.js')
}
// 新增vue3组件模板
const addVue3TSComponent = async (name, dest) => {
  await handleEjsToFile(name, dest, '../template/component3_ts.vue.ejs', `${name}.vue`);
}

// 新增vue3页面模板
const addVue3Page = async (name, dest) => {
  await addVue3TSComponent(name, dest);
  let routerDest = dest.replace("views", "router")
  await handleEjsToFile(name, routerDest, '../template/vue-router4.js.ejs', `${name}.ts`)
}

// 新增store
const addStore = async (name, dest) => {
  await handleEjsToFile(name, dest, '../template/vue-store.js.ejs', 'index.js')
  await handleEjsToFile(name, dest, '../template/vue-types.js.ejs', 'types.js')
}

module.exports = {
  createProject,
  addComponent,
  addPage,
  addVue3Page,
  addStore
}
