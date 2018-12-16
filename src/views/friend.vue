<template>
    <div class="friend-container">
        <ul class="friend-event-list">
            <li class="friend-event-item" v-for="(item, index) in events" :key="index">
                {{item.id}}
            </li>
        </ul>
    </div>
</template>
<script>
    import { requestEvent } from '../api'
    export default {
        data() {
            return {
                events: []
            }
        },
        methods: {

        },
        mounted() {
            requestEvent().then(data => {
                if(+data.code === 200) {
                    this.events = data.event
                }
            })
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
