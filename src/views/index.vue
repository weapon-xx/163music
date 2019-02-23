<template>
  <div class="index-container">
      <headBox></headBox>
      <banner :banners='banners'></banner>
      <listBlock ref="recommend" :title="'推荐歌单'" :list="recommend" :showCount="9"  v-on:jump="goPlaylist"></listBlock>
  </div>
</template>

<script>
import headBox from '../components/headBox.vue';
import banner from '../components/banner.vue';
import listBlock from '../components/listBlock.vue';
import { requestLoginStatus } from '../api/index';

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
        return {};
    },
    methods: {
        goPlaylist(item) {
            this.$router.push(`/playlist/${item.id}`);
        },
    },
    mounted() {
        this.$pop.loadingShow();
        // if ssr fetch didn't work, fetch data again in mounted hook.
        if (!this.recommend.length && !this.banners.length) {
            this.$store.dispatch('requestIndex');
        }
        requestLoginStatus().then((data) => {
            this.$pop.loadingHide();
            if (+data.code === 200) {
                this.$store.commit('updateUserId', data.bindings[1].userId);
            }
        }).catch((e) => {
            this.$pop.loadingHide();
            console.error(e);
        });
    },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.index-container {
  padding-top: 50px;
  padding-bottom: 66px;
}
</style>
