<template>
  <div class="postdetail" @click="handler">
    <!-- 头部栏 -->
    <div class="detail-header">
      <div class="left">
        <i class="iconfont icon-zuojiantou" @click="$router.back()"></i>
        <i class="iconfont icon-new" @click="$router.back()"></i>
      </div>
      <div class="right">
        <span
          v-cloak
          @click="AttentionTo"
          v-text="isAttention?'取消关注':'关注'"
          :class="isAttention?'isActive':''"
        ></span>
      </div>
    </div>

    <!-- 普通文章详情 -->
    <div v-if="type==1|| content.indexOf('content')!=-1" class="normalPost">
      <h3 class="title">{{title}}</h3>
      <p class="pmsg">
        <span class="postfrom">{{nickname}}</span>
        <span class="time">{{create_date.split("T")[0]}}</span>
      </p>
      <!-- <div class="imgcon" v-if="postImg">
        <img :src="postImg" alt />
      </div>-->
      <div class="content" v-html="content"></div>
    </div>
    <!-- 视频文章详情 -->
    <div v-if="type==2 && content.indexOf('content')==-1" class="videoPost">
      <div class="videoCon">
        <video :src="content" controls="true" muted="muted"></video>
      </div>
      <div class="articlefrom">
        <div class="userMsg">
          <span class="headImg">
            <img :src="$axios.defaults.baseURL + head_img" alt />
          </span>
          <span class="text">{{nickname}}</span>
        </div>
        <!-- <div class="attention">
          <span>关注</span>
        </div>-->
      </div>
      <h3 class="title">{{title}}</h3>
    </div>
    <!-- 点赞微信 -->
    <div class="detailBot">
      <div class="left">
        <span class="dianzan" :class="isDianzan?'active':''" @click="ckLike">
          <i class="iconfont icon-dianzan"></i>
          <i class="number" style="margin-left:6px">{{like_length}}</i>
        </span>
      </div>
      <div class="right">
        <span class="weixin">
          <i class="iconfont icon-weixin"></i>
          <i class="text">微信</i>
        </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="followUp">
      <h3>精彩跟帖</h3>
      <!-- 跟帖内容组件 显示三条 -->
      <div class="followList">
        <div v-for="(comment, index) in commentList" :key="index">
          <comments @clickReply="discuss" :comment="comment" v-if="index<3"></comments>
        </div>
      </div>
      <p class="more">
        <a href="#" @click.stop.prevent="moreComments">更多跟帖</a>
      </p>
      <!-- 评论跟帖组件 -->
      <!-- @sendClickArea="clickInput" -->
      <!-- @discuss="discuss" -->
      <commentInput
        :tienum="commentsTotal"
        :isStar="isStar"
        :showInput="showInput"
        @discuss="discuss"
        @collection="collection"
        @share="share"
        @sendContent="loadComments"
        :repParentId="repParentId"
      ></commentInput>
    </div>
  </div>
</template>

