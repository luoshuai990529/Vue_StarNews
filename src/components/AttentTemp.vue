<template>
  <div class="attentItem">
    <div class="attImg">
      <div class="imgcon">
        <img :src="attimg" alt />
      </div>
    </div>
    <div class="attTitle">
      <div class="msg">
        <span class="attname">{{attname}}</span>
        <span class="attdate">{{attdate}}</span>
      </div>
    </div>
    <div class="cancel" >
      <span @click="sendClick">取消关注</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["attimg","attname","attdate"],
  data() {
    return {};
  },
  methods: {
    sendClick() {
      this.$emit("cancelClick");
    },
  },
};
</script>

<style lang="less" scoped>
.attentItem {
  padding: 0 20/360 * 100vw;
  height: 90/360 * 100vw;
  border-bottom: 1px solid #d7d7d7;
  display: flex;
  > div {
    margin-top: 25/360 * 100vw;
  }
  .attImg {
    flex: 1;
    height: 100%;
    .imgcon {
      width: 40/360 * 100vw;
      height: 40/360 * 100vw;
      overflow: hidden;
      border-radius: 50%;
      background: #b3b3b3;
    }
  }
  .attTitle {
    flex: 3;
    text-align: left;

    .msg {
      > span {
        display: block;
        height: 20/360 * 100vw;
      }
      .attname {
        font-size: 16/360 * 100vw;
        color: #202020;
      }
      .attdate {
        color: #a5a5a5;
      }
    }
  }
  .cancel {
    flex: 1;
    span {
      display: block;
      background: #e1e1e1;
      text-align: center;
      height: 30/360 * 100vw;
      width: 70/360 * 100vw;

      line-height: 30/360 * 100vw;
      border-radius: 15/360 * 100vw;
    }
  }
}
</style>