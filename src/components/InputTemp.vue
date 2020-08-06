<template id="InputTemp">
  <div>
    <p>
      <span class="iconfont" :class="[isSec,iconname]"></span>
      <input
        :type="type"
        @click="handler"
        :placeholder="placeholder"
        :name="inputname"
        class="msginp"
        v-model.lazy="inputVal"
      />
      <span class="line" :class="isActive"></span>
    </p>
  </div>
</template>

<script>
export default {
  props: ["isSec", "isActive","curNum","num", "placeholder", "type", "inputname", "iconname","ruler"],
  data() {
    return {
      inputVal:""
    };
  },
  watch: {
    inputVal(){
      // 监听inputVal，通过正则表达式校验是否合法
      const reg = new RegExp(this.ruler)
      console.log(reg);
      if(reg.test(this.inputVal)){
        console.log('通过了校验');
      }else{
        console.log('输入不合法');
      }
    }
  },
  methods: {
    handler(){
        this.$emit("changeNum",this.num)
    }
  },
  computed: {
      
  },
};
</script>

<style lang="less">
p {
  position: relative;
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