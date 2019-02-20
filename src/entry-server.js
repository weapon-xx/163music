import createApp from './main';

export default context => new Promise((resolve, reject) => {
  const { app, router, store } = createApp();

  // set current url
  router.push(context.url);

  router.onReady(() => {
    const matchedComponents = router.getMatchedComponents();
    if (!matchedComponents.length) {
      return reject(new Error('not found matching component'));
    }

    // call `asyncData()` method from components
    return Promise.all(matchedComponents.map((Component) => {
      if (Component.asyncData) {
        return Component.asyncData({
          store,
          route: router.currentRoute,
          cookie: context.headers.cookie,
        });
      }
      return {};
    })).then(() => {
      // state convert `window.__INITIAL_STATE__` and write into html
      context.state = store.state;
      return resolve(app);
    }).catch(reject);
  }, reject);
});
