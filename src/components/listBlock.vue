<template>
    <div class="list-block-box">
        <h3 class="list-block-title">123></h3>
        <ul class="list-block-wrap">
            <li class="list-block-item" v-for="item in list"></li>
        </ul>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: []
            }
        },
        methods: {

        },
        mounted() {

        }
    }
</script>
<style scoped>
.list-block-title {
    margin: 0;
}
</style>
