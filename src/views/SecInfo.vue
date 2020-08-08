<template>
  <div class="secPage">
    <!-- 搜索栏 -->
    <div class="search">
      <div class="headerSec">
        <div class="topSec">
          <!-- logo -->
          <div class="logo">
            <a href="/#/" class="iconfont icon-fanhui"></a>
          </div>
          <!-- 搜索框 -->
          <div class="secInfo">
            <input
              class="secInput"
              @focus="goSecPage"
              @blur="getInfo"
              :value="secInputInfo"
              v-focus
              type="text"
              name="secinfomation"
            />
            <i class="iconfont icon-sousuo"></i>
          </div>
          <!-- 我的信息 -->
          <div class="perInfo">
            <a href="#" class>搜索</a>
          </div>
        </div>
      </div>
    </div>
    <!-- 历史记录 -->
    <div class="history">
      <p class="hsytitle">
        <b>历史记录</b>
        <a href="#">
          清空
          <i class="iconfont icon-quxiao"></i>
        </a>
      </p>
      <div class="hsyitems">
        <a href="#">马杀鸡</a>
        <a href="#">马杀鸡</a>
        <a href="#">疾风剑豪</a>
        <a href="#">本杰明巴顿奇事</a>
        <a href="#">本杰明巴顿奇事</a>
        <a href="#">本杰明巴顿奇事</a>
      </div>
    </div>
    <!-- 热门搜索 -->
    <div class="hotsec">
      <p class="hottitle">
        <b>热门搜索</b>
      </p>
      <div class="hotitem">
        <a href="#">
          <i>1.</i> FPX 惊险 bo5
          <span class="iconfont icon-redian"></span>
        </a>
        <a href="#">
          <i>2.</i> GitHub又崩了
          <span class="iconfont icon-redian"></span>
        </a>
        <a href="#">
          <i>3.</i> 十年前的你
          <span class="iconfont icon-redian"></span>
        </a>
        <a href="#">
          <i>4.</i> 华晨宇新专辑发售
          <span class></span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  directives: {
    focus: {
      inserted: function (el) {
          el.focus();
      },
    },
  },
  data() {
    return {
      secInputInfo: "搜索最新资讯",
    };
  },
  methods: {
    goSecPage() {
      this.secInputInfo = "";
      window.location.href = "/#/secinfo";
    },
    getInfo() {
      this.secInputInfo = "搜索最新资讯";
    },
  },
};
</script>

<style lang="less" scoped>
.secPage {
  height: 100vh;
  background: #f2f2f2;
  .search {
    .headerSec {
      width: 100vw;
      .topSec {
        height: 50/360 * 100vw;
        display: flex;
        // background: rgb(63, 152, 236);
        > div {
          color: #333;
          text-align: center;
          line-height: 50/360 * 100vw;
          justify-content: space-between;
          .icon-new {
            font-size: 50/360 * 100vw;
          }
        }
        .logo {
          flex: 2;
        }
        .secInfo {
          position: relative;
          flex: 6;
          .icon-sousuo {
            position: absolute;
            left: 8/360 * 100vw;
            font-size: 16/360 * 100vw;
            line-height: 49/360 * 100vw;
          }
          .secInput {
            width: 240/360 * 100vw;
            height: 35/360 * 100vw;
            font-size: 14/360 * 100vw;
            // text-indent: 30/360*100vw;
            text-align: center;
            border-radius: 17/360 * 100vw;
            background: rgba(209, 208, 208, 0.527);
          }
        }
        .perInfo {
          flex: 2;
        }
      }
    }
  }

  /* 历史记录样式 */
  .history {
    margin-top: 20/360 * 100vw;

    .hsytitle {
      display: flex;
      margin-left: 8/360 * 100vw;
      padding: 0 20/360 * 100vw;
      b {
        flex: 10;
      }
      a {
        flex: 2;
        background: rgba(209, 208, 208, 0.527);
        border-radius: 8/360 * 100vw;
        font-size: 12/360 * 100vw;
        text-align: center;
        .iconfont {
          vertical-align: middle;
          font-size: 12/360 * 100vw;
        }
      }
    }

    .hsyitems {
      margin: 10/360 * 100vw auto;
      width: 325/360 * 100vw;
      padding-bottom: 20/360 * 100vw;
      border-bottom: 1px solid #d7d7d7;
      a {
        // &:first-child {
        //   margin-left: 0;
        // }
        display: inline-block;
        border: 1px solid #d7d7d7;
        padding: 3px;
        margin-left: 8/360 * 100vw;
        margin-top: 8 /360 * 100vw;
        color: #333333;
      }
    }
  }

  /* 热门搜索 */
  .hotsec {
    margin-top: 20/360 * 100vw;
    margin-left: 8/360 * 100vw;
    padding: 0 20/360 * 100vw;
    .hotitem {
      a {
        display: block;
        border-bottom: 1px solid #dbdbdb;
        margin-top: 10/360 * 100vw;
      }
      .iconfont {
        font-size: 12/360 * 100vw;
        color: rgb(240, 70, 70);
        margin-left: 10/360 * 100vw;
      }
    }
  }
}
</style>