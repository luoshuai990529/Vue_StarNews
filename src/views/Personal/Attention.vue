<template>
  <div class="attention">
    <per-nav-temp :navtitle="'我的关注'" @clickNav="backHandler('返回个人中心')"></per-nav-temp>
    <div class="attentionList">
      <attent-temp :attname="'火星新闻'" :attdate="'2020-01-04'" @cancelClick="cancelhandler"></attent-temp>
      <attent-temp :attname="'人民月报'" :attdate="'2020-02-15'" @cancelClick="cancelhandler"></attent-temp>
      <attent-temp :attname="'搜狐互娱'" :attdate="'2020-01-23'" @cancelClick="cancelhandler"></attent-temp>
      <attent-temp :attname="'腾讯新闻'" :attdate="'2020-05-24'" @cancelClick="cancelhandler"></attent-temp>
    </div>
  </div>
</template>

<script>
import PerNavTemp from "@/components/PerNavTemp.vue";
import AttentTemp from "@/components/AttentTemp.vue";
export default {
  components: {
    PerNavTemp,
    AttentTemp,
  },
  methods: {
    backHandler(msg) {
      console.log(msg);
      this.$router.push("/perinfo");
    },
    cancelhandler() {
      console.log('取消关注');
    },
  },
};
</script>

<style lang="less" scoped>
.attention {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f2f2f2;
  height: 100vh;
}
</style>