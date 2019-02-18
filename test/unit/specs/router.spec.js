/* eslint-disable */

import createApp from '../../../src/main';
const { app, router } = createApp();

describe('Router', () => {
    const vm = app.$mount();

    //
    it('router.back test', () => {
        expect(typeof router.back === 'function').to.be.equal(true);
    });

    // 
    it('router component test', () => {
        vm.$router.options.routes.forEach(route => {
            expect(typeof route.component === 'function').to.be.equal(true);            
        })
    });

});