import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login.vue"
Vue.use(VueRouter)

const routes = [{
  path: "/login",
  component: function () {
    return import( /* webpackChunkName: "about" */ '../views/Login.vue')
  }
}]

const router = new VueRouter({
  routes
})

export default router