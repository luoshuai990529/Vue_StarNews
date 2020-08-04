<template>
  <div class="homepage">
    <h1>欢迎来到首页</h1>
    <router-link to="/login">去登录页</router-link>
    <router-link to="/register">去注册页</router-link>
    <transition
      enter-active-class="animated bounceInUp"
      leave-active-class="animated bounceOutDown"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;

  /* 1.移动端元素都是内减模型 */
  box-sizing: border-box;
}

body {
  /* 2.移动端字体一般14px  / 12px */
  font-size: 14px;
}

li {
  list-style: none;
}

img {
  vertical-align: middle; /* 图片居中 */
}

a {
  /* 3.取消移动端a标签点击背景高亮 */
  -webkit-tap-highlight-color: transparent;
  color: #000;
  /* 取消a标签默认下划线 */
  text-decoration: none;
}

input {
  border: 0 none;
  outline-style: none; /*取消内边框*/
}

/* 清除浮动，解决margin-top塌陷 */
.clearfix:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.celarfix {
  zoom: 1;
}
</style>