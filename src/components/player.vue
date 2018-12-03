<template>
    <div class="player-box">
        {{isPlay}}
        <audio :src="songUrl" muted="muted"></audio>
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
                // this.load()
                this.play()
                this.$store.commit('operate', true)
            },
            isPlay(nval) {
                if(nval) {
                    this.play()
                } else {
                    this.pause()
                }
            }
        },
        methods: {
            load() {
                this.audio && this.audio.load()
            },
            play() {
                this.audio && this.audio.play()
            },
            pause() {
                this.audio && this.audio.pause()
            }
        },
        mounted() {
            const _this = this
            this.audio = this.$el.querySelector('audio')

            this.audio.oncanplay = function() {  
                _this.$store.commit('duration', parseInt(this.duration))
            }

            this.audio.addEventListener('timeupdate', function(event) {
                _this.$store.commit('currentTime', parseInt(event.currentTarget.currentTime))
            }, false) 
        }
    }
</script>
<style scoped>
.player-box {
    display: none;
}
</style>
