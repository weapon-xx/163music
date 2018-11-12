<template>
  <swiper :options="swiperOption" class="swiper-container">
    <swiper-slide v-for="(slide, index) in banners" :key="index">
      <img :src="slide.imageUrl" alt="" style="width: 100%;">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import { request_banner } from '../api/index'

  export default {
    name: 'banner',
    components: {swiper, swiperSlide},
    data() {
      return {
        swiperOption: {
            pagination: {
                el: '.swiper-pagination',
                bulletActiveClass: 'bullet-active',
                clickable :true,
                // dynamicBullets: true
            }
        },
        banners: []
      }
    },
    mounted() {
      request_banner().then(data => {
        if(data && +data.code === 200) {
          this.banners = data.banners
        }
      })
    }
  }
</script>
<style lang="scss">
.bullet-active {
  background-color: #fff;
  opacity: .5;
}
</style>
