<template>
  <div
    class="header"
    :class="{ header_show: headerShow, shadow: headerShowActive }"
  >
    <div class="header_container">
      <div class="header_content">
        <div class="logo">
          <router-link to="/">
            <img :src="logo_img[0].path" alt="logo" v-if="headerLogoShow" />
            <img :src="logo_img[1].path" alt="logo" v-else />
          </router-link>
        </div>
        <div class="menu-wrapper">
          <div class="menu-item" v-for="(nav, index) in navList" :key="index">
            <h2 class="menu-item-link">
              <router-link v-if="index !== 4" :to="nav.path">
                <span :class="{ a_text_dark: navDarkActive }">{{
                  nav.title
                }}</span>
              </router-link>
              <el-dropdown v-else-if="nav.title !== '登录'">
                <router-link :to="nav.path">
                  <span :class="{ a_text_dark: navDarkActive }"
                    >{{ nav.title
                    }}<i class="el-icon-arrow-down el-icon--right"></i
                  ></span>
                </router-link>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="usercenter"
                    >用户中心</el-dropdown-item
                  >
                  <el-dropdown-item @click.native="logout"
                    >退出登录</el-dropdown-item
                  >
                </el-dropdown-menu></el-dropdown
              >
              <router-link v-else :to="nav.path">
                <span :class="{ a_text_dark: navDarkActive }">{{
                  nav.title
                }}</span>
              </router-link>
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "v-header",
  inject: ["reload"],
  data() {
    return {
      logo_img: [
        {
          path: require("@/assets/img/logo.png"),
        },
        {
          path: require("@/assets/img/logoColor.png"),
        },
      ],
      headerShow: false,
      navList: [
        {
          title: "首页",
          path: "/home",
        },
        {
          title: "新闻中心",
          path: "/news",
        },
        {
          title: "产品与服务",
          path: "/pro",
        },
        {
          title: "人才招聘",
          path: "/job",
        },
        {
          title: "登录",
          path: "/login",
        },
      ],
    };
  },
  beforeMount() {
    this.$store.commit("changeHeaderLogoShow", true);
  },
  mounted() {
    this.getusername();
  },
  methods: {
    logout() {
      //清除
      try {
        this.$store.dispatch("userLogout");
        //回到首页
        this.$router.push("/home");
      } catch (error) {
        alert("logout false");
      }
      this.navList[4].title = "登录";
    },
    getusername() {
      if (this.$store.state.user.token) {
        this.navList[4].title = this.$store.state.user.userInfo.username;
      }
    },
    usercenter() {
      this.$router.push({
        name: "usercenter",
      });
    },
  },
  computed: {
    // userName() {
    //   if (this.$store.state.user.userInfo) {
    //     return this.$store.state.user.userInfo.username;
    //   }
    // },
    headerLogoShow() {
      return this.$store.state.header.headerLogoShow;
    },
    headerShowActive() {
      return this.$store.state.header.headerShowActive;
    },
    navDarkActive() {
      return this.$store.state.header.navDarkActive;
    },
  },
};
</script>
<!-- <style lang="scss" scoped>
@import "@/assets/sass/index.scss";
.container {
  background-color: rgba(0, 0, 0, 0);
  position: absolute;
  width: 100%;
  height: 70px;
  color: #000;
  display: flex;
  overflow: hidden;
  .logo {
    position: relative;
    width: 30%;
    height: 100%;
    // border: 1px solid red;
    & > span > a {
      font-size: 26px;
      position: absolute;
      left: 100px;
      top: 15px;
      color: #000;
      text-decoration: none;
    }
  }
  .list {
    display: flex;
    position: absolute;
    right: 0px;
    width: 70%;
    height: 100%;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    // border: 1px solid aqua;
    list-style: none;
    & > li:hover {
      cursor: pointer;
    }
  }
}
</style> -->
<style lang="scss" scoped>
h2 {
  margin: 0;
}

.header_show {
  transform: translateY(-62px);
}

.a_text_dark {
  color: rgba(0, 0, 0, 0.8);
}

.header {
  width: 100%;
  height: 60px;
  background-color: rgba(255, 255, 255, 0);
  //backdrop-filter: blur(0);
  box-shadow: none;

  position: fixed;
  z-index: 999;
  transition: transform 0.2s ease;

  //color: rgba(255, 255, 255, 1) !important;
  //transition: all 0.3s ease;
  .header_container {
    height: 100%;
  }
}

.shadow {
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
}

.header_content {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  height: 100%;
  align-items: center;
  padding: 0 96px;
  margin: 0 auto;

  .logo {
    flex: 0 0 auto;

    img {
      height: 35px;
    }
  }
}

.menu-wrapper {
  display: flex;
  flex-direction: row;
  list-style: none;
  -ms-flex-align: center;
  align-items: center;
  padding: 0;
  margin: 0 0 0 20px;
  position: relative;

  .menu-item {
    flex-shrink: 0;
    z-index: 999;
  }

  // .menu-item:last-child:before {
  //   content: "";
  //   display: block;
  //   height: 12px;
  //   border-right: 1px solid #bbbfc4;
  //   //border-right: 1px solid #fff;
  //   position: absolute;
  //   bottom: 24px;
  //   right: 48px;
  // }

  > .menu-item + .menu-item {
    margin-left: 40px;
  }

  .menu-item-link {
    //color: #646a73;
    font-weight: 400;
    font-size: 14px;
    line-height: 60px;
    cursor: pointer;
    position: relative;

    a {
      display: inline-block;
      color: rgb(255, 255, 255);
      transition: color 0.3s;
      text-decoration: none;

      &:hover {
        color: #3370ff;
      }
    }

    .router-link-exact-active {
      color: #3370ff;
      font-weight: 600;

      span:after {
        content: "";
        display: block;
        height: 2px;
        position: absolute;
        width: 26px;
        left: calc(50% - 13px);
        bottom: 14px;
        background-color: #3370ff;
      }
    }
  }
}

.nav_text_white {
  color: rgb(0, 0, 0);
}

.nav_text_dark {
  color: rgba(0, 0, 0, 0.8);
}

@media only screen and (max-width: 991px) {
  .header_content {
    padding: 0 32px;
  }
}
</style>