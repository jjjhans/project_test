/**
 * @description：用于管理员后台处理产品信息
 */

const express = require('express')
// 创建路由对象
const router = express.Router()
// 导入解析 formdata 格式表单数据的包
// 导入用户路由处理函数模块
const productHandler = require('../router_handler/product.js')
// let upload = multer({ dest: '../uploads/proimage' })
//查询所有产品信息
router.get('/allproinfo', productHandler.getAllProductInfo)
//更新某个产品信息
router.post('/updataproinfo', productHandler.updataProInfo)
//添加/发布新的产品
router.post('/addproinfo', productHandler.addProInfo)
//删除产品
router.get('/deletepro/:id', productHandler.deleteProById)
//重新发布之前发布过的产品
// router.get('/releasepro/:id', productHandler.releaseProById)
// router.get('/getidbyname/:name', productHandler.getIdByName)
module.exports = router
