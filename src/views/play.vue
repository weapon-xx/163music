<template>
    <div class="player-box">
        <div class="player-topbar">
            <i class="wif icon-music"></i>
            <div>
                <p class="player-topbar-title">1231</p>    
                <p class="player-topbar-">歌手</p>
            </div>            
            <div></div>
        </div>
        <div class="player-cover-box">
            <img class="player-cover-rod" src="../img/rod.png" alt="">
            <div class="player-cover-wrap">
                <img class="player-cover-cd" src="../img/cd.png" alt="">
            </div>
        </div>
        <div class="player-progress-box">
            <p class="player-progress-currtime"></p>
            <div class="player-progress-wrap">
                <div class=""></div>
                <div class="player-progress-point"></div>
            </div>
            <p class="player-progress-totaltime"></p>
        </div>
        <div class="player-control-box">
            <div class="player-control-last"></div>
            <div class="player-control-operate"></div>
            <div class="player-control-last"></div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        methods: {

        },
        mounted() {
            
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.player-topbar {
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    background-color: #c1c1c1;
}

.player-cover-box {
    position: relative;
    overflow: hidden;
    .player-cover-rod {
        position: absolute;
        top: -15px;
        left: 50%;
        display: block;
        width: 100px;
        margin-left: -20px;
        transform-origin: 15px 15px;
        transform: rotate(-30deg);
        transition: transform .5s ease;
    }
}

.player-cover-wrap {
    width: 80%;
    margin: 0 auto;
    margin-top: 60px;
    border-radius: 50%;
    border: 1px solid #ccc;
    .player-cover-cd {
        display: block;
        width: 100%;
    }
}
</style>
