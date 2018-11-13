<template>
  <div class="container">
      <headBox></headBox>
      <banner></banner>
      <listBlock></listBlock>
      <footBox></footBox>
  </div>
</template>

<script>
import headBox from '../components/headBox'
import footBox from '../components/footBox'
import banner from '../components//banner'
import listBlock from '../components/listBlock'
import player from '../components/player'
import {request_resource} from '../api'

export default {
  name: 'index',
  props: {
    msg: String
  },
  components: {headBox, footBox, banner, listBlock},
  methods: {
 
  },
  mounted() {
    request_resource().then(data => {
      
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  margin-top: 50px;
}
</style>
