<template lang="html">
  <div class="footer">
    <router-link to="/index" class="footer-item">
      <i class="wif icon-wy-music-black"></i>
      <span>发现音乐</span>
    </router-link >
    <router-link to="/myMusic" class="footer-item">
      <i class="wif icon-music"></i>
      <span>我的音乐</span>
    </router-link>
    <router-link to="/friend" class="footer-item">
      <i class="wif icon-friend"></i>
      <span>朋友</span>
    </router-link>
    <router-link to="/profile" class="footer-item">
      <i class="wif icon-people"></i>
      <span>账号</span>
    </router-link>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
@import "../css/common.scss";
.footer {
    display: flex;
    justify-content: space-between;
    width: 90%;
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 5px 5% 3px;
    background-color: #000;
    opacity: 0.8;
    color: #fff;
}
.footer-item {
  text-align: center;
  i {
    display: block;
    font-size: 24px;
  }
  span {
    font-size: 12px;
  }
}
.footer-item {
  color: #fff;
  text-decoration: unset;
}
</style>
