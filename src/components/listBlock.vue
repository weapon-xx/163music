<template>
    <div class="list-block-box">
        <h4 class="list-block-title">
            {{title}}
            <i class="wif icon-right title-icon"></i>
        </h4>
        <ul class="list-block-wrap">
            <li class="list-block-item" v-for="item in handleList">
                <img class="list-item-cover" :src="item.picUrl" alt="">
                <p class="list-item-title">{{item.copywriter}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        props: ['title', 'list'],
        data() {
            return {}
        },
        computed: {
            handleList() {
                if(this.list.length > 6) {
                    return this.list.slice(0, 6);
                }
                return this.list;
            }
        },
        methods: {

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
        width: 30%;
        margin-bottom: 10px;
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
