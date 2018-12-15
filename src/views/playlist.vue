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
            <div class="list-detail-cover-bg" :style="{backgroundImage: `url(${detail ? detail.coverImgUrl: ''})`}"></div>
            <div class="list-detail-wrap">
                <div class="list-detail-cover-box">
                    <i class="wif icon-headset list-headset">{{handleCount(detail && detail.playCount)}}</i>
                    <img class="list-detail-cover" :src="detail ? detail.coverImgUrl: ''" alt="">
                </div>
                <div class="list-detail-rigth-box">
                    <p class="list-detail-list-name">{{detail && detail.name}}</p>
                    <div class="list-detail-creator">
                        <img class="list-detail-creator-avatar" :src="detail && detail.creator.avatarUrl" alt="">
                        <p class="list-detail-creator-name">{{detail && detail.creator.nickname}}</p>
                    </div>
                </div>
            </div>
        </div>
        <ul class="list-box">
            <li class="list-item" :key="index" v-for="(song, index) in detail.tracks" @click="goPlay(song.id)">
                <p>{{song.name}}</p>
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
                detail: {
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
            },
            handleCount(num) {
                return util.handleCount(num)
            }
        }, 
        mounted() {
            requestPlaylistDetail(this.$route.params.id).then(data => {
                if(data && +data.code === 200) {
                    this.detail = data.playlist   
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
    position: relative;
    width: 100%;
    height: 300px;
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
        margin-top: 64px;
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

.list-detail-rigth-box {
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
            margin-right: 10px;
            border-radius: 50%;
        }
        .list-detail-creator-name {

        }
    }
}

.list-box {
    margin: 0;
    padding: 0;
    .list-item {
        display: flex;
        align-items: center;
        padding: 0 10px;
        height: 40px;
        list-style: none;
        border-bottom: 1px solid #000;
    }
}
</style>
