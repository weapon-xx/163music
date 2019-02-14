<template>
  <div class="container">
      <headBox></headBox>
      <banner></banner>
      <listBlock ref="recommend" :title="recommendTitle" :list="recommend" :showCount="recommendShowCount"></listBlock>
  </div>
</template>

<script>
import headBox from '../components/headBox.vue';
import banner from '../components/banner.vue';
import listBlock from '../components/listBlock.vue';
import { requestResource } from '../api';

export default {
  name: 'index',
  components: { headBox, banner, listBlock },
  asyncData() {
    // return store.dispatch('requestResource');
  },
  computed: {
    // recommend() {
    //   return this.$store.state.recommend;
    // },
  },
  data() {
    return {
      recommendTitle: '推荐标题',
      recommendShowCount: true,
      recommend: [],
    };
  },
  methods: {

  },
  mounted() {
    requestResource().then((data) => {
      if (+data.code === 200) {
        this.recommend = data.recommend;
      }
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container {
  padding-top: 50px;
}
</style>
