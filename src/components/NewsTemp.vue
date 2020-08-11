<template>
  <div class="newsItem">
    <!-- 新闻标题 -->
    <p class="newsTitle" v-if="imglistLength!=1" :class="titleActive">{{newstitle}}</p>
    <!-- 新闻图片 -->
    <div class="imgList" v-if="imglistLength>=3">
      <span v-if="imglist[0]">
        <van-image fit :src="imglist[0]" />
      </span>
      <span v-if="imglist[1]">
        <van-image fit :src="imglist[1]" />
      </span>
      <span v-if="imglist[2]">
        <van-image fit :src="imglist[2]" />
      </span>
    </div>
    <!-- 新闻视频 -->
    <div class="newsVideo" v-if="videosrc">
      <video :src="videosrc" controls="controls" width></video>
    </div>
    <!-- 新闻底部信息 -->
    <div class="botMsg" v-if="imglistLength!=1" :class="imglistLength==1?'botMsgActive':''">
      <span class="pulmsg">{{pulmsg}}</span>
      <span class="tie">{{tienum}}</span>
    </div>
    <!-- 单张图片样式 -->
    <div class="singleImg" v-if="imglistLength==1">
      <div class="singleLeft">
        <p class="newsTitle" :class="titleActive">{{newstitle}}</p>
        <div class="botMsg" :class="imglistLength==1?'botMsgActive':''">
          <span class="pulmsg">{{pulmsg}}</span>
          <span class="tie">{{tienum}}</span>
        </div>
      </div>
      <div class="singleRight">
        <img fit :src="imglist[0]" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "pulmsg",
    "tienum",
    "newstitle",
    "imglist",
    "videosrc",
    "titleActive",
  ],
  data() {
    return {
      imglistLength: "",
    };
  },
  methods: {},
  mounted() {
    if (this.imglist) {
      this.imglistLength = this.imglist.length;
    }
  },
};
</script>

<style lang="less" scoped>
.newsItem {
  position: relative;
  border-bottom: 1px solid #e4e4e4;
  padding: 10/360 * 100vw;
  .newsTitle {
    // width: 210/360*100vw;
    font-size: 16px;
    color: #333333;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .titleActive {
    width: 210/360 * 100vw;
  }

  /* 图片样式 */
  .imgList {
    margin-top: 5px;
    display: flex;
    > span {
      flex: 1;
      // justify-content: ;
      img {
        width: 110/360 * 100vw;
        height: 75/360 * 100vw;
      }
    }
  }
  /* 音频样式 */
  .newsVideo {
    video {
      // width: /360*100vw;
      width: 100%;
    }
  }
  /* 底部样式 */
  .botMsg {
    margin-top: 5/360 * 100vw;
    color: #868686;
    .tie {
      margin-left: 30/360 * 100vw;
    }
  }
  .botMsgActive {
    margin-top: 23/360 * 100vw;
  }
  .singleImg {
    display: flex;
    .singleLeft {
      flex: 2;
    }
    .singleRight {
      flex: 1;
      img {
        width: 110/360 * 100vw;
        height: 100%;
      }
    }
  }
}
</style>