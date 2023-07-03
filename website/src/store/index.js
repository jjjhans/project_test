import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
//引入单独vuex小仓库
import user from "./user";
import header from "./header";
import news from "./news";
import job from "./job";
//对外暴露Store类地一个实例
export default new Vuex.Store({
    //实现Vuex仓库模式开发存储数据
    modules: {
        user,
        header,
        news,
        job,
    }
})