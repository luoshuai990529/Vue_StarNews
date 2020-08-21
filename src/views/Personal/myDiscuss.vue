<template>
  <div class="mydiscuss">
    <div class="header">
      <per-nav-temp :navtitle="'我的跟帖'" @clickNav="backHandler"></per-nav-temp>
    </div>
    <!-- 跟帖内容显示 -->
    <div class="myComments">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="loadMorePost"
        :offset="100"
      >
        <div v-for="(item, index) in replyList" :key="index">
          <!-- 跟帖组件 -->
          <discuss-temp
            :create_date="item.create_date"
            :content="item.content"
            :repmsg="item.parent"
            :post="item.post"
          ></discuss-temp>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import PerNavTemp from "@/components/PerNavTemp.vue";
import DiscussTemp from "@/components/DiscussTemp.vue";
export default {
  data() {
    return {
      replyList: [],
      pageIndex: 1,
      pageSize: 6,
      loading: false,
      finished: false,
    };
  },
  components: {
    PerNavTemp,
    DiscussTemp,
  },
  methods: {
    backHandler() {
      this.$router.back();
    },
    // 页面到底部触发的函数
    loadMorePost() {
      console.log("页面到底部");
      this.pageIndex += 1;
      console.log('加载第'+this.pageIndex+"的数据");

      setTimeout(() => {
        this.loadDiscuss();
      }, 1000);
    },
    // 加载我的跟帖数据
    loadDiscuss() {
      this.loading = true;
      // 请求我的跟帖接口 渲染数据
      this.$axios({
        url: "/user_comments",
        method: "get",
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        },
      }).then((res) => {
        if (res.data.data.length <= 0) {
          this.finished = true;
        }

        let disObj = res.data.data.map((item) => {
          let newArr = {
            ...item,
            loading: false,
            finished: false,
          };
          return newArr;
        });
        this.replyList = [...this.replyList, ...disObj];
        console.log(this.replyList);
        this.loading = false;
      });
    },
    // 改造数据结构
    initReplyList(res) {},
  },
  mounted() {
    // 加载我的跟帖
    this.loadDiscuss();
  },
};
</script>

<style lang="less" scoped>
.mydiscuss {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: #f2f2f2;
  min-height: 100vh;
  .header {
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 999;
  }

  .myComments {
    margin-top: 60/360 * 100vw;
  }
}
</style>