<template>
  <div>
    <AwHeader></AwHeader>
    <div class="news">
      <div class="box">
        <div class="news-banner">
          <div class="banner-title">
            <h2>新视野</h2>
            <h3>了解更多新闻</h3>
          </div>
          <el-autocomplete
            class="search-input"
            popper-class="my-autocomplete"
            highlight-first-item
            v-model="searchNews"
            clearable
            ref="autocomplete"
            @focus="autocompleteFlag = true"
            @blur="autocompleteFlag = false"
            @clear="searchHandle"
            placeholder="请输入新闻关键词"
            :trigger-on-focus="false"
            :fetch-suggestions="querySearch"
          >
            <!-- @select="handleSelect" -->
            <!-- :fetch-suggestions="querySearchAsync" -->
            <!-- <template #prefix>
              <el-icon>
                <Search />
              </el-icon>
            </template> -->
            <template #default="{ item }">
              <router-link :to="item.news_path" target="_blank">
                <div class="name" v-html="item.news_title"></div>
                <span class="desc" v-html="item.news_desc"></span>
              </router-link>
            </template>
          </el-autocomplete>
        </div>
        <div class="news-container">
          <div class="news-card">
            <el-card
              shadow="never"
              v-for="(item, index) in recomNews"
              :key="index"
            >
              <router-link :to="`/news/${item.news_path}`">
                <div class="news-card-item">
                  <img :src="item.news_pic" alt="" />
                  <p class="item-mask">
                    <span>{{ item.news_title }}</span>
                  </p>
                </div>
              </router-link>
            </el-card>
          </div>
          <div class="news-list">
            <el-tabs
              class="list-left"
              v-model="newsItem.type"
              @tab-click="handleClick"
            >
              <!-- @tab-click="handleClick" -->
              <el-tab-pane :label="newsTabs[0].name" :name="newsTabs[0].id">
                <NewList
                  :items="newsItem.list"
                  v-if="newsItem.type === newsTabs[0].id"
                ></NewList>
              </el-tab-pane>
              <el-tab-pane :label="newsTabs[1].name" :name="newsTabs[1].id">
                <NewList
                  :items="newsItem.list"
                  v-if="newsItem.type === newsTabs[1].id"
                ></NewList>
              </el-tab-pane>
              <el-tab-pane :label="newsTabs[2].name" :name="newsTabs[2].id">
                <NewList
                  :items="newsItem.list"
                  v-if="newsItem.type === newsTabs[2].id"
                ></NewList>
              </el-tab-pane>
            </el-tabs>
            <div class="list-right">
              <div class="search-by-date" v-show="false">
                <p>按日期搜索：</p>
                <el-date-picker
                  v-model="pageInfo.selectDate"
                  type="month"
                  placeholder="选择日期"
                  value-format="yyyy-MM"
                >
                </el-date-picker>
              </div>
              <HotNews v-show="false"></HotNews>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AwFooter></AwFooter>
  </div>
