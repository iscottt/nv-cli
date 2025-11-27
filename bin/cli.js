#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const gradient = require('gradient-string');
const figlet = require('figlet');
const boxen = require('boxen').default; // 修改这里
const { createProject } = require('../lib/index');

// 显示炫酷的欢迎界面
function showWelcome() {
  console.log('\n');
  console.log(
    gradient.rainbow(
      figlet.textSync('NV CLI', {
        font: 'Standard',
        horizontalLayout: 'full'
      })
    )
  );
  
  console.log(boxen(
    chalk.blue.bold('🚀 欢迎使用主题开发脚手架工具!') + 
    '\n\n' +
    chalk.white('支持多种模板类型：插件开发、主题开发'),
    {
      padding: 1,
      margin: { top: 1, bottom: 1, left: 0, right: 0 },
      borderStyle: 'double',
      borderColor: '#00fffb',
      backgroundColor: '#0a0a0a',
      dimBorder: true,
    }
  ))
}

program
  .version('1.0.0')
  .description('一个功能丰富的脚手架工具，支持多种开发模板')
  .action(() => {
    showWelcome();
    createProject();
  });

program.parse(process.argv);
