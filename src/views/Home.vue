<template>
  <div class="home">
    <!-- 头部搜索栏 -->
    <div class="headerSec">

    </div>


    <h1>欢迎来到首页</h1>
    <router-link to="/login">去登录页</router-link>
    <router-link to="/register">去注册页</router-link>
    <transition
      enter-active-class="animated bounceInUp"
      leave-active-class="animated bounceOutDown"
    >
      <router-view name="loginTemp"></router-view>
    </transition>
    <transition
      enter-active-class="animated bounceInUp"
      leave-active-class="animated bounceOutDown"
    >
      <router-view name="registerTemp"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "10086",
      passwrod: "123",
    };
  },
  methods: {},
  mounted() {
    // this.$toast("提示弹窗");
    // axios 使用方式
    this.$axios({
      // 一样是配置对象
      // 可以使用 http://liangwei.tech:3000/post
      // 或者本地 127.0.0.1:3000 测试
      url: "http://157.122.54.189:9083/post",
      // jq 的 type 变成了 method
      method: "get",
      params: {
        id: 1,
      },
      // 这里注意,成功回调 不再是 success
    }).then((res) => {
      console.log(res);
    });

    // this.$axios({
    //   url: "http://157.122.54.189:9083/login",
    //   method: "POST",
    //   data: {
    //     username: this.username,
    //     password: this.password,
    //   },
    // }).then((res) => {
    //   console.log(res);
    // }).catch((err)=>{
    //     console.log(err);
    // });
  },
};
</script>

<style lang="less" scope>
</style>