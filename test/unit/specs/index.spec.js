import Vue from 'vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import mutations from '@/store/mutations';
import getters from '@/store/getters';
import state from '@/store/state';
import banners from '@/components/banner.vue';
import listBlock from '@/components/listBlock.vue';

describe('index', () => {
    const store = new Vuex.Store({
        state, getters, mutations, 
        actions: {
            requestIndex({ state }) {
                state.banners = [{imageUrl: 'test'}, {imageUrl: 'test'}];
                state.recommend = [{}];
            }
        }
    });

    it('index dispatch actions modify state in ssr', () => {
        expect(store.state.banners.length).to.be.equal(0);
        expect(store.state.recommend.length).to.be.equal(0);
        store.dispatch('requestIndex');
        expect(store.state.banners.length).to.be.equal(2);
        expect(store.state.recommend.length).to.be.equal(1);
    });

    it('banners render', (done) => {
        const wrapper = shallowMount(banners, {
            propsData: {
                banners: store.state.banners,
            }
        });
        Vue.nextTick(() => {
            const slides = wrapper.findAll('.swiper-slide');
            expect(slides.length).to.be.equal(2);
            done();
        });
    });

    it('listBlock render', (done) => {
        const wrapper = shallowMount(listBlock, {
            propsData: {
                list: store.state.recommend,
            }
        });
        wrapper.vm.$nextTick(() => {
            const blocks = wrapper.findAll('.list-block-item');
            expect(blocks.length).to.be.equal(1);
            done();
        });
    });
});