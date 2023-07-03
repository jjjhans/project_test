<template>
  <el-container>
    <el-aside width="200px" class="aside">
      <el-menu
        default-active="1"
        class="tag"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1" @click="tohome">
          <i class="el-icon-menu"></i>
          <span slot="title">后台首页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>信息管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1" @click="toUserMa">用户管理</el-menu-item>
            <el-menu-item index="1-2" @click="toProMa">产品管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-menu-item index="3">
          <i class="el-icon-setting"></i>
          <span slot="title">留言本</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header"><Headertitle></Headertitle></el-header>
      <el-main>
        <router-view v-if="isRouterAlive"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Content from "./components/Content.vue";
import Headertitle from "./components/Headertitle.vue";
export default {
  name: "App",
  provide() {
    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  components: {
    Content,
    Headertitle,
  },
  methods: {
    toProMa() {
      this.$router.push({
        name: "promanager",
      });
    },
    toUserMa() {
      this.$router.push({
        name: "usermanager",
      });
    },
    tohome() {
      this.$router.push({
        name: "homepage",
      });
    },
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
/* .container {
  display: flex;
  width: 100vw;
  min-width: 1550px;
  position: absolute;
} */
.aside {
  height: 100vh;
  .tag {
    height: 100%;
    border: none;
  }
}
.header {
  background-color: #545c64;
  color: #fff;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
