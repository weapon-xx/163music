/* eslint-disable */

import createApp from '@/main';
const { app, router } = createApp();

describe('Router', () => {
    const vm = app.$mount();

    it('router.back is a function', () => {
        expect(typeof router.back === 'function').to.be.equal(true);
    });

    it('router components are async components', () => {
        vm.$router.options.routes.forEach(route => {
            expect(typeof route.component === 'function').to.be.equal(true);            
        })
    });
});