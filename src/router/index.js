import Vue from 'vue'
import Router from 'vue-router'
import {getCookie} from '../javascript/util'
import index from '../views/index'
import login from '../views/login'
import play from '../views/play'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    }, 
    {
      path: '/login',
      name: 'login',
      component: login 
    },
    {
      path: '/play',
      name: 'play',
      component: play 
    }
  ]
})

router.beforeEach((to, from, next) => {
  //@todo 依赖 cookie 校验登录态
  console.log(getCookie(''))
  next()
  // next('/login')
  // if(!!getCookie('')) {
  //   next()    
  // } else {
  //   next('/login')
  // }
})

export default router