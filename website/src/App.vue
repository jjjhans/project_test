<template>
  <div>
    <span id="top"></span>
    <router-view v-if="isRouterAlive"></router-view>
    <a class="linkbox" href="#top" title="返回顶部"></a>
  </div>
</template>
<script>
import Header from "@/components/Header/index.vue";
export default {
  name: "App",
  data() {
    return {
      isRouterAlive: true,
    };
  },
  components: { Header },
  provide() {
    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false; //先关闭，
      this.$nextTick(function () {
        this.isRouterAlive = true; //再打开
      });
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif, corbelz;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vm;
}
.linkbox {
  display: block;
  position: fixed;
  height: 40px;
  width: 40px;
  bottom: 20px;
  right: 10px;
  // background-color: #000;
  border-radius: 50%;
  border: 2px solid black;
  &::after {
    display: block;
    position: relative;
    content: "";
    height: 10px;
    width: 10px;
    // border: 2px solid black;
    border-top: 2px solid black;
    border-left: 2px solid black;
    top: 15px;
    left: 12px;
    transform: rotateZ(45deg);
  }
}
</style>
