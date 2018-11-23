<template>
    <div class="list-container">
        <div class="list-detail-box">
            <div class="list-detail-cover" :style="{backgroundImage: `url(${detail ? detail.coverImgUrl: ''})`}"></div>
        </div>
        <ul class="list-box">
            <li class="list-item" v-for="song in detail.tracks" @click="goPlay(song.id)">
                <p>{{song.name}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
import {requestPlaylistDetail} from '../api'
    export default {
        props: [],
        data() {
            return {
                detail: {
                    tracks: []
                }
            }
        },
        methods: {
            goPlay(id) {
                id && this.$route.push(`/play/${id}`)
            }
        }, 
        mounted() {
            requestPlaylistDetail(this.$route.params.id).then(data => {
                if(data && +data.code === 200) {
                    this.detail = data.playlist   
                }
            })
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.list-detail-box {
    width: 100%;
    .list-detail-cover {
        width: 100%;
        height: 300px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
}
.list-box {
    margin: 0;
    padding: 0;
    .list-item {
        display: flex;
        align-items: center;
        padding: 0 10px;
        height: 40px;
        list-style: none;
        border-bottom: 1px solid #000;
    }
}
</style>
