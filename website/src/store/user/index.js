import API from '@/api/index'
import { setToken, getToken, removeToken } from '@/plugins/token.js'
const state = {
    token: getToken('TOKEN') || "",
    userInfo: {}
}
const mutations = {
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    USERLOGOUT(state) {
        //把仓库中相关数据清空
        state.token = '',
            state.userInfo = {},
            removeToken();
    }
}
const actions = {
    //注册
    async userRegister({ commit }, data) {
        let result = await API.user.reqUserRegister(data)
        if (result) {
            return result
        } else {
            return Promise.reject(new Error('发生意外错误！'))
        }
    },
    //登录
    async userLogin({ commit }, data) {
        let result = await API.user.reqUserLogin(data)
        // console.log(result)
        if (result) {
            commit('USERLOGIN', result.token);
            //持久化存取token
            setToken(result.token);
            return result
        } else {
            return Promise.reject(new Error('发生意外错误！'))
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        try {
            let result = await API.user.reqUserInfo();
            console.log(result);
            if (result) {
                commit("GETUSERINFO", result.data);
                return "ok";
            } else {
                return Promise.reject(new Error("faile"));
            }
        } catch {
            this.userLogout()
        }
    },
    //退出
    userLogout({ commit }) {
        commit('USERLOGOUT')
        return 'ok'
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}