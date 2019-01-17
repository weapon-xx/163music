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
import { requestLoginStatus } from './api/index';

export default {
  name: 'app',
  components: { player, footBox },
  data() {
    return {
      transitionName: ''
    }
  },
  watch: {
    '$route'(to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    }
  },
  mounted() {
    requestLoginStatus().then((data) => {
      if (+data.code === 200) {
        this.$store.commit('updateUserId', data.bindings[1].userId);
      }
    });
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
  transition: all .5s ease;
} 

 .slide-left-enter, .slide-right-leave-active { 
  opacity: 0; 
  transform: translate(30px, 0); 
 } 

 .slide-left-leave-active, .slide-right-enter { 
  opacity: 0; 
  transform: translate(-30px, 0); 
 }
</style>
