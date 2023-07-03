/**
 * @description：工作相关信息接口编写文件
 */

// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()
// 导入用户信息的处理函数模块
const job_handler = require('../router_handler/job')
//获取工作相关信息
router.get('/getjobinfo', job_handler.getJobInfoList)
module.exports = router