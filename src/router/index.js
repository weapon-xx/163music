import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export function createRouter () {
  return new Router({
    routes: [
      {
        path: '/',
        name: 'index',
        component: () => import('../views/index.vue'),
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/login.vue'),
      },
      {
        path: '/play/:id',
        name: 'play',
        component: () => import('../views/play.vue'),
      },
      {
        path: '/playlist/:id',
        name: 'playlist',
        component: () => import('../views/playlist.vue'),
      },
      {
        path: '/myMusic',
        name: 'myMusic',
        component: () => import('../views/myMusic.vue'),
      },
      {
        path: '/friend',
        name: 'friend',
        component: () => import('../views/friend.vue'),
      },
      {
        path: '/userDetail',
        name: 'userDetail',
        component: () => import('../views/userDetail.vue'),
      },
    ],
  });
}

Router.prototype.back = function back() {
  this.isBack = true;
  this.go(-1);
};

export default createRouter;
