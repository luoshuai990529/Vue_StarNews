<template>
  <div class="register">
    <h2>注册页</h2>
    <div class="register_main">
      <router-link to="/">关闭</router-link>
    </div>
  </div>
</template>

<script>
export default {
  
};
</script>

<style lang="less" scoped>
.register {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: url("../images/bg-01.jpg") no-repeat;
  background-size: cover;
  h2{
    text-align: center;
  }
}
</style>