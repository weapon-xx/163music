<template>
    <div class="friend-container">
        <ul class="friend-event-list">
            <div :class="[{loading: requesting}, 'pulldown-wrapper']">
                <div class="pulldown-wrapper-box">
                    <i :class="[{active: requesting}, 'wif', 'icon-loading', 'friend-loading']"></i>
                    <span v-show="pulldown.status === 0">{{pulldown.text.default}}</span>
                    <span v-show="pulldown.status === 1">{{pulldown.text.ready}}</span>
                    <span v-show="pulldown.status === 2">{{pulldown.text.loading}}</span>
                    <span v-show="pulldown.status === 3">{{pulldown.text.succuess}}</span>
                    <span v-show="pulldown.status === 4">{{pulldown.text.error}}</span>
                </div>
                <p v-show="pulldown.time">最后更新:{{pulldown.time}}</p>
            </div>
            <li class="friend-event" v-for="(item, index) in events" :key="index">
                <img class="friend-event-avatart" :src="item.user.avatarUrl"/>
                <div class="friend-event-box">
                    <div class="friend-event-header">
                        <div class="friend-event-text">
                            <p class="friend-event-username">{{item.user.nickname}} </p>
                            <p class="friend-event-operation">分享{{item.data.video ? '视频' : '单曲'}}：</p>
                        </div>
                        <p class="friend-event-followers">{{item.user.followeds}} 粉丝</p>
                    </div>
                    <div class="friend-event-content-box">
                        <p class="friend-event-content">{{item.data.msg}}</p>
                        <div class="friend-event-video-wrap" v-show="item.data && item.data.video" @click="viewVideo(item.data.video.videoId)">
                            <div class="friend-event-video-info">
                                <div class="friend-event-video-info-left">
                                    <i class="wif icon-play friend-event-video-btn"></i>
                                    <p class="friend-event-video-playTime">{{item.data.video && item.data.video.playTime}}</p>
                                </div>
                                <p class="friend-event-video-durationms">{{item.data.video && item.data.video.durationms}}</p>
                            </div>
                            <img class="friend-event-video-cover" :src="item.data.video && item.data.video.coverUrl" alt="">
                        </div>
                        <div class="friend-event-img-wrap" v-show="item.pics">
                            <img v-for="(pic, index) in item.pics" :key="index" :src="pic.squareUrl" @click="viewBigPic(pic.originUrl)">
                        </div>
                        <div class="friend-event-song-wrap" v-show="item.data &&item.data.song" @click="goPlay(item.data.song.id)">
                            <img class="friend-event-song-cover" :src="item.data.song && item.data.song.album.picUrl" alt="">
                            <div class="friend-event-song-info">
                                <p class="friend-event-song-name">{{item.data.song && item.data.song.album.name}}</p>
                                <p class="friend-event-song-singer">{{item.data.song && item.data.song.album.artists[0].name}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <transition name="fade">
            <div class="floating-wraper" v-show="floating.isShow" @click="closeFloating">
                <div class="floating-wraper-mask"></div>
                <img v-show="floating.type === 1" class="floating-img absolute-center" :src="floating.src" alt="">
                <video ref="floatingVideo" v-show="floating.type === 2" class="floating-video absolute-center" :src="floating.src" controls autoplay></video>
            </div>
        </transition>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
import { requestEvent, getVideoUrl } from '../api';
import { convertDateToTime } from '../javascript/util';

// 0：初始状态；1：准备加载；2：正在加载；3：成功；4：失败
const DEFAULT_STATUS = 0;


const READY_STATUS = 1;


const LOADING_STATUS = 2;


const SUCCESS_STATUS = 3;


const ERROR_STATUS = 4;

// 浮层展示 - 1：图片；2：视频；
const SHOW_IMG = 1;


const SHOW_VIDEO = 2;

export default {
  data() {
    return {
      events: [],
      requesting: false,
      pulldown: {
        text: {
          default: '下拉刷新',
          ready: '开始释放',
          succuess: '刷新成功',
          error: '刷新失败(>_<)',
          loading: '主人请稍等...',
        },
        time: undefined,
        status: DEFAULT_STATUS,
      },
      showFloating: false,
      floating: {
        isShow: false,
        src: undefined,
        type: SHOW_IMG,
      },
    };
  },
  methods: {
    initScroll() {
      const vm = this;
      const scroll = new BScroll('.friend-container', {
        scrollbar: true, // 滚动条
        pullDownRefresh: { // 开启下拉刷新
          threshold: 80, // 下拉距离
          stop: 60, // 回弹距离
        },
        click: true, // 开启点击事件
      });
      scroll.on('scroll', (pos) => {
        if (!vm.requesting) {
          if (pos.y > 0) {
            if (pos.y > 80) {
              vm.pulldown.status = 1;
            } else {
              vm.pulldown.status = 0;
            }
          }
        }
      });
      scroll.on('pullingDown', () => {
        // 刷新请求
        if (vm.requesting) { return; }
        vm.pulldown.status = LOADING_STATUS;
        vm.requesting = true;
        requestEvent().then((data) => {
          if (+data.code === 200) {
            vm.events = data.event.map((item) => {
              item.data = JSON.parse(item.json);
              return item;
            });
            vm.pulldown.status = SUCCESS_STATUS;
          } else {
            vm.pulldown.status = ERROR_STATUS;
          }
          vm.pulldown.time = convertDateToTime(new Date());
          setTimeout(() => {
            vm.requesting = false; // 重置更新开关
            vm.pulldown.status = DEFAULT_STATUS; // 重置更新状态
            scroll.finishPullDown();
          }, 1e3);
        });
      });
    },
    closeFloating() {
      if (this.floating.isShow) {
        this.floating.isShow = false;
      }
      if (this.floating.type === 2) {
        this.$refs.floatingVideo.pause();
      }
    },
    viewBigPic(src) {
      this.floating.isShow = true;
      this.floating.src = src;
      this.floating.type = 1;
    },
    viewVideo(id) {
      getVideoUrl(id).then((data) => {
        if (data.data && +data.data.code === 200) {
          this.floating.type = 2;
          this.floating.isShow = true;
          this.floating.src = data.data.urls[0].url;
        }
      });
    },
    goPlay(id) {
      id && this.$router.push(`/play/${id}`);
    },
  },
  mounted() {
    requestEvent().then((data) => {
      if (+data.code === 200) {
        this.events = data.event.map((item) => {
          item.data = JSON.parse(item.json);
          return item;
        });
        this.$nextTick(() => {
          this.initScroll();
        });
      }
    });
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../style/common.scss";
.friend-container {
    position: absolute;
    top: 0;
    bottom: 56px;
}
.friend-event-list {
    padding: 10px 10px 60px;
    .friend-event {
        display: flex;
        border-bottom: 1px solid #eee;
        margin-bottom: 20px;
        .friend-event-avatart {
            display: block;
            width: 40px;
            height: 40px;
            margin-right: 10px;
            border-radius: 50%;
        }
    }
}

.friend-event-box {
    display: flex;
    flex: 1;
    flex-direction: column;
}

.friend-event-header {
    margin-bottom: 20px;
    .friend-event-text {
        display: flex;
        margin-bottom: 3px;
        font-size: 14px;
        .friend-event-username {
            margin-right: 10px;
            color: #699de6;

        }
        .friend-event-operation {
            color: #747474;
        }
    }
    .friend-event-followers {
        color: #a4a4a4;
        font-size: 12px;
    }
}

.friend-event-content-box {
    padding-bottom: 20px;
    .friend-event-content {
        margin-bottom: 10px;
        font-size: 14px;
        line-height: 20px;
    }
}

.friend-event-video-wrap {
    position: relative;
    .friend-event-video-cover {
        display: block;
        width: 100%;
        border-radius: 5px;
    }
    .friend-event-video-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: absolute;
        left: 0;
        bottom: 5px;
        width: 100%;
        box-sizing: border-box;
        color: #fff;
        .friend-event-video-info-left {
            display: flex;
            align-items: center;
            padding-left: 5px;
        }
        .friend-event-video-btn {
            font-size: 18px;
            margin-right: 1px;
        }
        .friend-event-video-playTime {
            font-size: 14px;
        }
        .friend-event-video-durationms {
            font-size: 14px;
            padding-right: 5px;
        }
    }

}

.friend-event-song-wrap {
    display: flex;
    padding: 5px;
    background-color: #f2f2f2;
    border-radius: 5px;
    .friend-event-song-cover {
        display: block;
        width: 40px;
        height: 40px;
        margin-right: 10px;
    }
    .friend-event-song-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .friend-event-song-name {
            font-size: 14px;
            margin-bottom: 5px;
        }
        .friend-event-song-singer {
            font-size: 12px;
            color: #747474;
        }
    }
}

.friend-event-img-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 5px;
    img {
        display: block;
        width: 33%;
        height: 100%;
        margin-bottom: 2px;
    }
}

.floating-wraper {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    .floating-wraper-mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: .8;
    }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

// 下拉更新
.pulldown-wrapper {
    position: absolute;
    top: -50px;
    left: 0;
    width: 100%;
    margin-bottom: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &.loading {
        top: -50px;
    }
    .pulldown-wrapper-box {
        text-align: center;
        height: 24px;
        span {
            display: inline-block;
            height: 24px;
            line-height: 24px;
            font-size: 14px;
            vertical-align: bottom;
        }
    }
    p, span, i {
        color: #d2d2d2;
        text-align: center;
    }
    p {
        font-size: 12px;
    }
}

.friend-loading {
    display: inline-block;
    width: 24px;
    font-size: 24px;
    margin-right: 5px;
    &.active {
        animation: rorate 2s ease infinite;
    }
}
</style>
