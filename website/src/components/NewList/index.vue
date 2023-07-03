<template>
  <div>
    <ul v-if="items !== undefined">
      <li class="news-list-item" v-for="(item, index) in items" :key="index">
        <img :src="item.news_pic" alt="" />
        <div class="item-content">
          <h2>{{ item.news_title }}</h2>
          <p>{{ item.news_desc }}</p>
          <span>{{ item.publish_time }}</span>
        </div>
      </li>
    </ul>
    <span class="is-null" v-else>暂无数据</span>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      //   items: [
      //     {
      //       news_pic: require("@/assets/img/logoColor.png"),
      //       news_title: "news_title",
      //       news_desc: "news_desc",
      //     },
      //   ],
    };
  },
  props: ["items"],
};
</script>
<style lang="scss" scoped>
.news-list-item {
  position: relative;
  border-radius: 8px;
  display: flex;
  justify-content: space-around;
  color: black;
  border: 0.3px solid rgb(179, 173, 173);
  margin-bottom: 10px;
  img {
    width: 198px;
    height: 125px;
    border: none;
  }
  .item-content {
    margin-left: 40px;
    width: calc(100% - 238px);
    h2 {
      font-size: 20px;
      font-weight: 500;
      overflow: hidden;
      //white-space: nowrap;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      //   transition: color 2s;
    }

    p {
      margin: 10px 0;
      font-size: 15px;
      color: #777;
      letter-spacing: 0;
      line-height: 22px;
      overflow: hidden;
      //white-space: nowrap;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
    span {
      color: #b8b8b8;
      line-height: 14px;
    }
  }
  &:hover {
    color: #3370ff;
    cursor: pointer;
  }
}
.is-null {
  display: flex;
  justify-content: center;
  margin-top: 45px;
  color: #777;
}
</style>