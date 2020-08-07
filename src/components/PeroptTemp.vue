<template>
  <div class="peritems">
    <a href="#" class="msg_1">{{msg1}}</a>
    <a href="#" class="msg_2">
      {{msg2}}
      <i class="iconfont icon-youjiantou"></i>
    </a>
  </div>
</template>

<script>
export default {
  props: ["msg1", "msg2"],
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.peritems {
  height: 50/360 * 100vw;
  line-height: 50/360 * 100vw;
  border-bottom: 1px solid #e4e4e4;
  display: flex;
  .msg_1 {
    color: #202020;
    flex: 1;
  }
  .msg_2 {
    color: #c4c4c4;
    flex: 1;
    text-align: right;
    padding-right: 10/360 * 100vw;
  }
}
</style>