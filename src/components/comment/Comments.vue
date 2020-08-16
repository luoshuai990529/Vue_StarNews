<template>
  <div class="comments">
    <!-- 评论用户信息 -->
    <div class="comUser">
      <div class="headImg">
        <img src="../../assets/images/d1.jpg" alt />
      </div>
      <div class="comMsg">
        <span class="nickname">{{comment.user.nickname}}</span>
        <span class="comTime">{{beforTime}}</span>
      </div>
      <div class="reply">
        <a href="#" @click.stop.prevent="sendReply(comment.id)" :data-id="comment.id">回复</a>
      </div>
    </div>
    <!-- 楼层内容 -->
    <div class="floor" v-if="comment.parent">
      <parent :floorList="comment.parent" @clickReply="sendReply" :level="FloorLevel"></parent>
    </div>
    <!-- 回复内容 -->
    <div class="content">{{comment.content}}</div>
  </div>
</template>

<script>
// 引入parent楼层组件
import Parent from "@/components/comment/Parent.vue";
export default {
  props: ["comment"],
  data() {
    return {};
  },
  computed: {
    // 计算回复时间
    beforTime() {
      let floorDate = new Date(this.comment.create_date)
        .toLocaleDateString()
        .split("/");
      let nowDate = new Date().toLocaleDateString().split("/");
      if (nowDate[0] - floorDate[0] != 0) {
        return nowDate[0] - floorDate[0] + "年前";
      }
      if (nowDate[1] - floorDate[1] != 0) {
        return nowDate[1] - floorDate[1] + "月前";
      }
      if (nowDate[2] - floorDate[2] != 0) {
        return nowDate[2] - floorDate[2] + "天前";
      }
      let floorTime = new Date(this.comment.create_date)
        .toLocaleTimeString()
        .split(":")[0]
        .split("午")[1];
      let nowTime = new Date()
        .toLocaleTimeString()
        .split(":")[0]
        .split("午")[1];
      let lastTime =
        nowTime - floorTime == 0 ? "1小时内" : nowTime - floorTime + "小时前";
      return lastTime;
    },
    // 计算楼层深度:传入当前这条评论的comment.parent 当前楼层为0，如果有parent则每次+1
    FloorLevel() {
      return this.calcuFloorDeep(this.comment.parent, 0);
    },
  },
  methods: {
    sendReply(val) {
      this.$emit("clickReply", val);
    },
    calcuFloorDeep(floorParent, currDeep) {
      if (floorParent) {
        return this.calcuFloorDeep(floorParent.parent, currDeep + 1);
      } else {
        return currDeep;
      }
    },
  },
  components: {
    Parent,
  },
  mounted() {
    console.log(this.comment);
  },
};
</script>

<style lang="less" scoped>
.comments {
  border-bottom: 1px solid #d1d0d0;

  // 回复用户
  .comUser {
    padding: 25/360 * 100vw 20/360 * 100vw 10/360 * 100vw;

    display: flex;
    .headImg {
      flex: 1;
      text-align: center;
      img {
        border-radius: 50%;
        width: 35/360 * 100vw;
        height: 35/360 * 100vw;
      }
    }
    .comMsg {
      flex: 4;
      > span {
        display: block;
        &:nth-child(1) {
          font-size: 16/360 * 100vw;
          color: #000000;
        }
        &:nth-child(2) {
          font-size: 12/360 * 100vw;
          color: #888888;
        }
      }
    }
    .reply {
      flex: 1;
      text-align: right;
      line-height: 35/360 * 100vw;
      color: #666666;
      font-size: 12/360 * 100vw;
      padding-right: 5/360 * 100vw;
    }
  }
  // 楼层样式
  .floor {
    padding: 0 25/360 * 100vw;
  }
  // 回复内容
  .content {
    padding-left: 28 /360 * 100vw;
    color: #000000;
    font-size: 16/360 * 100vw;
    margin-bottom: 15/360 * 100vw;
    margin-top: 5/360 * 100vw;
  }
}
</style>