<template>
  <div class="item">
    <!-- 只要num大于0，就不断的调用自己渲染num -->
    <!-- <Digui :num="num-1" v-if="num>0" />
    {{num}}-->
    <!-- <div v-for="(item, index) in list" :key="index">
      {{item.type}}
      <digui :list="item.children" v-if="item.children"></digui>
    </div>-->
    <div v-for="(item, index) in data" :key="index">
      <digui :data="item.parent" v-if="item.parent"></digui>
      <p>{{item.content}}</p>

      <!-- <div v-if="data.parent.content">{{data.parent.content}}</div> -->
    </div>
  </div>
</template>

<script>
/* 
如果我想组件自己显示自己
    1. 组件内设定 name 属性
    2. 用这个 name 属性作为标签在组件自己的 template 里面渲染
    3. 为了避免死循环, 要用终止条件
*/
export default {
  name: "Digui",
  data() {
    return {
      num: 1,
    };
  },
  props: ["list", "data"],
  components: {},
  mounted() {
    console.log(this.data);
  },
};
</script>

<style lang="less" scoped>
.item {
  overflow: hidden;
}
.item > div {
  // margin-left: 20px;
  border: 1px solid hotpink;
  padding: 10px 0 10px;
  margin: 10px;
}
</style>