<template>
  <div class="moreComments" @click.stop="showInput=false" v-if="commentList">
    <!-- 头部返回栏 -->
    <div class="header">
      <per-nav-temp :navtitle="'精彩跟帖'" @clickNav="backHandler('返回文章详情页')"></per-nav-temp>
    </div>
    <!-- 跟帖内容 -->
    <div class="followList">
      <div v-for="(comment, index) in commentList" :key="index">
        <comments @clickReply="discuss" :comment="comment"></comments>
      </div>
      <div class="botMsg">
        <h4>已经到最底部啦</h4>
      </div>
    </div>
    <!-- 评论框 -->
    <div class="sendComments" @click.stop="showInput=true">
      <div class="writeinp">
        <div class="inpCon" v-if="!showInput">
          <input type="text" placeholder="写跟帖" @focus.stop="showInput=true" />
        </div>
        <!-- 输入框获取焦点，或者点击评论图标 -->
        <div class="textareaInput" :class="showInput?'showTextArea':''" v-if="showInput">
          <textarea class="writeCon" v-focus name id v-model="content"></textarea>
        </div>
        <button class="sendBtn" @click="sendComments">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
import PerNavTemp from "@/components/PerNavTemp.vue";
import Comments from "@/components/comment/Comments.vue";
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
      showInput: false,
      content: "",
      commentList: [],
      repParentId: "",
    };
  },
  components: {
    PerNavTemp,
    Comments,
  },
  methods: {
    backHandler() {
      this.$router.back();
    },
    // 点击评论和输入框显示文本域方法
    discuss(val) {
      // console.log("点击了输入框，显示文本域输入框");
      console.log("回复文章的id为" + val);
      // 将回复文章的id传给CommentInput子组件
      this.repParentId = val;
      this.showInput = true;
    },
    changeInput() {
      this.showInput = true;
    },
    sendComments() {
      if (this.content.trim() == "") {
        this.$toast("请不要输入空值");
        return;
      }
      console.log("发送信息");
      this.$axios({
        url: "/post_comment/" + this.$route.query.articleId,
        method: "post",
        data: {
          content: this.content,
          parent_id: this.repParentId || null,
        },
      }).then((res) => {
        console.log(res);
        this.$toast.success(res.data.message);
        // 清空数据
        this.content = "";
        this.loadComments();
      });
    },
    loadComments() {
      this.$axios({
        url: "/post_comment/" + this.$route.query.articleId,
        method: "get",
      }).then((res) => {
        console.log(res.data.data);
        this.commentList = res.data.data;
      });
    },
  },

  mounted() {
    this.loadComments();
  },
};
</script>

<style lang="less" scoped>
.homepage {
  background: #f2f2f2;
}
.moreComments {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: #f6f6f6;
  z-index: 200;
  .header {
    position: fixed;
    top: 0;
    width: 100vw;
  }
  .followList {
    position: relative;
    z-index: -1;
    margin-top: 50/360 * 100vw;
    padding-bottom: 200/360 * 100vw;
    .botMsg {
      position: absolute;
      width: 100vw;
      bottom: 140/360 * 100vw;
      border-bottom: 1px solid rgb(185, 185, 185);
      h4 {
        z-index: 10;
        position: absolute;
        left: 50%;
        bottom: -10/360 * 100vw;
        transform: translateX(-50%);
        background: #f6f6f6;
        color: rgb(149, 149, 149);
        text-align: center;
        font-weight: 400;
        font-size: 12/360 * 100vw;
        width: 100/360 * 100vw;
      }
    }
  }
  .sendComments {
    .writeinp {
      position: fixed;
      display: flex;
      z-index: 100;
      background: #f2f2f2;
      bottom: 0;
      width: 100vw;
      border-top: 2px solid #e4e4e4;
      .inpCon {
        line-height: 60/360 * 100vw;
        padding: 0 24/360 * 100vw;
        input {
          height: 30/360 * 100vw;
          border-radius: 15/360 * 100vw;
          background: #d7d7d7;
          text-indent: 10/360 * 100vw;
        }
      }
      .writeCon {
        resize: none;
        border-radius: 4/360 * 100vw;
        border: none;
        font-size: 16/360 * 100vw;
        width: 220/360 * 100vw;
        height: 90/360 * 100vw;
        background: #d7d7d7;
        padding: 10/360 * 100vw;
      }
      .sendBtn {
        position: absolute;
        right: 30/360 * 100vw;
        top: 50%;
        transform: translateY(-50%);
        padding: 7/360 * 100vw 17/360 * 100vw;
        background: rgb(63, 186, 235);
        border: none;
        font-size: 14/360 * 100vw;
        color: #fff;
        border-radius: 20/360 * 100vw;
      }
    }
    .showTextArea {
      height: 120 /360 * 100vw;
      padding: 15/360 * 100vw;
    }
  }
}
</style>