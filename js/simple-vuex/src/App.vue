<template>
    <div id="app"></div>
</template>

<script>
export default {
    name: 'App',
    mounted() {
        const {dispatch} = this.$store
        dispatch('addCount')
        console.log(`当前时间 ${Date.now()}: debug 的数据是 this.$store.moduleA: `, this.$store.state.moduleA.count)
    }
}
</script>

<style>
</style>