</template>
<script>
import AwFooter from "@/components/Footer/index.vue";
import AwHeader from "@/components/Header/index.vue";
import NewList from "@/components/NewList/index.vue";
import HotNews from "@/components/HotNews/index.vue";
import Qs from "qs";
export default {
  name: "Newsvue",
  data() {
    return {
      newsItem: {
        type: "1",
        list: [
          {
            news_pic: require("@/assets/img/logoColor.png"),
            news_title: "news_title1",
            news_desc: "news_desc1",
          },
        ],
      },
      searchNews: "",
      autocompleteFlag: false,
      autocomplete: "",
      pageInfo: {
        activeName: "1",
        // 当前页码
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 10,
        selectDate: "",
      },
      newsTabs: [
        {
          id: "1",
          name: "最新动态",
        },
        {
          id: "2",
          name: "典型案例",
        },
        {
          id: "3",
          name: "通知公告",
        },
      ],
    };
  },
  components: { AwHeader, AwFooter, NewList, HotNews },
  async mounted() {
    this.$store.commit("changeHeaderLogoShow", false);
    this.$store.commit("changeShadowActive", false);
    this.$store.commit("changeNavDarkActive", true);
    this.$store.dispatch("getRcommendNews");
    await this.$store.dispatch("getNewsByType", this.newsItem.type);
    this.newsItem.list = this.$store.state.news.newslist;
  },
  methods: {
    /**
     * 解决 clearable 搜索框后再次输入不显示下拉
     */
    searchHandle() {
      if (autocompleteFlag) {
        autocomplete.activated = true;
      }
    },
    async handleClick(tab) {
      await this.$store.dispatch("getNewsByType", this.newsTabs[tab.index].id);
      this.newsItem.list = this.$store.state.news.newslist;
    },
    querySearch(queryString, cb) {
      var restaurants = this.newsItem.list;
      // console.log(queryString);
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.news_title
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    },
  },
  computed: {
    recomNews() {
      return this.$store.state.news.recomnews;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (from.name === "news") {
      this.$store.commit("changeNavDarkActive", false);
      this.$store.commit("changeHeaderLogoShow", true);
      this.$store.commit("changeShadowActive", false);
    }
    next();
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/sass/index.scss";
* {
  margin: 0;
  padding: 0;
}

.news_header {
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  //border-bottom: 1px solid #eff0f1;
}

.box {
  padding-top: 60px;
  //background: url("../../assets/img/news/bg_02.jpg");
  //background-size: cover;
}

.news-banner {
  width: 100%;
  height: 280px;
  background: url("@/assets/img/news/newsbanner.jpg") 50% no-repeat;
  background-size: cover;
  text-align: center;
  padding-top: 70px;

  .banner-title {
    padding-bottom: 30px;

    h2 {
      font-size: 40px;
      line-height: 60px;
      font-weight: 600;
    }

    h3 {
      color: #828282;
      margin-top: 5px;
      font-size: 100%;
      font-weight: 400;
      font-variant: normal;
    }
  }
  :deep(.el-autocomplete) {
    width: 46%;
    .el-input__wrapper {
      border-radius: 30px;
    }
    .el-input {
      border-radius: 30px !important;
    }
    .el-input__inner {
      height: 46px;
      line-height: 46px;
      border-radius: 30px;
      box-shadow: 0 2px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
    }
    .el-input__icon {
      line-height: 46px;
      font-size: 16px;
    }
  }
}

.news-container {
  max-width: 1200px;
  //background: #d3dce6;
  min-height: 580px;
  margin: 0 auto;

  .news-card {
    padding-top: 40px;
    margin: 0 auto 50px auto;
    display: flex;
    justify-content: space-evenly;

    //background-color: #d3dce6;
    .el-card {
      width: 280px;
      height: 160px;
      overflow: hidden;
      color: #ffffff;
    }

    .news-card-item {
      width: 280px;
      height: 160px;
      position: relative;
      cursor: pointer;

      .item-mask {
        position: absolute;
        background: linear-gradient(transparent, #030822);
        left: 0;
        bottom: 0;
        width: 100%;
        padding: 50px 20px;
        height: 97px;
        box-sizing: border-box;
      }

      span {
        color: #fff;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }

    .news-card-item:hover img {
      transform: scale(1.02);
    }

    :deep(.el-card__body) {
      padding: 0;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 0.4s ease-in-out;
    }
  }

  .news-list {
    position: relative;
    display: flex;
    justify-content: space-between;
  }

  .news-list:after {
    content: "";
    position: absolute;
    left: 0;
    top: 43px;
    width: 100%;
    height: 2px;
    background-color: #e4e7ed;
    z-index: 1;
  }

  ::v-deep .el-tabs__header {
    height: 60px;
  }

  ::v-deep .el-tabs__active-bar {
    bottom: 5px;
    //height: 3px;
  }

  ::v-deep .el-tabs__item {
    height: 50px;
    line-height: 50px;
    font-weight: 600;
  }

  .list-left {
    width: 860px;

    :deep(.el-tabs__content) {
      height: auto;
      //background-color: #d2d3d4;
    }
  }

  .el-pagination {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 50px;
  }

  .list-right {
    margin-left: 50px;

    .search-by-date {
      //padding: 6px 0;
      display: flex;
      height: 50px;
      align-items: center;
      justify-content: flex-end;
      font-size: 14px;
      margin-bottom: 25px;

      p {
        white-space: nowrap;
        position: relative;
        //right: -30px;
      }

      .el-date-editor.el-input {
        width: 160px;
      }

      ::v-deep .el-input__inner {
        width: 160px;
        height: 30px;
        line-height: 30px;
      }

      :deep(.el-input__prefix),
      :deep(.el-input__suffix) {
        top: -4px;
      }

      ///deep/ .el-input__suffix{
      //  right: 50px;
      //}
    }

    :deep(.el-card__body) {
      padding-top: 0;
    }
  }
}

:deep(.el-tabs__nav-wrap::after) {
  content: none;
}

.box-card {
  width: 480px;
}
</style>

<style lang="scss">
@import "@/assets/sass/index.scss";

.my-autocomplete {
  width: 46%;
  left: 50% !important;
  transform: translateX(-50%);
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .desc {
      font-size: 12px;
      color: #b4b4b4;
    }

    &.highlighted {
      background: #edf6ff !important;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }

  a {
    color: rgba(0, 0, 0, 1);
    //transition: color .3s;
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  a:hover {
    color: $hover_color;
  }
}

.el-autocomplete-suggestion li:hover {
  background-color: #edf6ff !important;
}
</style>