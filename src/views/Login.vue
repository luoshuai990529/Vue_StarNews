<template id="logintemp">
  <div class="login">
    <div class="header">
      <router-link to="/">
        <span class="iconfont icon-xiahua"></span>
      </router-link>
    </div>
    <div class="login_main">
      <transition appear enter-active-class="animated jello">
        <div class="logo">
          <span class="iconfont icon-new"></span>
          <b>IT Info</b>
        </div>
      </transition>
      <div class="userMsg">
        <form action="#" method="post">
          <input type="text" placeholder="用户名/手机号码" name="username" class="username msginp" />
          <input type="password" placeholder="密码" name="password" class="password msginp" />
          <button class="loginBtn" @onclik.prevent>登 录</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.login {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: url("../images/bg-01.jpg") no-repeat;
  background-size: cover;
  .header {
    .icon-xiahua {
      font-size: 45px;
      color: rgb(65, 65, 65);
    }
  }
  .login_main {
    width: 80vw;
    height: 30vw;
    margin: 30px auto;
    text-align: center;

    .animated.jello {
      animation-delay: 1s;
    }
    .logo {
      color: #ffffff;
      border: 2px solid #eee;
      text-shadow: 0 0 0.1em, 0 0 0.3em;
      .icon-new {
        font-size: 24vw;
        vertical-align: middle;
      }
      b {
        font-size: 9vw;
        font-weight: 400;
        vertical-align: middle;
      }
    }
    .userMsg {
      width: 70vw;
      margin: 60px auto;
      form {
        background: turquoise;
        input{
          background: red;
        }
      }
      .msginp {
        width: 70vw;
        height: 5vh;
        margin-top: 20px;
        text-indent: 10px;
        font-size: 20px;
        background: red !important;
        background-image: none;
      }
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
          background: rgb(111, 111, 112);
        }
      }
    }
  }
}
</style>