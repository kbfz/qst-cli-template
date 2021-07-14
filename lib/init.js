const {promisify} = require('util')
const inquirer = require('inquirer'); // 询问者  命令行的交互
const figlet = promisify(require('figlet')) // 打印的文字页面 异步方法（promisi）

const clear = require('clear') // 清空记录
const chalk = require('chalk') // 粉笔  文字颜色

const {clone} = require('./download')

const log = content => console.log(chalk.green(content)) // 

const {spawn} = require('child_process') // 子进程

// 下载之后自动安装依赖
/**
 * @param {string} args[0] - 执行的命令
 * @param {Array}  args[1] - 执行命令的参数
 * @param {Object}  args[2] - 项目的名称 （在哪里去运行命令）
*/
const spawnFn = async (...args) => {
    return new Promise( resolve =>{
        const proc = spawn(...args) // 
        proc.stdout.pipe(process.stdout)
        proc.stderr.pipe(process.stderr)
        proc.on('close',(code) =>{
            resolve(code)
        })
    })
}

const promptList = [{
    type: 'list',
    message: "选择要下载项目模板:",
    name: "templateName",
    choices: [ // 要下载项目模板的名称
        {name: "vue模板",value: "vue-element-edmin"},
        {name: "先知",value: "xianzhi"},
        {name: "易捷",value: "yijie"},
        {name: "分销商城",value: "s2b2cMall"}
    ],
    filter: function (val) { // 使用filter将回答变为小写
        return val.toLowerCase();
    }
}];

/**
 * @param {string} name - 创建项目的名字
 * 
*/
module.exports = async name => {

    try {
        clear() // 清空记录
        const text = await figlet('Welcome To Qst-cli') // 打印文字
        log(text)

        // clone 下载代码
        log(`>>>  创建项目：${name}`)
       
         const answers = await inquirer.prompt(promptList) // 选择要下载的模板 询问返回的结果

         const {templateName, gitPath} =  answers

         switch (templateName) {
            case 'vue-element-edmin':
                await clone("github:kbfz/vue-element-admin",name) // vue 模板
                break;
            case 'xianzhi':
                await clone('github:kbfz/kbfz/xianzhi',name) // 先知模板
                break;
            case 'yijie':
                log(templateName)
                break;
            case 's2b2cMall':
                log(templateName)
         }

        // 自动安装依赖
        // log('≈≈ 安装依赖中...')
        // await spawnFn('npm',['install'],{cwd: `./${name}`})

        log(`
☆ 创建完成
To get Start:

=============
cd ${name}
npm install 
npm run dev 
=============
        `)

    } catch (error) {
        console.log(chalk.red(error))
    }

}

