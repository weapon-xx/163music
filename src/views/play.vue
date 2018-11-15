<template>
    <div class="player-box">
        <div class="player-topbar">
            <i class="player-back wif icon-left" @click="back"></i>
            <div>
                <p class="player-topbar-title">1231</p>    
                <p class="player-topbar-singer">歌手</p>
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
            <p class="player-progress-currtime">00:00</p>
            <div class="player-progress-wrap">
                <div class="player-progress-played"></div>
                <div class="player-progress-point"></div>
            </div>
            <p class="player-progress-totaltime">5:20</p>
        </div>
        <div class="player-control-box">
            <div class="player-control-last wif icon-left"></div>
            <div class="player-control-operate wif icon-play operate-btn" @click="operate"></div>
            <div class="player-control-last wif icon-right"></div>
        </div>
    </div>
</template>
<script>    
    import store from '../store'

    export default {
        data() {
            return {

            }
        },
        methods: {
            back() {
                this.$router.go(-1)
            },
            operate() {
                store.commit('operate')
            }
        },
        mounted() {
            
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../style/common.scss";
.player-box {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
}

.player-topbar {
    position: relative;
    display: flex;
    justify-content: center;
    background-color: #c1c1c1;
    height: 45px;
    .player-back {
        position: absolute;
        top: 0;
        left: 10px;
        width: 30px;
        height: 45px;
        line-height: 45px;
    }
    .player-topbar-title {
        font-size: 16px;
    }
    .player-topbar-singer {
        font-size: 12px;
        text-align: center;
    }
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

.player-progress-box {
    position: absolute;
    bottom: 160px;
    box-sizing: border-box;
    width: 100%;
    padding: 0 10px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
        width: 15%;
        &:nth-of-type(2) {
            text-align: right;
        }
    }
    .player-progress-wrap {
        position: relative;
        width: 70%;
        height: 2px;
        border-radius: 20px;
        background-color: #f6f6f6;
        .player-progress-played {
            width: 5%;
            height: 2px;
            background-color: #b2b2b2;
        }
        .player-progress-point {
            position: absolute;
            left: 5%;
            top: -8px;
            // box-sizing: border-box;
            width: 6px;
            height: 6px;
            background-color: red;
            border: 6px solid #f6f6f6;
            border-radius: 50%;
        }
    }
}

.player-control-box {
    position: absolute;
    bottom: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    padding: 0 5%;
    .wif {
        width: 60px;
        height: 60px;
        line-height: 60px;
        font-size: 30px;
        text-align: center;
    }
    .operate-btn {
        font-size: 60px;
    }
}

</style>
