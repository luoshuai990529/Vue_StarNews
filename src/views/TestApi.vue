<template>
  <div>
    测试页面
    <button class @click="sendAxios">测试接口</button>

    <hr />
    <!-- <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadMorePost"
    >
      <div class="con">
        <ul>
          <li>3333333333333</li>

          <li>3333333333333</li>
          <li>3333333333333</li>
        </ul>
        <van-cell v-for="item in list" :key="item" :title="item" />
      </div>
    </van-list>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
    };
  },
  methods: {
    sendAxios() {
      // 关注用户请求
      this.$axios({
        url: "/post/" + 1,
        method: "get",
      }).then((res) => {
        console.log(res);
      });
      // this.$axios({
      //   url: "/user_follows/" + 4,
      //   method: "get",
      // }).then((res) => {
      //   console.log(res);
      // });
      // 请求栏目列表
      // this.$axios({
      //   url: "/category",
      //   method: "get",
      // }).then((res) => {
      //   console.log(res);
      // });
      // // 首页新闻获取
      // this.$axios({
      //   url: "/post",
      //   method: "get",
      //   params: {
      //     //当前激活栏目
      //     pageIndex: 2,
      //     // 从栏目中要拿出的新闻数据条数
      //     pageSize: 6,
      //     // 指定要拿出新闻的类别id
      //     // category: 8,
      //   },
      // }).then((res) => {
      //   console.log(res);
      // });
    },
    loadMorePost() {
      setTimeout(() => {
        console.log("到底了继续加载");

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 70) {
          this.finished = true;
        }
      }, 1000);
    },
  },
  components: {},
};
</script>

<style lang="less" scoped>
.con {
  font-size: 30px;
}
</style>