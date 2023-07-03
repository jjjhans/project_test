const db = require('../db/index.js')
exports.getAllProductInfo = (req, res) => {
    const sql = `select * from product`
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        if (results.length == 0) return res.cc('无产品')
        res.send({
            status: 200,
            message: '获取数据成功！',
            data: results

        })
    })
}
exports.updataProInfo = (req, res) => {
    // console.log(req.body)
    const { pro_date } = req.body
    req.body.pro_date = new Date(pro_date)
    const sql = `update product set ? where id=?`
    db.query(sql, [req.body, req.body.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err, 1)
        // 执行 SQL 语句成功，但影响行数不为 1
        if (results.affectedRows !== 1) return res.cc('修改产品信息失败！', 1)
        return res.cc('修改产品信息成功!')
    })
}
exports.addProInfo = (req, res) => {
    // 接收表单数据
    // console.log(req.file)
    const proinfo = req.body
    const { pro_date } = proinfo
    proinfo.pro_date = new Date(pro_date)
    // 判断数据是否合法
    if (!proinfo.pro_name || !proinfo.pro_date || !proinfo.pro_intro) {
        return res.cc('产品名称/日期/介绍不能为空！', 1)
    }
    const sql = `select * from product where pro_name=?`
    db.query(sql, proinfo.pro_name, function (err, results) {
        // 执行 SQL 语句失败
        if (err) { return res.cc(err, 1) }
        //插入新产品
        const sql = `insert into product set ?`
        // { pro_name: proinfo.pro_name, pro_date: proinfo.pro_date, pro_intro: proinfo.pro_intro },
        db.query(sql, { pro_name: proinfo.pro_name, pro_date: proinfo.pro_date, pro_intro: proinfo.pro_intro, pro_pic: proinfo.pro_pic }, function
            (err, results) {
            // 执行 SQL 语句失败
            if (err) return res.cc(err, 1)
            // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
                return res.cc('发布产品失败，请稍后再试！', 1)
            }
            res.cc('发布成功！')
        })
    })
}
exports.deleteProById = (req, res) => {
    const sql = `delete from product where id=?`
    db.query(sql, req.params.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err, 1)
        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('删除产品失败！', 1)
        // 删除产品成功！
        res.cc('删除产品成功！')
    })
}
//重新上线之前上线过的产品
// exports.releaseProById = (req, res) => {
//     const sql = `update product set is_delete=0 where id=?`
//     db.query(sql, req.params.id, (err, results) => {
//         // 执行 SQL 语句失败
//         if (err) return res.cc(err, 1)
//         // SQL 语句执行成功，但是影响行数不等于 1
//         if (results.affectedRows !== 1) return res.cc('重新发布产品失败！', 1)
//         // 删除产品成功！
//         res.cc('发布产品成功！')
//     })
// }
// exports.getIdByName = (req, res) => {
//     const sql = `select id from product where pro_name=?`
//     db.query(sql, req.params.name, (err, results) => {
//         if (err) return res.cc('执行失败', 1)
//         // if (results.length == 0) return res.cc('无产品')
//         res.send({
//             status: 200,
//             message: '获取数据成功！',
//             data: results[0].id

//         })
//     })
// }