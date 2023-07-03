/**
 * @description：新闻相关信息接口编写文件
 */

// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()
// 导入用户信息的处理函数模块
const news_handler = require('../router_handler/news')
//获取所有新闻信息
router.get('/allnewsinfo', news_handler.getAllNewsInfo)
//查询推荐新闻
router.get('/recomnews', news_handler.getRcommendNews)
//根据新闻类型查询
router.get('/newsbytype/:type', news_handler.getNewsByType)
module.exports = router