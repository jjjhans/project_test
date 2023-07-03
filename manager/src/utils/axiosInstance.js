import axios from "axios";
const axiosIntance = axios.create({
    baseURL: 'http://127.0.0.1:3007',
    timeout: 10000,
})
// 请求拦截器
axiosIntance.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么
        return config;
    },
    (error) => {
        // 请求错误做些什么
        return Promise.reject(error);
    }
);
//配置一个响应拦截器
axiosIntance.interceptors.response.use(res => {
    return Promise.resolve(res.data);
}, error => {
    return Promise.reject(error);
});

export default axiosIntance;