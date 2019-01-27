import Vue from 'vue';
import Router from 'vue-router';
import { isLogin } from '../javascript/util';
import index from '../views/index.vue';
import login from '../views/login.vue';
import play from '../views/play.vue';
import playlist from '../views/playlist.vue';
import myMusic from '../views/myMusic.vue';
import friend from '../views/friend.vue';
import userDetail from '../views/userDetail.vue';

Vue.use(Router);

Router.prototype.back = function back() {
  this.isBack = true;
  this.go(-1);
};

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/play/:id',
      name: 'play',
      component: play,
    },
    {
      path: '/playlist/:id',
      name: 'playlist',
      component: playlist,
    },
    {
      path: '/myMusic',
      name: 'myMusic',
      component: myMusic,
    },
    {
      path: '/friend',
      name: 'friend',
      component: friend,
    },
    {
      path: '/userDetail',
      name: 'userDetail',
      component: userDetail,
    },
  ],
});

router.beforeEach((to, from, next) => {
  // 依赖 cookie 校验登录态
  const islogin = isLogin();
  if (to.name === 'login') {
    if (islogin) {
      next('/');
    } else {
      next();
    }
  } else if (islogin) {
    next();
  } else {
    next('/login');
  }
});

export default router;
