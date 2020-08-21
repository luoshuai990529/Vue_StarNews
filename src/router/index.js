import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
const Home = () => {
  // 在这里引入"../views/Home.vue"
  // 函数声明时不会执行
  // 调用的时候才会执行
  // 效果就是这里的声明式并不会真正引入文件
  // 只有跳转到某个页面触发路由，解析组建的时候才会执行这个函数真正的引入文件
  return import("@/views/Home.vue")
}
// import Home from "@/views/Home.vue"
const Login = () => {return import("@/views/Autho/Login.vue")}
const Register = () => {return import("@/views/Autho/Register.vue")}
const PerInfo = () => {return import("@/views/Personal/PerInfo.vue")}
const SecInfo = () => {return import("@/views/SecInfo.vue")}
const EditInfo = () => {return import("@/views/Personal/EditInfo.vue")}
const Attention = () => {return import("@/views/Personal/Attention.vue")}
const TestApi = () => {return import("@/views/TestApi.vue")}
const PostDetail = () => {return import("@/views/PostDetail.vue")}
const myStar = () => {return import("@/views/Personal/myStar.vue")}
const myDiscuss = () => {return import("@/views/Personal/myDiscuss.vue")}
const MoreComments = () => {return import("@/views/MoreComments.vue")}
const ColManager = () => {return import("@/views/Personal/columnManager.vue")}
Vue.use(VueRouter)

const routes = [{
    name: "Home",
    path: "/home",
    components: {
      /* key是viewrouter的name值  Home是引入的组件 */
      HomeTemp: Home
    }
  }, {
    path: "/",
    redirect: "/home"
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
    },
    meta: {
      needAuth: true
    },
    // 个人中心子路由columnManager.vue
    children: [{
        path: "columnmanager",
        components: {
          ManagerTemp: ColManager
        },
        meta: {
          needAuth: true
        },
      }, {
        path: "editinfo",
        components: {
          EditInfoTemp: EditInfo
        },
        meta: {
          needAuth: true
        },
      },
      {
        path: "attention",
        components: {
          AttentionTemp: Attention
        },
        meta: {
          needAuth: true
        },
      },
      {
        path: "mystar",
        components: {
          myStarTemp: myStar
        },
        meta: {
          needAuth: true
        },
      },
      {
        path: "mydiscuss",
        components: {
          myDiscussTemp: myDiscuss
        },
        meta: {
          needAuth: true
        },
      }
    ]
  }, {
    name: "SecInfo",
    path: "/secinfo",
    components: {
      SecInfoTemp: SecInfo
    }
  },
  {
    name: "TestApi",
    path: "/testapi",
    components: {
      TestTemp: TestApi
    }
  }, {
    name: "PostDetail",
    path: "/postdetail",
    components: {
      PostDetialTemp: PostDetail
    },
    meta: {
      needAuth: true
    },
  },
  {
    name: "MoreComments",
    path: "/morecomments",
    components: {
      MoreCommentTemp: MoreComments
    },
    meta: {
      needAuth: true
    },
  }
]

const router = new VueRouter({
  routes
})

export default router