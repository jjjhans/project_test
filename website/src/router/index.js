import Vue from "vue";
import VueRouter from "vue-router";
//使用插件
Vue.use(VueRouter);
import routes from "./routes";
import store from '@/store';
//核心：解决代码冗余
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
let router = new VueRouter({
    mode: 'hash',
    //配置路由
    routes,
    //滚轮行为
    scrollBehavior() {
        return { y: 0 };
    }
});
//全局守卫,前置守卫(在路由跳转之间进行判断)
router.beforeEach(async (to, from, next) => {
    let name = store.state.user.userInfo.username;
    //用户登陆了
    if (store.state.user.token) {
        //判断当前路由的
        if (to.path == '/login') {
            next('/home');
        } else {
            //登陆了,但去的不是/login
            //如果用户名已经有
            if (name) {
                next();
            } else {
                try {
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    //token失效了,获取不到用户信息,从新登录
                    //清除token
                    store.dispatch('userLogout');
                    next('/login')
                }
            }
        }
    } else {
        //未登录:不能去交易相关,不能去支付相关[pay|paysuccess],不能去个人中心
        //未登录去上面这些路由----登录
        let toPath = to.path;
        // console.log('toPath', toPath)
        if (toPath.indexOf('/center') != -1) {
            next('/login?redirect=' + toPath)
        } else {
            next();
        }
    }
})
export default router;