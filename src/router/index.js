import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index'
import login from '../components/login'

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
    }
  ]
})
