<template>
  <div>
    <AwHeader></AwHeader>
    <div class="container">
      <div class="loginbox">
        <div class="input-box">
          <ul class="login-item-box" v-show="showLogin">
            <li>
              <span>账号</span>
              <input
                type="text"
                v-model="loginusername"
                placeholder="请输入11位手机号"
              />
            </li>
            <li>
              <span>密码</span>
              <input
                type="password"
                v-model="loginpassword"
                placeholder="输入密码"
              />
            </li>
            <li>
              <button @click="userLogin">登录</button>
            </li>
            <li>华夏学院8-523人才有限公司</li>
          </ul>
          <ul class="register-item-box" v-show="!showLogin">
            <li>
              <span>账号</span>
              <input
                type="text"
                v-model="username"
                placeholder="请输入11位手机号"
                name="username"
                v-validate="{ required: true, phone: true }"
              />
              <!-- :class="{ invalid: errors.has('username') }" -->
              <span class="error-text">{{ errors.first("username") }}</span>
            </li>
            <li>
              <span>密码</span>
              <input
                type="password"
                v-model="password"
                placeholder="输入密码"
                name="password"
                v-validate="{ required: true, password: true }"
              />
              <span class="error-text">{{ errors.first("password") }}</span>
            </li>
            <li>
              <span>确认密码</span>
              <input
                type="password"
                v-model="password1"
                placeholder="再次输入密码"
                name="password1"
                v-validate="{ required: true, is: password }"
              />
              <span class="error-text">{{ errors.first("password1") }}</span>
            </li>
            <li>
              <button @click="userRegister">注册</button>
            </li>
            <li>华夏学院8-523人才有限公司</li>
          </ul>
        </div>
        <div class="welcome-box">
          <div class="flag">
            <div class="circle"></div>
            <p>Ssites</p>
          </div>
          <div class="welcome-text">
            <span>你好,</span>欢迎来到8-523企业门户网
            <div class="register" @click="toregister">
              <span v-show="!showLogin">去登录>></span>
              <span v-show="showLogin">去注册>></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AwHeader from "@/components/Header/index.vue";
