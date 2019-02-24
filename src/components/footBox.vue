<template lang="html">
  <div class="footer" :class="{isHide: isHide}">
    <router-link to="/" class="footer-item" :class="{active: route === 'index'}">
      <i class="wif icon-wy-music-black"></i>
      <span>发现音乐</span>
    </router-link >
    <router-link to="/myMusic" class="footer-item" :class="{active: route === 'myMusic'}">
      <i class="wif icon-music"></i>
      <span>我的音乐</span>
    </router-link>
    <router-link to="/friend" class="footer-item" :class="{active: route === 'friend'}">
      <i class="wif icon-friend"></i>
      <span>朋友</span>
    </router-link>
    <router-link to="/userDetail" class="footer-item" :class="{active: route === 'userDetail'}">
      <i class="wif icon-people"></i>
      <span>账号</span>
    </router-link>
  </div>
</template>

<script>
export default {
    computed: {
        isHide() {
            return !['index', 'myMusic', 'friend', 'userDetail'].includes(this.route);
        },
    },
    watch: {
        $route(to) {
            this.route = to.name;
        },
    },
    data() {
        return {
            route: this.$route.name,
        };
    },
    mounted() {},
};
</script>

<style lang="scss" scoped>
@import "../style/common.scss";

.footer {
    display: flex;
    justify-content: space-between;
    width: 90%;
    position: fixed;
    left: 0;
    bottom: -2px;
    padding: 5px 5% 3px;
    background-color: #fff;
    border-top: 1px solid #f6f6f6;
    &.isHide {
      display: none;
    }
}
.footer-item {
  text-align: center;
  color: #484747;
  text-decoration: unset;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  i {
    display: block;
    font-size: 28px;
    margin-bottom: 3px;
  }
  span {
    font-size: 12px;
  }
  &.active {
    color: $main_color;
  }
}
</style>
