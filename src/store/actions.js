import * as api from '../api';

export default {
  // index.vue prefetch action
  requestIndex({ state }, cookie) {
    return Promise.all([api.requestResource(cookie), api.requestBanner(cookie)]).then((dataArr) => {
      if (dataArr[0].code === 200) {
        state.recommend = dataArr[0].recommend;
      }
      if (dataArr[1].code === 200) {
        state.banners = dataArr[1].banners;
      }
    });
  },

  // myMusic.vue prefetch action
  requestMyMusic({ state }, cookie) {
    return api.requestUserPlaylist(state.user.id, cookie).then((data) => {
      if (data && +data.code === 200) {
        state.user.playList = data.playlist;
      }
    });
  },

  // friend.vue prefetch action
  requestFriend({ state }, cookie) {
    return api.requestEvent(state.user.id, cookie).then((data) => {
      if (data && +data.code === 200) {
        state.events = data.event.map((item) => {
          item.data = JSON.parse(item.json);
          return item;
        });
      }
    });
  },
};
