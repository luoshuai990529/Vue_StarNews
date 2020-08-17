<template>
  <div class="secPage">
    <!-- 搜索栏 -->
    <div class="search">
      <div class="headerSec">
        <div class="topSec">
          <!-- logo -->
          <div class="logo">
            <a href="#" class="iconfont icon-fanhui" @click.stop.prevent="backSec"></a>
          </div>
          <!-- 搜索框 -->
          <div class="secInfo">
            <input
              class="secInput"
              @focus="goSecPage"
              @blur="secInputInfo=secInputInfo.trim()==''?'搜索最新资讯':secInputInfo"
              v-focus
              @input="searchPost"
              type="text"
              name="secinfomation"
              v-model="secInputInfo"
            />
            <i class="iconfont icon-sousuo"></i>
          </div>
          <!-- 搜索按钮 -->
          <div class="perInfo">
            <a href="#" class @click.prevent.stop="getSecInfo">搜索</a>
          </div>
        </div>
      </div>
    </div>
    <div class="mainContent" v-if="!flag">
      <!-- 历史记录 -->
      <div class="history">
        <p class="hsytitle">
          <b>历史记录</b>
          <a href="#" @click.stop.prevent="clearHistory">
            清空
            <i class="iconfont icon-quxiao"></i>
          </a>
        </p>
        <div class="hsyitems">
          <a
            href="#"
            v-for="(item, index) in historyList"
            :key="index"
            @click.stop.prevent="jumpToSecInfo(item)"
          >{{item}}</a>
        </div>
      </div>
      <!-- 热门搜索 -->
      <div class="hotsec">
        <p class="hottitle">
          <b>热门搜索</b>
        </p>
        <div class="hotitem">
          <a href="#" @click.prevent.stop="$router.push('/postdetail?id=1')">
            <i>1.</i> 阿信分享《说好不哭》背后故事
            <span class="iconfont icon-redian"></span>
          </a>
          <a href="#" @click.prevent.stop="$router.push('/postdetail?id=5')">
            <i>2.</i> 华为首发计算战略!
            <span class="iconfont icon-redian"></span>
          </a>
          <a href="#" @click.prevent.stop="$router.push('/postdetail?id=3')">
            <i>3.</i> 詹妮弗现身婚姻登记处
            <span class="iconfont icon-redian"></span>
          </a>
          <a href="#" @click.prevent.stop="$router.push('/postdetail?id=12')">
            <i>4.</i> 关晓彤演技
            <span class></span>
          </a>
        </div>
      </div>
    </div>
    <!-- 搜索出来相关联的文章列表显示 -->
    <div
      class="showPost"
      v-if="!showPostList&&secPostList[0]&&secInputInfo!=''&&secInputInfo!='搜索最新资讯'"
    >
      <ul>
        <li
          v-for="(item, index) in secPostList"
          :key="index"
          @click.prevent.stop="jumpToPostDetail(item.id)"
        >
          <a href="#">
            <span class="title">{{item.title}}</span>
            <i class="iconfont icon-youjiantou"></i>
          </a>
        </li>
      </ul>
    </div>
    <!-- 点击搜索按钮之后显示出来的文章：直接使用之前封装好的组件 -->
    <div class="PostTemp" v-if="flag">
      <post-temp v-for="(item, index) in showPostItem" :key="index" :postData="item"></post-temp>
    </div>
  </div>
</template>

