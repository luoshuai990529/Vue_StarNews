<template>
  <div class="attention">
    <per-nav-temp :navtitle="'我的关注'" @clickNav="backHandler('返回个人中心')"></per-nav-temp>
    <div class="attentionList">
        <attent-temp></attent-temp>
        <attent-temp></attent-temp>
        <attent-temp></attent-temp>
    </div>
  </div>
</template>

<script>
import PerNavTemp from "@/components/PerNavTemp.vue";
import AttentTemp from "@/components/AttentTemp.vue"
export default {
  components: {
    PerNavTemp,
    AttentTemp
  },
  methods: {
    backHandler(msg) {
      console.log(msg);
      this.$router.push("/perinfo");
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