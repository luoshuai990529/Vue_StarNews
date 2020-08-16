<template>
  <div class="parentContent">
    <div class="comInfo" > 
      <!-- 楼层、用户、时间信息 -->
      <div class="userCom">
        <span class="floor">第1楼</span>
        <span class="nickname">{{floorList.user.nickname}}</span>
        <span class="time">{{beforTime}}</span>
        <span class="reply">
          <a href="#" @click.prevent.stop>回复</a>
        </span>
      </div>
      <!-- 评论内容 -->
      <div class="comments">{{floorList.content}}</div>
    </div>
    <parent v-if="floorList.parent" :floorList="floorList.parent"></parent>
  </div>
</template>

<script>
export default {
  name:"Parent",
  props:["floorList"],
  data() {
    return {};
  },
  mounted() {
    console.log(this.floorList);
  },
  computed: {
    beforTime() {
      let floorDate = new Date(this.floorList.create_date)
        .toLocaleDateString()
        .split("/");
      let nowDate = new Date().toLocaleDateString().split("/");
      if (nowDate[0] - floorDate[0] != 0) {
        return nowDate[0] - floorDate[0]+"年前";
      }
      if (nowDate[1] - floorDate[1] != 0) {
        return nowDate[1] - floorDate[1]+"月前";
      }
      if (nowDate[2] - floorDate[2] != 0) {
        return nowDate[2] - floorDate[2]+"天前";
      }
      let floorTime = new Date(this.floorList.create_date)
        .toLocaleTimeString()
        .split(":")[0]
        .split("午")[1];
      let nowTime = new Date()
        .toLocaleTimeString()
        .split(":")[0]
        .split("午")[1];
      return nowTime - floorTime+"小时前";
    },
  },
};
</script>

<style lang="less" scoped>
.parentContent {
 
  .comInfo {
    border: 1px solid #d0d0d0;
    background: #eeeeee;
    padding: 10/360 * 100vw 15/360 * 100vw 20/360 * 100vw;
    .userCom {
      font-size: 14/360*100vw;
      >span{
        &:first-child{
          margin-left: 0;
        }
        margin-left: 10/360*100vw;
      }
      .floor,
      .nickname {
        color: #000000;
      }
      .time {
        color: #a4a4a4;
        font-size: 12/360*100vw;
      }
      .reply {
        float: right;
        a {
          color: #666666;
          font-size: 12/360*100vw;
        }
      }
    }
    .comments {
      color: #000000;
      font-size: 14/360*100vw;
      margin-top: 15/360 * 100vw;
    }
  }
}
</style>