const fs = require('fs-extra');
const path = require('path');
const boxen = require('boxen').default; // 修改这里
const inquirer = require('inquirer');
const chalk = require('chalk');
const gradient = require('gradient-string');

async function checkDirectory(projectName) {
  const targetPath = path.join(process.cwd(), projectName);
  
  if (await fs.pathExists(targetPath)) {
    const { overwrite } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: chalk.yellow(`⚠️  目录 ${projectName} 已存在，是否覆盖?`),
        default: false
      }
    ]);

    if (!overwrite) {
      console.log(chalk.yellow('👋 操作已取消'));
      process.exit(0);
    }

    // 删除已存在的目录
    await fs.remove(targetPath);
  }
}

// 获取模板的详细描述
function getTemplateDescription(templateType) {
  const descriptions = {
    'editor-block': '编辑器插件模板 - 用于创建后台编辑器组件，不参与前台渲染',
    'universal-plugin': '通用插件模板 - 用于创建通用的插件，同时参与前后台渲染',
    'theme-client': '主题开发-客户端渲染的主题示例',
    'theme-server': '主题开发-服务端渲染的主题示例',
    'theme-universal': '主题开发-前后端混合渲染的主题示例'
  };
  return descriptions[templateType] || templateType;
}

function successMessage(projectName, templateType) {
  const templateDesc = getTemplateDescription(templateType);
  
  const message = `
${gradient.rainbow('🎉 项目创建成功!')}

📁 项目名称: ${chalk.bold.green(projectName)}
🎨 模板类型: ${chalk.bold.blue(templateDesc)}

📚 文档链接: ${chalk.blue('https://docs.panda-studio.cn:8282/?shelf=nvPress')}

💡 提示: 查看 官方文档 获取更多使用说明
`;

  console.log(
    boxen(message, {
      padding: 1,
      margin: { top: 1, bottom: 1, left: 0, right: 0 },
      borderStyle: 'double',
      borderColor: '#00fffb',
      backgroundColor: '#0a0a0a',
      dimBorder: true,
    })
  );
}


module.exports = {
  checkDirectory,
  successMessage
};
