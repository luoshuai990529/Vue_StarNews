import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入登录和注册组件
import Login from "@/views/Login.vue"
import Register from "@/views/Register.vue"
Vue.use(VueRouter)

const routes = [{
    name: "Login",
    path: "/login",
    component: Login
  },
  {
    name: "Register",
    path: "/register",
    component: Register
  }
]

const router = new VueRouter({
  routes
})

export default router