<template>
  <div class="container">
    <div v-show="!homeflag" class="content">
      <i>欢迎来到企业后台管理系统</i>
      <br />
      <i>————请输入密码：</i>
      <div class="pasinput">
        <span>系统密码：</span><input type="password" v-model="password" />
        <el-button type="primary" round @click="entersystem"
          >进入系统</el-button
        >
      </div>
    </div>
    <div v-show="homeflag" class="content-success">
      <span>后台管理系统</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      password: "",
      systempassword: "admin",
      homeflag: "",
    };
  },
  mounted() {
    sessionStorage.setItem("systempassword", this.systempassword);
    if (
      sessionStorage.getItem("password") ==
      sessionStorage.getItem("systempassword")
    ) {
      this.homeflag = true;
    } else {
      this.homeflag = false;
    }
  },
  methods: {
    entersystem() {
      sessionStorage.setItem("password", this.password);
      this.$router.push({
        name: "usermanager",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  // border: 1px solid red;
  .content {
    & > i:first-child {
      font-size: 26px;
    }
    .pasinput {
      width: 30%;
      border-bottom: 1px solid black;
      height: 30px;
      margin: 0 auto;
      margin-top: 200px;
      & > input {
        margin-left: 30px;
        border: 0;
        outline: none;
        font-size: 20px;
      }
      & > button {
        width: 200px;
        position: relative;
        top: 20px;
        left: 90px;
      }
    }
  }
  .content-success {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    & > span {
      font-size: 26px;
    }
  }
}
</style>