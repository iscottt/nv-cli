const fs = require('fs-extra');
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');

async function downloadTemplate(templateType, projectName) {
  const spinner = ora({
    text: chalk.blue(`📥 正在下载 ${templateType} 模板...`),
    color: 'cyan'
  }).start();

  try {
    // 模拟模板目录路径
    const templatePath = path.join(__dirname, '../templates', templateType);
    const targetPath = path.join(process.cwd(), projectName);

    // 检查模板是否存在
    if (!await fs.pathExists(templatePath)) {
      throw new Error(`模板 ${templateType} 不存在`);
    }

    // 复制模板文件
    await fs.copy(templatePath, targetPath);
    
    // 更新 package.json 中的项目名称
    const packageJsonPath = path.join(targetPath, 'package.json');
    if (await fs.pathExists(packageJsonPath)) {
      const packageJson = await fs.readJson(packageJsonPath);
      packageJson.name = projectName;
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    }

    spinner.succeed(chalk.green(`✅ 模板下载完成!`));
    
  } catch (error) {
    spinner.fail(chalk.red(`❌ 模板下载失败: ${error.message}`));
    throw error;
  }
}

module.exports = {
  downloadTemplate
};
