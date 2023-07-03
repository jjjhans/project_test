<template>
  <div class="container">
    <AwHeader></AwHeader>
    <div class="up">
      <ul class="userinfo-up-box">
        <li><span>用户名：</span> {{ userinfo.username }}</li>
        <li><span>用户昵称：</span> {{ userinfo.nickname }}</li>
      </ul>
    </div>
    <img :src="userinfo.user_pic" alt="" class="img-one" />
    <div class="bottom">
      <ul class="userinfo-bottom-box">
        <li><span>用户邮箱：</span>{{ userinfo.email }}</li>
        <li @click="modify(userinfo)">编辑个人资料</li>
      </ul>
    </div>
    <el-dialog title="个人信息" :visible.sync="showForm" @closed="closedialog">
      <el-form :model="form">
        <el-form-item label="用户id" :label-width="formLabelWidth">
          <el-input
            v-model="form.id"
            style="width: 200px"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" style="width: 200px"></el-input
        ></el-form-item>
        <el-form-item label="用户昵称" :label-width="formLabelWidth">
          <el-input v-model="form.nickname" style="width: 200px"></el-input
        ></el-form-item>
        <el-form-item label="头像" :label-width="formLabelWidth">
          <img
            :src="form.user_pic"
            alt=""
            style="width: 130px; height: 130px"
          />
          <el-upload
            action="http://127.0.0.1:3007/img/uploaduserimg"
            list-type="picture-card"
            :on-success="uploadimgsuccess"
            :name="filename"
            :data="USERID"
            title="点击修改用户头像"
          >
            <!-- :on-success="uploadimgsuccess" -->
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showForm = false">取 消</el-button>
        <el-button type="primary" @click="updatauserinfo">确 定</el-button>
        <!-- @click="updatauserinfo" -->
      </div>
    </el-dialog>
  </div>
</template>
<script>
import userapi from "@/api/user.js";
import Qs from "qs";
import AwHeader from "@/components/Header/index.vue";
export default {
  name: "",
  inject: ["reload"],
  data() {
    return {
      userinfo: "",
      USERID: {
        userId: "",
      },
      filename: "user_pic",
      showForm: false,
      formLabelWidth: "120px",
      form: {
        id: "",
        username: "",
        password: "",
        email: "",
        nickname: "",
        user_pic: "",
      },
    };
  },
  components: { AwHeader },
  mounted() {
    this.$store.commit("changeHeaderLogoShow", false);
    this.$store.commit("changeShadowActive", true);
    this.$store.commit("changeNavDarkActive", true);
    this.getuserinfo();
    console.log(this.userinfo);
  },
  methods: {
    getuserinfo() {
      if (this.$store.state.user.token) {
        this.userinfo = this.$store.state.user.userInfo;
      }
    },
    async closedialog() {
      this.form = {
        id: "",
        username: "",
        password: "",
        email: "",
        nickname: "",
        user_pic: "",
      };
      await this.$store.dispatch("getUserInfo");
      this.userinfo = this.$store.state.user.userInfo;
      this.reload();
    },
    modify(userinfo) {
      this.showForm = true;
      this.USERID.userId = userinfo.id;
      Object.keys(this.form).forEach((i) => {
        this.form[i] = userinfo[i] || this.form[i];
      });
    },
    updatauserinfo() {
      this.showForm = false;
      let data = Qs.stringify(this.form);
      userapi.updataUserInfo(data).then((response) => {
        this.$message({
          message: response.message,
          type: response.status === 0 ? "success" : "error",
        });
      });
    },
    //头像上传成功
    uploadimgsuccess(response, file) {
      this.form.user_pic = response.data;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (from.name === "usercenter") {
      this.$store.commit("changeNavDarkActive", false);
      this.$store.commit("changeHeaderLogoShow", true);
      this.$store.commit("changeShadowActive", false);
    }
    next();
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  .up {
    width: 100%;
    height: 50%;
    // border: 1px solid red;
    z-index: -999;
    background-image: linear-gradient(0.25turn, #3e94e5, rgb(23, 97, 121));
    position: relative;
    .userinfo-up-box {
      position: absolute;
      width: 80%;
      height: 50px;
      z-index: 99;
      list-style: none;
      // border: 1px solid red;
      bottom: 0.1px;
      right: 0.1px;
      display: flex;
      // flex-direction: column;
      justify-content: space-around;
      align-items: center;
      color: #fff;
    }
  }
  .img-one {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    position: absolute;
    top: calc(50vh - 100px);
    left: 100px;
  }
  .bottom {
    position: relative;
    .userinfo-bottom-box {
      position: absolute;
      width: 80%;
      height: 50px;
      z-index: 99;
      list-style: none;
      top: 0.1px;
      right: 0.1px;
      display: flex;
      // flex-direction: column;
      justify-content: space-around;
      align-items: center;
      color: #000;
      & > li:last-child {
        cursor: pointer;
        &:hover {
          color: #3e94e5;
        }
      }
    }
  }
}
</style>