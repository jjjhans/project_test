/**
 * @description：用于前台用户个人修改本人信息(需要token)，2，3，4可写可不写
 */

const express = require('express')
// 创建路由对象
const router = express.Router()
// 导入用户路由处理函数模块
const userHandler = require('../router_handler/user.js')
// 获取用户的基本信息
router.get('/userinfo', userHandler.getUserInfo)
//1.上传头像
//2.修改密码
//3.修改昵称
//4.修改邮箱
module.exports = router
//全是客户端用户操作，都需要token