<template>
  <swiper :options="swiperOption" class="swiper-container">
    <swiper-slide v-for="(slide, index) in banners" :key="index">
      <img :src="slide.pic" alt="" style="width: 100%;">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
//   import { request_banner } from '../api/index'

  export default {
    name: 'banner',
    components: {swiper, swiperSlide},
    data() {
      return {
        swiperOption: {
            width: window.innerWidth,
            pagination: {
                el: '.swiper-pagination',
                dynamicBullets: true
            }
        },
        banners: [{
            pic: 'http://p1.music.126.net/zsEcSxRUL_Zr9AMsTZlFLg==/109951163647947879.jpg'
        }, {
            pic: 'http://p1.music.126.net/3cyDU_KT01Lni9PY8kouYw==/109951163649404185.jpg'
        }, {
            pic: 'http://p1.music.126.net/mbU-jaKlp0xWGnk2wP_d5Q==/109951163649676008.jpg'
        }]
      }
    },
    mounted() {
    //   request_banner().then(data => {
    //       this.banners = data.banners
    //   })
    }
  }
</script>
<style lang="scss" scoped>
</style>
