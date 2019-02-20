/* eslint-disable */

import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils';
import mutations from '@/store/mutations';
import getters from '@/store/getters';
import state from '@/store/state';

describe('Vuex', () => {
    let storeConfig = {
        state, getters, mutations, 
        actions: {
            requestIndex({ state }) {
                state.banners = ['test'];
                state.recommend = ['test'];
            }
        }
    }; 
    const localVue = createLocalVue();
    localVue.use(Vuex);
    const store = new Vuex.Store(storeConfig);

    it('commit mutation modify user id', () => {
        expect(store.state.user.id).to.be.equal(0);
        store.commit('updateUserId', 'testid');
        expect(store.state.user.id).to.be.equal('testid');
    });

    it('commit mutation modify playlist', () => {
        expect(store.state.user.playList.length).to.be.equal(0);
        store.commit('updateUserPlayList', ['test']);
        expect(store.state.user.playList.length).to.be.equal(1);
    });
});