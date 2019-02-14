<template>
  <div class="swiper-container" ref="swiper" v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(slide, index) in banners" :key="index">
        <img :src="slide.imageUrl" alt="" style="width: 100%;">
      </div>
    </div>
    <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css';
import { requestBanner } from '../api/index';

export default {
  name: 'banner',
  components: {},
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          bulletActiveClass: 'bullet-active',
          clickable: true,
          // dynamicBullets: true
        },
      },
      banners: [],
    };
  },
  methods: {},
  mounted() {
    requestBanner().then((data) => {
      if (data && +data.code === 200) {
        this.banners = data.banners;
      }
    });
  },
};
</script>
<style lang="scss">
@import "../style/common.scss";

.swiper-container {
  min-height: 120px;
  .bullet-active {
    background-color: $main_color;
    opacity: 1;
  }
}
</style>
