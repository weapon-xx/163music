<template>
    <div class="list-block-box">
        <h4 class="list-block-title">
            {{title}}
            <i class="wif icon-right title-icon"></i>
        </h4>
        <ul class="list-block-wrap">
            <li class="list-block-item" :key="index"
                v-for="(item, index) in handleList" @click="goPlaylist(item.id)">
                <i class="wif icon-headset count-icon">{{handleCount(item.playcount)}}</i>
                <img class="list-item-cover" :src="item.picUrl" alt="">
                <p class="list-item-title">{{item.name}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
import * as util from '../javascript/util';

export default {
    props: ['title', 'list', 'showCount'],
    data() {
        return {};
    },
    computed: {
        handleList() {
            if (this.list.length > this.showCount) {
                return this.list.slice(0, this.showCount);
            }
            return this.list;
        },
    },
    methods: {
        goPlaylist(id) {
            if (id) {
                this.$router.push(`/playlist/${id}`);
            }
        },
        handleCount(num) {
            return util.handleCount(num);
        },
    },
    mounted() {},
};
</script>
<style lang="scss" scoped>
@import "../style/common.scss";

.list-block-title {
    margin: 0;
}

.list-block-title {
    display: flex;
    align-items: center;
    padding: 5px;
    margin-bottom: 5px;
}

.title-icon {
    font-size: 12px;
}

.list-block-wrap {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    width: 98%;
    list-style: none;
    margin: 0 auto;
    overflow: hidden;
    li {
        position: relative;
        width: 32vw;
        margin-bottom: 10px;
        .count-icon {
            position: absolute;
            right: 3px;
            top: 3px;
            color: #fff;
            font-size: 12px;
            margin-right: 3px;
            &::before {
                margin-right: 3px;
            }
        }
        .list-item-cover {
            width: 100%;
            border-radius: 3px;
        }
        .list-item-title {
            font-size: 12px;
            overflow: hidden;
            height: 26px;
            line-height: 14px;
            white-space: pre-wrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            // &:after {
            //     content: "...";
            //     font-weight: bold;
            //     position: absolute;
            //     bottom: 0;
            //     right: 0;
            //     padding: 0 10px 1px 0px;
            //     background: #fff;
            // }
        }
    }
}
</style>
