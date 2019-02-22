<template>
  <div class="swiper-container" ref="swiper" v-swiper:mySwiper="swiperOption" >
    <div :class="['swiper-wrapper banner-wrapper', {'transparent': !isInit}]">
      <div class="swiper-slide" v-for="(slide, index) in banners" :key="index">
        <img class="banner-cover" :src="slide.imageUrl" alt="" style="width: 100%;">
      </div>
    </div>
    <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css';

export default {
    props: ['banners'],
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
            isInit: false,
        };
    },
    methods: {},
    mounted() {
        this.isInit = true;
    },
};
</script>
<style lang="scss">
@import "../style/common.scss";

.swiper-container {
  width: 98%;
  .bullet-active {
    background-color: $main_color;
    opacity: 1;
  }
}

.banner-wrapper {
  opacity: 1;
  transition: opacity .3 ease;
}

.banner-cover {
  border-radius: 5px;
}

.transparent {
  opacity: 0;
  height: 180px;
}
</style>
