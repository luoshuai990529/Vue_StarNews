<template>
  <div class="perInfo">
    <!-- 头像 个人信息 -->
    <div class="headerIcon">
      <div class="myStatus clearfix">
        <!-- 头像 -->
        <div class="iconShow">
          <img :src="headimg" alt />
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
      <peropt-temp :msg1="'我的关注'" :msg2="'关注的用户'" @emitclick="handler('跳转我的关注')"></peropt-temp>
      <!-- 我的跟帖 -->
      <peropt-temp :msg1="'我的跟帖'" :msg2="'跟帖/回复'" @emitclick="handler('跳转跟帖回复')"></peropt-temp>
      <!-- 我的收藏 -->
      <peropt-temp :msg1="'我的收藏'" :msg2="'文章/视频'" @emitclick="handler('跳转文章视频')"></peropt-temp>
      <!-- 设置 -->
      <peropt-temp :msg1="'设置'" :msg2="''" @emitclick="handler('跳转设置')"></peropt-temp>
    </div>
    <transition 
      enter-active-class="animated bounceInRight"
      leave-active-class="animated bounceOutRight">
      <router-view name="EditInfoTemp"></router-view>
    </transition>
  </div>
</template>

<script>
import PeroptTemp from "@/components/PeroptTemp.vue";
export default {
  filters: {
    formateDate: function (val) {
      let str = new Date(val).toLocaleDateString();
      return str;
    },
  },
  data() {
    return {
      nickname: "火星包",
      createdate: "2020-08-07",
      gender: 1,
      headimg: "../../assets/images/d1.jpg",
      userId:""
    };
  },
  components: {
    PeroptTemp,
  },
  methods: {
    handler(val) {
      console.log(val);
    },
    editInfo(){
      console.log('编辑我的信息');
      this.$router.push("/perinfo/editinfo?id="+this.userId)
    }
  },
  mounted() {
    // 如果用户没有登录 跳转到登录页面
    if (!localStorage.getItem("Authorization")) {
      this.$toast.fail("请先登录!");
      location.href = "#/login";
    }

    //发送请求渲染个人中心数据
    this.$axios({
      url: "/user/" + localStorage.getItem("userId"),
      method: "get",
    }).then((res) => {
      console.log(res.data.data);
      this.nickname = res.data.data.nickname;
      this.createdate = res.data.data.create_date;
      this.gender = res.data.data.gender;
      this.headimg = "http://127.0.0.1:3000"+res.data.data.head_img;
      this.userId= res.data.data.id
    });
  },
};
</script>

<style lang="less" scoped>
.perInfo {
  height: 100vh;

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
        img {
          width: 70/360 * 100vw;
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
          width: 28/360*100vw;
          height: 28/360*100vw;
          line-height: 28/360*100vw;
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
  }
}
</style>