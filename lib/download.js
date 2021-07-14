const {promisify} = require('util')

const ora = require('ora');


/**
 * @param {string} repo  - 从哪里下载
 * @param {string} desc - 下载到哪里
 * 
 * */ 
const clone = async (repo,desc) =>{
    let  download = promisify(require('download-git-repo'))
    // let process = ora(`下载.....${repo}`)   
    let process = ora(`项目创建中.....`)   
    process.start()
    await download(repo,desc)
    process.succeed()
}

module.exports  = {
    clone
}