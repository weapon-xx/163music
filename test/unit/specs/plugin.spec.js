/* eslint-disable */

import createApp from '@/main';
const { app } = createApp();


describe('Plugin', () => {
    const vm = app.$mount();

    it('pop plugin can be load', () => {
        expect(typeof vm.$pop !== undefined).to.be.equal(true);
    }) 

});