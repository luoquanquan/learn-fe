<template>
  <div id="app">
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted() {
    console.log(this.$store.state.count)
  }
}
</script>

<style>
</style>
