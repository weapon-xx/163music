/* eslint-disable */

import createApp from '@/main';
const { app } = createApp();

describe('App', () => {
    const vm = app.$mount();

    // test render
    it('app render', () => {
      expect(vm.$el.outerHTML).contain('<div id="app">');
    });

    // test childnodes
    it('app childnodes', () => {
      expect(vm.$el.childNodes.length).to.be.equal(3);
    });

});