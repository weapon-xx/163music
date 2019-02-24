import createApp from './main';
import { isLogin } from './javascript/util';

const { app, router, store } = createApp();

const islogin = isLogin();
if (router.history.pending.name === 'login') {
    if (islogin) {
        router.push('/');
    }
} else if (!islogin) {
    router.push('/login');
}

router.onReady(() => {
    app.$mount('#app');
});

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}
