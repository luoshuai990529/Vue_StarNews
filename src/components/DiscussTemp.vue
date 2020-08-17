<template>
  <div class="conItems">
    <!-- 时间显示 -->
    <div class="showtime">
      <span class="year">{{create_date.split("T")[0]}}</span>
      <span class="hour">{{create_date.split("T")[1].split(".")[0]}}</span>
    </div>
    <!-- 回复的楼层：有就显示，没有就不显示 -->
    <div class="replycon" v-if="repmsg">
      <div class="repUsr">
        回复：
        <span class="username">{{repmsg.user.nickname}}</span>
      </div>
      <div class="comment">{{repmsg.content}}</div>
    </div>
    <!-- 评论内容 -->
    <div class="content">{{content}}</div>
    <!-- 评论的文章信息 -->
    <div class="article" @click="jumpToArticle">
      <span class="yuanwen">
        原文：
        <span class="title">{{post.title}}</span>
      </span>
      <i class="iconfont icon-youjiantou"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ["create_date", "content", "repmsg", "post", "showReplycon"],
  data() {
    return {};
  },
  methods: {
    jumpToArticle() {
      this.$router.replace({ path: "/postdetail?id=" + this.post.id });
    },
  },
};
</script>

<style lang="less" scoped>
.conItems {
  padding: 0 20/360 * 100vw 20/360 * 100vw;
  .showtime {
    color: #a7a7a7;
    margin-bottom: 8/360 * 100vw;
    font-size: 14/360 * 100vw;
    .hour {
      margin-left: 10/360 * 100vw;
    }
  }
  .replycon {
    background: #e4e4e4;
    color: #929292;
    padding: 15/360 * 100vw 10/360 * 100vw;
    .comment {
      margin-top: 10/360 * 100vw;
      font-size: 14/360 * 100vw;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .content {
    margin-top: 12/360 * 100vw;
    font-size: 14/360 * 100vw;
  }
  .article {
    position: relative;
    color: #898989;
    font-size: 14/360 * 100vw;
    border-bottom: 1px solid #d7d7d7;
    padding: 10 /360 * 100vw 20 /360 * 100vw;
    margin: 0 -20/360 * 100vw;
    .yuanwen {
      display: inline-block;
      width: 260 /360 * 100vw;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-top: 10/360 * 100vw;
    }
    .iconfont {
      position: absolute;
      bottom: 15/360 * 100vw;
      right: 20/360 * 100vw;
    }
  }
}
</style>