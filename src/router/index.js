import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入登录和注册组件
import Login from "@/views/Autho/Login.vue"
import Register from "@/views/Autho/Register.vue"
import Home from "@/views/Home.vue"
import PerInfo from "@/views/Personal/PerInfo.vue"
import SecInfo from "@/views/SecInfo.vue"
import EditInfo from "@/views/Personal/EditInfo.vue"
Vue.use(VueRouter)

const routes = [{
    name: "Home",
    path: "/",
    components: {
      /* key是viewrouter的name值  Home是引入的组件 */
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
  }, {
    name: "SecInfo",
    path: "/secinfo",
    components: {
      SecInfoTemp: SecInfo
    }
  },
  {
    name: "EditInfo",
    path: "/editinfo",
    components: {
      EditInfoTemp: EditInfo
    }
  }
]

const router = new VueRouter({
  routes
})

export default router