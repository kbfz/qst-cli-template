#!/usr/bin/env  node
const fs = require('fs')
const path = require('path')

const program = require('commander');
const chalk = require('chalk');

const version = require('../package.json').version // 当前的版本

program
    .version(chalk.green(version)) // 当前的版本
    .usage('<command> [options]')

program
    .command('init <project-name>') // 命令 
    .description("init <project-name> (初始化项目)") // 当前命令的说明 命令的描述
    .action(require('../lib/init'))  // 执行命令要做的事 

program.parse(process.argv) // 主进程的参数 获取命令的参数