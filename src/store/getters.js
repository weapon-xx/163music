export default {
    // user
    userId(state) {
        return state.user.id;
    },
    userPlayList(state) {
        return state.user.playList;
    },

    // player
    isPlay(state) {
        return state.song.isPlay;
    },
    songUrl(state) {
        return state.song.url;
    },
    songId(state) {
        return state.song.id;
    },
    duration(state) {
        return state.song.duration;
    },
    currentTime(state) {
        return state.song.currentTime;
    },
    tracks(state) {
        return state.playlist.tracks;
    },
};
