<template>
  <div class="mydiscuss">
    <div class="header">
      <per-nav-temp :navtitle="'我的跟帖'" @clickNav="backHandler"></per-nav-temp>
    </div>
    <!-- 跟帖内容显示 -->
    <div class="myComments">
      <div v-for="(item, index) in replyList" :key="index">
        <discuss-temp
          :create_date="item.create_date"
          :content="item.content"
          :repmsg="item.parent"
          :post="item.post"
        ></discuss-temp>
      </div>
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
  },
  mounted() {

    this.$axios({
      url: "/user_comments",
      method: "get",
    }).then((res) => {
      console.log(res.data.data);
      this.replyList = res.data.data;
    });
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
  }

  .myComments {
    margin-top: 60/360 * 100vw;
  }
}
</style>