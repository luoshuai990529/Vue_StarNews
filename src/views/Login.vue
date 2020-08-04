<template>
  <div class="login">
    <h2>登录页</h2>
    <div class="login_main">
        <router-link to="/">关闭</router-link>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, rgb(97, 238, 226), rgb(245, 231, 102));
  .login_main{
    a{
      font-size: 20px;
    }
  }
}
</style>