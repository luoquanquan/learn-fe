<template>
  <div id="app">
    <router-link to="/">Foo</router-link>
    <router-link to="/bar">Bar</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'My Example App'
  }
};
</script>

