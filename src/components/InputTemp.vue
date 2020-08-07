<template id="InputTemp">
  <div class="inputDiv">
    <p>
      <span class="iconfont" :class="[isSec,iconname]"></span>
      <input
        :type="type"
        @click="handler"
        :placeholder="placeholder"
        :name="inputname"
        class="msginp"
        v-model.trim="inputVal"
        @change="sendVal"
      />
      <span class="line" :class="isActive"></span>
    </p>
    <p class="errTitle" v-if="!isOK">{{this.errMsg}}</p>
  </div>
</template>

<script>
export default {
  props: [
    "isSec",
    "isActive",
    "curNum",
    "num",
    "placeholder",
    "type",
    "inputname",
    "iconname",
    "ruler",
    "errMsg",
  ],
  data() {
    return {
      inputVal: "",
      isOK: true,
    };
  },
  watch: {
    inputVal() {
      if (!this.ruler) {
        return;
      }
      // 监听inputVal，通过正则表达式校验是否合法
      const reg = this.ruler;

      // console.log(reg);
      if (reg.test(this.inputVal)) {
        // console.log("可以使用");
        this.isOK = true;
      } else {
        this.isOK = false;
        // console.log(this.errMsg);
      }
    },
  },
  methods: {
    handler() {
      this.$emit("changeNum", this.num);
    },
    sendVal() {
      this.$emit("getInpVal", this.inputVal);
      this.$emit("getisErro",this.isOK)
    },
  },
  computed: {},
};
</script>

<style lang="less" scoped>
input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: rgba(255, 255, 255, 0.644);
  font-size: 14px;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: rgba(255, 255, 255, 0.644);
  font-size: 14px;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: rgba(255, 255, 255, 0.644);
  font-size: 14px;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: rgba(255, 255, 255, 0.644);
  font-size: 14px;
}
.inputDiv {
  position: relative;
  .errTitle {
    position: absolute;
    top: 22/360*100vw;
    right: 5/360*100vw;
    text-align: left;
    padding-left: 40/360 * 100vw;
    color: #dc143c;
    z-index: -1;
  }
}
p {
  position: relative;
  z-index: 10;
  .line {
    position: absolute;
    bottom: 0.3vh;
    left: 9vw;
    width: 1vw;
    height: 2px;
    transition: all 1s;
    transform-origin: left;
  }
  .active {
    background: linear-gradient(to right, #7653c8, #73f5c9);
    transform: scale(70, 1);
  }
  .activeBk {
    background: linear-gradient(to right, #7653c8, #73f5c9);
    transform: scale(0, 1);
  }

  .iconfont {
    font-size: 6vw;
    vertical-align: middle;
    margin-right: 5px;
    color: rgba(73, 72, 72, 0.6);
    font-weight: 700;
  }
  .isSec {
    color: #844dc3;
  }
  .msginp {
    width: 70vw;
    height: 5vh;
    margin-top: 20px;
    text-indent: 10px;
    font-size: 16px;
    color: rgba(73, 72, 72, 1);
    background: transparent;
    /* 实现背景边框下划线渐变色 */
    // transition: border 1s;
    // border-bottom: 2px solid transparent;
    // border-image: linear-gradient(to right, #7653c8, #73f5c9) 1 10;
  }
}
</style>