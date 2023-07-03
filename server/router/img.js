const express = require('express')
// 创建路由对象
const router = express.Router()
// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
const imgHandler = require('../router_handler/img.js')
//产品图片上传接口
const storagePro = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/proimage')
        //注意这里的文件路径,不是相对路径，直接填写从项目根路径开始写就行了
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        // console.log('file.originalname', file.originalname)
        let type = file.originalname.replace(/.+\./, ".")
        cb(null, file.fieldname + '-' + Date.now() + type);
    }
});
const uploadPro = multer({ storage: storagePro });
router.post('/uploadproimg', uploadPro.single('pro_pic'), imgHandler.UploadProImg);
//用户头像上传接口
const storageUser = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/userimage')
        //注意这里的文件路径,不是相对路径，直接填写从项目根路径开始写就行了
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        // console.log('file.originalname', file.originalname)
        let type = file.originalname.replace(/.+\./, ".")
        cb(null, file.fieldname + '-' + Date.now() + type);
    }
});
const uploadUser = multer({ storage: storageUser });
router.post('/uploaduserimg', uploadUser.single('user_pic'), imgHandler.UploadUserImg);
module.exports = router