<template>
  <div class="myStar">
    <per-nav-temp :navtitle="'我的收藏'" @clickNav="backHandler('返回个人中心')"></per-nav-temp>
    <div class="postlist">
      <post-temp
        :postData="item"
        v-for="(item, index2) in item"
        :key="index2"
      ></post-temp>
    </div>
  </div>
</template>

<script>
import PerNavTemp from "@/components/PerNavTemp.vue";
import PostTemp from "@/components/PostTemp.vue";
export default {
  data() {
    return {
        item:""
    };
  },
  methods: {
    backHandler(msg) {
      console.log(msg);
      this.$router.back();
    },
  },
  mounted() {
    //  请求关注的文章列表
    this.$axios({
      url: "/user_star/",
      method: "get",
    }).then((res) => {
      console.log(res.data.data);
      this.item = res.data.data ;
    });
  },
  components: {
    PerNavTemp,
    PostTemp,
  },
};
</script>

<style lang="less" scoped>
.myStar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f2f2f2;
  height: 100vh;
}
</style>