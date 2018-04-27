<template>
  <div>
    <router-view></router-view>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
  import Tabbar from '../tabbar/tabbar'
  export default {
    name: '',
    components:{
      Tabbar
    }
  }
</script>

<style scoped>

</style>
