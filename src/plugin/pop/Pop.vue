<template>
    <transition name="fade">
        <div class="pop-container" ref="pop" v-show="isShow">
            <div class="pop-container-mask"></div>
            <div v-show="showType === 1" class="pop-loading-box absolute-center">
              <i class="wif icon-loading pop-loading-icon"></i>
            </div>
            <div v-show="showType === 2" class="pop-msg-box absolute-center">
                <p class="pop-msg-text">{{text}}</p>
                <div v-show="btns" class="pop-msg-wrap">
                    <button v-show="btns.left" class="pop-msg-button" @click="clickLeft">{{btns.left && btns.left.text}}</button>
                    <button v-show="btns.right" class="pop-msg-button" @click="clickRight">{{btns.right && btns.right.text}}</button>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
const LOADING = 1;
const MSG = 2;

export default {
  data() {
    return {
      showType: MSG,
      loading: false,
      isShow: false,
      text: '悬浮弹框文案',
      btns: {
        left: {
          text: '',
          handle: undefined,
        },
        right: {
          text: '',
          handle: undefined,
        },
      },
    };
  },
  methods: {
    clickLeft() {
      if (typeof this.btns.left.handle === 'function') {
        this.btns.left.handle.apply(this, this);
      } else {
        this.close();
      }
    },
    clickRight() {
      if (typeof this.btns.right.handle === 'function') {
        this.btns.right.handle.apply(this, this);
      } else {
        this.close();
      }
    },
    show() {
      this.isShow = true;
    },
    close() {
      this.isShow = false;
    },
    prompt(text) {
      this.showType = MSG;
      this.text = text;
      this.btns = {
        left: {
          text: '确定',
        }
      };
      this.show();
    },
    confirm({ text, btns }) {
      this.showType = MSG;
      this.text = text;
      this.btns = btns || undefined;
      this.show();
    },
    loadingShow() {
      this.showType = LOADING;
      this.show();
    },
    loadingHide() {
      this.showType = LOADING;
      this.close();
    },
  },
  mounted() {},
};
</script>
