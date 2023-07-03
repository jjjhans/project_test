import axiosIntance from "./axiosInstance";
const userinfo = {
    getAllUSerInfo() {
        return axiosIntance.get("/user/alluserinfo")
    },
    updataUserInfo(data) {
        return axiosIntance.post("/user/updatauserinfo", data)
    },
    deleteUserById(id) {
        return axiosIntance.get("/user/deleteuser/" + id)
    },
}
export default userinfo;