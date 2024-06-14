<template>
  <div>
    <div id="foo" @click="handleClick">This is Foo Component</div>
    <hr>
    当前的用户名字是: {{$store.state.name}}
  </div>

</template>

<script>
export default {
  // 服务端渲染的时候只走这个
  asyncData(store) {
    return store.dispatch('setName')
  },
  // 客户端渲染的时候只走这个
  mounted() {
    this.$store.dispatch('setName')
  },
  methods: {
    handleClick() {
        console.log('你点击了我')
    }
  }
};
</script>
