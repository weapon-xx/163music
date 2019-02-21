import { shallowMount } from '@vue/test-utils';
import headBox from '@/components/headBox.vue';
import Router from 'vue-router';
import Vuex from 'vuex';
import getters from '@/store/getters';
import state from '@/store/state';

describe('index', () => {
    const router = new Router({
        mode: 'history',
        routes: [
          {
            path: '/',
            name: 'index',
          },
          {
            path: '/play/:id',
            name: 'play',
          },
        ],
    });

    const store = new Vuex.Store({
        state, getters,
    });

    it('click goPlay', () => {
        const wrapper = shallowMount(headBox, { store, router });
        wrapper.find('.voice-box').trigger('click');
        expect(router.history.current.name).to.be.equal('play');
    }) 
})
