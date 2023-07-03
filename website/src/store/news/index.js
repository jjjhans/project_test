import API from '@/api/index'
import Qs from 'qs'
const state = {
    recomnews: [],
    newslist: []
}
const mutations = {
    GETRECOMNEWS(state, value) {
        state.recomnews = value
    },
    GETNEWSLIST(state, value) {
        state.newslist = value
    }
}
const actions = {
    //获取推荐新闻
    async getRcommendNews({ commit }) {
        let result = await API.news.getRcommendNews()
        if (result) {
            commit("GETRECOMNEWS", result.data);
            return "ok";
        } else {
            return Promise.reject(new Error("faile"));
        }
    },
    //根据类型获取新闻
    async getNewsByType({ commit }, type) {
        let result = await API.news.getNewsByType(type)
        if (result) {
            commit("GETNEWSLIST", result.data);
            return 'ok'
        } else {
            return Promise.reject(new Error("faile"));
        }
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}