<template>
    <div class="play-container">
        <div class="player-top-mask"></div>
        <div class="player-cover-bg" :style="{backgroundImage: `url(${song && song.al.picUrl})`}">
        </div>
        <div class="player-topbar">
            <i class="player-back wif icon-left" @click="back"></i>
            <div class="player-song-text">
                <p class="player-topbar-title single-line-overflow">{{song && song.name}}</p>
                <p class="player-topbar-singer">{{song && song.ar[0].name}}</p>
            </div>
        </div>
        <div v-show="!isShowLyric" class="player-cover-box">
          <img class="player-cover-rod" :class="[isPlay ? 'active' : '']" src="../img/rod.png" alt="">
          <div class="player-cover-wrap" :class="[isPlay ? 'active' : '']">
            <img class="player-cover-cd" src="../img/cd.png" alt="" @click="switchLyric" />
            <div v-if="song" class="player-cover" :style="{backgroundImage: `url(${(song && song.al.picUrl)})`}"></div>
            <div v-else class="player-cover"></div>
          </div>
        </div>
        <div v-show="isShowLyric" ref="lyricBox" class="player-lyric-box" @click="switchLyric">
            <p :class="{active: lyricIndex === index}" :key="index" v-for="(item, index) in lyric">{{item && item.lyric}}</p>
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
            <div class="player-control-last wif icon-left" @click="preSong"></div>
            <div ref="operateBtn" class="player-control-operate wif operate-btn"
             :class="[isPlay ? 'icon-pause' : 'icon-play']" @click="operate"></div>
            <div class="player-control-last wif icon-right" @click="nextSong"></div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { setInterval, clearInterval } from 'timers';
import { convertSecondToHHMMSS, convertHHMMSSToSecond } from '../javascript/util';
import { requestSongDetail, requestSongUrl, requestLyric } from '../api';
import eventbus from '../javascript/eventbus';

const LCKEY = 'music163';

