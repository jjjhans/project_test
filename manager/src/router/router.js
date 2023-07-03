import Vue from 'vue'
import VueRouter from "vue-router";
//使用插件
Vue.use(VueRouter);
let router = new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '*',
            redirect: "/homepage"
        },
        {
            path: '/usermanager',
            // component: () => import('@/pages/UserManager.vue'),
            component: resolve => require(['@/pages/UserManager.vue'], resolve),
            name: 'usermanager',
            meta: { title: "用户管理模块" }
        },
        {
            path: '/promanager',
            component: () => import('@/pages/ProManager.vue'),
            name: 'promanager',
            meta: { title: "产品管理模块" }
        },
        {
            path: '/homepage',
            component: () => import('@/pages/Homepage.vue'),
            name: 'homepage',
            meta: { title: "企业网站后台管理系统" }
        }

    ]
})
router.beforeEach((to, from, next) => {
    if (to.path !== '/homepage') {
        if (sessionStorage.getItem('password') && sessionStorage.getItem('password') == sessionStorage.getItem('systempassword')) {
            //session已经保存输入的密码
            next()
        } else {
            alert('密码错误！')
        }
    } else {
        next()
    }
})
export default router;