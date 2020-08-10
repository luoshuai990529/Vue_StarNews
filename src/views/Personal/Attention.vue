<template>
  <div class="attention">
    <per-nav-temp :navtitle="'我的关注'" @clickNav="backHandler('返回个人中心')"></per-nav-temp>
    <div class="attentionList">
      <attent-temp
        v-for="(item,index) of attenlist"
        :key="index"
        :attname="item.nickname"
        :attimg="item.head_img"
        :attdate="item.create_date | formateDate"
        @cancelClick="cancelhandler"
      ></attent-temp>
    </div>
  </div>
</template>

<script>
import PerNavTemp from "@/components/PerNavTemp.vue";
import AttentTemp from "@/components/AttentTemp.vue";
export default {
  filters: {
    formateDate: function (val) {
      let str = val.split("T")[0];
      return str;
    },
  },
  data() {
    return {
      attenlist: [],
    };
  },
  components: {
    PerNavTemp,
    AttentTemp,
  },
  methods: {
    backHandler(msg) {
      this.$router.back();
    },
    cancelhandler() {
      console.log("取消关注");
    },
  },
  mounted() {
    // 请求关注列表
    this.$axios({
      url: "/user_follows",
      method: "get",
    }).then((res) => {
      console.log(res.data);
      this.attenlist = res.data.data;
    });
  },
};
</script>

<style lang="less" scoped>
.attention {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f2f2f2;
  height: 100vh;
}
</style>