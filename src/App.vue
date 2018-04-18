<template>
  <div id="app">
    <router-view></router-view>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from './components/base/tabbar/tabbar'

export default {
  name: 'App',
  components: {
      Tabbar
  }
}
</script>

<style>

  #app {
    font-family: Arial,Helvetica,sans-serif;

  }
</style>
