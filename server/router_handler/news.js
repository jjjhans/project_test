const db = require('../db/index')
exports.getAllNewsInfo = (req, res) => {
    const sql = `select * from bs_news`
    db.query(sql, (err, results) => {
        if (err) return res.cc(err, 1)
        if (results.length == 0) return res.cc('no data', 1)
        res.send({
            status: 0,
            message: '获取数据成功！',
            data: results
        })
    })
}
//查询推荐新闻
exports.getRcommendNews = (req, res) => {
    const sql = `SELECT news_path,news_pic,news_title,news_desc FROM bs_news n,bs_recommend_news r WHERE n.news_id = r.news_id`
    db.query(sql, (err, results) => {
        if (err) return res.cc(err, 1)
        if (results.length == 0) return res.cc('no data', 1)
        res.send({
            status: 0,
            message: '获取数据成功！',
            data: results
        })
    })
}
//根据新闻类型查询
exports.getNewsByType = (req, res) => {
    const sql = `select * from bs_news where type=?`
    db.query(sql, req.params.type, (err, results) => {
        if (err) return res.cc(err, 1)
        if (results.length == 0) return res.cc('no data', 1)
        res.send({
            status: 0,
            message: '获取数据成功！',
            data: results
        })
    })
}