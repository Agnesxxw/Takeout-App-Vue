// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Axios from "axios"
// 1. import components
import Goods from "./components/Goods/goods"
import Comments from "./components/Comments/Comments"
import Restaurants from "./components/Seller/Seller"


Vue.config.productionTip = false
// install vueRouter
Vue.use(VueRouter);
// 如果在其他组件中使用Axios，需要将它改写为vue的原型属性
Axios.defaults.baseURL = 'http://localhost:8080'
Vue.prototype.$axios = Axios;

// 2. Define the routes, each corresponding to a component
const routes = [
  {path:"/", /*redirect*/redirect:'/goods'},
  {path:"/goods", component: Goods},
  {path:"/ratings", component:Comments},
  {path:"/restaurant", component:Restaurants}
]

// 3. Create the instance of router
const router = new VueRouter({
  routes,
  // class after selection (default:)
  linkActiveClass:"active"
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  // 4. 创建和挂载根的实例
  router
})
