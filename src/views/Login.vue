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
        <!-- <form action="#" method=""> -->
        <!--组件封装 -->
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
          @getInpVal="setUserName"
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
          @getInpVal="setPassWord"
        ></input-temp>
        <!-- <button class="loginBtn" @click.prevent="login">登 录</button> -->
        <btn-temp :btnmsg="'登录'"  :inputValObj="inpvalObj"></btn-temp>
        <!-- </form> -->
        <p class="titMsg">
          <router-link to="/register" tag="span">没有账号?马上注册!</router-link>
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
      inpvalObj: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      // window.location.href = "#/perinfo";
    },
    getNum(val) {
      this.curNum = val;
    },
    setUserName(val) {
      this.inpvalObj.username = val;
    },
    setPassWord(val) {
      this.inpvalObj.password = val;
    },
  },

  components: {
    InputTemp,
    BtnTemp,
  },
  directives: {
    // 自定义获取焦点事件
    focus: {
      inserted: function (el) {
        el.focus();
      },
    },
  },
  mounted() {},
};
</script>

<style scoped lang="less" >
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
.login {
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
        font-size: 9vw;
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