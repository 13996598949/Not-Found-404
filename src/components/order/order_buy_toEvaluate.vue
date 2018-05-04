<template>
  <div>
    <van-nav-bar left-arrow @click-left="onClickLeft" title="订单信息"/>
    <cross-line></cross-line>

  </div>
</template>

<script>
  import CrossLine from "@/components/base/cross-line/cross-line"
export default {
  components: {
    CrossLine
  },
  data () {
    return {

    }
  },
  methods: {

    onClickLeft(){
      this.$router.go(-3)
    },
  },
}
</script>

<style scoped>

</style>
