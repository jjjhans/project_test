import API from '@/api/index'
const state = {
    jobinfolist: []
}
const mutations = {
    GETJOBLIST(state, value) {
        state.jobinfolist = value
    }
}
const actions = {
    async getJobInfo({ commit }, { jcname, cname }) {
        let result = await API.job.getJobList({ jcname, cname })
        if (result) {
            commit("GETJOBLIST", result.data);
            // console.log(result.data)
            return result.data
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