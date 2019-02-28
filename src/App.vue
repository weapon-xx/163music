<template>
  <div id="app">
      <player></player>
      <transition :name="transitionName">
        <router-view class="component"></router-view>
      </transition>
      <footBox></footBox>
  </div>
</template>
<script>
import player from './components/player.vue';
import footBox from './components/footBox.vue';

export default {
    name: 'app',
    components: { player, footBox },
    data() {
        return {
            transitionName: '',
        };
    },
    watch: {
        $route(to, from) {
            const firstScreenArr = ['index', 'myMusic', 'friend', 'userDetail'];
            if (!firstScreenArr.includes(from.name) || !firstScreenArr.includes(to.name)) {
                if (this.$router.isBack) {
                    this.transitionName = 'slide-right';
                } else {
                    this.transitionName = 'slide-left';
                }
            } else {
                this.transitionName = 'custom';
            }
            this.$router.isBack = false;// 重置
        },
    },
    mounted() {
        // avoid cookie clear delay
        if (this.$route.name !== 'login') {
            this.$store.dispatch('requestLoginStatus');
        }
    },
};
</script>
<style lang="scss">
@import './style/reset.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.component {
  width: 100%;
  overflow: hidden;
}

.slide-left-enter {
  transform: translate(100px, 0);
}

.slide-left-enter-active {
  transition: all .5s ease;
}

.slide-right-enter {
  transform: translate(-100px, 0);
}

.slide-right-enter-active {
  transition: all .5s ease;
}

.custom-enter {
  opacity: 0;
}
</style>
