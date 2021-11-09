<template>
    <div id="app"></div>
</template>

<script>
export default {
    name: 'App',
    mounted() {
        this.$store.commit('addCount')
        console.log(`当前时间 ${Date.now()}: debug 的数据是 this.$store.getters.newCount: `, this.$store.getters.newCount)
        console.log(`当前时间 ${Date.now()}: debug 的数据是 this.$store.state.count: `, this.$store.state.count)
    }
}
</script>

<style>
</style>
