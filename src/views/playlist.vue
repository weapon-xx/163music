<template>
    <div class="list-container">
        <div class="list-topbar">
            <i class="wif icon-left list-topbar-icon" @click="goBack"></i>
            <h4 class="list-topbar-title">歌单</h4>
            <div :class="[{active: isPlay}, 'voice-box']" @click="goPlay(0)" ref="voice_box">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
            </div>
            <div class="list-topbar-mask"></div>
        </div>
        <div class="list-detail-box">
            <div class="list-detail-cover-bg" :style="{backgroundImage: `url(${playlist ? playlist.coverImgUrl: ''})`}"></div>
            <div class="list-detail-wrap">
                <div class="list-detail-cover-box">
                    <i class="wif icon-headset list-headset">{{handleCount(playlist && playlist.playCount)}}</i>
                    <img class="list-detail-cover" :src="playlist ? playlist.coverImgUrl: ''" alt="">
                </div>
                <div class="list-detail-right-box">
                    <p class="list-detail-list-name">{{playlist && playlist.name}}</p>
                    <div class="list-detail-creator">
                        <img class="list-detail-creator-avatar" :src="playlist && playlist.creator.avatarUrl" alt="">
                        <p class="list-detail-creator-name">{{playlist && playlist.creator.nickname}}</p>
                    </div>
                </div>
            </div>
        </div>
        <ul class="list-box">
            <li class="list-item" :key="index" v-for="(song, index) in playlist.tracks" @click="goPlay(song.id)">
                <p class="list-item-index">{{index + 1}}</p>
                <div class="list-item-song-wrap">
                    <p class="list-item-song-name single-line-overflow">{{song.name}}</p>
                    <p class="list-item-song-singer single-line-overflow">{{song.ar[0].name}} - {{song.al.name}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    import {requestPlaylistDetail} from '../api'
    import * as util from '../javascript/util'

    export default {
        props: [],
        computed: {
            isPlay() {
                return this.$store.getters.isPlay;
            }
        },
        data() {
            return {
                playlist: {
                    tracks: [],
                    creator: {}
                }
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            goPlay(id) {
                this.$router.push(`/play/${id}`)
                this.$store.commit('updatePlaylist', this.playlist)
            },
            handleCount(num) {
                return util.handleCount(num)
            }
        }, 
        mounted() {
            requestPlaylistDetail(this.$route.params.id).then(data => {
                if(data && +data.code === 200) {
                    this.playlist = data.playlist   
                }
            })
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../style/common.scss";
.list-container {
    position: relative;
    .list-topbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        box-sizing: border-box;
        width: 100%;
        padding: 10px 20px 10px 10px;
        color: #fff;
        .list-topbar-icon {
            font-size: 24px;
            &:before {
                color: #fff;
            }
        }
        .list-topbar-mask {
            position: absolute;
            z-index: -1;
            top: 0;
            left: 0;
            width: 100%;
            height: 44px;
            background-color: #000;
            opacity: .2;
        }
    }
}
.list-detail-box {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    padding: 44px 0 0;
    overflow: hidden;
    .list-detail-cover-bg {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 300px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        margin-bottom: 10px;
        filter: blur(30px);
    }
    .list-detail-wrap {
        display: flex;
        justify-content: space-between;
        padding: 20px;
    }
}

.list-detail-cover-box {
    position: relative;
    width: 45%;
    .list-headset {
        position: absolute;
        top: 5px;
        box-sizing: border-box;
        width: 100%;
        padding: 0 5px;
        text-align: right;
        color: #fff;
        font-size: 12px;
        &::before {
            margin-right: 3px;
        }
    }
     .list-detail-cover {
        display: block;
        width: 100%;
        border-radius: 5px;
    }
}

.list-detail-right-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 50%;
    padding-top: 15px;
    color: #fff;
    .list-detail-list-name {
        margin-bottom: 10px;
        font-weight: bold;
        line-height: 18px;
    }
    .list-detail-creator {
        display: flex;
        align-items: center;
        height: 30px;
        .list-detail-creator-avatar {
            display: block;
            width: 26px;
            margin-right: 5px;
            border-radius: 50%;
        }
        .list-detail-creator-name {
            font-size: 14px;
        }
    }
}

.list-box {
    width: 100%;
    margin: 0;
    padding: 0 0 10px;
    .list-item {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        height: 50px;
        padding: 0 10px;
        list-style: none;
        overflow: hidden;
    }
    .list-item-index {
        margin-right: 10px;
        color: #999;
        width: 30px;
        text-align: center;
        font-size: 18px;
    }
    .list-item-song-wrap {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 90%;
        height: 50px;
        color: #212121;
        border-bottom: 2px solid #eee;
        p {
            width: 90%;
        }
        .list-item-song-name {
            font-size: 16px;
            margin-bottom: 5px;
        }   
        .list-item-song-singer {
            font-size: 12px;
        } 
    }
}
</style>
