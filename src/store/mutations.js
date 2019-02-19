export default {
  // user
  updateUserId(state, id) {
    state.user.id = id;
  },
  updateUserPlayList(state, list) {
    state.user.playList = list;
  },


  // player
  operate(state, status) {
    state.song.isPlay = status;
  },
  updateSongUrl(state, url) {
    state.song.url = url;
  },
  updateSongId(state, id) {
    state.song.id = id;
  },
  duration(state, time) {
    state.song.duration = time;
  },
  currentTime(state, time) {
    state.song.currentTime = time;
  },
  updatePlaylist(state, playlist) {
    state.playlist.id = playlist.id;
    state.playlist.tracks = playlist.tracks;
  },
};
