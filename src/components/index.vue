<template>
  <div class="container">
      <headBox></headBox>
      <banner></banner>
      <footBox></footBox>
  </div>
</template>

<script>
import headBox from './headBox'
import footBox from './footBox'
import banner from './banner'

export default {
  name: 'index',
  props: {
    msg: String
  },
  components: {headBox, footBox, banner}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
