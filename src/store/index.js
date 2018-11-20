import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      isPlay: false,
      songUrl: '123',
      user: {
          isLogin: false
      }
    },
    getters: {
        isPlay(state) {
            return state.isPlay
        },
        songUrl() {
            return state.songUrl
        }
    },
    mutations: {
        operate(state) {
            state.isPlay = !state.isPlay;
        }
    }
})

export default store

  