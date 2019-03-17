<template>
    <div class="fans-container">
        <person-list :list="list"></person-list>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { getUserFollowed } from '../api';
import personList from '../components/personList.vue';

export default {
    components: {
        personList,
    },
    computed: {
        ...mapGetters(['userId']),
    },
    watch: {
        userId(val) {
            if (val) {
                this.fetchData(val);
            }
        },
    },
    data() {
        return {
            list: [],
        };
    },
    methods: {
        fetchData(uid) {
            getUserFollowed(uid).then((data) => {
                if (+data.code === 200) {
                    this.list = data.followeds;
                }
            });
        },
    },
    mounted() {
        if (this.userId) {
            this.fetchData(this.userId);
        }
    },
};
</script>
<style lang="sass" scoped>

</style>
