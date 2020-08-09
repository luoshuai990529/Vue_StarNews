<template>
  <div class="editInfo">
    
    <per-nav-temp :navtitle="'编辑资料'" @clickNav="backHandler('返回个人中心')"></per-nav-temp>
    <!-- 头像、昵称、密码、性别 -->
    <div class="infocontent">
      <div class="headimg" @click="handler('编辑头像')">
        <img :src="this.headimg" alt />
      </div>
      <p class="infotitle">
        <span>点击头像进行编辑</span>
      </p>
      <peropt-temp :msg1="'昵称'" :msg2="this.nickname" @emitclick="handler('编辑昵称')"></peropt-temp>
      <peropt-temp :msg1="'密码'" :msg2="'******'" @emitclick="handler('编辑密码')"></peropt-temp>
      <peropt-temp :msg1="'性别'" :msg2="this.gender==1?'男':'女'" @emitclick="handler('编辑性别')"></peropt-temp>
    </div>
  </div>
</template>

<script>
// 导入组件
import PeroptTemp from "@/components/PeroptTemp.vue";
import PerNavTemp from "@/components/PerNavTemp.vue";
export default {
  data() {
    return {
      nickname: "火星包",
      gender: 1,
      headimg: "",
    };
  },
  methods: {
    // 回到个人中心方法
    backperinfo() {
      this.$router.push("/perinfo");
    },
    // 点击对应的peropt-temp对应的处理函数
    handler(val) {
      console.log(val);
    },
    // PerNav组件返回对应的处理函数
    backHandler(msg){
      console.log(msg);
      this.$router.push("/perinfo")
    }
  },
  components: {
    PeroptTemp,
    PerNavTemp,
  },
  mounted() {
    // 如果用户没有登录 跳转到登录页面
    if (!localStorage.getItem("Authorization")) {
      this.$toast.fail("请先登录!");
      location.href = "#/login";
    }
    // console.log(this.$route.query.id);
    //发送请求渲染个人中心数据
    this.$axios({
      url: "/user/" + this.$route.query.id,
      method: "get",
    }).then((res) => {
      this.nickname = res.data.data.nickname;
      this.gender = res.data.data.gender;
      this.headimg = "http://127.0.0.1:3000" + res.data.data.head_img;
    });
  },
};
</script>

<style lang="less" scoped>
.editInfo {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f2f2f2;
  height: 100vh;
  
  .infocontent {
    padding-left: 20/360 * 100vw;
    .headimg {
      width: 70/360 * 100vw;
      height: 70/360 * 100vw;
      margin: 20/360 * 100vw auto 5/360 * 100vw;
      border-radius: 50%;
      border: 1px solid #fff;

      overflow: hidden;

      img {
        width: 70/360 * 100vw;
      }
    }
    .infotitle {
      span {
        color: rgb(153, 152, 152);
      }
      margin-bottom: 20/360 * 100vw;
      font-size: 12/360 * 100vw;
      text-align: center;
    }
  }
}
</style>