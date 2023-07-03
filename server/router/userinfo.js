/**
 * @description：用于管理员后台处理用户信息,不需要token
 */

// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()
// 导入用户信息的处理函数模块
const userinfo_handler = require('../router_handler/userinfo')
// const upload = multer({ dest: path.join(__dirname, '../uploads') })
//注册
router.post('/register', userinfo_handler.register)
//登录
router.post('/login', userinfo_handler.login)
//所有用户信息
router.get('/alluserinfo', userinfo_handler.getAllUserInfo)
//修改用户信息
router.post('/updatauserinfo', userinfo_handler.updataUserInfo)
//删除用户
router.get('/deleteuser/:id', userinfo_handler.deleteUserById)
module.exports = router
