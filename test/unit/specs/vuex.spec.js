/* eslint-disable */

import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils';
import mutations from '@/store/mutations';
import getters from '@/store/getters';
import state from '@/store/state';

describe('Vuex', () => {
    let storeConfig = {
        state, getters, mutations,
    };
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

    it('commit mutation modify song isPlay', () => {
        expect(store.state.song.isPlay).to.be.equal(false);
        store.commit('operate', true);
        expect(store.state.song.isPlay).to.be.equal(true);
    });

    it('commit mutation modify song url', () => {
        expect(store.state.song.url).to.be.equal('');
        store.commit('updateSongUrl', 'test');
        expect(store.state.song.url).to.be.equal('test');
    });

    it('commit mutation modify song id', () => {
        expect(store.state.song.id).to.be.equal(0);
        store.commit('updateSongId', 'test');
        expect(store.state.song.id).to.be.equal('test');
    });

    it('commit mutation modify song duration', () => {
        expect(store.state.song.duration).to.be.equal(0);
        store.commit('updateDuration', 'test');
        expect(store.state.song.duration).to.be.equal('test');
    });

    it('commit mutation modify song currentTime', () => {
        expect(store.state.song.currentTime).to.be.equal(0);
        store.commit('updateCurrentTime', 'test');
        expect(store.state.song.currentTime).to.be.equal('test');
    });

    
    it('commit mutation modify playlist', () => {
        expect(store.state.playlist.id).to.be.equal(0);
        expect(store.state.playlist.tracks.length).to.be.equal(0);
        store.commit('updatePlaylist', {
            id: 'test',
            tracks: [{}]
        });
        expect(store.state.playlist.id).to.be.equal('test');
        expect(store.state.playlist.tracks.length).to.be.equal(1);
    });
});