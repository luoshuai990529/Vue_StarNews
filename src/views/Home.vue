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
        <div class="items">
          <van-tabs v-model="activeTab">
            <van-tab v-for="(item,index) in columList" :title="item.name" :key="index">
              <div>
                <!-- <news-temp
                  v-for="(item, index) in newsList"
                  :key="index"
                  :pulmsg="'光子报道'"
                  :tienum="'26跟帖'"
                  :newstitle="item.title"
                  :imglist="[item.cover[0].url]"
                  :titleActive="''"
                ></news-temp>-->
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
    <div class="newsContent">
      <!-- <div class="newsItem">
        <p class="newsTitle titleActive">亚马逊雨林为何燃烧？除了新总统"急功近利"的开发，国际资本才是真凶</p>
        <div class="imgList"></div>
        <div class="newsVideo"></div>
        <div class="botMsg">
          <span class="pulmsg">火星时报</span>
          <span class="tie">53跟帖</span>
        </div>
      </div> -->
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
      <!-- <news-temp
        v-for="(item, index) in newsList"
        :key="index"
        :pulmsg="'光子报道'"
        :tienum="'26跟帖'"
        :newstitle="item.title"
        :imglist="[item.cover[0].url]"
        :titleActive="''"
      ></news-temp>-->

      <news-temp
        :pulmsg="'火星报道'"
        :tienum="'44跟帖'"
        :newstitle="`亚马逊雨林为何燃烧？除了新总统'急功近利'的开发，国际资本才是真凶`"
        :imglist="imglist"
        :titleActive="''"
      ></news-temp>

      <news-temp
        :pulmsg="'天路报道'"
        :tienum="'34跟帖'"
        :newstitle="`亚马逊雨林为何燃烧？除了新总统'急功近利'的开发，国际资本才是真凶`"
        :videosrc="'../assets/images/qn.mp4'"
        :titleActive="''"
      ></news-temp>

      <news-temp
        :pulmsg="'人民月报'"
        :tienum="'22跟帖'"
        :newstitle="`亚马逊雨林为何燃烧？除了新总统'急功近利'的开发，国际资本才是真凶`"
        :titleActive="'titleActive'"
        :imglist="imglist2"
      ></news-temp>
    </div>
  </div>
</template>

<script>
import NewsTemp from "../components/NewsTemp.vue";
export default {
  data() {
    return {
      activeTab: "",
      secInputInfo: "搜索最新资讯",
      imglist: [
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1234977275,3328092187&fm=26&gp=0.jpg",
        "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1863650379,2889357725&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3051197162,582371333&fm=26&gp=0.jpg",
      ],
      imglist2: [
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1234977275,3328092187&fm=26&gp=0.jpg",
      ],
      newsList: "",
      columList: [],
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
          category: index,
        },
      }).then((res) => {
        console.log("新闻列表");
        console.log(res.data.data);
        if (res.status === 200) {
          this.newsList = res.data.data;
        }
      });
    },
  },
  components: {
    NewsTemp,
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
      console.log("栏目");
      console.log(res.data.data);
      this.columList = res.data.data;
    });

    //请求新闻数据
    // this.$axios({
    //   url: "/post",
    //   // url: "http://157.122.54.189:9083/post",
    //   method: "get",
    //   params: {},
    // }).then((res) => {
    //   console.log("新闻");
    //   console.log(res.data.data);
    //   if (res.status === 200) {
    //     this.newsList = res.data.data;
    //   }
    // });
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
  overflow: hidden;
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