import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/css/base.css"
import "./assets/css/animate.css"
import "./assets/font/iconfont.css"
// 1. 导入组件库
import Vant from 'vant'
// 2. 引入组件 css 文件
import 'vant/lib/index.css'
// 3. 注册 vant ui 组件库的标签
Vue.use(Vant)
// 导入axios
import axios from "axios";
// 绑定axios到原型
Vue.prototype.$axios = axios;

Vue.prototype.$axios.interceptors.request.use(config => {
  // console.log(config.url); //https://autumnfish.cn/api/joke/list
  config.headers.Authorization = localStorage.getItem("Authorization")
  // console.log(config.headers.Authorization);
  
  return config
}, err => {
  console.log(err);
})


Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')