import Qs from "qs";
export default {
  name: "",
  data() {
    return {
      loginusername: "",
      loginpassword: "",
      showLogin: true,
      username: "",
      password: "",
      password1: "",
    };
  },
  components: { AwHeader },
  mounted() {
    // this.$store.dispatch("getUserInfo");
  },
  methods: {
    toregister() {
      this.showLogin = !this.showLogin;
    },
    //注册
    async userRegister() {
      const success = await this.$validator.validateAll(); //全部表单验证
      if (success) {
        try {
          const registerinfo = {
            username: this.username,
            password: this.password,
          };
          const data = Qs.stringify(registerinfo);
          //此处result获取执行结果的status，message
          let result = await this.$store.dispatch("userRegister", data);
          this.$message({
            message: result.message,
            type: result.status == 0 ? "success" : "error",
          });
          if (result.status == 0) {
            (this.username = ""), (this.password = ""), (this.password1 = "");
            this.showLogin = true;
          }
        } catch {
          this.$message.error(error.message);
        }
      }
      // this.showLogin = true;
    },
    //登录
    async userLogin() {
      try {
        const { loginusername, loginpassword } = this;
        if (loginusername && loginpassword) {
          let result = await this.$store.dispatch(
            "userLogin",
            Qs.stringify({ username: loginusername, password: loginpassword })
          );
          if (result.status == 0) {
            //登陆的路由组件:看路由当中是否包含query参数,有:调到query参数指定路由,没有:调到home
            let toPath = this.$route.query.redirect || "/home";
            this.$router.push(toPath);
          }
          this.$message({
            message: result.message,
            type: result.status == 0 ? "success" : "error",
          });
        }
      } catch (error) {
        alert(error.message);
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    if (from.name === "pro") {
      this.$store.commit("changeNavDarkActive", false);
      this.$store.commit("changeHeaderLogoShow", false);
    }
    next();
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/sass/index.scss";
.container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(./image/login-bg.jpg);
  background-size: cover;
  .loginbox {
    width: 700px;
    height: 400px;
    // border: 1px solid red;
    display: flex;
    justify-content: space-between;
    align-items: center;
    //登陆的样式
    .input-box {
      width: 430px;
      height: 350px;
      // border: 1px solid blue;
      background-color: rgba(42, 158, 195, 0.6);
      display: flex;
      justify-content: center;
      align-items: end;
      .login-item-box {
        // border: 1px solid red;
        width: 300px;
        height: 210px;
        list-style: none;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        color: $textColor;
        & > li:first-child,
        & > li:nth-child(2) {
          border-bottom: 1px solid white;
          width: 100%;
          position: relative;
          & > span {
            font-size: 12px;
          }
          & > input {
            border: 0;
            // border: 1px solid red;
            outline: 0;
            background-color: rgba(42, 158, 195, 0);
            height: 30px;
            margin-left: 30px;
            color: $textColor;
            &::placeholder {
              color: $textColor;
              opacity: 0.7;
            }
          }
          .error-text {
            display: inline-block;
            position: absolute;
            width: 200px;
            top: 100%;
            left: 0;
            color: rgb(208, 56, 56);
          }
        }
        & > li:nth-child(3) > button {
          width: 210px;
          color: $textColor;
          height: 30px;
          border: 1px solid white;
          border-radius: 15px;
          font-size: 13px;
          background-color: rgba(42, 158, 195);
          box-shadow: 1px 1px 5px #195287;
          transition: background-color, 1s;
          &:hover {
            background-color: rgb(20, 96, 122);
            cursor: pointer;
          }
        }
        & > li:last-child {
          font-size: 12px;
        }
      }
      .register-item-box {
        // border: 1px solid blue;
        width: 300px;
        height: 300px;
        list-style: none;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        color: $textColor;
        & > li:first-child,
        & > li:nth-child(2),
        & > li:nth-child(3) {
          border-bottom: 1px solid white;
          width: 100%;
          position: relative;
          & > span {
            display: inline-block;
            font-size: 12px;
            width: 50px;
          }
          & > input {
            border: 0;
            // border: 1px solid red;
            outline: 0;
            background-color: rgba(42, 158, 195, 0);
            height: 30px;
            margin-left: 30px;
            color: $textColor;
            &::placeholder {
              color: $textColor;
              opacity: 0.7;
            }
          }
          .error-text {
            display: inline-block;
            position: absolute;
            width: 200px;
            top: 100%;
            left: 0;
            color: rgb(208, 56, 56);
          }
          .invalid {
            color: rgb(208, 56, 56);
          }
        }
        & > li:nth-child(4) > button {
          width: 210px;
          color: $textColor;
          height: 30px;
          border: 1px solid white;
          border-radius: 15px;
          font-size: 13px;
          background-color: rgba(42, 158, 195);
          box-shadow: 1px 1px 5px #2679c7;
          transition: background-color, 1s;
          &:hover {
            background-color: rgb(20, 96, 122);
            cursor: pointer;
          }
        }
        & > li:last-child {
          font-size: 12px;
        }
      }
    }
    .welcome-box {
      width: 270px;
      height: 400px;
      background: #042256;
      color: $textColor;
      position: relative;
      .flag {
        color: $textColor;
        position: relative;
        top: 20px;
        left: 20px;
        margin-bottom: 40px;
        .circle {
          width: 25px;
          height: 25px;
          border: 3px solid #4bddfe;
          border-radius: 50%;
          float: left;
          margin-right: 5px;
        }
        & > p::first-letter {
          font-size: 20px;
        }
      }
      .welcome-text {
        margin-left: 20px;
        font-size: 18px;
        & > span {
          display: block;
          margin-bottom: 10px;
        }
      }
      .register {
        position: absolute;
        font-size: 12px;
        bottom: 4px;
        right: 4px;
        cursor: pointer;
      }
    }
  }
}
</style>