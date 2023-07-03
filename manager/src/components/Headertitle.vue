<template>
  <div class="tit">{{ $route.meta.title }}</div>
</template>
<script>
export default {
  name: "",
  data() {
    return {};
  },
  props: ["headertitle"],
  mounted() {
    console.log(this.$route);
  },
};
</script>
<style lang="scss" scoped>
.tit {
  width: 100%;
  height: 100%;
  // position: relative;
  // margin: 0 auto;
  // border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
}
</style>