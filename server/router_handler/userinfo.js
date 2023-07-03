// 导入数据库操作模块
const db = require('../db/index')
const jwt = require('jsonwebtoken')
const config = require('../config')
//用户注册
exports.register = (req, res) => {
    const userinfo = req.body
    const sql = `select * from user where username=?`
    db.query(sql, userinfo.username, function (err, results) {
        if (err) return res.cc(err)
        if (results.length > 0) return res.cc('改手机号已被注册!', 1)
        const sqltwo = `insert into user set ?`
        db.query(sqltwo, { username: userinfo.username, password: userinfo.password }, function (err, results) {
            if (err) return res.cc(err, 1)
            if (results.affectedRows !== 1) { return res.cc('注册失败', 1) }
        })
        res.cc('注册成功!', 0)
    })
}
//用户登录
exports.login = (req, res) => {
    const userinfo = req.body
    const sql = `select * from user where username=?`
    db.query(sql, userinfo.username, function (err, results) {
        // 执行 SQL 语句失败
        if (err) return res.cc(err, 1)
        const unamereg = /^1[2-9]\d{9}$/.test(userinfo.username)
        const passwreg = /^\S{6,18}$/.test(userinfo.password)
        if (!unamereg) {
            return res.cc('用户名格式错误，为11位手机号！', 1)
        } else if (!passwreg) {
            return res.cc('密码格式错误，必须为6-18位字符！', 1)
        }
        // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        // if (results.length !== 1) return res.cc('登录失败！', 1)
        // 拿着用户输入的密码,和数据库中存储的密码进行对比
        const compareResult = (userinfo.password === results[0].password)
        // 如果对比的结果等于 false, 则证明用户输入的密码错误
        if (!compareResult) return res.cc('用户名或密码错误,请重新输入！', 1)
        // 剔除，user 中只保留了用户的 id, username, password 这三个属性的值
        const user = { ...results[0], nickname: '', email: "", user_pic: '' }
        //生成token字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: config.expiresIn
        })
        res.send({
            status: 0,
            message: '登陆成功！',
            token: 'Bearer ' + tokenStr
        })
    })
}
//获取所有用户信息
exports.getAllUserInfo = (req, res) => {
    const sql = `select * from user`
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        if (results.length == 0) return res.cc('无用户')
        res.send({
            status: 0,
            message: '获取数据成功！',
            data: results

        })
    })
}
//修改用户信息
exports.updataUserInfo = (req, res) => {
    const sql = `update user set ? where id=?`
    db.query(sql, [req.body, req.body.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err, 1)
        // 执行 SQL 语句成功，但影响行数不为 1
        if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败！', 1)
        // 修改用户信息成功
        return res.cc('修改用户基本信息成功！', 0)
    })
}
exports.deleteUserById = (req, res) => {
    const sql = `delete from user where id=?`
    db.query(sql, req.params.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err, 1)
        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('删除用户失败！', 1)
        // 删除产品成功！
        res.cc('删除用户成功！', 0)
    })
}
