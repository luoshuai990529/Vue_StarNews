<template>
  <div class="home">
    <!-- 头部搜索栏 标签栏 -->
    <div class="headerSec">
      <div class="topSec">
        <!-- logo -->
        <div class="logo">
          <i class="iconfont icon-new"></i>
        </div>
        <!-- 搜索框 -->
        <div class="secInfo">
          <input
            class="secInput"
            @focus="goSecPage"
            @blur="getInfo"
            :value="secInputInfo"
            type="text"
            name="secinfomation"
          />
          <i class="iconfont icon-sousuo"></i>
        </div>
        <!-- 我的信息 -->
        <div class="perInfo">
          <a href="#/perinfo" class="iconfont icon-wode1"></a>
        </div>
      </div>
      <!-- 资讯标签栏目 -->
      <div class="newList">
        <div class="items" ref="newsListContent">
          <van-tabs v-model="activeTab">
            <van-tab v-for="(item,index) in columList" :title="item.name" :key="index">
              <div>
                <post-temp :postData="item" v-for="(item, index) in postData" :key="index"></post-temp>
              </div>
            </van-tab>
          </van-tabs>
        </div>
        <div class="glide">
          <i class="iconfont icon-xiahua"></i>
        </div>
      </div>
    </div>
    <!-- 新闻内容 -->
    <div class="newsContent" ref="createContent"></div>
  </div>
</template>

<script>
import PostTemp from "../components/PostTemp.vue";
export default {
  data() {
    return {
      activeTab: "",
      secInputInfo: "搜索最新资讯",
      columList: "",
      postData: "",
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
    loadPost(index) {
      // 发送ajax请求请求psot新闻
      this.$axios({
        url: "/post",
        method: "get",
        params: {
          // 数据的页数
          pageIndex: 1,
          // 数据显示的类别
          category: index,
          // 指定一次要拿出几条数据
          pageSize: 6,
        },
      }).then((res) => {
        console.log("-----------------新闻列表--------------");
        console.log(res.data.data);
        if (res.status === 200) {
          this.postData = res.data.data;
        }
      });
    },
  },
  components: {
    PostTemp,
  },
  watch: {
    // 监听tab标签栏的变化 每次变化都会传过来一个索引值
    activeTab: function (index) {
      console.log("tab栏的index值:" + index);
      this.loadPost(index);
    },
  },
  mounted() {
    // 请求首页栏目数据
    this.$axios({
      url: "/category",
      method: "get",
    }).then((res) => {
      // console.log(res.data.data);
      this.columList = res.data.data;
    });
    // 操作Dom
    let itemElem = this.$refs.newsListContent.getElementsByClassName(
      "van-tabs__content"
    )[0];
    let currCon = this.$refs.createContent;
    // console.log(currCon, itemElem);
    currCon.appendChild(itemElem);
  },
};
</script>
<style lang="less">
.home {
  .newList {
    .van-tabs {
      height: 100%;
    }
    .van-tabs__line {
      background-color: #248cec;
    }
    .van-tabs__wrap,
    .van-tabs__nav {
      background: rgb(246, 246, 246);
      height: 100%;
    }
  }
  .van-image {
    img {
      width: 110/360 * 100vw;
      height: 75/360 * 100vw;
    }
  }
}
/* 编辑页面上传图片样式 */

.van-uploader__wrapper {
  width: 100%;
  height: 100%;
  .van-uploader__upload {
    margin: 0;
  }
}
</style>
<style lang="less" scoped>
.home {
  width: 100vw;
  // overflow: hidden;
  .headerSec {
    position: fixed;
    top: 0;
    z-index: 100;
    width: 100vw;
    .topSec {
      height: 50/360 * 100vw;
      display: flex;
      background: rgb(63, 152, 236);
      > div {
        color: #fff;
        text-align: center;
        line-height: 50/360 * 100vw;
        justify-content: space-between;
        .icon-new {
          font-size: 50/360 * 100vw;
        }
        .icon-wode1 {
          color: #fff;
          font-size: 24/360 * 100vw;
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
          font-size: 18/360 * 100vw;
          line-height: 49/360 * 100vw;
        }
        .secInput {
          width: 210/360 * 100vw;
          height: 35/360 * 100vw;
          font-size: 14/360 * 100vw;
          // text-indent: 30/360*100vw;
          text-align: center;
          border-radius: 17/360 * 100vw;
          background: rgba(230, 228, 228, 0.527);
        }
      }
      .perInfo {
        flex: 2;
      }
    }
    .newList {
      position: relative;
      height: 40/360 * 100vw;
      background: rgb(246, 246, 246);
      display: flex;
      .items {
        flex: 7;
        width: 100vw;
      }
      .glide {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 100;
        background: rgb(230, 228, 228);
        width: 37/360 * 100vw;
        height: 100%;
        text-align: center;
        .iconfont {
          line-height: 40/360 * 100vw;
          font-size: 30/360 * 100vw;
          color: rgb(139, 139, 139);
        }
      }
    }
  }

  /* 新闻内容样式 */
  .newsContent {
    margin-top: 90/360 * 100vw;

    &:last-child {
      margin-bottom: 10px;
    }
  }
}
</style>