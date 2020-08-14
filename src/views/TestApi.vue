<template>
  <div>
    测试页面
    <button class @click="sendAxios">测试接口</button>
    <br />
    <button class="star" @click="sendStar">收藏</button>
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
    <digui :num="3"></digui>
  </div>
</template>

<script>
import Digui from "@/components/Digui.vue";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
    };
  },
  methods: {
    sendStar() {
      console.log("收藏文章");
      this.$axios({
        url: "/post_star/" + 3,
        method: "GET",
      }).then((res) => {
        console.log(res);
        console.log("请求文章详情");
        this.$axios({
          url: "/post/" + 3,
          method: "get",
        }).then((res) => {
          console.log(res.data.data);
        });
      });
    },
    sendAxios() {
      // 关注用户请求
      // this.$axios({
      //   url: "/post/" + 1,
      //   method: "get",
      // }).then((res) => {
      //   console.log(res);
      // });
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
    },
  },
  components: {
    Digui,
  },
};
</script>

<style lang="less" scoped>
.con {
  font-size: 30px;
}
.star {
  width: 20vw;
  height: 20vw;
}
</style>