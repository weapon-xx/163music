<template>
    <div class="player-box">
        {{isPlay}}
        <audio :src="songUrl"  autoplay="true" muted="muted"></audio>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import eventbus from '../javascript/eventbus';

export default {
  data() {
    return {
      audio: undefined,
    };
  },
  computed: {
    ...mapGetters(['isPlay', 'songUrl', 'currentTime']),
  },
  watch: {
    songUrl() {
      // this.load()
      // this.play()
    },
    isPlay(nval) {
      if (nval) {
        this.play();
      } else {
        this.pause();
      }
    },
    currentTime(nval, oval) {
      if (Math.abs(nval - oval) > 1) {
        this.audio.currentTime = nval;
      }
    },
  },
  methods: {
    play() {
      if (this.audio) {
        this.audio.play();
      }
    },
    pause() {
      if (this.audio) {
        this.audio.pause();
      }
    },
  },
  mounted() {
    const vm = this;
    this.audio = this.$el.querySelector('audio');

    this.audio.oncanplay = function oncanplay() {
      vm.$store.commit('duration', parseInt(this.duration, 10));
    };

    this.audio.addEventListener('timeupdate', (event) => {
      vm.$store.commit('currentTime', parseInt(event.currentTarget.currentTime, 10));
    }, false);

    this.audio.addEventListener('ended', () => {
      // 触发结束事件
      eventbus.$emit('songEnd');
    });
  },
};
</script>
<style scoped>
.player-box {
    display: none;
}
</style>
