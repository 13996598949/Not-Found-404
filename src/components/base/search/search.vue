<template>
    <div class="search">
      <van-search v-model="value"  placeholder="搜索" class="mtSearch"></van-search>
    </div>
</template>

<script>
    export default {
        name: "search",
      data () {
        return{
          value:''
        }
      }
    }
</script>

<style scoped>
  .search{
    height: 50px;
  }
  .mtSearch{

  }
</style>
