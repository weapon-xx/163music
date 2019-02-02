<template>
    <transition name="fade">
        <div class="pop-container" ref="pop" v-show="isShow">
            <div class="pop-container-mask"></div>
            <div v-show="loading" class=""><i class="wif icon-loading"></i></div>
            <div class="pop-msg-box absolute-center">
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
export default {
  data() {
    return {
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
    show(text) {
      this.isShow = true;
      this.text = text;
      this.btns = {
        left: {
          text: '确定',
        },
      };
    },
    close() {
      this.isShow = false;
    },
    confirm({ text, btns }) {
      this.isShow = true;
      this.text = text;
      this.btns = btns || undefined;
    },
    loadingShow() {},
    loadingHide() {},
  },
  mounted() {},
};
</script>
