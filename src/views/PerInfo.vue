<template>
  <div class="perInfo">
    <!-- 头像 个人信息 -->
    <div class="headerIcon">
      <div class="myStatus clearfix">
        <!-- 头像 -->
        <div class="iconShow">
          <img src="../assets/images/d1.jpg" alt />
        </div>
        <!-- 姓名 生日 -->
        <div class="headerMsg">
          <div class="msg1">
            <p>
              <i class="iconfont icon-xingbienan"></i>
              <span class="nickname">火星包</span>
            </p>
            <p class="createDate">2020-03-01</p>
          </div>
          <i class="iconfont icon-youjiantou"></i>
        </div>
      </div>
    </div>
    <!-- 我的关注、跟帖、收藏、设置 抽离成组件 -->
    <div class="perOption">
      <!-- 我的关注 -->
      <peropt-temp :msg1="'我的关注'" :msg2="'关注的用户'"></peropt-temp>
      <!-- 我的跟帖 -->
      <peropt-temp :msg1="'我的跟帖'" :msg2="'跟帖/回复'"></peropt-temp>
      <!-- 我的收藏 -->
      <peropt-temp :msg1="'我的收藏'" :msg2="'文章/视频'"></peropt-temp>
      <!-- 设置 -->
      <peropt-temp :msg1="'设置'" :msg2="''"></peropt-temp>
    </div>
  </div>
</template>

<script>
import PeroptTemp from "../components/PeroptTemp.vue";
export default {
  data() {
    return {};
  },
  components: {
    PeroptTemp,
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
    background: url("../assets/images/perbg4.jpg") no-repeat center;
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
        }
        .icon-youjiantou {
          position: absolute;
          right: 0;
          top: 50%;
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