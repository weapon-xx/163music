import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      user: {
          isLogin: false
      },
      song: {
        isPlay: false,
        url: undefined
      }
    },
    getters: {
        isPlay(state) {
            return state.song.isPlay
        },
        songUrl(state) {
            return state.song.url
        }
    },
    mutations: {
        operate(state) {
            state.song.isPlay = !state.song.isPlay;
        },
        updateSongUrl(state, url) {
            state.song.url = url;
        }
    }
})

export default store

  