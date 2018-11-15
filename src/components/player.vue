<template>
    <div class="player-box">
        {{isPlay}}
        <audio src=""></audio>
    </div>
</template>
<script>
    import store from '../store'
    export default {
        data() {
            return {
                
            }
        },
        computed: {
            isPlay() {
                return store.getters.isPlay
            },
            songUrl() {
                return store.getters.songUrl
            }
        },
        methods: {
            
        },
        mounted() {
            
            
        }
    }
</script>
<style scoped>
.player-box {
    /* display: none; */
}
</style>
