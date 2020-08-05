<template id="apptemp">
  <div class="homepage">
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
    };
  },
  components: {
    
  },
  methods: {
    
  },
};
</script>

<style>
.animated.bounceInUp,
.animated.bounceOutDown {
  animation-duration: 1s;
}

</style>