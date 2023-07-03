import requests from "./request";
const user = {
    //注册
    reqUserRegister(data) {
        return requests.post("/user/register", data)
    },
    //登录
    reqUserLogin(data) {
        return requests.post("/user/login", data)
    },
    //获取用户基本信息
    reqUserInfo() {
        return requests.get("/my/userinfo")
    },
    updataUserInfo(data) {
        return requests.post("/user/updatauserinfo", data)
    },

}
export default user;