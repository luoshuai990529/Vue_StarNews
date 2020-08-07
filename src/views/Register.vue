<template id="registertemp">
  <div class="register">
    <div class="header">
      <router-link to="/">
        <span class="iconfont icon-xiahua"></span>
      </router-link>
    </div>
    <div class="login_main">
      <transition appear enter-active-class="animated jello">
        <div class="logo">
          <span class="iconfont icon-new"></span>
          <b>注册账号</b>
        </div>
      </transition>
      <div class="userMsg">
        <!-- <form action="#" method=""> -->
        <input-temp
          :curNum="curNum"
          :num="1"
          :isSec="curNum==1?'isSec':''"
          :isActive="curNum==1?'active':'activeBk'"
          :type="'text'"
          :placeholder="'用户名/手机号'"
          :inputname="'username'"
          :iconname="'icon-wode'"
          @changeNum="getNum"
        ></input-temp>
        <input-temp
          :curNum="curNum"
          :num="3"
          :isSec="curNum==3?'isSec':''"
          :isActive="curNum==3?'active':'activeBk'"
          :type="'text'"
          :placeholder="'昵称'"
          :inputname="'nickname'"
          :iconname="'icon-nicheng'"
          @changeNum="getNum"
        ></input-temp>
        <input-temp
          :curNum="curNum"
          :num="2"
          :isSec="curNum==2?'isSec':''"
          :isActive="curNum==2?'active':'activeBk'"
          :type="'password'"
          :placeholder="'密码'"
          :inputname="'passwrod'"
          :iconname="'icon-mima'"
          @changeNum="getNum"
        ></input-temp>
        <!-- <button class="loginBtn" @onclik.prevent="login">注 册</button>
        -->
        <btn-temp :btnmsg="'注册'"></btn-temp>
        <!-- </form> -->
        <p class="titMsg">
          <router-link to="/login" tag="span">已有账号,去登陆!</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import InputTemp from "../components/InputTemp.vue";
import BtnTemp from "../components/BtnTemp.vue";
export default {
  data() {
    return {
      isActive: "active",
      notActive: "activeBk",
      curNum: "",
      isSec: "isSec",
      notSec: "",
      num: "",
    };
  },
  methods: {
    login() {
      return;
    },
    getNum(val) {
      this.curNum = val;
    },
  },
  components: {
    InputTemp,
    BtnTemp,
  },
};
</script>

<style lang="less" scoped>
input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: rgba(73, 72, 72, 0.6);
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: rgba(73, 72, 72, 0.6);
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: rgba(73, 72, 72, 0.6);
}
input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: rgba(73, 72, 72, 0.6);
}
.register {
  position: absolute;
  z-index: 200;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: url("../assets/images/bg-01.jpg") no-repeat;
  background-size: cover;
  .header {
    .icon-xiahua {
      font-size: 45px;
      color: rgb(65, 65, 65);
    }
  }
  .login_main {
    width: 80vw;
    height: 70vh;
    margin: 30px auto;
    text-align: center;

    .animated.jello {
      animation-delay: 1s;
    }
    .logo {
      color: #ffffff;
      text-shadow: 0 0 0.1em, 0 0 0.3em;
      .icon-new {
        font-size: 24vw;
        vertical-align: middle;
      }
      b {
        font-size: 7vw;
        font-weight: 400;
        vertical-align: middle;
      }
    }
    .userMsg {
      width: 80vw;
      margin: 60px auto;
      .titMsg {
        margin-top: 20px;
        font-size: 12px;
        color: rgba(65, 65, 65, 1);
      }
    }
  }
}
</style>