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
        <!-- <p>
          <span class="iconfont icon-wode"></span>
          <input type="text" placeholder="用户名/手机号码" name="username" class="username msginp" />
          <span class="line"></span>
        </p>
        <p>
          <span class="ncmsg">NC</span>
          <input type="text" placeholder="昵称" name="nickname" class="nickname msginp" />
          <span class="line"></span>
        </p>
        <p>
          <span class="iconfont icon-mima"></span>
          <input type="password" placeholder="密码" name="password" class="password msginp" />
          <span class="line"></span>
        </p>-->
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
        <button class="loginBtn" @onclik.prevent="login">注 册</button>
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
      > p {
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
        .ncmsg {
          color: rgba(73, 72, 72, 0.6);
          font-size: 4.5vw;
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
    }
  }
}
</style>