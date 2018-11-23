<template>
    <div class="list-block-box">
        <h4 class="list-block-title">
            {{title}}
            <i class="wif icon-right title-icon"></i>
        </h4>
        <ul class="list-block-wrap">
            <li class="list-block-item" v-for="item in handleList" @click="goPlaylist(item.id)">
                <div class="list-item-count" v-show="showCount"><i class="wif icon-headset count-icon"></i>{{handleCount(item.playcount)}}</div>
                <img class="list-item-cover" :src="item.picUrl" alt="">
                <p class="list-item-title">{{item.copywriter}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        props: ['title', 'list', 'showCount'],
        data() {
            return {}
        },
        computed: {
            handleList() {
                if(this.list.length > 6) {
                    return this.list.slice(0, 6)
                }
                return this.list
            },

        },
        methods: {
            handleCount(num) {
                if(!num) {
                    return 0
                }
                const str = String(num)
                if(str.length > 5) {
                    return str.replace(/\d{4}$/, '万')
                } else {
                    return str
                }
            }, 
            goPlaylist(id) {
                id && this.$router.push(`/playlist/${id}`)
            }
        },
        mounted() {

        }
    }
</script>
<style lang="scss" scoped>
@import "../style/common.scss";

.list-block-title {
    margin: 0;
}

.list-block-title {
    display: flex;
    align-items: center;
    padding-left: 10px;
    margin-bottom: 5px;
}

.title-icon {
    font-size: 16px;
}

.list-block-wrap {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    list-style: none;
    padding: 0 10px;
    margin: 0;
    overflow: hidden;
    li {
        position: relative;
        width: 32%;
        margin-bottom: 10px;
        .count-icon {
            margin-right: 3px;
        }
        .list-item-count {
            display: flex;
            align-items: center;
            position: absolute;
            right: 3px;
            top: 3px;
            color: #fff;
            font-size: 12px;
        }
        .list-item-cover {
            width: 100%;
        }
        .list-item-title {
            font-size: 12px;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2; 
            -webkit-box-orient: vertical;
        }
    }
}
</style>
