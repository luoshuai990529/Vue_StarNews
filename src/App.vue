<template id="apptemp">
  <div class="homepage">
    <Home></Home>
  </div>
</template>

<script>
import Home from "./views/Home.vue";
export default {
  data() {
    return {};
  },
  components: {
    Home
  },
  methods: {},
};
</script>

<style>
.animated.bounceInUp,
.animated.bounceOutDown {
  animation-duration: 1s;
}
</style>