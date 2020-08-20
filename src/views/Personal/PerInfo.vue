<template>
  <div class="perInfo">
    <!-- 头像 个人信息 -->
    <div class="headerIcon">
      <div class="myStatus clearfix">
        <!-- 头像 -->
        <div class="iconShow" v-if="headimg">
          <img :src="'http://localhost:3000'+headimg" alt />
        </div>
        <div class="iconShow" v-else>
          <img src="@/assets/images/d1.jpg" alt />
        </div>
        <!-- 姓名 生日 -->
        <div class="headerMsg">
          <div class="msg1">
            <p>
              <i class="iconfont" :class="gender==1?'icon-xingbienan':'icon-xingbienv'"></i>
              <span class="nickname">{{nickname}}</span>
            </p>
            <p class="createDate">{{createdate | formateDate}}</p>
          </div>
          <i class="iconfont icon-youjiantou" @click="editInfo"></i>
        </div>
      </div>
    </div>
    <!-- 我的关注、跟帖、收藏、设置 抽离成组件 -->
    <div class="perOption">
      <!-- 我的关注 -->
      <peropt-temp :msg1="'我的关注'" :msg2="'关注的用户'" @emitclick="handler('Attention')"></peropt-temp>
      <!-- 我的跟帖 -->
      <peropt-temp :msg1="'我的跟帖'" :msg2="'跟帖/回复'" @emitclick="handler('myDiscuss')"></peropt-temp>
      <!-- 我的收藏 -->
      <peropt-temp :msg1="'我的收藏'" :msg2="'文章/视频'" @emitclick="handler('myStar')"></peropt-temp>
      <!-- 栏目管理 -->
      <peropt-temp :msg1="'栏目管理'" :msg2="'文章分类'" @emitclick="handler('Manager')"></peropt-temp>
      <!-- 设置 -->
      <peropt-temp :msg1="'设置'" :msg2="''" @emitclick="handler('setting')"></peropt-temp>
      <peropt-temp :msg1="'退出'" :msg2="''" @emitclick="logout"></peropt-temp>
      <p>
        <button class="backIndex" @click="backIndex">回到首页</button>
      </p>
    </div>
    <!-- 编辑子路由 -->
    <transition
      enter-active-class="animated bounceInRight"
      leave-active-class="animated bounceOutRight"
    >
      <router-view name="EditInfoTemp"></router-view>
    </transition>
    <!-- 关注子路由 -->
    <transition
      enter-active-class="animated bounceInRight"
      leave-active-class="animated bounceOutRight"
    >
      <router-view name="AttentionTemp"></router-view>
    </transition>
    <!-- 我的收藏子路由 -->
    <transition
      enter-active-class="animated bounceInRight"
      leave-active-class="animated bounceOutRight"
    >
      <router-view name="myStarTemp"></router-view>
    </transition>
    <!-- 我的跟帖回复子路由 -->
    <transition
      enter-active-class="animated bounceInRight"
      leave-active-class="animated bounceOutRight"
    >
      <router-view name="myDiscussTemp"></router-view>
    </transition>
    <!-- 栏目管理子路由 -->
    <transition
      enter-active-class="animated bounceInRight"
      leave-active-class="animated bounceOutRight"
    >
      <router-view name="ManagerTemp"></router-view>
    </transition>
  </div>
</template>

