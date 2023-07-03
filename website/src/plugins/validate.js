//vee-validate插件:表单验证区域
import Vue from 'vue';
import VeeValidate from 'vee-validate';
const config = {
    fieldsBagName: 'vee-fields'
}
Vue.use(VeeValidate, config)
//中文提示信息
import zh_CN from 'vee-validate/dist/locale/zh_CN'   // 引入中文 message
Vue.use(VeeValidate);
//表单验证
VeeValidate.Validator.localize('zh_CN', {
    messages: {
        ...zh_CN.messages,
        is: (field) => `${field}必须与密码相同` // 修改内置规则的 message，让确认密码和密码相同
    },
    attributes: { // 给校验的 field 属性名映射中文名称
        username: '手机号',
        password: '密码',
        password1: '确认密码',
    }
})

//自定义校验规则
//用户名(手机号)
VeeValidate.Validator.extend('phone', {
    validate: value => {
        return /^1[2-9]\d{9}$/.test(value)
    },
    getMessage: field => field + '格式不正确,必须是11位数字'
})
VeeValidate.Validator.extend('password', {
    validate: value => {
        return /^\S{6,18}$/.test(value)
    },
    getMessage: field => field + '必须为6-18位'
})