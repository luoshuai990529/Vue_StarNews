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
    <!-- 我的关注、跟帖、收藏、设置 -->
    <div class="perOption">
      <!-- 我的关注 -->
      <div class="myAtten">
        <a href="#" class="msg_1">我的关注</a>
        <a href="#" class="msg_2">
          关注的用户
          <i class="iconfont icon-youjiantou"></i>
        </a>
      </div>
      <!-- 我的跟帖 -->
      <div class="myFlup">
        <a href="#" class="msg_1">我的跟帖</a>
        <a href="#" class="msg_2">
          跟帖/回复
          <i class="iconfont icon-youjiantou"></i>
        </a>
      </div>
      <!-- 我的收藏 -->
      <div class="myCollect"></div>
      <!-- 设置 -->
      <div class="mySetting"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scope>
.perInfo {
  /* 个人头像信息样式 */
  .headerIcon {
    height: 130/360 * 100vw;
    background: #f2f2f2;
    overflow: hidden;
    .myStatus {
      // padding: 20/360*100vw;
      display: flex;
      padding-left: 20/360*100vw;
      margin-top: 7.777778vw;
      // line-height: 130/360 * 100vw;
      .iconShow {
        flex: 1;
        width: 70/360 * 100vw;
        height: 70/360 * 100vw;
        border-radius: 35/360 * 100vw;
        overflow: hidden;
        img {
          width: 70/360 * 100vw;
        }
      }
      .headerMsg {
        position: relative;
        padding-left: 20/360*100vw;
        flex: 4;
        height: 70/360 * 100vw;
        .msg1{
          margin-top: 15/360*100vw;
          >span{
            display: block;
          }
        }
        .icon-youjiantou{
          position: absolute;
          right: 0;
          top: 50%;
          transform: translate3d(-50%,-50%,0);
        }
      }
    }
  }

  /* option样式 */
  .perOption {
  }
}
</style>