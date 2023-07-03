import Vue from 'vue'
import App from './App.vue'
import router from '@/router';
import store from './store';
// 引入ElementUI组件库
import ElementUI from 'element-ui';
// 引入ElementUI全部样式
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
//引入表单校验插件
import '@/plugins/validate';
import '@/assets/style/common.css'
Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
new Vue({
  render: h => h(App),
  //全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  router,
  store,
}).$mount('#app')
