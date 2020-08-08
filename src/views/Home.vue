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
          <a href="#/login" class="iconfont icon-wode1"></a>
        </div>
      </div>
      <!-- 资讯标签栏 -->
      <div class="newList">
        <div class="items">
          <van-tabs>
            <van-tab v-for="index in 8" :title="'标签 ' + index" :key="index"></van-tab>
          </van-tabs>
        </div>
        <div class="glide">
          <i class="iconfont icon-xiahua"></i>
        </div>
      </div>
    </div>
    <!-- 新闻内容 -->
    <div class="newsContent">
      <!-- <div class="newsItem">
        <p class="newsTitle titleActive">亚马逊雨林为何燃烧？除了新总统"急功近利"的开发，国际资本才是真凶</p>
        <div class="imgList"></div>
        <div class="newsVideo"></div>
        <div class="botMsg">
          <span class="pulmsg">火星时报</span>
          <span class="tie">53跟帖</span>
        </div>
      </div>

      <div class="newsItem">
        <p class="newsTitle">亚马逊雨林为何燃烧？除了新总统"急功近利"的开发，国际资本才是真凶</p>
        <div class="imgList">
          <span>
            <van-image
              fit
              src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3051197162,582371333&fm=26&gp=0.jpg"
            />
          </span>
          <span>
            <van-image
              fit
              src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1863650379,2889357725&fm=26&gp=0.jpg"
            />
          </span>
          <span>
            <van-image
              fit
              src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1234977275,3328092187&fm=26&gp=0.jpg"
            />
          </span>
        </div>
        <div class="newsVideo"></div>
        <div class="botMsg">
          <span class="pulmsg">火星时报</span>
          <span class="tie">53跟帖</span>
        </div>
      </div>
      <div class="newsItem">
        <p class="newsTitle">吉他指弹青鸟</p>
        <div class="imgList"></div>
        <div class="newsVideo">
          <video src="../assets/images/qn.mp4" controls="controls" width></video>
        </div>
        <div class="botMsg">
          <span class="pulmsg">火星时报</span>
          <span class="tie">53跟帖</span>
        </div>
      </div>
      <div class="newsItem">
        <p class="newsTitle titleActive">亚马逊雨林为何燃烧？除了新总统"急功近利"的开发，国际资本才是真凶</p>
        <div class="imgList"></div>
        <div class="newsVideo"></div>
        <div class="botMsg">
          <span class="pulmsg">火星时报</span>
          <span class="tie">53跟帖</span>
        </div>
      </div>-->
      <!-- ------------------ -->
      <news-temp
        v-for="(item, index) in newsList"
        :key="index"
        :pulmsg="'光子报道'"
        :tienum="'26跟帖'"
        :newstitle="item.title"
        :imglist="[item.cover[0].url]"
        :titleActive="''"
      ></news-temp>

     

      
      <news-temp :pulmsg="'火星报道'" :tienum="'44跟帖'" 
      :newstitle="`亚马逊雨林为何燃烧？除了新总统'急功近利'的开发，国际资本才是真凶`"
      :imglist="imglist"
      :titleActive="''"></news-temp>

      <news-temp :pulmsg="'天路报道'" :tienum="'34跟帖'" 
      :newstitle="`亚马逊雨林为何燃烧？除了新总统'急功近利'的开发，国际资本才是真凶`"
      :videosrc="'../assets/images/qn.mp4'"
      :titleActive="''"></news-temp>

      <news-temp :pulmsg="'人民月报'" :tienum="'22跟帖'" 
      :newstitle="`亚马逊雨林为何燃烧？除了新总统'急功近利'的开发，国际资本才是真凶`"
      :titleActive="'titleActive'"></news-temp>
    </div>
  </div>
</template>

<script>
import NewsTemp from "../components/NewsTemp.vue";
export default {
  data() {
    return {
      secInputInfo: "搜索最新资讯",
      imglist: [
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1234977275,3328092187&fm=26&gp=0.jpg",
        "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1863650379,2889357725&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3051197162,582371333&fm=26&gp=0.jpg",
      ],
      newsList: "",
    };
  },
  methods: {
    goSecPage() {
      this.secInputInfo = "";
      return;
    },
    getInfo() {
      this.secInputInfo = "搜索最新资讯";
    },
  },
  components: {
    NewsTemp,
  },
  mounted() {
    // 发送ajax请求
    let _this = this;
    let newsData;
    this.$axios({
      url: "http://157.122.54.189:9083/post",
      method: "get",
      params: {},
    }).then((res) => {
      if (res.status === 200) {
        newsData = res.data.data;
        _this.newsList = newsData;
        console.log(_this.newsList);

      }
    });
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
</style>
<style lang="less" scoped>
.home {
  width: 100vw;
  overflow: hidden;
  .headerSec {
    position: fixed;
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
      height: 40/360 * 100vw;
      background: rgb(246, 246, 246);
      display: flex;
      .items {
        flex: 7;
      }
      .glide {
        flex: 1;
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