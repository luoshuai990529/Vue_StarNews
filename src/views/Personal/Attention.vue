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
        :attId="item.id"
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
    cancelhandler(attId, cancelMsg) {
      console.log("用户的id为" + attId,cancelMsg);
      if (cancelMsg == "取消关注") {
        // 发送ajax请求取消关注用户
        this.$axios({
          url: "/user_unfollow/" + attId,
          method: "get",
        }).then((res) => {
          console.log(res);
          // 取消成功之后再次渲染关注列表
          if ((res.message = "取消关注成功")) {
            this.$toast.success("取消关注成功");
            // this.loadAttPage();
          }
        });
      } else {
        // 发送ajax关注用户请求
        this.$axios({
          url: "/user_follows/" + attId,
          method: "get",
        }).then((res) => {
          console.log(res);
          if (res.data.message == "关注成功") {
            this.$toast.success(res.data.message);
          }
        });
      }
    },
    loadAttPage() {
      // 渲染关注列表
      this.$axios({
        url: "/user_follows",
        method: "get",
      }).then((res) => {
        console.log(res.data);
        this.attenlist = res.data.data;
      });
    },
  },
  mounted() {
    // 加载页面的时候渲染一次关注列表
    this.loadAttPage();
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