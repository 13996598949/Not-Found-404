<template>
  <div id="app" style="overflow: hidden">
    <router-view></router-view>
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
  html,body{
    width: 100%;
    height: 100%;
  }
  #app {
    font-family: Arial,Helvetica,sans-serif;

  }
</style>
