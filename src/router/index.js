import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/index'
import login from '../views/login'
import play from '../views/play'

Vue.use(Router)

export default new Router({
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
