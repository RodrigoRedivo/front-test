<template>
  <div id="app">
    <Page msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import Page from "./components/Page.vue";

export default {
  name: "App",
  components: {
    Page,
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
}

body {
  background: #090909;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
