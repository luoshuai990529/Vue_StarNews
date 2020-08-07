<template id="BtnTemp">
  <div class="baseBtnTemp">
    <button class="loginBtn" @click="getInpVal">{{btnmsg}}</button>
  </div>
</template>

<script>
export default {
  props: ["btnmsg", "inputValObj"],
  data() {
    return {};
  },
  methods: {
    // 判断当前点击的是登录还是注册
    getInpVal() {
      //$emit将自定义事件传递给父组件
      this.$emit("isClickBtn")
      // if (this.btnmsg == "登录") {
      //   console.log("你点击的登录按钮");
      //   console.log(this.inputValObj);
      //   window.location.href = "/#/perinfo";
      // } else if (this.btnmsg == "注册") {
      //   console.log("你点击的注册按钮");
      //   for (var key in this.inputValObj) {
      //     if (this.inputValObj[key].trim() == "") {
      //       this.$toast.fail("不能输入空值！");
      //       return
      //     }
      //   }
      //   console.log(this.inputValObj);
      // }
    },
  },
};
</script>

<style lang="less" scoped>
.loginBtn {
  margin-top: 20px;
  width: 50vw;
  height: 5vh;
  border: none;
  outline: none;
  border-radius: 2.5vh;
  color: #fff;
  background: linear-gradient(to right, #ac45f4, #0fcee0);
  font-size: 16px;
  font-weight: 700;
  &:active {
    font-size: 14px;
  }
}
</style>