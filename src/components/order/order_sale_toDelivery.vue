<template>
  <div >
    <van-nav-bar left-arrow @click-left="onClickLeft" title="我要发货"/>
    <cross-line></cross-line>
    <div style="padding-left: 10px">
      <p style="font-size: 25px;padding-top: 10px"><b>请认真核对快递单号</b></p>
      <p style="color: gray;font-size: 10px;padding-top: 10px;padding-bottom: 10px">确认后，快递单号不可修改</p>
      <van-cell-group>
        <van-cell>
        <p style="color: gray;font-size: 10px;padding-top: 10px">快递单号</p>
        <van-field v-model="value" placeholder="请输入快递单号" />
        </van-cell>
      </van-cell-group>
      <center><van-button class="vanButton" bottom-action @click="toReceive">确认提交</van-button></center>
    </div>
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
    toReceive(){
      this.$router.push({path:'/order_sale_receive'})
    },
    onClickLeft(){
      this.$router.go(-2)
    },
  },
}
</script>

<style scoped>
.vanButton{
   background-color: #44BB00;
   width: 80%;
   margin-top: 200px;
 }
</style>
