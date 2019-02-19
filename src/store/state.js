export default {
  // user
  user: {
    id: 0, // user id
    isLogin: false, // login flag
    playList: [], // user create playlist
  },

  // song
  song: {
    id: 0,
    url: '',
    isPlay: false,
    duration: 0,
    currentTime: 0,
  },

  // play list
  playlist: {
    id: 0, // id
    tracks: [], // songs in play list
  },

  recommend: [],
  banners: [],
  events: [],
};
