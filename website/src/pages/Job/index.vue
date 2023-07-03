<template>
  <div class="job">
    <AwHeader></AwHeader>
    <div class="box">
      <div class="banner">和优秀的人，做有挑战的事</div>
      <!-- 搜索 -->
      <div class="search-wrapper" :class="{ fixedTop: searchBarFixedTop }">
        <el-input
          :class="[{ medium: searchBarFixedTop }, 'small']"
          placeholder="搜索职位"
          @change="search"
          v-model="searchKeyword"
        >
          <template #prefix>
            <i
              class="el-icon-search"
              style="position: relative; top: 15px; left: 5px"
            ></i>
          </template>
        </el-input>
        <el-button
          :class="[{ medium: searchBarFixedTop }, 'small']"
          type="primary"
          round
          @click="search"
          >搜索
        </el-button>
      </div>
      <div class="main">
        <div class="aside-filter">
          <div class="aside-header">
            <span>筛选</span>
            <span class="clear">清空</span>
          </div>
          <div class="job-category job-filter-block">
            <div class="title">职位类别</div>
            <el-tree
              :data="data"
              :props="defaultProps"
              :show-checkbox="true"
            ></el-tree>
            <!-- @check="test" -->
            <!-- @current-change="ttt" -->
          </div>
          <div class="city-category job-filter-block">
            <div class="title">城市</div>
            <ul>
              <li v-for="(item, index) in jobCities" :key="index">
                <el-checkbox
                  v-model="item.flag"
                  @change="changeCity(index)"
                  disabled
                  >{{ item.cname }}</el-checkbox
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="content">
          <h2 class="content-title" v-show="results.total > 0">
            开启新的工作 ({{ results.total }})
          </h2>
          <h2 class="content-title" v-show="!(results.total > 0)">
            开启新的工作 (0)
          </h2>
          <ul class="content-list">
            <li
              class="content-item is-hover-shadow"
              v-for="item in results.jobinfolist"
              :key="item.id"
            >
              <router-link :to="`/job/${item.id}`">
                <h3 class="title">{{ item.title }}</h3>
                <div class="subTitle">
                  <span class="city">{{ item.c_name }}</span
                  >&nbsp;|
                  <span class="job_category">{{ item.jc_name }}</span>
                </div>
                <p class="desc">{{ item.description }}</p>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <AwFooter />
  </div>