<script>
import PeroptTemp from "@/components/PeroptTemp.vue";
export default {
  filters: {
    formateDate: function (val) {
      let str = val.split("T")[0];
      return str;
    },
  },
  data() {
    return {
      nickname: "火星包",
      createdate: "2020-08-07",
      gender: 1,
      headimg: "",
      userId: "",
    };
  },
  components: {
    PeroptTemp,
  },
  methods: {
    handler(val) {
      if (val == "Attention") {
        this.$router.push("/perinfo/attention");
      } else if (val == "myStar") {
        this.$router.push("/perinfo/mystar");
      } else if (val == "setting") {
        this.editInfo();
      } else if (val == "myDiscuss") {
        this.$router.push("/perinfo/mydiscuss");
      }else if(val=="Manager"){
        this.$router.push("/perinfo/columnmanager");
      }
    },
    logout() {
      this.$dialog
        .confirm({
          message: "你确定要退出登录吗？",
        })
        .then(() => {
          // 1.清理登录记录 包括token和userId
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          localStorage.removeItem("categoryList")
          localStorage.removeItem("delCategoryList")
          // 2.跳转到登录界面
          // this.$router.push("/login")
          // push后退回来还是个人中心，但是由于没有登录
          // 所以页面会报错，所以用replace替换 那么后退就不会到个人中心，而是到首页
          this.$router.replace("/login");
        })
        .catch(() => {});
    },
    editInfo() {
      console.log("编辑我的信息");
      this.$router.push("/perinfo/editinfo?id=" + this.userId);
    },
    loadPage() {
      this.$axios({
        url: "/user/" + localStorage.getItem("userId"),
        method: "get",
      }).then((res) => {
        // console.log(res.data);
        // 如果token或者userId出现问题
        // 获取数据失败，那么就要跳转到登录页
        if (res.data.statusCode == 401) {
          this.$toast.fail("请先登录!");

          // 清理错误信息
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          // 跳转
          this.$router.replace("/login");
        } else {
          this.nickname = res.data.data.nickname;
          this.createdate = res.data.data.create_date;
          this.gender = res.data.data.gender;
          this.headimg = res.data.data.head_img;
          this.userId = res.data.data.id;
        }
      });
    },
    backIndex() {
      this.$router.push(
        "/home?category=" + Number(localStorage.getItem("curCategoryIndex"))
      );
    },
  },
  watch: {
    // 监听路由的变化 ，从编辑信息到个人中心页就重新渲染信息
    "$route.path": function (curVal, oldVal) {
      console.log("当前path:" + curVal, "之前path：" + oldVal);
      if (curVal == "/perinfo" && oldVal == "/perinfo/editinfo") {
        // 重新渲染页面
        console.log("渲染个人中心");
        this.loadPage();
      }
    },
  },
  mounted() {
    //发送请求渲染个人中心数据
    this.loadPage();
    // this.$axios({
    //   url: "/user/" + localStorage.getItem("userId"),
    //   method: "get",
    // }).then((res) => {
    //   // console.log(res.data);
    //   // 如果token或者userId出现问题
    //   // 获取数据失败，那么就要跳转到登录页
    //   if (res.data.statusCode == 401) {
    //     this.$toast.fail("请先登录!");
    //     // 清理错误信息
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("userId");
    //     // 跳转
    //     this.$router.replace("/login");
    //   } else {
    //     this.nickname = res.data.data.nickname;
    //     this.createdate = res.data.data.create_date;
    //     this.gender = res.data.data.gender;
    //     this.headimg = res.data.data.head_img;
    //     this.userId = res.data.data.id;
    //   }
    // });
  },
};
</script>

<style lang="less" scoped>
.perInfo {
  min-height: 100vh;

  /* 个人头像信息样式 */
  .icon-youjiantou {
    color: #b8b6b6;
  }
  .headerIcon {
    height: 130/360 * 100vw;
    // background: #f2f2f2;
    background: url("../../assets/images/perbg4.jpg") no-repeat center;
    background-size: cover;
    overflow: hidden;
    .myStatus {
      display: flex;
      padding-left: 20/360 * 100vw;
      margin-top: 7.777778vw;
      .iconShow {
        flex: 1;
        width: 70/360 * 100vw;
        height: 65/360 * 100vw;
        border-radius: 35/360 * 100vw;
        border: 1px solid #fff;
        overflow: hidden;
        object-fit: contain;
        img {
          width: 70/360 * 100vw;
          height: 70/360 * 100vw;
        }
      }
      .headerMsg {
        position: relative;
        padding-left: 20/360 * 100vw;
        flex: 4;
        height: 70/360 * 100vw;
        .msg1 {
          color: #ffffff;
          margin-top: 15/360 * 100vw;
          > span {
            display: block;
          }
          .createDate {
            margin-top: 5/360 * 100vw;
          }
          .nickname {
            margin-left: 9/360 * 100vw;
          }
          .icon-xingbienan {
            color: skyblue;
          }
          .icon-xingbienv {
            color: #ff95ca;
          }
        }
        .icon-youjiantou {
          position: absolute;
          right: 0;
          top: 50%;
          width: 28/360 * 100vw;
          height: 28/360 * 100vw;
          line-height: 28/360 * 100vw;
          text-align: center;
          transform: translate3d(-50%, -50%, 0);
        }
      }
    }
  }

  /* option样式 */
  .perOption {
    padding-left: 20/360 * 100vw;
    > div {
      height: 50/360 * 100vw;
      line-height: 50/360 * 100vw;
      border-bottom: 1px solid #e4e4e4;
      display: flex;
      .msg_1 {
        color: #202020;
        flex: 1;
      }
      .msg_2 {
        color: #c4c4c4;
        flex: 1;
        text-align: right;
        padding-right: 10/360 * 100vw;
      }
    }
    > p {
      text-align: center;
      margin-top: 20/360 * 100vw;
      .backIndex {
        background: rgb(21, 159, 238);
        color: #fff;
        border: none;
        border-radius: 24/360 * 100vw;
        margin: 10/360 * 100vw auto;
        padding: 10/360 * 100vw 40/360 * 100vw;
      }
    }
  }
}
</style>