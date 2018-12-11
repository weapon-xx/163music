import Vue from 'vue'
import Router from 'vue-router'
import { isLogin } from '../javascript/util'
import index from '../views/index'
import login from '../views/login'
import play from '../views/play'
import playlist from '../views/playlist'
import myMusic from '../views/myMusic'

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
      path: '/play/:id',
      name: 'play',
      component: play 
    },
    {
      path: '/playlist/:id',
      name: 'playlist',
      component: playlist
    }, 
    {
      path: '/myMusic',
      name: 'myMusic',
      component: myMusic
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