<template>
  <div class="index-container">
      <headBox></headBox>
      <banner :banners='banners'></banner>
      <listBlock ref="recommend" :title="recommendTitle" :list="recommend" :showCount="recommendShowCount"></listBlock>
  </div>
</template>

<script>
import headBox from '../components/headBox.vue';
import banner from '../components/banner.vue';
import listBlock from '../components/listBlock.vue';

export default {
  components: { headBox, banner, listBlock },
  asyncData({ store, cookie }) {
    return store.dispatch('requestIndex', cookie);
  },
  computed: {
    recommend() {
      return this.$store.state.recommend;
    },
    banners() {
      return this.$store.state.banners;
    },
  },
  data() {
    return {
      recommendTitle: '推荐标题',
      recommendShowCount: true,
    };
  },
  methods: {},
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.index-container {
  padding-top: 50px;
}
</style>
