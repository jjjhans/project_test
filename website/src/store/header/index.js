const state = {
    headerLogoShow: true,
    headerShowActive: false,
    navDarkActive: false,
    BannerHeight: 0,
}
const mutations = {
    changeHeaderLogoShow(state, value) {
        state.headerLogoShow = value
    },
    changeNavDarkActive(state, value) {
        state.navDarkActive = value
    },
    changeShadowActive(state, value) {
        state.headerShowActive = value
    },
    setBannerHeight(state, value) {
        state.BannerHeight = value
    }
}
const actions = {}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}