<template>
    <div class="player-box">
        {{isPlay}}
        <audio :src="songUrl" autoplay controls></audio>
    </div>
</template>
<script>
    import store from '../store'
    export default {
        data() {
            return {
                audio: undefined
            }
        },
        computed: {
            isPlay() {
                return this.$store.getters.isPlay
            },
            songUrl() {
                return this.$store.getters.songUrl
            }
        },
        watch: {
            songUrl() {
                this.audio && this.audio.play()
            }
        },
        methods: {
            
        },
        mounted() {
            this.audio = this.$el.querySelector('audio')
        }
    }
</script>
<style scoped>
.player-box {
    display: none;
}
</style>
