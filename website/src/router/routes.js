import Login from "@/pages/Login/index.vue"
export default [
    {
        path: "/login",
        component: Login,
        name: "login",
    },
    {
        path: "/home",
        component: () => import('@/pages/Home/index.vue'),
        name: 'home',
    },
    {
        path: "/pro",
        component: () => import('@/pages/Pro/index.vue'),
        name: "pro",
    },
    {
        path: "/usercenter",
        component: () => import('@/pages/Usercenter/index.vue'),
        name: "usercenter"
    },
    {
        path: "/news",
        component: () => import('@/pages/Newsvue/index.vue'),
        name: "news"
    },
    {
        path: "/job",
        component: () => import('@/pages/Job/index.vue'),
        name: "job"
    },
    {
        path: '*',
        redirect: "/home"
    }
]