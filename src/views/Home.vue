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
          <van-tabs v-model="curIndex">
            <van-tab
              v-for="(item,index) in categoryList"
              :title="item.name"
              :key="index"
              :to="'/?category='+index"
            >
              <!-- List列表实现懒加载 -->
              <van-list
                v-model="categoryList[index].loading"
                :finished="categoryList[index].finished"
                :immediate-check="false"
                finished-text="没有更多了"
                @load="loadMorePost"
                :offset="0"
              >
                <div>
                  <!-- 新闻文章数据 -->
                  <!-- 循环categoryList里面对应当前索引的所有文章 -->
                  <post-temp
                    :postData="item"
                    v-for="(item, index2) in categoryList[index].postList"
                    :key="index2"
                  ></post-temp>
                </div>
              </van-list>
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
    <!-- <transition
      enter-active-class="animated bounceInRight"
      leave-active-class="animated bounceOutRight"
    >
    <router-view name="PostDetailTemp"></router-view>
    </transition> -->
  </div>
</template>

<script>
import PostTemp from "../components/PostTemp.vue";
// import PostDetail from "./PostDetail.vue"
export default {
  data() {
    return {
      secInputInfo: "搜索最新资讯",
      categoryList: [],
      // curIndex会随着当前url的变化而变化，刚进入页面为0
      curIndex: Number(this.$route.query.category) || 0,
    };
  },
  methods: {
    // 搜索框的方法
    goSecPage() {
      this.secInputInfo = "";
      window.location.href = "/#/secinfo";
    },
    getInfo() {
      this.secInputInfo = "搜索最新资讯";
    },
    //页面到底部触发的回调函数
    loadMorePost() {
      console.log(
        "页面已经到底部，加载更多,将当前栏目的pageIndex+1再调用loadPage加载新的数据"
      );

      // 获取当前激活栏目，将其PageIndex+1
      let category = this.getCurCategory();
      category.pageIndex += 1;

      // 加载新的数据，调用loadPage
      setTimeout(() => {
        this.loadPost();
      }, 1000);
    },
    //加载新闻信息
    loadPost() {
      console.log("2---调用loadPost函数请求新闻文章数据");

      // 获取当前栏目所显示的文章类别category,调用getCurCategory函数
      console.log(
        "2.1------获取当前的栏目category，通过category.id可以获取当前激活栏目的id"
      );
      let category = this.getCurCategory();
      let categoryId = category.id;
      console.log("当前激活栏目的id：" + categoryId);
      // console.log("当前栏目的当前页："+category.pageIndex);
      // console.log("当前栏目显示的文章数："+category.pageSize);
      this.$axios({
        url: "/post",
        method: "get",
        params: {
          category: categoryId,
          pageIndex: category.pageIndex,
          pageSize: category.pageSize,
        },
      }).then((res) => {
        console.log(res.data);
        console.log(
          "2.2---------将category中的postList数组解构，以及获取的文章数据解构到数组重新赋值给category.postList"
        );
        category.postList = [...category.postList, ...res.data.data];
        console.log(
          "2.3---------将category中的loading状态改为false，表示加载完毕"
        );
        category.loading = false;

        // 判断当前栏目文章的数据总长度是否小于category.pageSize即每页显示的文章数，如果小于则表示加载完毕
        console.log("2.4---------判断当前栏目的数据是否全部加载完毕");
        if (res.data.total <= category.postList.length) {
          category.finished = true;
          console.log("2.4.1---------数据已经加载完毕");
        } else {
          console.log("2.4.1---------可以继续加载");
        }
        console.log(
          "loadPage 渲染完成！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！"
        );
      });
    },
    // 加载首页栏目
    loadCategory() {
      this.$axios({
        url: "/category",
        method: "get",
      }).then((res) => {
        // 改造栏目数据，调用initCategory
        console.log("1.1------调用initCategory改造栏目数据");
        this.categoryList = this.initCategory(res);

        //发送loadPost请求文章数据
        this.loadPost();
      });
    },
    // 获取category激活栏目的id
    getCurCategory() {
      console.log(
        "------------------------进入getCurCategory获取当前激活栏目------------------------"
      );
      let index = this.curIndex;
      // 利用当前激活栏目的索引，获取当前的激活栏目
      let category = this.categoryList[index];
      return category;
    },
    // 改造栏目数据函数initCategory
    initCategory(res) {
      console.log(
        "1.2---------在每个栏目中添加管理自己的文章数组postList，pageIndex当前页，pageSize页面长度，加载状态"
      );
      const oldCategoryData = res.data.data;
      console.log("改造之前的栏目老数据：oldCategoryData");
      console.log(oldCategoryData);
      const categoryList = res.data.data.map((item) => {
        let newArr = {
          // 将所有的栏目数据用扩展运算符将每一项，都扩展到newArr中
          ...item,
          pageIndex: 1,
          pageSize: 5,
          postList: [],
          // 栏目的当前状态 是否正在加载loading  是否加载完成finished
          loading: true,
          finished: false,
        };
        return newArr;
      });
      console.log("改造后的栏目数据:categoryList");
      console.log(categoryList);
      console.log("1.3---------最后将改造后的栏目数据返回给this.categoryList");
      return categoryList;
    },
  },
  components: {
    PostTemp,
    // PostDetail
  },
  watch: {
    // 4.监听tab标签栏的变化 每次变化都会传过来一个索引值
    curIndex: function (index) {
      localStorage.setItem("curCategoryIndex",this.$route.query.category)
      console.log(
        "-----------------执行监听器的curIndex方法--------------当前栏目的索引值是" +
          index
      );
      // 获取当前激活栏目信息
      const category = this.getCurCategory();

      // 如果当前激活栏目的postList 的长度为0，就需要渲染页面才执行loadPost，否则不需要刷新页面了
      if (category.postList.length == 0) {
        console.log("当前激活栏目的postlist长度为0，因此执行loadPost渲染数据");
        this.loadPost();
      } else {
        console.log("当前激活栏目的postList数据不为0，无需重新渲染页面");
        console.log(this.categoryList[index].postList);
      }
    },
  },
  mounted() {
    // 进入页面首先请求栏目数据
    console.log("1---进入页面首先请求栏目数据");
    this.loadCategory();

    // 操作Dom
    let itemElem = this.$refs.newsListContent.getElementsByClassName(
      "van-tabs__content"
    )[0];
    let currCon = this.$refs.createContent;
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