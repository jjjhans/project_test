<template>
  <div class="container">
    <div class="head">
      <el-button
        type="primary"
        @click="(showForm = true), (showformimage = false)"
        >发布/添加产品</el-button
      >
    </div>

    <el-table
      height="250"
      border
      :data="proInfoList"
      style="border-radius: 10px"
    >
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="pro_name" label="产品名称" width="180">
      </el-table-column>
      <el-table-column prop="" label="上传日期">
        <template slot-scope="{ row, $index }">
          <!-- <span>{{ row.pro_date }}</span> -->
          <span>{{ getSimpleDate(new Date(row.pro_date)) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="pro_intro" label="产品简介"></el-table-column>
      <el-table-column prop="" label="产品图片">
        <template slot-scope="{ row, $indx }">
          <img
            :src="row.pro_pic"
            alt="xxx"
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="{ row, $index }">
          <el-button type="primary" @click="modify(row)">修改</el-button>
          <el-button type="danger" @click="delproinfo(row)"
            >删除</el-button
          ></template
        >
      </el-table-column>
    </el-table>
    <el-dialog title="产品信息" :visible.sync="showForm" @closed="closedialog">
      <el-form :model="form">
        <el-form-item label="产品id" :label-width="formLabelWidth">
          <el-input
            v-model="form.id"
            style="width: 200px"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品名称" :label-width="formLabelWidth">
          <el-input v-model="form.pro_name" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="上传日期" :label-width="formLabelWidth">
          <!-- <el-input v-model="form.pro_date" style="width: 200px"></el-input> -->
          <el-date-picker
            v-model="form.pro_date"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="产品简介" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.pro_intro"
          >
          </el-input
        ></el-form-item>
        <el-form-item label="产品图片" :label-width="formLabelWidth">
          <!-- <el-input v-model="form.pro_pic" style="width: 200px"></el-input> -->
          <!-- :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload" 
            :headers="headers"-->
          <img
            v-show="showformimage"
            :src="form.pro_pic"
            alt=""
            style="width: 130px; height: 130px"
          />
          <el-upload
            action="http://127.0.0.1:3007/img/uploadproimg"
            list-type="picture-card"
            :on-success="uploadimgsuccess"
            :name="filename"
            :data="PROID"
            title="点击添加/修改产品图片"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- <el-dialog :visible.sync="pro_picShow">
            <img width="100%" :src="form.pro_pic" alt="" />
          </el-dialog> -->
        </el-form-item>
        <el-form-item label="被收藏数" :label-width="formLabelWidth">
          <el-input v-model="form.pro_collect" style="width: 200px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showForm = false">取消</el-button>
        <el-button type="primary" @click="updataprodata"
          >确定修改/发布</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import API from "../utils/index.js";
import Qs from "qs";
export default {
  name: "promanager",
  inject: ["reload"], //引入父组件中的reload方法
  data() {
    return {
      showformimage: true,
      PROID: {
        proId: "",
      },
      filename: "pro_pic",
      dialogImageUrl: "",
      pro_picShow: false,
      formLabelWidth: "120px",
      // headers: { "Content-Type": "multipart/form-data" },
      proInfoList: [],
      form: {
        id: "",
        pro_name: "",
        pro_date: "",
        pro_intro: "",
        pro_pic: "",
        pro_collect: 0,
      },
      showForm: false,
    };
  },
  mounted() {
    this.getAllInfo();
  },
  methods: {
    //获取所有产品信息
    getAllInfo() {
      this.proInfoList = [];
      API.proinfo.getAllProInfo().then((response) => {
        // this.proInfoList = res.data;
        response.data.forEach((item) => {
          this.proInfoList.push(item);
        });
      });
    },
    //开启dialog时，将当前列的值传给form
    modify(row) {
      this.showformimage = true;
      this.showForm = true;
      this.PROID.proId = row.id;
      Object.keys(this.form).forEach((i) => {
        this.form[i] = row[i] || this.form[i];
      });
    },
    //更新产品信息,判断id是否有值，有表示更新修改，没有表示添加
    updataprodata() {
      this.showForm = false;
      //将请求表单数据转换为URL查询字符串
      if (this.form.id !== "") {
        //有值修改数据
        let data = Qs.stringify(this.form);
        API.proinfo.updataProInfo(data).then((res) => {
          this.$message({
            message: res.message,
            // type: "success",
            type: res.status === 0 ? "success" : "error",
          });
        });
      } else if (this.form.id === "") {
        //无值为添加数据
        console.log(this.form);
        let data = Qs.stringify(this.form);
        API.proinfo.addProInfo(data).then((res) => {
          this.$message({
            message: res.message,
            type: res.status === 0 ? "success" : "error",
          });
        });
      } else {
        this.$message.error("发生错误！");
      }
      this.getAllInfo();
      this.reload();
    },
    //转换标准时间方法
    getSimpleDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    },
    //当关闭dialog时触发
    closedialog() {
      this.form = {
        id: "",
        pro_name: "",
        pro_date: "",
        pro_intro: "",
        pro_pic: "",
        pro_collect: 0,
      };
    },
    //删除产品信息
    delproinfo(row) {
      // API.proinfo.deleteProById(id)
      this.$confirm("此操作将永久删除该产品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          API.proinfo.deleteProById(row.id);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.reload();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    uploadimgsuccess(response, file) {
      // console.log(response.data);
      this.form.pro_pic = response.data;
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
  justify-content: space-between;
  align-items: center;
  .head {
    width: 100%;
    margin-bottom: 20px;
    position: relative;
    // border: 1px solid red;
    // display: block;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>