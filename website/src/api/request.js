import axios from "axios";
import store from '@/store';
const requests = axios.create({
    baseURL: 'http://127.0.0.1:3007',
    timeout: 10000,
})
// 请求拦截器
requests.interceptors.request.use(
    (config) => {
        //需要携带token带给服务器
        if (store.state.user.token) {
            // config.headers.token = store.state.user.token;
            // Authorization
            config.headers.Authorization = store.state.user.token
        }
        // 在发送请求之前做些什么
        return config;
    },
    (error) => {
        // 请求错误做些什么
        return Promise.reject(error);
    }
);
//配置一个响应拦截器
requests.interceptors.response.use(res => {
    return Promise.resolve(res.data);
}, error => {
    return Promise.reject(error);
});

export default requests;