import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      user: {
          isLogin: false
      },
      song: {
        id: undefined,
        isPlay: false,
        url: undefined,
        duration: undefined,
        currentTime: undefined
      }
    },
    getters: {
        isPlay(state) {
            return state.song.isPlay
        },
        songUrl(state) {
            return state.song.url
        },
        songId(state) {
            return state.song.id
        },
        duration(state) {
            return state.song.duration
        },
        currentTime(state) {
            return state.song.currentTime
        }
    },
    mutations: {
        operate(state, status) {
            state.song.isPlay = status
        },
        updateSongUrl(state, url) {
            state.song.url = url
        },
        updateSongId(state, id) {
            state.song.id = id
        },
        duration(state, time) {
            state.song.duration = time
        },
        currentTime(state, time) {
            state.song.currentTime = time
        }
    }
})

export default store

  