import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入登录和注册组件
import Login from "@/views/Login.vue"
import Register from "@/views/Register.vue"
import Home from "@/views/Home.vue"
import PerInfo from "@/views/PerInfo.vue"
Vue.use(VueRouter)

const routes = [{
    name: "Home",
    path: "/",
    components: {
      HomeTemp: Home
    }
  }, {
    name: "Login",
    path: "/login",
    components: {
      loginTemp: Login
    }
  },
  {
    name: "Register",
    path: "/register",
    components: {
      registerTemp: Register,
    }
  }, {
    name: "PerInfo",
    path: "/perinfo",
    components: {
      PerInfoTemp: PerInfo
    }
  }
]

const router = new VueRouter({
  routes
})

export default router