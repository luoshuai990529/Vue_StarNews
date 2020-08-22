<template>
  <div @click="jumpDetail">
    <!-- 如果postData的类型为1 并且 cover的长度大于1小于3 那么就是单图片显示 -->
    <div
      class="singleImg"
      v-if="postData.type == 1 && postData.cover.length >= 1 && postData.cover.length < 3"
    >
      <div class="left">
        <div class="title">{{postData.title}}</div>
        <div class="info">{{postData.user.nickname}} {{postData.comment_length}}跟帖</div>
      </div>
      <div class="right">
        <img :src="postData.cover[0].url | fixUrl" alt class="cover" />
      </div>
    </div>
    <!-- 如果postData的类型为1 并且 cover的长度大于3 那么就是多图片显示 -->
    <div class="multipImgs" v-if="postData.type == 1 && postData.cover.length >= 3">
      <div class="title">{{postData.title}}</div>
      <div class="coverWrapper">
        <img class="coverImg" :src="postData.cover[0].url | fixUrl" alt />
        <img class="coverImg" :src="postData.cover[1].url | fixUrl" alt />
        <img class="coverImg" :src="postData.cover[2].url | fixUrl" alt />
      </div>
      <div class="info">{{postData.user.nickname}} {{postData.comment_length}}跟帖</div>
    </div>
    <!-- 如果postData的类型为2 并且 cover的长度大于1 那么就是视频显示 -->
    <div class="video" v-if="postData.type == 2 && postData.cover.length >= 1">
      <div class="title">{{postData.title}}</div>
      <div class="coverWrapper">
        <img class="coverImg" :src="postData.cover[0].url | fixUrl" alt />
        <div class="playIconWrapper">
          <span class="iconfont icon-shiping"></span>
        </div>
      </div>
      <div class="info">{{postData.user.nickname}} {{postData.comment_length}}跟帖</div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    //  图片url过滤器
    fixUrl(url) {
      const reg = /^http/;
      if (reg.test(url)) {
        return url;
      } else {
        return "http://itluoshuai.cn:3000" + url;
      }
    },
  },
  props: ["postData"],
  methods: {
    jumpDetail() {
      this.$router.push({
        path: "/postdetail?id=" + this.postData.id,
      });
    },
  },
  mounted() {
    // console.log(this.postData);
  },
};
</script>

<style lang="less" scoped>
.singleImg {
  display: flex;
  padding: 4.444vw 2.778vw;
  border-bottom: 1px solid #e4e4e4;
  align-items: center;
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 20.556vw;
    .title {
      font-size: 16px;
    }
    .info {
      font-size: 14px;
      color: #888;
    }
  }
  .cover {
    width: 33.333vw;
    height: 20.556vw;
    object-fit: cover;
  }
}
.multipImgs {
  padding: 4.444vw 2.778vw;
  border-bottom: 1px solid #e4e4e4;
  .title {
    font-size: 4.444vw;
  }
  .info {
    font-size: 3.889vw;
    color: #888;
  }
  .coverWrapper {
    display: flex;
    justify-content: space-between;
    padding: 1.667vw 0 2.778vw;
    .coverImg {
      width: 33%;
      height: 20.556vw;
      object-fit: cover;
    }
  }
}
.video {
  padding: 4.444vw 2.778vw;
  border-bottom: 1px solid #e4e4e4;
  .title {
    font-size: 4.444vw;
  }
  .info {
    font-size: 3.889vw;
    color: #888;
  }
  .coverWrapper {
    position: relative;
    padding: 1.667vw 0 2.778vw;
    .coverImg {
      width: 100%;
      height: 47.222vw;
      object-fit: cover;
    }
    .playIconWrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      .iconfont {
        font-size: 46px;
        color: #fff;
        background: #ccc;
        border-radius: 50%;
      }
    }
  }
}
</style>