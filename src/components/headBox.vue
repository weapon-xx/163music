<template>
    <div class="head">
        <i class="wif icon-voice i-voice" :class="[{focus: isOpen}]" ></i>
        <div class="search-box" :class="[{focus: isOpen}]">
          <input ref="input" type="text" v-model="keyword" placeholder="输入关键字搜索单曲">
          <i class="clear-btn wif icon-error" :class="[{focus: isOpen}]" @click="clear"></i>
        </div>
        <div class="voice-box" :class="[{active: isPlay}, {focus: isOpen}]" @click="goPlay(0)" ref="voice_box">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </div>
        <p class="cancel-btn" :class="[{focus: isOpen}]" @click="cancel">取消</p>
        <div class="serch-box" :class="[{focus: isOpen}]">
          <ul class="search-word-box" :class="[{active: isFocus}]">
            <li class="search-word first single-line-overflow" v-show="keyword" @click="search(keyword)">
              <i class="wif icon-search"></i>搜索 “{{keyword}}”
            </li>
            <li class="search-word single-line-overflow" :key="index" v-for="(item, index) in suggestList" @click="search(item.name)">
              <i class="wif icon-search"></i>
              {{item.name}}
            </li>
          </ul>
          <ul ref="searchList" class="serch-list-box" :class="[{active: !isFocus}]">
            <li class="serch-list-item" :class="[isFocus ? 'focus' : 'blur']"
            :key="index" v-for="(item, index) in songs" @click="goPlay(item.id)">
              <p class="serch-list-item-songname single-line-overflow" v-html="hightLightWord(item.name, keyword)"></p>
              <p class="serch-list-item-songinfo single-line-overflow">
                <label v-html="hightLightWord(item.artists && item.artists[0].name, keyword)"></label> -
                <label v-html="hightLightWord(item.album && item.album.name, keyword)"></label>
              </p>
              <p class="serch-list-item-songinfo single-line-overflow" v-for="(alia, index) in item.alias" :key="index">
                {{alia}}
              </p>
            </li>
          </ul>
        </div>
    </div>
</template>
<script>
import { requestSuggestKeyword, requestSearchByKeyword } from '../api';
import { debounce } from '../javascript/util';

const SuggestKeywordFn = debounce(function handle(keyword) {
    requestSuggestKeyword(keyword).then((data) => {
        if (+data.code === 200) {
            this.suggestList = data.result.songs;
        }
    });
}, 800);

export default {
    name: 'headBox',
    computed: {
        isPlay() {
            return this.$store.getters.isPlay;
        },
    },
    data() {
        return {
            custom: '',
            keyword: undefined,
            suggestList: [],
            songs: [],
            isFocus: false, // 输入框是否聚焦
            isOpen: false, // 是否进入搜索
        };
    },
    watch: {
        keyword(nval) {
            if (nval) {
                this.requestSuggestKeyword(nval);
            } else {
                this.suggestList = [];
            }
        },
    },
    methods: {
        goPlay(id) {
            this.$router.push(`/play/${id}`);
        },
        clear() {
            this.keyword = '';
            this.$refs.input.focus();
        },
        cancel() {
            this.isFocus = false;
            this.isOpen = false;
        },
        requestSuggestKeyword(keyword) {
            SuggestKeywordFn(this, keyword);
        },
        search(keyword) {
            this.isFocus = false;
            this.keyword = keyword;
            requestSearchByKeyword(keyword).then((data) => {
                if (+data.code === 200) {
                    this.songs = data.result.songs;
                }
            });
        },
        hightLightWord(str, word) {
            if (str && typeof str === 'string') {
                const reg = new RegExp(word, 'g');
                return str.replace(reg, $1 => `<em>${$1}</em>`);
            }
            return '';
        },
    },
    mounted() {
        const vm = this;
        if (this.$refs.input && this.$refs.input.addEventListener) {
            this.$refs.input.addEventListener('focus', () => {
                vm.isFocus = true;
                vm.isOpen = true; // 开启搜索框
            }, false);
        }
        // this.requestSuggestKeyword = function(keyword) {
        //     debounceFn(vm, keyword);
        // }
    },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../style/common.scss";

$key_color: #0868b5;

.head {
  width: 90%;
  height: 50px;
  padding: 0 5%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  transition: all .3s ease;
  background: #fff;
}

.search-box {
    position: relative;
    box-sizing: border-box;
    width: 70%;
    height: 28px;
    background-color: #f2f2f2;
    border-radius: 30px;
    transition: all .5s ease;
    &.focus {
      width: 100%;
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
      background-color: #f2f2f2;
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
  color: $font_color;
  &.focus {
    display: none;
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

.serch-box {
  position: fixed;
  top: 50px;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #f2f2f2;
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
    height: 100%;
    overflow: scroll;
    padding: 0 5px;
    background-color: #fff;
    border-radius: 5px;
  }
}

.search-word-box {
  z-index: 10;
  &.active {
      display: block;
  }
  .search-word {
      display: flex;
      align-items: center;
      height: 38px;
      line-height: 38px;
      font-size: 14px;
      color: $font_color;
      border-bottom: 1px solid #f1f1f1;
      &.first {
        color: $key_color;
      }
      i {
        margin-right: 5px;
      }
    }
}

.serch-list-box {
  z-index: 11;
  &.active {
    display: block;
  }
  .serch-list-item {
    line-height: 34px;
    font-size: 14px;
    color: $font_color;
    border-bottom: 1px solid #f1f1f1;
    padding: 5px 0;
    .serch-list-item-songinfo {
      font-size: 12px;
      line-height: 16px;
    }
    .serch-list-item-songname {
      line-height: 24px;
    }
    em {
      color: $key_color;
    }
  }
}
</style>
