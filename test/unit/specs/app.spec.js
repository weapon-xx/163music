/* eslint-disable */

import createApp from '@/main';
const { app } = createApp();

describe('App', () => {
    const vm = app.$mount();

    it('app can render correctly', () => {
      expect(vm.$el.outerHTML).contain('<div id="app">');
    });

    it('app has 3 childnodes', () => {
      expect(vm.$el.childNodes.length).to.be.equal(3);
    });

});