export default {
    data() {
        return {
            song: undefined,
            showDragTime: undefined,
            lyric: undefined,
            isShowLyric: false,
            defaultCover: '',
        };
    },
    computed: {
        ...mapGetters(['isPlay', 'songId', 'duration', 'currentTime', 'tracks']),
        songDuration() {
            const duration = this.duration !== undefined ? parseInt(this.duration, 10) : undefined;
            return convertSecondToHHMMSS(duration);
        },
        songCurrTime() {
            const currentTime = this.currentTime !== undefined ? parseInt(this.currentTime, 10) : undefined;
            return convertSecondToHHMMSS(currentTime);
        },
        playScale() {
            if (this.duration !== undefined && this.currentTime !== undefined) {
                return `${parseInt(this.currentTime / this.duration * 100, 10)}%`;
            }
            return '0%';
        },
        lyricIndex() {
            if (this.currentTime !== undefined) {
                for (let i = 0; i < this.lyric.length; i += 1) {
                    if (this.lyric[i].time > this.currentTime) {
                        const index = i - 1;
                        this.lyricScroll(index);
                        return index;
                    }
                }
            }
            return 0;
        },
    },
    methods: {
        back() {
            this.$router.back();
        },
        saveLocalSong(songId) {
            if (localStorage) {
                localStorage.setItem(LCKEY, JSON.stringify({ songId })); // 设置缓存
            }
        },
        findSongIndex() {
            return this.tracks.findIndex(song => +song.id === +this.songId);
        },
        reset() {
            this.$store.commit('operate', false);
            this.$store.commit('updateCurrentTime', 0);
        },
        nextSong() {
            if (this.tracks.length === 0) {
                this.$pop.prompt('抱歉，当前未选中任何歌单');
                this.reset();
            } else {
                let index = this.findSongIndex();
                if (index === this.tracks.length - 1) {
                    index = 1;
                }
                const nextSong = this.tracks.slice(index + 1, index + 2)[0];
                this.updateSongInfo(nextSong.id);
                this.saveLocalSong(nextSong.id);
            }
        },
        preSong() {
            if (this.tracks.length === 0) {
                this.$pop.prompt('抱歉，当前未选中任何歌单');
                this.reset();
            } else {
                let index = this.findSongIndex();
                if (index === 0) {
                    index = this.tracks.length - 1;
                }
                const preSong = this.tracks.slice(index - 1, index)[0];
                this.updateSongInfo(preSong.id);
                this.saveLocalSong(preSong.id);
            }
        },
        operate() {
            if (this.songId === 0) {
                this.$pop.prompt('抱歉，当前未选中任何歌曲');
                return;
            }
            if (this.isPlay) {
                this.$store.commit('operate', false);
            } else {
                this.$store.commit('operate', true);
            }
        },
        lyricScroll(index) {
            const { lyricBox } = this.$refs;
            const { offsetHeight } = lyricBox;
            const { scrollHeight } = lyricBox;
            const { scrollTop } = lyricBox;
            function animate(currentTop, targetTop) {
                let distance = targetTop - currentTop;
                const timer = setInterval(() => {
                    let step = distance / 30;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    lyricBox.scrollTop += step;
                    distance -= step;
                    if (distance === 0) {
                        clearInterval(timer);
                    }
                }, 20);
            }

            if (scrollTop + offsetHeight < scrollHeight) {
                animate(scrollTop, 32 * index);
            }
        },
        switchLyric() {
            this.isShowLyric = !this.isShowLyric;
        },
        updateSongInfo(songId) {
            this.$store.commit('updateSongId', songId);
            // 获取歌曲链接
            this.requestSongUrl(songId).then((data) => {
                if (data && +data.code === 200) {
                    this.$store.commit('updateSongUrl', data.data[0].url);
                }
            });
            // 获取歌曲详情
            this.requestSongDetail(songId).then((data) => {
                if (data && +data.code === 200) {
                    [this.song] = data.songs;
                }
            });
            // 获取歌词
            this.requestLyric(songId).then((data) => {
                if (data && +data.code === 200) {
                    if (data.nolyric) {
                        this.lyric = ['暂无歌词'];
                    } else {
                        this.lyric = data.lrc.lyric.split('\n').reduce((all, item) => {
                            const arr = item.match(/\[(.*)\](.*)/);
                            if (arr) {
                                const [time, lyric] = arr.slice(1, 3);
                                if (lyric) {
                                    all.push({
                                        time: convertHHMMSSToSecond(time),
                                        lyric,
                                    });
                                }
                            }
                            return all;
                        }, []);
                    }
                }
            });
        },
        requestSongDetail(songId) {
            return requestSongDetail(songId).then(data => data);
        },
        requestSongUrl(songId) {
            return requestSongUrl(songId).then(data => data);
        },
        requestLyric(songId) {
            return requestLyric(songId).then(data => data);
        },
        initDrag() {
            const vm = this;
            const wrapWidth = 240;
            const point = document.querySelector('.player-progress-point');
            const playedProgress = document.querySelector('.player-progress-played');
            const { offsetLeft } = document.querySelector('.player-progress-wrap');

            point.addEventListener('touchstart', () => {
                let dragTime;
                point.addEventListener('touchmove', (event) => {
                    let currentX = parseInt(event.touches[0].clientX, 10);
                    if (currentX < offsetLeft) {
                        currentX = offsetLeft;
                    }
                    if (currentX > offsetLeft + wrapWidth) {
                        currentX = offsetLeft + wrapWidth;
                    }
                    const progressPos = (currentX - offsetLeft) / wrapWidth;
                    dragTime = parseInt(vm.duration * progressPos, 10);
                    vm.showDragTime = convertSecondToHHMMSS(dragTime);
                    point.style.left = `${parseInt(progressPos * 100, 10)}%`;
                    playedProgress.style.width = `${parseInt(progressPos * 100, 10)}%`;
                }, false);

                point.addEventListener('touchend', () => {
                    vm.$store.commit('updateCurrentTime', dragTime);
                    vm.showDragTime = undefined; // 重置拖拽时进度条时间
                }, false);
            }, false);
        },
    },
    mounted() {
        let songId;
        const urlId = +this.$route.params.id;
        if (urlId) {
            // url
            if (urlId !== this.songId) {
                songId = urlId;
                this.saveLocalSong(songId);
            } else {
                ({ songId } = this);
            }
        } else if (this.songId) {
            // vuex
            ({ songId } = this);
        } else {
            // localStorage
            ({ songId } = (JSON.parse(localStorage.getItem(LCKEY)) || {}));
        }
        if (!songId) {
            return;
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

.play-container {
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
    background-size: cover;
    opacity: .3;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    filter: blur(10px);
}

.player-cover-box {
    position: relative;
    overflow: hidden;
    padding: 84px 0;
    .player-cover-rod {
        position: absolute;
        top: -15px;
        left: 50%;
        display: block;
        width: 120px;
        margin-left: -20px;
        transform-origin: 15px 15px;
        transform: rotate(-30deg);
        transition: transform .5s ease;
        z-index: 2;
    }
    .active {
        transform: rotate(0deg);
    }
}

.player-cover-wrap {
    position: relative;
    width: 338px;
    margin: 0 auto;
    border-radius: 50%;
    border: 1px solid #eaeaea85;
    animation: coverRotate 10s linear infinite running;
    animation-play-state: paused;
    .player-cover-cd {
        display: block;
        width: 100%;
        z-index: 1;
    }
    .player-cover {
        position: absolute;
        left: 50%;
        top: 50%;
        display: block;
        height: 220px;
        width: 220px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        background-image: url('../img/default-cover.jpg');
        margin-left: -32%;
        margin-top: -32%;
        z-index: -1;
    }
    &.active {
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

.player-lyric-box {
    position: relative;
    width: 80%;
    height: 150px;
    margin: 20px auto 0;
    overflow-y: scroll;
    padding-top: 250px;
    p {
        text-align: center;
        font-size: 14px;
        line-height: 30px;
        color: #fff;
        opacity: .5;
        transition: all .5s ease;
        &.active {
            color: #fff;
            font-weight: bolder;
            opacity: 1;
        }
    }
}

.player-progress-box {
    position: absolute;
    bottom: 120px;
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
        width: 230px;
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

.player-top-mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #000;
    filter: blur(15px);
    z-index: -1;
    opacity: .3;
}

@media (max-height: 480px) {
   .player-cover-box {
        padding: 40px 0;
        .player-cover-rod {
            left: 50%;
            width: 100px;
        }
        .active {
            transform: rotate(-12deg);
        }
        .player-cover-wrap {
            width: 280px;
            .player-cover {
                height: 180px;
                width: 180px;
            }
        }
    }
    .player-lyric-box {
        padding-top: 150px;
    }
}
</style>
