/* eslint-disable */

import createApp from '../../../src/main';
const { app, router } = createApp();


describe('Plugin', () => {
    const vm = app.$mount();

    it('pop plugin is load correctly', () => {
        expect(typeof vm.$pop !== undefined).to.be.equal(true);
    }) 

});