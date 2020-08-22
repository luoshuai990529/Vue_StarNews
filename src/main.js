import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/css/base.css"
import "./assets/css/animate.css"
import "./assets/font/iconfont.css"

// 为了在入口文件使用弹窗 所以需要单独引入
import {
  Toast
} from "vant"

// 1. 导入组件库  
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
// 导入axios
import axios from "axios";
Vue.prototype.$axios = axios;


// 创建全局前置路由守卫
// 拦截所有的路由跳转，进行校验
// 只有校验通过才放行
// router.beforeEach()可以创建全局守卫，里面的回调函数
// 接受三个参数
// to：目标路由
// from：从什么路由开始跳转
// 最后这个next其实是放行 
router.beforeEach((to, from, next) => {
  // console.log('目标路由');
  // console.log(to);
  // console.log(from);

  // 如果这次跳转to.path 是指向个人中心
  // 通过meta进行权限校验,判断里面的needAuth属性是否为true,如果有就进行权限校验
  if (to.meta.needAuth) {
    if (localStorage.getItem("token")) {
      next();
    } else {
      Toast.fail("请先登录!")
      // // 如果没有就跳转到登录页
      router.push("/login").catch(err => {
        console.log(err);
      })
      // 有可能找到另一种跳转方法
      // next("/login")
      // 新版路由已经不是这么写了
      // 需要直接用router.push
      return
    }
  }
  // if (to.path == "/perinfo" || to.path == "/perinfo/editinfo") {
  //   // 那么就要进行token校验 如果有token就放行
  // if (localStorage.getItem("token")) {
  //   next();
  // } else {
  //   // Toast.fail(message)
  //   // // 如果没有就跳转到登录页
  //   router.push("/login").catch(err => {
  //     console.log(err);
  //   })
  //   // 有可能找到另一种跳转方法
  //   // next("/login")
  //   // 新版路由已经不是这么写了
  //   // 需要直接用router.push
  //   return
  // }
  // }

  // if (from.path == "/perinfo/editinfo" && to.path == "/perinfo") {
  //   console.log('从编辑页到中心页刷新页面');
  //   location.reload();
  // }

  // 只要有了守卫，必然会拦截所有的跳转
  // 在放行之前，所有的跳转都会停住，如果没有放行 一片空白
  next();

})

// 设置 axios 的基准路径
axios.defaults.baseURL = 'http://itluoshuai.cn:3000'

// 添加axios拦截器
axios.interceptors.request.use(config => {
  // console.log(config.url); //https://autumnfish.cn/api/joke/list
  // 不同的系统设计，带token的地方可能不一样，标准情况下在token前 应该加上Bearer
  // 有token 但是 没有带上，那么我就让请求带上
  if (localStorage.getItem("token") && !config.headers.Authorization) {
    config.headers.Authorization = "Bearer " + localStorage.getItem("token")
  }
  // console.log(config.headers.Authorization);

  return config
}, err => {
  console.log(err);
})

axios.interceptors.response.use(res => {
  const {
    message,
    statusCode
  } = res.data
  // console.log(res.data);
  if (statusCode == 401) {
    console.log("这里是响应拦截");
    Toast.fail(message)
  }
  // 必须放行，否则就放不出请求
  return res;
})


Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')