<template>
  <div class="mydiscuss">
    <div class="header">
      <per-nav-temp :navtitle="'我的跟帖'" @clickNav="backHandler"></per-nav-temp>
    </div>
  </div>
</template>

<script>
import PerNavTemp from "@/components/PerNavTemp.vue";
export default {
  components: {
    PerNavTemp,
  },
  methods: {
    backHandler() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
.mydiscuss {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f2f2f2;
  min-height: 100vh;
  .header {
    position: fixed;
    top: 0;
    width: 100vw;
  }
}
</style>