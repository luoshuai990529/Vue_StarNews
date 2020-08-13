<template>
  <div class="pernav">
    <div class="edithead">
      <i class="iconfont icon-fanhui" @click="sendClick"></i>
      <b>{{navtitle}}</b>
    </div>
  </div>
</template>

<script>
export default {
  props: ["navtitle"],
  data() {
    return {};
  },
  methods: {
    sendClick() {
      this.$emit("clickNav");
    },
  },
};
</script>

<style lang="less" scoped>
.edithead {
  position: relative;
  text-align: center;
  line-height: 48/360 * 100vw;
  border-bottom: 1px solid #d0cfcf;
  background: url('../assets/images/perbg4.jpg') no-repeat center;
  background-size: cover;
  color: #fff;
  .iconfont {
    position: absolute;
    left: 15/360 * 100vw;
    width: 30/360 * 100vw;
    text-align: center;
  }
}
</style>