<script>
import PostTemp from "@/components/PostTemp.vue";
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
      secPostList: [],
      showPostItem: [],
      flag: false,
      showPostList: false,
      historyList: [],
    };
  },
  methods: {
    // 获取焦点执行函数
    goSecPage() {
      if (this.secInputInfo == "搜索最新资讯") {
        this.secInputInfo = "";
      }
    },
    // input事件发送搜索文章请求
    searchPost() {
      this.showPostList = false;
      if (
        this.secInputInfo.trim() == "" ||
        this.secInputInfo == "搜索最新资讯"
      ) {
        // this.$toast.fail("请不要输入空值");
        return;
      }
      // 发送请求
      this.$axios({
        url: "/post_search",
        method: "get",
        params: {
          keyword: this.secInputInfo,
        },
      }).then((res) => {
        console.log(res.data.data);
        this.secPostList = res.data.data;
      });
    },
    // 点击搜索文章跳转对应文章详情
    jumpToPostDetail(postId) {
      console.log("跳转的文章id为" + postId);
      this.$router.push({ path: "/postdetail?id=" + postId });
    },
    // 点击搜索按钮触发的函数
    getSecInfo() {
      console.log("点击了搜索");
      if (
        this.secInputInfo.trim() == "" ||
        this.secInputInfo == "搜索最新资讯"
      ) {
        this.$toast.fail("请不要输入空值");
        return;
      }

      // 发送请求
      this.$axios({
        url: "/post_search",
        method: "get",
        params: {
          keyword: this.secInputInfo,
        },
      }).then((res) => {
        console.log(res.data.data);
        this.showPostItem = res.data.data;
        if (res.data.data[0]) {
          // 如果有数据
          this.flag = true;
          this.showPostList = true;
          // 历史记录中没有搜索过的关键词我才存到历史记录中
   
          if (this.historyList.indexOf(this.secInputInfo) == -1) {
            // 点击搜索按钮，如果搜索的关键词有数据就将搜索的值保存到历史数组中
            this.historyList.unshift(this.secInputInfo);
            // 存入localstorage
            localStorage.setItem(
              "historyList",
              JSON.stringify(this.historyList)
            );
          }
        } else {
          //没有数据 显示一行文字
          this.$toast.fail("没有相关资讯~");
        }
      });
    },
    // 点击返回返回 如果有数据就情况数据回到初始搜索页，如果为空就返回首页
    backSec() {
      if (
        (this.secInputInfo == "" && !this.flag) ||
        (this.secInputInfo == "搜索最新资讯" && !this.flag)
      ) {
        console.log("返回首页");
        this.$router.back();
      } else {
        console.log("清空输入框");
        this.secInputInfo = "";
        this.flag = false;
      }
    },
    // 点击历史记录 显示相关资讯
    jumpToSecInfo(keyword) {
      console.log("搜索的关键词为：" + keyword);
      this.secInputInfo = keyword;
      // 发送请求
      this.$axios({
        url: "/post_search",
        method: "get",
        params: {
          keyword: keyword,
        },
      }).then((res) => {
        console.log(res.data.data);
        this.showPostItem = res.data.data;
        if (res.data.data[0]) {
          // 如果有数据
          this.flag = true;
          this.showPostList = true;
        }
      });
    },
    // 清空历史搜索记录
    clearHistory() {
      // 清楚historyList数组，再清除本地换出你的数据
      this.historyList = [];
      localStorage.clear("historyList");
      this.$toast.success("已清除历史")
    },
  },
  mounted() {
    //一进入页面如果本地缓存了数据就从本地缓存中获取历史搜索记录
    if (localStorage.getItem("historyList")) {
      this.historyList = JSON.parse(localStorage.getItem("historyList"));
    }
  },
  components: {
    PostTemp,
  },
};
</script>

<style lang="less" scoped>
.secPage {
  position: relative;
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
          > a {
            display: inline-block;
            width: 40/360 * 100vw;
            height: 100%;
          }
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
  // 文章列表显示showPost样式
  .showPost {
    position: absolute;
    top: 50/360 * 100vw;
    width: 100vw;
    z-index: 555;
    padding: 10/360 * 100vw 0 10/360 * 100vw 25/360 * 100vw;
    min-height: 140/360 * 100vw;
    background: #f2f2f2;
    border-bottom: 1px solid rgb(204, 204, 204);
    box-shadow: 12px 10px 25px #cccccc;
    > ul {
      li {
        padding-right: 35 /360 * 100vw;
        margin-top: 12/360 * 100vw;
        padding-bottom: 6/360 * 100vw;
        border-bottom: 1px solid #e0e0e0;
        > a {
          color: #5c5c5c;
          .title {
            display: inline-block;
            width: 260/360 * 100vw;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .iconfont {
            vertical-align: middle;
            float: right;
          }
        }
      }
    }
  }
}
</style>