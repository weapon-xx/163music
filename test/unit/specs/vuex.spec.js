/* eslint-disable */

import comp from '@/views/index.vue';
import banner from '../../../src/components/banner.vue';
import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()

describe('Vuex', () => {
    let store;

    beforeEach(() => {
        store = new Vuex.Store({
            state: {
                recommend: [],
                banners: []
            },
            actions: {
                requestIndex() {

                }
            } 
        })
    })

    //
    it('async data', () => {
        const component = mount(comp, {
            store, localVue
        });

        // expect(typeof router.back === 'function').to.be.equal(true);
    });

});