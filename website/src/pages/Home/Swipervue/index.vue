<template>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in list" :key="item.id">
        <img :src="item.imgUrl" style="object-fit: cover" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <!-- <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div> -->

    <!-- 如果需要滚动条 -->
    <!-- <div class="swiper-scrollbar"></div> -->
  </div>
</template>
  
  <script>
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
export default {
  name: "Swipervue",
  data() {
    return {};
  },
  props: ["list"],
  watch: {
    list: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          //挂在后的去初始化swiper
          var MySwiper = new Swiper(".swiper", {
            direction: "horizontal", // 垂直切换选项
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
            },
            // 如果需要前进后退按钮
            // navigation: {
            //   nextEl: ".swiper-button-next",
            //   prevEl: ".swiper-button-prev",
            // },
            autoplay: {
              delay: 2000,
              stopOnLastSlide: false,
              disableOnInteraction: true,
            },

            // 如果需要滚动条
            // scrollbar: {
            //   el: '.swiper-scrollbar',
            // },
          });
        });
      },
    },
  },
};
</script>
  <style lang="scss" scoped>
.swiper {
  // border: 1px solid red;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -999;
  background-color: #99b4ef;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>