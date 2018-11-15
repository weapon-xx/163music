<template>
    <div class="head">
        <i class="wif icon-voice i-voice" ></i>
        <div class="search-box">
          <input type="text" name="" value="" placeholder="搜索音乐、歌词、电台">
        </div>
        <div :class="[{active: is_play}, 'voice-box']" @click="goPlay" ref="voice_box">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'headBox',
        data() {
            return {
                is_play: true,
                custom: ''
            }
        },
        methods: {
            goPlay() {
              debugger
              this.$router.push('play')
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../style/common.scss";
.head {
  width: 90%;
  height: 50px;
  padding: 0 5%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: $main_color;
  border-bottom: 1px solid #a40011;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}

.search-box{
    box-sizing: border-box;
    width: 70%;
    height: 28px;
    background-color: #fff;
    border-radius: 30px;
    input {
      display: block;
      margin: 0 auto;
      width: 90%;
      height: 24px;
      line-height: 24px;
      text-align: center;
      color: $font_color;
      font-size: 14px;
      outline: none;
      border: none;
    }
  }

.wif.i-voice {
  font-size: 26px;
  color: #fff;
}
.voice-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 19px;
  height: 24px;
  i {
    height: 24px;
    width: 1px;
    background-color: #fff;
    transition: all .5s ease;
  }
  i:nth-of-type(1) {
    height: 4px;
  }
  i:nth-of-type(2) {
    height: 14px;
  }
  i:nth-of-type(3) {
    height: 18px;
  }
  i:nth-of-type(4) {
    height: 22px;
  }
}

.voice-box.active {
  i:nth-of-type(1) {
    animation: i1 .5s infinite;
  }
  i:nth-of-type(2) {
    animation: i1 .5s infinite .3s;
  }
  i:nth-of-type(3) {
    animation: i1 .5s infinite .2s;
  }
  i:nth-of-type(4) {
    animation: i1 .5s infinite .1s;
  }
}

@keyframes i1 {
  0% {
    height: 24px;
  }
  50% {
    height: 10px;
  }
  100% {
    height: 22px;
  }
}

</style>
