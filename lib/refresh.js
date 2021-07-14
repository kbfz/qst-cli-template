const fs = require('fs');
const handlebars = require('handlebars')
const chalk = require('chalk')


module.exports.refresh = async ()=> {
    // 获取文件夹列表
    const list = fs.readdirSync('.src/views')
        .filter(item => item !=='Home.vue')
        .map(v =>({
            name: v.replace('.vue','').toLowerCase(),
            file: v
        }))

        // 生成路由定义

        // 生成菜单

        /**
         * 
         * @param {*} meta 数据定义
         * @param {*} filePath 目标文件
         * @param {*} templatePath 模板文件
         */
        function compile (meta, filePath, templatePath){
            if(fs.existsSync(templatePath)){
                const content = fs.readFileSync(templatePath).toString()
                const result = handlebars.compile(content)(meta)
                fs.writeFileSync(filePath,result)
            }

        }

}