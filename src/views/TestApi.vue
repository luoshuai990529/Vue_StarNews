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
    <h3>组件递归</h3>
    <div class="digui">
      <digui :data="data"></digui>
    </div>
    <hr />
    <button @click="delColumn">删除栏目</button>
  </div>
</template>

<script>
import Digui from "@/components/Digui.vue";
export default {
  data() {
    return {
      list: [
        {
          type: "服装",
          children: [
            {
              type: "男装",
              children: [{ type: "T恤" }, { type: "背心" }],
            },
            {
              type: "女装",
              children: [
                { type: "吊带裙" },
                { type: "连衣裙" },
                { type: "背带裤" },
              ],
            },
          ],
        },
        {
          type: "电器",
          children: [{ type: "风扇" }, { type: "冰箱" }],
        },
      ],
      data: [
        {
          content: "我真是醉了",
          parent: [
            {
              content: "庙里有个老和尚",
              parent: [
                {
                  content: "山里有座庙",
                  parent: [{ content: "从先有座山" }],
                },
              ],
            },
          ],
        },
      ],
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
    delColumn() {
     
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
.digui {
  padding: 20px;
}
</style>