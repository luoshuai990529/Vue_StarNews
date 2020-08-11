<template>
  <div>
    测试页面
    <button class @click="sendAxios">测试接口</button>
  </div>
</template>

<script>
export default {
  methods: {
    sendAxios() {
      // 关注用户请求
      // this.$axios({
      //   url: "/user_follows/" + 2,
      //   method: "get",
      // }).then((res) => {
      //   console.log(res);
      // });

      // 请求栏目列表
      this.$axios({
        url: "/category",
        method: "get",
      }).then((res) => {
        console.log(res);
      });

      // 首页新闻获取
      this.$axios({
        url: "/post",
        method: "get",
        params: {
          //当前激活栏目
          pageIndex: 1,
          // 从列表中拿出栏目
          pageSize: 2,
          // 栏目中拿出id
          category: 8,
        },
      }).then((res) => {
        console.log(res);
      });
    },
  },
  components: {},
};
</script>

<style lang="lang" scoped>
</style>