import Vue from 'vue'
import Router from 'vue-router'
import { isLogin } from '../javascript/util'
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
  // 依赖 cookie 校验登录态
  const _islogin = isLogin()
  if(to.name === 'login') {
    if(_islogin) {
      next('/')    
    } else {
      next()
    }
  } else {
    if(_islogin) {
      next()    
    } else {
      next('/login')
    }
  }
})

export default router