</template>
<script>
import AwHeader from "@/components/Header/index.vue";
import AwFooter from "@/components/Footer/index.vue";
export default {
  name: "",
  data() {
    return {
      flag: true,
      jobparams: {
        jcname: "",
        cname: "",
      },
      jobCities: [
        {
          flag: false,
          cname: "上海",
        },
        {
          flag: false,
          cname: "北京",
        },
        {
          flag: false,
          cname: "深圳",
        },
        {
          flag: false,
          cname: "杭州",
        },
      ],
      data: [
        {
          disabled: true,
          label: "运营",
          children: [
            {
              disabled: true,
              label: "产品运营",
            },
          ],
        },
        {
          disabled: true,
          label: "研发",
          children: [
            {
              disabled: true,
              label: "前端",
            },
          ],
        },
        {
          disabled: true,
          label: "设计",
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      searchBarFixedTop: false,
      searchKeyword: "",
      results: {
        total: 0,
        jobinfolist: [],
      },
    };
  },
  components: { AwFooter, AwHeader },
  async mounted() {
    this.$store.commit("changeHeaderLogoShow", false);
    this.$store.commit("changeShadowActive", false);
    this.$store.commit("changeNavDarkActive", true);
    await this.$store.dispatch("getJobInfo", this.jobparams);
    this.getjoblist();
  },
  methods: {
    getjoblist() {
      this.results.jobinfolist = this.$store.state.job.jobinfolist;
      if (this.$store.state.job.jobinfolist) {
        this.results.total = this.$store.state.job.jobinfolist.length;
      }
    },
    search() {},
    changeCity(index) {
      // console.log(index, this.jobCities[index].flag);
    },
  },
};
</script>
<style lang="scss" scoped>
.job_header {
  background-color: rgba(255, 255, 255, 1);
  backdrop-filter: blur(10px);
}

.box {
  padding-top: 60px;
  min-height: 860px;
  width: 100%;

  * {
    box-sizing: border-box;
  }

  .banner {
    height: 400px;
    line-height: 400px;
    color: #fff;
    width: 100%;
    min-width: 1200px;
    background-image: url(../../assets/img/index/jobbg.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    text-align: center;
    font-size: 32px;
  }
}

.search-wrapper {
  position: absolute;
  transform: translateY(-50%);
  width: 100%;

  &.fixedTop {
    position: fixed;
    box-shadow: 0 2px 16px 0 rgba(31, 35, 41, 5%);
    top: 0;
    transform: translateY(0);
    padding: 15px 0;
    z-index: 1000;
    // background-color: #fff;
    transition: all 0.3s;
  }

  :deep(.el-input) {
    width: 50%;
    left: 50%;
    transform: translateX(-50%);

    &.medium {
      width: 64%;
    }

    .el-input__wrapper {
      border-radius: 30px;
    }
  }

  :deep(.el-input__inner) {
    height: 50px;
    border-radius: 30px;
  }

  .el-button {
    position: absolute;
    line-height: 0;
    height: 50px;
    border-radius: 0 25px 25px 0;
    right: 25%;

    &.medium {
      right: 18%;
    }
  }
}

.main {
  width: 1026px;
  min-height: 400px;
  margin: 80px auto 60px;
  display: flex;

  .aside-filter {
    width: 275px;
    height: auto;
    padding-right: 35px;
    border-right: 1px solid #e4e7ed;
  }

  .aside-header {
    font-size: 14px;
    font-weight: 700;
    color: #1f2329;
    border-bottom: 1px solid #ebeef5;
    padding-bottom: 12px;
    margin-top: 10px;
    margin-bottom: 23px;

    .clear {
      float: right;
      font-weight: normal;
      cursor: pointer;
    }

    .clearable {
      color: #409eff;
    }
  }

  .job-filter-block {
    margin-bottom: 39px;
    position: relative;
    height: auto;

    .title {
      font-size: 20px;
      font-weight: 700;
      color: #1f2329;
      margin-bottom: 9px;
    }
    li {
      margin-left: 24px;
      margin-bottom: 10px;
    }
  }

  .content {
    width: 712px;
    height: auto;
    //margin-left: 300px;

    padding-left: 24px;
  }

  .content-title {
    font-size: 30px;
    line-height: 36px;
    height: 36px;
    font-weight: 700;
    margin-left: 16px;
    margin-bottom: 18px;
  }

  .content-list {
    margin-top: 22px;
  }

  .content-item {
    //margin-bottom: 20px;
    padding: 20px;
    transition: box-shadow 0.5s;

    &.is-hover-shadow:hover {
      box-shadow: 0 8px 24px 0 rgba(187, 191, 196, 0.2);
      border-radius: 5px;
    }

    .title {
      margin: 12px 0;
      font-size: 20px;
      font-weight: 600;
      line-height: 1.6;
    }

    .subTitle {
      flex-wrap: wrap;
      font-size: 16px;
      font-weight: 500;
      line-height: 1.5;
      color: #646a73;
      margin: 4px 0 12px;
    }

    .desc {
      width: 664px;
      max-height: 44px;
      font-size: 14px;
      font-weight: 500;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.57;
      letter-spacing: normal;
      color: #8f959e;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      white-space: pre-line;
      -webkit-line-clamp: 2;
    }
  }

  a {
    color: rgba(0, 0, 0, 1);
    overflow: hidden;
    cursor: pointer;
  }
}
</style>

<style lang="scss">
.el-tree {
  color: #1f2329;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  -webkit-font-feature-settings: "tnum";
  font-feature-settings: "tnum";
  margin: 0;
  padding: 0;

  > .el-tree-node:first-child {
    margin-top: 8px;
  }

  .el-tree-node__content {
    height: 38px;
  }

  .el-tree-node__label {
    font-size: 16px;
  }

  .el-tree-node__expand-icon {
    color: #9ca2a9;
  }
}

.el-pagination {
  margin-top: 20px;
}
</style>