<template>
    <ul class="person-list">
        <li class="person-list-item" :key="item.userId" v-for="item in list">
            <img class="person-avatart" :src="item.avatarUrl"/>
            <div class="person-list-item-wrap">
                <p class="person-nickname">{{item.nickname}}</p>
                <p class="person-signature">{{item.signature}}</p>
            </div>
        </li>
    </ul>
</template>
<script>
export default {
    props: {
        list: { type: Array, default: () => [] },
    },
    data() {
        return {

        };
    },
};
</script>
<style lang="scss" scoped>
$borderColor: #eee;

.person-list-item {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    .person-list-item-wrap {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        height: 50px;
        border-bottom: 1px solid $borderColor;
    }
    .person-avatart {
        display: block;
        width: 45px;
        height: 45px;
        margin-right: 10px;
        border-radius: 50%;
    }
    .person-nickname {
        font-size: 14px;
        margin-bottom: 4px;
    }
    .person-signature {
        font-size: 12px;
        color: #999;
    }
}
</style>
