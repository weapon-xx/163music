<template>
    <div :class="[{focus: isFocus}, 'head']">
        <i :class="[{focus: isFocus}, 'wif', 'icon-voice', 'i-voice']" ></i>
        <div :class="[{focus: isFocus}, 'search-box']">
          <input ref="input" type="text" v-model="keyword" placeholder="搜索音乐、歌词、电台">
          <i :class="[{focus: isFocus}, 'clear-btn']" @click="clear">x</i>
        </div>
        <div :class="[{active: isPlay}, {focus: isFocus}, 'voice-box']" @click="goPlay" ref="voice_box">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </div>
        <p :class="[{focus: isFocus}, 'cancel-btn']" @click="cancel">取消</p>
        <div :class="[{focus: isFocus}, 'serch-box']">
          <ul :class="[{focus: isFocus}, 'search-word-box']">
            <li class="search-word first" v-show="keyword" @click="search(keyword)">搜索 “{{keyword}}”</li>
            <li class="search-word" :key="index" v-for="(item, index) in suggestList" @click="search(item.name)">{{item.name}} - {{item.artist.name}}</li>
          </ul>
          <ul ref="searchList" class="serch-list-box">
            <li :class="[isFocus ? 'focus' : 'blur', 'serch-list-item']" :key="index" v-for="(item, index) in songs">
              {{item.name}}
            </li>
          </ul>
        </div>
    </div>
</template>
<script>
    import { requestSuggestKeyword, requestSearchByKeyword } from '../api'

    export default {
        name: 'headBox',
        computed: {
            isPlay() {
              return this.$store.getters.isPlay;
            }
        },
        data() {
            return {
              custom: '',
              keyword: undefined,
              suggestList: [],
              songs: [],
              isFocus: false
            }
        },
        watch: {
          keyword(nval) {
            if(!!nval) {
              this.requestSuggestKeyword(nval)
            } else {
              this.suggestList = []
            }
          }
        },
        methods: {
            goPlay() {
              this.$router.push('/play/0')
            },
            clear() {
              this.keyword = ''
              this.$refs.input.focus()
            },
            cancel() {
              this.isFocus = false              
            },
            requestSuggestKeyword(keyword) {
              requestSuggestKeyword(keyword).then(data => {
                if(+data.code === 200) {
                  this.suggestList = data.result.albums
                }
              })
            },
            search(keyword) {
              // this.isFocus = false
              requestSearchByKeyword(keyword).then(data => {
                if(+data.code === 200) {
                  this.songs = data.result.songs
                  // this.$refs.searchList.style.display = 'block'                
                }
              })
            }
        },
        mounted() {
          const _this = this
          this.$refs.input.addEventListener('focus', function() {
            _this.isFocus = true
          }, false)
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
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
  &.focus {
    background-color: #fff;
  }
}

.search-box {
    position: relative;
    box-sizing: border-box;
    width: 70%;
    height: 28px;
    background-color: #fff;
    border-radius: 30px;
    transition: all .5s ease;
    &.focus {
      width: 100%;
      border: 1px solid #8b8b8b;
      input {
        text-align: left;
      }
    }
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
    .clear-btn {
      display: none;
      position: absolute;
      right: 10px;
      top: 0;
      width: 30px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      &.focus {
        display: block;
      }
    }
  }

.wif.i-voice {
  font-size: 26px;
  color: #fff;
  &.focus {
    display: none;
  }
}

.voice-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 19px;
  height: 18px;
  &.focus {
    display: none;
    // visibility: hidden;
  }
  i {
    height: 24px;
    width: 1px;
    background-color: #fff;
    transition: all .5s ease;
  }
  i:nth-of-type(1) {
    height: 10px;
  }
  i:nth-of-type(2) {
    height: 18px;
  }
  i:nth-of-type(3) {
    height: 10px;
  }
  i:nth-of-type(4) {
    height: 16px;
  }
}

.cancel-btn {
  display: none;
  width: 50px;
  height: 28px;
  line-height: 28px;
  color: #8b8b8b;
  margin-left: 10px;
  &.focus {
    display: block;
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

.serch-box {
  position: fixed;
  top: 50px;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  display: none;
  &.focus {
    display: block;
  }
  .search-word-box, .serch-list-box {
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    box-sizing: border-box;
    width: 100%;
    padding: 0 5px;
    background-color: #fff;
    border-radius: 5px;
  }
}

.search-word-box {
  z-index: 10;
  &.focus {
      display: block;
  }
  .search-word {
      line-height: 34px;
      font-size: 14px;
      color: $font_color;
      border-bottom: 1px solid #f1f1f1;
      &.first {
        color: #0868b5;
      }
    }
}

.serch-list-box {
  z-index: 11;
  &.blur {
    display: block;
  }
  &.focus {
    display: none;
  }
  .serch-list-item {
    line-height: 34px;
    font-size: 14px;
    color: $font_color;
    border-bottom: 1px solid #f1f1f1;
  }
}

</style>
