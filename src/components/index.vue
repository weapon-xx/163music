<template>
  <div class="hello">
      <headBox></headBox>
    <h1>123</h1>
  </div>
</template>

<script>
import headBox from './headBox'
export default {
  name: 'index',
  props: {
    msg: String
  },
  components: {headBox}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
