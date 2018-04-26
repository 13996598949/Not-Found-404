<template>
  <div>
    <div class="hedaer">个人中心</div>
    <div style="width: 100%;height: 50px"></div>
    <van-cell-group>
      <van-cell title="用户名" is-link value="admin"/>
      <van-cell title="性别" is-link value="男" />
    </van-cell-group>
  </div>
</template>

<script>
  export default {
    name: ''
  }
</script>

<style scoped>
  .hedaer {
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: white;
  }
</style>
