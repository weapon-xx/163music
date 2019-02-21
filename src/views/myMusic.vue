<template>
    <div class="myMusic-container">
        <p class="myMusic-title">我创建的歌单({{userPlayList.length}})</p>
        <ul class="user-list">
            <li class="user-list-item" v-for="(item, index) in userPlayList" :key="index" @click="goPlaylist(item.id)">
                <img class="user-list-item-cover" :src="item && item.coverImgUrl" alt="">
                <div class="user-list-text-wrap">
                    <p class="user-list-item-name">{{item.name}}</p>
                    <p class="user-list-item-nickname">{{item.trackCount}}首，by {{item.creator.nickname}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  asyncData({ store, cookie }) {
    return store.dispatch('requestMyMusic', cookie);
  },
  computed: {
    ...mapGetters(['userId', 'userPlayList']),
  },
  watch: {},
  data() {
    return {};
  },
  methods: {
    goPlaylist(id) {
      if (id) {
        this.$router.push(`/playlist/${id}`);
      }
    },
  },
  mounted() {
    // if ssr fetch didn't work, fetch data again in mounted hook.
    this.$pop.loadingShow();
    if (this.userId && this.userPlayList.length === 0) {
      this.$store.dispatch('requestMyMusic').then(() => {
        this.$pop.loadingHide();
      });
    } else {
      this.$pop.loadingHide();
    }
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.myMusic-title {
    padding-left: 10px;
    background-color: #eee;
    height: 30px;
    line-height: 30px;
}
.user-list {
    list-style: none;
    padding-bottom: 70px;
    .user-list-item {
        display: flex;
        align-items: center;
        padding-left: 10px;
        height: 80px;
        .user-list-item-cover {
            display: block;
            width: 60px;
            height: auto;
            margin-right: 10px;
            border-radius: 5px;
            border: 1px solid #f6f6f6;
        }
    }
}
.user-list-text-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 75%;
    height: 60px;
    border-bottom: 1px solid #f6f6f6;
    .user-list-item-name {
        font-size: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 5px;
    }
    .user-list-item-nickname {
        font-size: 14px;
    }
}
</style>