<script>
import CommentInput from "@/components/comment/CommentInput.vue";
import Comments from "@/components/comment/Comments.vue";
// 引入跟多跟帖组件
import MoreComments from "@/views/MoreComments.vue";
export default {
  data() {
    return {
      type: 1,
      title: "",
      create_date: "",
      content: "",
      nickname: "",
      postImg: "",
      head_img: "",
      userId: "",
      isAttention: false,
      AticelId: "",
      like_length: "",
      isDianzan: false,
      commentList: [],
      repParentId: "",
      commentsTotal: 0,
      isStar: false,
      showInput: false,
    };
  },
  methods: {
    // 关注方法
    AttentionTo() {
      if (this.isAttention) {
        console.log("取消关注" + this.userId);
        this.$axios({
          url: "/user_unfollow/" + this.userId,
          method: "get",
        }).then((res) => {
          console.log(res);
          if ((res.message = "取消关注成功")) {
            this.$toast.success("取消关注成功");
          }
        });
      } else {
        console.log("关注用户" + this.userId);
        this.$axios({
          url: "/user_follows/" + this.userId,
          method: "get",
        }).then((res) => {
          console.log(res);
          if (res.data.message == "关注成功") {
            this.$toast.success(res.data.message);
          }
        });
      }
      this.isAttention = !this.isAttention;
      // 发送关注ajax请求
    },
    // 点击评论和输入框显示文本域方法
    discuss(val) {
      // console.log("点击了输入框，显示文本域输入框");
      console.log("回复文章的id为" + val);
      // 将回复文章的id传给CommentInput子组件
      this.repParentId = val;
      this.showInput = true;
    },
    // 收藏方法
    collection() {
      this.$axios({
        url: "/post_star/" + this.AticelId,
        method: "GET",
      }).then((res) => {
        console.log(res);
        this.isStar = !this.isStar;
        this.$toast.success(res.data.message);
      });
    },
    // 分享方法
    share() {
      console.log("分享");
    },
    // 点赞方法
    ckLike() {
      this.$axios({
        url: "/post_like/" + this.AticelId,
        method: "GET",
      }).then((res) => {
        console.log(res);
        this.isDianzan = !this.isDianzan;
        this.$toast.success(res.data.message);
        if (res.data.message == "点赞成功") {
          this.like_length += 1;
        } else {
          this.like_length -= 1;
        }
      });
    },
    // 加载文章详情
    loadDetail() {
      // 请求文章详情接口
      this.$axios({
        url: "/post/" + this.$route.query.id,
        method: "get",
      }).then((res) => {
        console.log(res.data.data);
        this.type = res.data.data.type;
        this.title = res.data.data.title;
        this.create_date = res.data.data.create_date;
        this.content = res.data.data.content;
        this.nickname = res.data.data.user.nickname;
        this.postImg = res.data.data.cover[0].url;
        this.head_img = res.data.data.user.head_img;
        this.userId = res.data.data.user.id;
        this.AticelId = res.data.data.id;
        this.isStar = res.data.data.has_star;
        this.like_length = res.data.data.like_length;
        this.isDianzan = res.data.data.has_like;

        let isAttention = res.data.data.user;

        this.$axios({
          url: "/user_follows",
          method: "get",
        }).then((res) => {
          res.data.data.forEach((item) => {
            if (item.id == isAttention.id) {
              this.isAttention = true;
            }
          });
        });
      });
    },
    // 点击文章详情组件，隐藏文本域输入框处理函数
    handler() {
      console.log("点击了文章详情组件,隐藏文本域输入框");
      this.showInput = false;
    },
    // 点击输入框组件，显示文本域输入框
    // clickInput() {
    //   console.log("点击了输入框，显示文本域输入框");
    //   this.showInput = true;
    // },
    // 加载评论的方法
    loadComments() {
      this.$axios({
        url: "/post_comment/" + this.$route.query.id,
        method: "get",
      }).then((res) => {
        console.log(res.data.data);
        this.commentList = res.data.data;
        this.commentsTotal = res.data.data.length;
        this.showInput = false;
      });
    },
    // 跳转更多跟帖页面函数
    moreComments() {
      this.$router.push({
        path: "/morecomments",
        query: { articleId: this.$route.query.id },
      });
    },
  },
  mounted() {
    //加载文章详情
    this.loadDetail();
    // 加载文章评论列表
    this.loadComments();
  },
  components: {
    CommentInput,
    Comments,
    MoreComments,
  },
};
</script>

