const inquirer = require('inquirer');
const chalk = require('chalk');
const gradient = require('gradient-string');
const { downloadTemplate } = require('./download');
const { checkDirectory, successMessage } = require('./utils');

async function createProject() {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: chalk.cyan('📝 请输入项目名称:'),
        validate: function(input) {
          if (!input.trim()) {
            return chalk.red('❌ 项目名称不能为空!');
          }
          if (!/^[a-zA-Z0-9-_]+$/.test(input)) {
            return chalk.red('❌ 项目名称只能包含字母、数字、中划线和下划线!');
          }
          return true;
        }
      },
      {
        type: 'list',
        name: 'templateType',
        message: chalk.cyan('🎨 请选择模板类型:'),
        pageSize: 8, // 增加页面大小以显示更多选项
        choices: [
          {
            name: `${chalk.green('📋 编辑器块模板')} - 用于创建后台编辑器组件，不参与前台渲染`,
            value: 'editor-block'
          },
          {
            name: `${chalk.blue('🔌 通用插件模板')} - 用于创建通用的插件，同时参与前后台渲染`,
            value: 'universal-plugin'
          },
          new inquirer.Separator(chalk.gray('━'.repeat(50))),
          {
            name: `${chalk.yellow('🎨 主题开发-客户端渲染')} - 一个简单的客户端渲染主题示例`,
            value: 'theme-client'
          },
          {
            name: `${chalk.magenta('🚀 主题开发-服务端渲染')} - 一个简单的服务端渲染主题示例`,
            value: 'theme-server'
          },
          {
            name: `${chalk.cyan('🌐 主题开发-前后端混合渲染')} - 混合渲染架构的主题解决方案`,
            value: 'theme-universal'
          },
          new inquirer.Separator(chalk.gray('━'.repeat(50)))
        ]
      },
      {
        type: 'confirm',
        name: 'confirm',
        message: (answers) => {
          const templateNames = {
            'editor-block': '编辑器块模板',
            'universal-plugin': '通用插件模板',
            'theme-client': '主题开发-客户端渲染',
            'theme-server': '主题开发-服务端渲染',
            'theme-universal': '主题开发-前后端混合渲染'
          };
          return chalk.yellow(`✅ 确认创建项目 ${chalk.bold(answers.projectName)} 使用 ${chalk.bold(templateNames[answers.templateType])} 模板?`);
        }
      }
    ]);

    if (!answers.confirm) {
      console.log(chalk.yellow('👋 已取消创建项目'));
      return;
    }

    // 检查目录是否存在
    await checkDirectory(answers.projectName);

    // 下载模板
    await downloadTemplate(answers.templateType, answers.projectName);

    // 显示成功信息
    successMessage(answers.projectName, answers.templateType);

  } catch (error) {
    console.log(chalk.red('❌ 创建项目失败:'), error.message);
    process.exit(1);
  }
}

module.exports = {
  createProject
};
