<template>
  <div id="app">
        <player></player>
      <transition name="fade">
        <router-view></router-view>
      </transition>
  </div>
</template>
<script>
import player from './components/player'

export default {
  name: 'app',
  components: {player},
}
</script>
<style lang="scss">
@import './style/reset.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
