<template>
  <div class="container">
    <AwHeader></AwHeader>
    <Swipervue :list="swiperList" />
    <OverLayText></OverLayText>
    <IndexService></IndexService>
    <AwFooter></AwFooter>
  </div>
</template>
<script>
import AwHeader from "@/components/Header/index.vue";
import OverLayText from "@/components/OverLayText/index.vue";
import Swipervue from "./Swipervue/index.vue";
import IndexService from "@/components/IndexService/index.vue";
import AwFooter from "@/components/Footer/index.vue";
export default {
  name: "Home",
  data() {
    return {
      scrollTop: 0,
      BannerHeight: 0,
      swiperList: [
        {
          id: 1,
          imgUrl: "http://127.0.0.1:5000/swiperimg/banner1.jpg",
        },
        {
          id: 2,
          imgUrl: "http://localhost:5000/swiperimg/banner2.png",
        },
        {
          id: 3,
          imgUrl: "http://localhost:5000/swiperimg/banner3.jpg",
        },
      ],
    };
  },
  mounted() {
    if (this.$store.state.user.token) {
      //获取用户信息在首页展示
      this.$store.dispatch("getUserInfo");
      //这里老师提到的问题:切换路由时会把当前登录信息消除,解决办法可以放在一个组件中,也就是放在header中,这里放在home中显然是不好的
    }
    window.addEventListener("resize", this.setBannerHeight);
    this.setBannerHeight();
    window.addEventListener("scroll", this.scrollHandle);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setBannerHeight);
    window.removeEventListener("scroll", this.scrollHandle);
  },
  components: { Swipervue, OverLayText, IndexService, AwHeader, AwFooter },
  methods: {
    setBannerHeight() {
      this.BannerHeight = window.innerHeight;
      this.$store.commit("setBannerHeight", this.BannerHeight);
    },
    scrollHandle() {
      this.scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      if (this.scrollTop <= this.BannerHeight) {
        this.$store.commit("changeHeaderLogoShow", true);
        this.$store.commit("changeShadowActive", false);
        this.$store.commit("changeNavDarkActive", false);
      } else {
        this.$store.commit("changeHeaderLogoShow", false);
        this.$store.commit("changeShadowActive", true);
        this.$store.commit("changeNavDarkActive", true);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: auto;
}
.test {
  position: relative;
}
</style>