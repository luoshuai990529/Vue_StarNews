<template>
  <!-- 输入框没有获取焦点 -->
  <div class="writeinp" :class="showInput?'showTextArea':''" @click.stop="handler">
    <div class="inpCon" v-if="!showInput">
      <input type="text" placeholder="写跟帖" @focus="discussEmit" />
      <i class="iconfont icon-pinglun" @click.stop="discussEmit">
        <span class="tienum">{{tienum}}</span>
      </i>
      <i
        class="iconfont isStar"
        @click.stop="collectionEmit"
        v-text="isStar?'★':'☆'"
        :class="isStar?'active':''"
      ></i>
      <!-- icon-share_icon  @click.stop="shareEmit"-->
      <div class="bshare-custom icon-medium">
        <a title="分享到微信" class="bshare-weixin"></a>
      </div>
    </div>
    <!-- 输入框获取焦点，或者点击评论图标 -->
    <div class="textareaInput" v-if="showInput">
      <textarea class="writeCon" v-focus name id v-model="content"></textarea>
      <button class="sendBtn" @click.stop="sendDiscuss">发送</button>
      <!-- 写一个盒子，来放当前回复的是哪一个用户，用定位定到文本域 -->
      <div v-if="!content&&repname" class="repwho">回复:@{{repname}}</div>
    </div>
  </div>
</template>
<script>
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
      content: "",
    };
  },
  props: ["isStar", "tienum", "showInput", "repParentId", "repname"],
  computed: {},
  methods: {
    // 评论
    discussEmit() {
      this.$emit("discuss");
    },
    // 收藏
    collectionEmit() {
      this.$emit("collection");
    },
    // 分享
    shareEmit() {
      this.$emit("share");
    },
    // showInpCon() {
    //   console.log("失去焦点");
    //   this.showInput = false;
    // },
    // 评论方法
    sendDiscuss() {
      if (this.content.trim() == "") {
        this.$toast("请不要输入空值");
        return;
      }
      console.log("发送信息");
      this.$axios({
        url: "/post_comment/" + this.$route.query.id,
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
        // 传递事件给父组件
        this.$emit("sendContent");
      });
    },
    handler() {
      //   console.log("点击了输入组件");
      this.$emit("sendClickArea");
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.bshare-custom {
  position: absolute;
  top: 20/360*100vw;
  right: 12/360 * 100vw;
  z-index: 300;
  width: 40/360 * 100vw;
  height: 40/360 * 100vw;
  .bshare-weixin {
    width: 100%;
    height: 100%;
    font-size: 16/360 * 100vw;
  }
}
.writeinp {
  position: fixed;
  display: flex;
  z-index: 100;
  background: #f2f2f2;
  bottom: 0;
  width: 100vw;
  border-top: 2px solid #e4e4e4;
  height: 60/360 * 100vw;
  .inpCon {
    line-height: 60/360 * 100vw;
    padding: 0 24/360 * 100vw;
    input {
      height: 30/360 * 100vw;
      border-radius: 15/360 * 100vw;
      background: #d7d7d7;
      text-indent: 10/360 * 100vw;
    }
    .iconfont {
      position: relative;
      font-size: 22/360 * 100vw;
      margin-left: 24/360 * 100vw;
      vertical-align: middle;
    }
    .tienum {
      position: absolute;
      top: -6 /360 * 100vw;
      right: -16 /360 * 100vw;
      height: 15/360 * 100vw;
      line-height: 15/360 * 100vw;
      background: red;
      color: #fff;
      padding: 0 4/360 * 100vw;
      border-radius: 20/360 * 100vw;
      font-size: 12/360 * 100vw;
    }
    .isStar {
      font-size: 28/360 * 100vw;
    }
    .active {
      color: gold;
    }
  }
  .textareaInput {
    position: relative;
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
      right: -100/360 * 100vw;
      top: 50%;
      transform: translateY(-50%);
      padding: 7/360 * 100vw 17/360 * 100vw;
      background: rgb(63, 186, 235);
      border: none;
      font-size: 14/360 * 100vw;
      color: #fff;
      border-radius: 20/360 * 100vw;
    }
    // 显示回复谁的div样式
    .repwho {
      display: inline-block;
      position: absolute;
      z-index: 1;
      top: 8/360 * 100vw;
      left: 14/360 * 100vw;
      font-size: 16/360 * 100vw;
      color: #949494;
    }
  }
}
.showTextArea {
  height: 120 /360 * 100vw;
  padding: 15/360 * 100vw;
}
</style>