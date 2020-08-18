<template>
  <div class="mianColumn">
    <div class="header">
      <per-nav-temp :navtitle="'栏目管理'" @clickNav="backHandler"></per-nav-temp>
    </div>
    <!-- 频道数据渲染 -->
    <div class="colItems">
      <!-- 点击删除频道 -->
      <div class="delItem">
        <div class="title">
          <p>点击删除以下频道</p>
        </div>
        <div class="items">
          <a
            href="#"
            @click.stop.prevent="moveCategory(item.id,item.name,item.is_top)"
            v-for="(item, index) in categoryList"
            :key="index"
          >{{item.name}}</a>
        </div>
      </div>
      <!-- 点击添加频道 -->
      <div class="addItem">
        <div class="title">
          <p>点击添加以下频道</p>
        </div>
        <div class="items">
          <a
            href="#"
            v-for="(item, index) in delCategoryList"
            :key="index"
            @click.stop.prevent="addCategory(item.id,item.name,item.is_top)"
          >{{item.name}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PerNavTemp from "@/components/PerNavTemp.vue";
export default {
  data() {
    return {
      categoryList: [],
      delCategoryList: [],
    };
  },
  methods: {
    backHandler() {
      this.$router.back();
    },
    // 加载栏目方法
    loadColumn() {
      // 如果本地有数据就从本地加载
      if (localStorage.getItem("categoryList")) {
        this.categoryList = JSON.parse(localStorage.getItem("categoryList"));
        console.log(this.categoryList);
      } else {
        this.$axios({
          url: "/category",
          method: "get",
        }).then((res) => {
          this.categoryList = res.data.data;
          console.log(this.categoryList);
        });
      }
      if (JSON.parse(localStorage.getItem("delCategoryList"))) {
        this.delCategoryList = JSON.parse(
          localStorage.getItem("delCategoryList")
        );
      }
    },
    // 删除栏目方法
    moveCategory(id, categoryname, istop) {
      if (this.categoryList.length <= 1) {
        this.$toast.fail("最少要保存一个栏目哦~");
        return;
      }
      this.$dialog
        .confirm({
          message: "你确定删除这一栏吗？",
        })
        .then(() => {
          console.log("删除栏目的名字：" + categoryname+"id是："+id);
          console.log("是否热门:" + istop);
          // 将删除的这个栏目 放入已删除的数组中，存入本地
          this.delCategoryList.push({
            id: id,
            name: categoryname,
            is_top: istop,
          });
          localStorage.setItem(
            "delCategoryList",
            JSON.stringify(this.delCategoryList)
          );

          // 删除这个类别，存入localstorage
          this.categoryList.forEach((item, index) => {
            if (item.name == categoryname) {
              this.categoryList.splice(index, 1);
            }
          });
          localStorage.setItem(
            "categoryList",
            JSON.stringify(this.categoryList)
          );
        })
        .catch(() => {});
    },
    // 添加栏目方法
    addCategory(id, categoryname, istop) {
      console.log("添加栏目的名字：" + categoryname+"id是："+id);
      console.log("是否热门：" + istop);

      //   添加现有的
      this.delCategoryList.forEach((item, index) => {
        if (item.name == categoryname) {
          this.delCategoryList.splice(index, 1);
        }
      });
      localStorage.setItem(
        "delCategoryList",
        JSON.stringify(this.delCategoryList)
      );
      this.categoryList.push({ id: id, name: categoryname, is_top: istop });
      localStorage.setItem("categoryList", JSON.stringify(this.categoryList));
    },
  },
  mounted() {
    //   请求所有栏目列表
    this.loadColumn();
  },
  components: {
    PerNavTemp,
  },
};
</script>

<style lang="less" scoped>
.mianColumn {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: #f2f2f2;
  min-height: 100vh;
  .header {
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 999;
  }
  //   频道栏目样式
  .colItems {
    margin-top: 60/360 * 100vw;
    .delItem,
    .addItem {
      .title {
        line-height: 25/360 * 100vw;
        margin-top: 20/360 * 100vw;
        background: #ebebeb;
        > p {
          font-size: 12/360 * 100vw;
          color: #6d6c6c;
          padding-left: 12/360 * 100vw;
        }
      }
      .items {
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-around;
        > a {
          display: inline-block;
          margin-top: 10/360 * 100vw;
          margin-left: 10/360 * 100vw;
          border: 1px solid #dedede;
          font-size: 16/360 * 100vw;
          padding: 5/360 * 100vw 20/360 * 100vw;
          color: #000000;
        }
      }
    }
  }
}
</style>