<style lang="less" scoped>
[v-cloak] {
  display: none;
}
.postdetail {
  position: relative;
  height: 100%;
  overflow: hidden;
  background: #f2f2f2;
  h3 {
    font-size: 20/360 * 100vw;
  }
  // 头部样式
  .detail-header {
    position: fixed;
    top: 0;
    background: #f2f2f2;
    border-bottom: 1px solid #e4e4e4;
    height: 40/360 * 100vw;
    width: 100vw;
    display: flex;
    .left {
      position: relative;
      line-height: 40/360 * 100vw;
      padding-left: 12/360 * 100vw;
      flex: 1;
      .iconfont {
        font-size: 23/360 * 100vw;
      }
      .icon-new {
        position: absolute;
        left: 34/360 * 100vw;
        font-size: 44/360 * 100vw;
      }
    }
    .right {
      flex: 1;
      text-align: right;
      padding-right: 20/360 * 100vw;
      line-height: 40/360 * 100vw;
      .isActive {
        background: #a0a0a0;
        color: #fff;
      }
      span {
        padding: 6/360 * 100vw 16/360 * 100vw;
        background: #3f98ec;
        border-radius: 13/360 * 100vw;
        color: #fff;
      }
    }
  }
  // 普通新闻详情
  .normalPost {
    padding: 10/360 * 100vw 20/360 * 100vw;
    margin-top: 40/360 * 100vw;
    .pmsg {
      color: #868686;
      margin-top: 5/360 * 100vw;
      .time {
        margin-left: 20/360 * 100vw;
      }
    }
    .imgcon {
      margin-top: 10/360 * 100vw;
      width: 325/360 * 100vw;
      height: 180/360 * 100vw;
      object-fit: contain;
      img {
        width: 100%;
        height: 100%;
        // width: 330/360 * 100vw;
        // height: 180/360 * 100vw;
      }
    }
    .content {
      font-size: 16/360 * 100vw;
      margin-top: 10/360 * 100vw;
      line-height: 30/360 * 100vw;
      /deep/ a > img {
        width: 325/360 * 100vw;
        height: 180/360 * 100vw;
      }
    }
  }
  // 视频新闻详情
  .videoPost {
    margin-top: 40/360 * 100vw;

    .videoCon {
      width: 100vw;
      video {
        width: 100vw;
      }
    }

    .articlefrom {
      display: flex;
      height: 60/360 * 100vw;
      padding: 10/360 * 100vw 15/360 * 100vw;
      .userMsg {
        flex: 1;
        .headImg {
          vertical-align: middle;
          display: inline-block;
          width: 40/360 * 100vw;
          height: 40/360 * 100vw;
          border-radius: 20/360 * 100vw;
          // object-fit: contain;
          overflow: hidden;
          img {
            width: 40/360 * 100vw;
            height: 40/360 * 100vw;
          }
        }
        .text {
          display: inline-block;
          margin-left: 10/360 * 100vw;
        }
      }
      .attention {
        flex: 1;
        text-align: right;
        span {
          line-height: 40/360 * 100vw;
          padding: 6/360 * 100vw 16/360 * 100vw;
          background: #3f98ec;
          border-radius: 13/360 * 100vw;
          color: #fff;
        }
      }
    }
    h3.title {
      font-weight: 400;
      padding: 0 15/360 * 100vw;
      font-size: 16/360 * 100vw;
    }
  }
  // 点赞微信
  .detailBot {
    height: 50/360 * 100vw;
    display: flex;
    margin-top: 10/360 * 100vw;
    > div {
      flex: 1;
      line-height: 50/360 * 100vw;
      text-align: center;
      > span {
        padding: 6/360 * 100vw 12/360 * 100vw;
        border: 1px solid #797979;
        border-radius: 16/360 * 100vw;
        > i {
          font-style: normal;
        }
        .icon-dianzan {
          font-size: 16/360 * 100vw;
        }
        .icon-weixin {
          color: #00c200;
          font-size: 16/360 * 100vw;
        }
      }
      .active {
        background: skyblue;
        color: rgb(255, 255, 255);
        border: #fff;
      }
    }
  }
  // 跟帖
  .followUp {
    margin-top: 20/360 * 100vw;
    padding-bottom: 40/360 * 100vw;
    min-height: 280/360 * 100vw;
    border-top: 5px solid #e4e4e4;
    h3 {
      text-align: center;
      font-weight: 400;
      font-size: 22/360 * 100vw;
      margin-top: 20/360 * 100vw;
    }
    .followList {
      margin-top: 20/360 * 100vw;
    }
    .more {
      // border-top: 1px solid rgb(173, 173, 173);
      padding-top: 20/360 * 100vw;
      margin-top: 40/360 * 100vw;
      margin-bottom: 100/360 * 100vw;
      text-align: center;
      > a {
        border: 1px solid #8f8f8f;
        border-radius: 20/360 * 100vw;
        padding: 10/360 * 100vw 20/360 * 100vw;
      }
    }
  }
}
</style>