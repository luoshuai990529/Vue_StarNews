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
          :placeholder="'用户名/手机号   (最少5个字符)'"
          :inputname="'username'"
          :iconname="'icon-wode'"
          @changeNum="getNum"
          @getInpVal="setUserName"
          :ruler="/^.{5,}$/"
          :errMsg="'用户名最少5个字符'"
          @getisErro="setErroTitle1"
        ></input-temp>
        <input-temp
          :curNum="curNum"
          :num="3"
          :isSec="curNum==3?'isSec':''"
          :isActive="curNum==3?'active':'activeBk'"
          :type="'text'"
          :placeholder="'昵称   (最多不能超过6个字符)'"
          :inputname="'nickname'"
          :iconname="'icon-nicheng'"
          @changeNum="getNum"
          @getInpVal="setNickName"
          :ruler="/^.{1,6}$/"
          :errMsg="'昵称最多不能超过6个字符'"
          @getisErro="setErroTitle2"
        ></input-temp>
        <input-temp
          :curNum="curNum"
          :num="2"
          :isSec="curNum==2?'isSec':''"
          :isActive="curNum==2?'active':'activeBk'"
          :type="'password'"
          :placeholder="'密码   (密码必须6位数以上)'"
          :inputname="'passwrod'"
          :iconname="'icon-mima'"
          @changeNum="getNum"
          @getInpVal="setPassWord"
          :ruler="/^.{6,}$/"
          :errMsg="'密码必须6位数以上'"
          @getisErro="setErroTitle3"
        ></input-temp>
        <!-- <button class="loginBtn" @onclik.prevent="login">注 册</button>
        -->
        <btn-temp :btnmsg="'注册'" @isClickBtn="getInpVal"></btn-temp>
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
      inpvalObj: {
        username: "",
        nickname: "",
        password: "",
      },
      erroTileObj: {
        flag1: true,
        flag2: true,
        flag3: true,
      },
    };
  },
  methods: {
    login() {
      return;
    },
    getNum(val) {
      this.curNum = val;
    },
    /* 设置子组件input传过来的值 保存起来 */
    setUserName(val) {
      this.inpvalObj.username = val;
    },
    setNickName(val) {
      this.inpvalObj.nickname = val;
    },
    setPassWord(val) {
      this.inpvalObj.password = val;
    },
    setErroTitle1(val) {
      this.erroTileObj.flag1 = val;
    },
    setErroTitle2(val) {
      this.erroTileObj.flag2 = val;
    },
    setErroTitle3(val) {
      this.erroTileObj.flag3 = val;
    },
    /* 获取账号 昵称  密码 并且发送ajax请求进行注册的方法 */
    getInpVal() {
      // 1、判断输入框是否为空
      for (var key in this.inpvalObj) {
        if (this.inpvalObj[key].trim() == "") {
          this.$toast.fail("用户名、昵称、密码都不能为空！");
          return;
        }
      }
      // 2、判断输入的值是否都符合正则表达式
      for (var key in this.erroTileObj) {
        var value = this.erroTileObj[key];
        if(!value){
          this.$toast.fail("请输入正确格式的值");
          return
        }
      }
      // 3.都没问题发送ajax请求
      console.log('发送ajax请求');
    },
  },
  components: {
    InputTemp,
    BtnTemp,
  },
};
</script>

<style lang="less" scoped>
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