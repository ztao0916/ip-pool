/*
 * @Author: ztao
 * @Date: 2022-01-10 11:24:33
 * @LastEditTime: 2022-01-10 11:24:41
 * @Description: 
 */
/**
 * 日志的处理
 */
 const path = require('path');
 const log4js = require('log4js');
 log4js.configure(path.resolve(__dirname, './log4js.json'));
 let log = log4js.getLogger("lazadaLogin");
 module.exports = log;