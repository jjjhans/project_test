<template>
  <div class="area">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      isRouterAlive: true, //控制视图是否显示的变量
    };
  },
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
<style lang="scss" scoped>
.area {
  border: 2px solid red;
  height: 100%;
  width: 100%;
}
</style>