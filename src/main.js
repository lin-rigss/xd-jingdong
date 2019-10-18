import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'amfe-flexible'
import setaxios from './setaxios'
setaxios()

Vue.config.productionTip = false

Vue.prototype.$http=axios


//全局路由守卫   无论是刷新还是跳转路由，第一个进入的就是这个路由前置钩子函数
router.beforeEach((to,from,next)=>{
  // 首先从本地存储中 获取token 存储在vuex中
  store.commit('settoken',localStorage.getItem('token'))
  // 判断 路由有没有meta.requireAuth 属性
  if(to.meta.requireAuth){
    // 判断vuex中的token是否存在，如果存在，就证明已经登录了，就直接跳到对应的页面。
    if(store.state.token){
      next()
    }else{
      // 如果token不存在，就跳转到登录页面，并携带参数  重定向 并传入当前的路由
      // 携带参数的意义： 从哪个路由点过来的，登录后，就去哪个路由 （fullPath整个路由）
      next({path:'/login',query:{redirect:to.fullPath}})                   
    }
  }else{
    next()
  }
})


// 实现 vuex 的数据持久化  就是将 vuex中的数据存储到本地存储中，
// 监听每次调用mutations的时候,都会触发这个方法，然后我们可以做一些自己想做的处理
store.subscribe((mutations,state)=>{
  localStorage.setItem('cartarry',JSON.stringify(state.cartarry))
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
