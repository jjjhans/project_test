<template>
  <div class="container">
    <!-- <div class="headtext">用户信息表</div> -->
    <el-table
      height="250"
      border
      :data="userInfoList"
      style="border-radius: 10px"
    >
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="nickname" label="昵称"></el-table-column>
      <el-table-column prop="user_pic" label="头像">
        <template slot-scope="{ row, $indx }">
          <img
            :src="row.user_pic"
            alt="xxx"
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="{ row, $index }">
          <el-button type="primary" @click="modify(row)">修改</el-button>
          <el-button type="danger" @click="deluserinfo(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="用户信息" :visible.sync="showForm" @closed="closedialog">
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
            v-show="showformimage"
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
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showForm = false">取 消</el-button>
        <el-button type="primary" @click="updatauserinfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import API from "../utils/index.js";
import Qs from "qs";
export default {
  name: "usermanager",
  inject: ["reload"], //引入父组件中的reload方法
  data() {
    return {
      showformimage: true,
      USERID: {
        userId: "",
      },
      filename: "user_pic",
      userInfoList: [],
      showForm: false,
      form: {
        id: "",
        username: "",
        password: "",
        email: "",
        nickname: "",
        user_pic: "",
      },
      formLabelWidth: "120px",
    };
  },
  mounted() {
    this.getalluserinfo();
  },
  methods: {
    //获取所有用户信息
    getalluserinfo() {
      API.userinfo.getAllUSerInfo().then((res) => {
        this.userInfoList = res.data;
        // console.log(res.data);
      });
    },
    //打开diolag，将table表当前列的值传给form
    modify(row) {
      this.showForm = true;
      this.USERID.userId = row.id;
      Object.keys(this.form).forEach((i) => {
        this.form[i] = row[i] || this.form[i];
      });
    },
    //修改用户信息
    updatauserinfo() {
      this.showForm = false;
      let userinfo = Qs.stringify(this.form);
      API.userinfo.updataUserInfo(userinfo).then((response) => {
        this.$message({
          message: response.message,
          type: response.status === 0 ? "success" : "error",
        });
      });
      this.getalluserinfo();
      this.reload();
    },
    //当关闭dialog时触发
    closedialog() {
      this.form = {
        id: "",
        username: "",
        password: "",
        email: "",
        nickname: "",
        user_pic: "",
      };
    },
    //头像上传成功
    uploadimgsuccess(response, file) {
      this.form.user_pic = response.data;
    },
    //删除
    deluserinfo(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          API.userinfo.deleteUserById(row.id);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getalluserinfo();
          this.reload();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
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
  border-radius: 10px;
  // overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>