<template>
    <div class="play-box">
        <div class="play-mask player-top-mask"></div>
        <div class="player-cover-bg" :style="{backgroundImage: `url(${song && song.al.picUrl})`}"></div>
        <div class="player-topbar">
            <i class="player-back wif icon-left" @click="back"></i>
            <div class="player-song-text">
                <p class="player-topbar-title single-line-overflow">{{song && song.name}}</p>
                <p class="player-topbar-singer">{{song && song.ar[0].name}}</p>
            </div>
            <div></div>
        </div>
        <div class="player-cover-box">
            <img class="player-cover-rod" :class="[isPlay ? 'active' : '']" src="../img/rod.png" alt="">
            <div class="player-cover-wrap">
                <img class="player-cover-cd" src="../img/cd.png" alt="">
                <img class="player-cover" :class="[isPlay ? 'active' : '']" :src="song && song.al.picUrl" alt="">
            </div>
        </div>
        <div class="player-progress-box">
            <p class="player-progress-currtime">{{showDragTime ? showDragTime : songCurrTime}}</p>
            <div class="player-progress-wrap">
                <div class="player-progress-played" :style="{width: playScale}"></div>
                <div class="player-progress-point" :style="{left: playScale}"></div>
            </div>
            <p class="player-progress-totaltime">{{songDuration}}</p>
        </div>
        <div class="player-control-box">
            <div class="player-control-last wif icon-left" @click="lastSong"></div>
            <div ref="operateBtn" class="player-control-operate wif operate-btn" :class="[isPlay ? 'icon-pause' : 'icon-play']" @click="operate"></div>
            <div class="player-control-last wif icon-right" @click="nextSong"></div>
        </div>
        <div class="play-mask player-bottom-mask"></div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { handleTime } from '../javascript/util';
import { requestSongDetail, requestSongUrl, requestLyric } from '../api';
import eventbus from '../javascript/eventbus';

