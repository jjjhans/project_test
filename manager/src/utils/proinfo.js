import axiosIntance from "./axiosInstance";
const proinfo = {
    getAllProInfo() {
        return axiosIntance.get("/pro/allproinfo")
    },
    updataProInfo(data) {
        return axiosIntance.post("/pro/updataproinfo", data)
    },
    addProInfo(data) {
        return axiosIntance.post("/pro/addproinfo", data)
    },
    //通过id删除产品
    deleteProById(id) {
        return axiosIntance.get("/pro/deletepro/" + id)
    },
    uploadImg(data) {
        return axiosIntance.post('/img/uploadimg' + data)
    }
}
export default proinfo;