<template id="BtnTemp">
  <div class="baseBtnTemp">
    <button class="loginBtn" @click="getInpVal">{{btnmsg}}</button>
  </div>
</template>

<script>
export default {
  props: ["btnmsg", "inputValObj"],
  data() {
    return {
      inpValMsg: {
        username: "admin",
        password: "123",
      },
    };
  },
  methods: {
    getInpVal() {
      if (this.btnmsg == "登录") {
        console.log("你点击的登录按钮");
        console.log(this.inputValObj);
      } else if (this.btnmsg == "注册") {
      }

    //   this.$emit("getUserMsg", this.inpValMsg);
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