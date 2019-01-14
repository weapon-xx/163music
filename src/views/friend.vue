<template>
    <div class="friend-container">
        <ul class="friend-event-list">
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
                        <div class="friend-event-video-wrap" v-show="item.data && item.data.video">
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
                            <img v-for="(pic, index) in item.pics" :key="index" :src="pic.squareUrl" alt="">
                        </div>
                        <div class="friend-event-song-wrap" v-show="item.data &&item.data.song">
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
    </div>
</template>
<script>
import { requestEvent } from '../api';


export default {
  data() {
    return {
      events: [],
    };
  },
  methods: {

  },
  mounted() {
    requestEvent().then((data) => {
      if (+data.code === 200) {
        this.events = data.event.map((item) => {
          item.data = JSON.parse(item.json);
          return item;
        });
      }
    });
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../style/common.scss";

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
    img {
        display: block;
        width: 33%;
        height: 100%;
        margin-bottom: 2px;
    }
}
</style>
