<template>
  <div>
    <AwHeader></AwHeader>
    <ul class="changelogo">
      <li v-for="(item, index) in proInfoList" :key="item.id">
        <img :src="item.pro_pic" alt="产品logo" @mouseenter="nextimg(index)" />
      </li>
    </ul>
    <el-carousel
      height="100vh"
      direction="vertical"
      :autoplay="false"
      ref="test"
      indicator-position="none"
    >
      <el-carousel-item
        v-for="item in proInfoList"
        :key="item.id"
        :name="item.pro_name"
      >
        <img :src="item.pro_pic" alt="no" />
        <div class="prodesc-text">
          <h2>{{ item.pro_name }}</h2>
          <span>{{ item.pro_intro }}</span>
          <p>更多信息，请访问：</p>
          <router-link to="/home">127.0.0.1</router-link>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import AwHeader from "@/components/Header/index.vue";
import AwFooter from "@/components/Footer/index.vue";
import API from "@/api/index.js";
export default {
  name: "Pro",
  data() {
    return {
      transitionName: "el-fade-in-linear",
      duration: 1000,
      loading: false,
      activeIndex: 0,
      proInfoList: [],
      currentDate: new Date(),
    };
  },
  components: { AwHeader, AwFooter },
  mounted() {
    this.$store.commit("changeHeaderLogoShow", false);
    this.$store.commit("changeShadowActive", true);
    this.$store.commit("changeNavDarkActive", true);
    // this.$store.commit("setHeaderShow", false);
    this.getproinfolist();
  },
  methods: {
    getSimpleDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    },
    nextimg(pro_t) {
      this.$refs.test.setActiveItem(pro_t);
    },
    getproinfolist() {
      API.pro.getAllProInfo().then((res) => {
        this.proInfoList = res.data;
      });
    },
  },
  beforeRouteLeave(to, from, next) {
    if (from.name === "pro") {
      this.$store.commit("changeNavDarkActive", false);
      this.$store.commit("changeHeaderLogoShow", true);
      this.$store.commit("changeShadowActive", false);
    }
    next();
  },
};
</script>
<style lang = "scss" scoped>
.changelogo {
  // border: 1px solid red;
  width: 80px;
  height: 100%;
  position: absolute;
  right: 50px;
  // top: 300px;
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: center;
  li {
    margin-bottom: 10px;
    margin-left: 20px;
    img {
      width: 40px;
      height: 40px;
      z-index: -9999;
      cursor: pointer;
      border-radius: 50%;
      &:hover {
        border-radius: 50%;
        box-shadow: 2px 2px 5px rgb(227, 94, 189),
          -2px -2px 5px rgb(227, 94, 189);
      }
    }
  }
}
.el-carousel__item {
  img {
    width: 100%;
    height: 100%;
  }
}
.prodesc-text {
  position: absolute;
  margin: 200px 0px 0px 100px;
  width: 300px;
  height: 200px;
  // border: 1px solid red;
  top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: rgb(46, 47, 48);
  span {
    overflow: hidden;
    //white-space: nowrap;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
}
</style>
