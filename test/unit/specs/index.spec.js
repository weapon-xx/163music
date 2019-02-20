import Vue from 'vue';
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import mutations from '@/store/mutations';
import getters from '@/store/getters';
import state from '@/store/state';
import banners from '@/components/banner.vue';

describe('index', () => {
    let storeConfig = {
        state, getters, mutations, 
        actions: {
            requestIndex({ state }) {
                state.banners = [{imageUrl: 'test'}, {imageUrl: 'test'}];
                state.recommend = [{}];
            }
        }
    }; 
    const localVue = createLocalVue();
    localVue.use(Vuex);
    const store = new Vuex.Store(storeConfig);

    it('index dispatch actions modify state in ssr', () => {
        expect(store.state.banners.length).to.be.equal(0);
        expect(store.state.recommend.length).to.be.equal(0);
        store.dispatch('requestIndex');
        expect(store.state.banners.length).to.be.equal(2);
        expect(store.state.recommend.length).to.be.equal(1);
    });

    it('banners render correctly', (done) => {
        const wrapper = shallowMount(banners);
        wrapper.setProps({ banners: store.state.banners })
        Vue.nextTick(() => {
            const slides = wrapper.findAll('.swiper-slide');
            expect(slides.length).to.be.equal(2);
            done();
        });
    });
});