export default {
  data() {
    return {
      song: undefined,
      showDragTime: undefined,
    };
  },
  computed: {
    ...mapGetters(['isPlay', 'songId', 'duration', 'currentTime', 'tracks']),
    songDuration() {
      const _duration = this.duration !== undefined ? parseInt(this.duration) : undefined;
      return handleTime(_duration);
    },
    songCurrTime() {
      const _currentTime = this.currentTime !== undefined ? parseInt(this.currentTime) : undefined;
      return handleTime(_currentTime);
    },
    playScale() {
      if (this.duration !== undefined && this.currentTime !== undefined) {
        return `${parseInt(this.currentTime / this.duration * 100)}%`;
      }
      return '0%';
    },
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    nextSong() {
      let index;
      this.tracks.filter((song, idx) => {
        if (song.id === this.songId) {
          index = idx;
        }
      })[0];
      if (index === this.tracks.length - 1) {
        index = 1;
      }
      const lastSong = this.tracks.slice(index + 1, index + 2)[0];
      this.updateSongInfo(lastSong.id);
    },
    lastSong() {
      let index;
      this.tracks.filter((song, idx) => {
        if (song.id === this.songId) {
          index = idx;
        }
      })[0];
      if (index === 0) {
        index = this.tracks.length - 1;
      }
      const lastSong = this.tracks.slice(index - 1, index)[0];
      this.updateSongInfo(lastSong.id);
    },
    operate() {
      if (this.isPlay) {
        this.$store.commit('operate', false);
      } else {
        this.$store.commit('operate', true);
      }
    },
    updateSongInfo(songId) {
      this.$store.commit('updateSongId', songId);
      this.requestSongUrl(songId).then((data) => {
        this.$store.commit('updateSongUrl', data.data[0].url);
      });
      this.requestSongDetail(songId).then((data) => {
        this.song = data.songs[0];
      });
    },
    requestSongDetail(songId) {
      return requestSongDetail(songId).then((data) => {
        if (data && +data.code === 200) {
          return data;
        }
        console.error();
      });
    },
    requestSongUrl(songId) {
      return requestSongUrl(songId).then((data) => {
        if (data && +data.code === 200) {
          return data;
        }
        console.error();
      });
    },
    initDrag() {
      const _this = this;
      const wrapWidth = 240;
      const point = document.querySelector('.player-progress-point');
      const playedProgress = document.querySelector('.player-progress-played');
      const offsetLeft = document.querySelector('.player-progress-wrap').offsetLeft;

      point.addEventListener('touchstart', (event) => {
        const originX = parseInt(event.touches[0].clientX);

        let dragTime;
        document.addEventListener('touchmove', (event) => {
          let currentX = parseInt(event.touches[0].clientX);
          const distance = currentX - originX;
          if (currentX < offsetLeft) {
            currentX = offsetLeft;
          }
          if (currentX > offsetLeft + wrapWidth) {
            currentX = offsetLeft + wrapWidth;
          }
          const progressPos = (currentX - offsetLeft) / 240;
          dragTime = parseInt(_this.duration * progressPos);
          _this.showDragTime = handleTime(dragTime);
          point.style.left = `${parseInt(progressPos * 100)}%`;
          playedProgress.style.width = `${parseInt(progressPos * 100)}%`;
        }, false);

        document.addEventListener('touchend', (event) => {
          _this.$store.commit('currentTime', dragTime);
          _this.showDragTime = undefined; // 重置拖拽时进度条时间
        }, false);
      }, false);
    },
  },
  mounted() {
    const LCKEY = 'music163';
    let songId;
    const urlId = +this.$route.params.id;
    if (urlId) {
      // url
      if (urlId !== this.songId) {
        songId = urlId;
        if (!this.isPlay) {
          this.operate(); // 暂停时自动播放
        }
        this.$store.commit('currentTime', 0);
        localStorage.setItem(LCKEY, JSON.stringify({ songId })); // 设置缓存
      } else {
        songId = this.songId;
      }
    } else if (this.songId) {
      // vuex
      songId = this.songId;
    } else {
      // localStorage
      songId = (JSON.parse(localStorage.getItem(LCKEY)) || {}).songId;
      this.operate(); // 自动播放
    }
    this.updateSongInfo(songId);
    this.initDrag();
    // 监听结束事件
    eventbus.$on('songEnd', () => {
      this.nextSong();
    });
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../style/common.scss";

.play-box {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
}

.player-topbar {
    position: relative;
    display: flex;
    justify-content: center;
    height: 45px;
    color: #fff;
    .player-back {
        position: absolute;
        top: 0;
        left: 10px;
        width: 30px;
        height: 45px;
        line-height: 45px;
        &::before {
            color: #fff;
        }
    }
    .player-topbar-title {
        font-size: 16px;
        margin-bottom: 3px;
    }
    .player-topbar-singer {
        font-size: 12px;
        text-align: center;
    }
    .player-song-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 200px;
        text-align: center;
    }
}

.player-cover-bg {
    background-position: center;
    background-repeat: no-repeat;
    opacity: .3;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    filter: blur(20px);
}

.player-cover-box {
    position: relative;
    overflow: hidden;
    padding: 60px 0;
    .player-cover-rod {
        position: absolute;
        top: -15px;
        left: 50%;
        display: block;
        width: 100px;
        margin-left: -20px;
        transform-origin: 15px 15px;
        transform: rotate(-30deg);
        transition: transform .5s ease;
        z-index: 2;
    }
    .active {
        transform: rotate(-6deg);
    }
}

.player-cover-wrap {
    position: relative;
    width: 80%;
    margin: 0 auto;
    border-radius: 50%;
    border: 1px solid #ccc;
    .player-cover-cd {
        display: block;
        width: 100%;
        z-index: 1;
    }
    .player-cover {
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 64%;
        margin-left: -32%;
        margin-top: -32%;
        z-index: -1;
        animation: coverRotate 10s linear infinite running;
        animation-play-state: paused;
    }
    .active {
        animation-play-state: running;
    }
}

@keyframes coverRotate {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}

.player-progress-box {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    padding: 0 10px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
        width: 15%;
        &:nth-of-type(2) {
            text-align: right;
        }
    }
    .player-progress-wrap {
        position: relative;
        width: 240px;
        height: 2px;
        border-radius: 20px;
        background-color: #f6f6f6;
        .player-progress-played {
            width: 0%;
            height: 2px;
            background-color: $main_color;
        }
        .player-progress-point {
            position: absolute;
            left: 0;
            top: -8px;
            width: 6px;
            height: 6px;
            background-color: $main_color;
            border: 6px solid #f6f6f6;
            border-radius: 50%;
        }
    }
}

.player-control-box {
    position: absolute;
    bottom: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    padding: 0 5%;
    .wif {
        width: 60px;
        height: 60px;
        line-height: 60px;
        font-size: 30px;
        text-align: center;
        &::before {
            color: #fff;
        }
    }
    .operate-btn {
        font-size: 60px;
    }
}

.play-mask {
    position: absolute;
    left: 0;
    width: 100%;
    background-color: #000;
    filter: blur(15px);
    z-index: -1;
    opacity: .1;
}

.player-top-mask {
    top: 0;
    height: 50px;
}

.player-bottom-mask {
    bottom: 0;
    height: 100px;
}
</style>
