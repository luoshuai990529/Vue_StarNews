<template>
  <div class="box">
    <!-- 只要num大于0，就不断的调用自己渲染num -->
    <Digui :num="num-1" v-if="num>0" />
    {{num}}
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
  props: ["num"],
};
</script>

<style lang="less" scoped>
.box {
  border: 1px solid hotpink;
  padding: 10px;
}
</style>