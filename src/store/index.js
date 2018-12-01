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
        url: undefined
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
        }
    }
})

export default store

  