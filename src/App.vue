<template id="apptemp">
  <div class="homepage">
    <router-view name="HomeTemp"></router-view>
    <!-- <router-link to="/login">去登录页</router-link> -->
    <!-- <router-link to="/register">去注册页</router-link> -->
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
    <router-view name="PerInfoTemp"></router-view>
    <router-view name="SecInfoTemp"></router-view>
    <!-- <transition 
      enter-active-class="animated bounceInRight"
      leave-active-class="animated bounceOutRight">
      <router-view name="EditInfoTemp"></router-view>
    </transition> -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" >
.animated.bounceInUp,
.animated.bounceOutDown {
  animation-duration: 1s;
}
</style>