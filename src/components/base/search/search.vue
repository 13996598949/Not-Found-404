<template>
    <div class="search">
      <mt-search v-model="value" cancel-text="取消" placeholder="搜索" class="mtSearch"></mt-search>
    </div>
</template>

<script>
    export default {
        name: "search"
    }
</script>

<style scoped>
  .search{
    height: 50px;
  }
  .mtSearch{

  }
</style>
