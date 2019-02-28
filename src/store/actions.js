import * as api from '../api';

export default {
    // index.vue prefetch action
    requestIndex({ commit }, cookie) {
        return Promise.all([api.requestResource(cookie), api.requestBanner(cookie)]).then((dataArr) => {
            if (dataArr[0] && dataArr[0].code === 200) {
                commit('updateRecommend', dataArr[0].recommend);
            }
            if (dataArr[1] && dataArr[1].code === 200) {
                commit('updateBanners', dataArr[1].banners);
            }
        });
    },

    // myMusic.vue prefetch action
    requestMyMusic({ state, commit }, cookie) {
        return api.requestUserPlaylist(state.user.id, cookie).then((data) => {
            if (data && +data.code === 200) {
                commit('updateUserPlayList', data.playlist);
            }
        });
    },

    // friend.vue prefetch action
    requestFriend({ state }, cookie) {
        return api.requestEvent(cookie).then((data) => {
            if (data && +data.code === 200) {
                state.events = data.event.map((item) => {
                    item.data = JSON.parse(item.json);
                    return item;
                });
            }
        });
    },

    // request login status and update user id
    requestLoginStatus({ commit }) {
        return api.requestLoginStatus().then((data) => {
            if (data && +data.code === 200) {
                commit('updateUserId', data.bindings[1].userId);
            }
        }).catch((e) => {
            console.error(e);
        });
    },
};
