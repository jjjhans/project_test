const db = require('../db/index.js')
const fs = require('fs')
// 导入处理路径的核心模块
const path = require('path')
//上传产品图片
exports.UploadProImg = (req, res) => {
    // console.log('file', req.body, req.file)
    fs.readFile(req.file.path, (err, data) => {
        //如果读取失败
        if (err) { return res.cc('上传失败') }
        //用到web server for chrome,前缀：http://localhost:5000
        const imgvisiturl = 'http://localhost:5000/proimage/' + req.file.filename
        if (req.body.proId) {
            //将图片路径保存到pro_pic字段
            const sql = `update product set pro_pic=? where id=?`
            db.query(sql, [imgvisiturl, req.body.proId], (err, results) => {
                if (err) return res.cc(err, 1)
                res.send({ status: 0, message: '上传ok', data: imgvisiturl })
            })
        } else if (req.body.proId === "") {
            res.send({ status: 0, message: '上传ok', data: imgvisiturl })
        } else {
            res.cc('无法上传！', 1)
        }

    });
}
//上传用户头像
exports.UploadUserImg = (req, res) => {
    // console.log('file', req.body, req.file)
    fs.readFile(req.file.path, (err, data) => {
        //如果读取失败
        if (err) { return res.cc('上传失败') }
        //用到web server for chrome,前缀：http://localhost:5000
        const imgvisiturl = 'http://localhost:5000/userimage/' + req.file.filename
        if (req.body.userId) {
            //将图片路径保存到user_pic字段
            const sql = `update user set user_pic=? where id=?`
            db.query(sql, [imgvisiturl, req.body.userId], (err, results) => {
                if (err) return res.cc(err, 1)
                res.send({ status: 0, message: '上传ok', data: imgvisiturl })
                // console.log('1')
            })
        } else if (req.body.userId === "") {
            res.send({ status: 0, message: '上传ok', data: imgvisiturl })
        } else {
            res.cc('无法上传！', 1)
        }

    });
}