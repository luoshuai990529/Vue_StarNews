<template>
  <div>
    测试页面
    <button class @click="sendAxios">测试接口</button>
  </div>
</template>

<script>
export default {
  methods: {
    sendAxios() {
      this.$axios({
        url: "/user_follows/" + 6,
        method: "get",
      }).then((res) => {
        console.log(res);
      });
    },
  },
  components: {},
};
</script>

<style lang="lang" scoped>
</style>