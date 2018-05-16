<template>
  <div >
    <van-nav-bar left-arrow @click-left="onClickLeft" title="我要发货"/>
    <cross-line></cross-line>
    <div style="padding-left: 10px">
      <p style="font-size: 25px;padding-top: 10px"><b>请认真核对快递单号</b></p>
      <p style="color: gray;font-size: 10px;padding-top: 10px;padding-bottom: 10px">确认后，快递单号不可修改</p>
      <van-cell-group>
        <van-cell>
          <p style="color: gray;font-size: 10px;padding-top: 10px">快递公司</p>
          <van-field v-model="postCompany" placeholder="请输入快递公司" />
        <p style="color: gray;font-size: 10px;padding-top: 10px">快递单号</p>
        <van-field v-model="postNum" placeholder="请输入快递单号" />
        </van-cell>
      </van-cell-group>
      <center><van-button class="vanButton" bottom-action @click="toReceive">确认提交</van-button></center>
    </div>
  </div>
</template>

<script>
  import CrossLine from "@/components/base/cross-line/cross-line"
  import { Toast } from 'vant';
export default {
  components: {
    CrossLine
  },
  data () {
    return {
      postCompany:"",
      postNum:"",
      deliveryDto:{},
      orderData:{}
    }
  },
  methods: {
    toReceive(){
      this.deliveryDto.orderId = this.orderData.orderId;
      this.deliveryDto.postCompany = this.postCompany;
      this.deliveryDto.postNum = this.postNum;
      var that = this;
      if (that.flag=="rent"){
        this.$axios.put(this.global.ip+"/order/toRentDelicery",that.deliveryDto)
          .then(function (result) {
            if (result.data.status != false) {
              that.$router.push({
                path:'order_sale_receive',
                query:{
                  data:that.orderData,
                  flag:"rent"
                }
              })
            }else {
              Toast(result.data.message)
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      } else if (that.flag=="sale") {
        this.$axios.put(this.global.ip+"/order/toSaleDelicery",that.deliveryDto)
          .then(function (result) {
            if (result.data.status != false) {
              that.$router.push({
                path:'order_sale_receive',
                query:{
                  data:that.orderData,
                  flag:"sale"
                }
              })
            }else {
              Toast(result.data.message)
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      }
    },
    onClickLeft(){
      this.$router.go(-2)
    },
  },
  created(){
    // 取到路由带过来的参数
    let orderData = this.$route.query.data;
    let flag = this.$route.query.flag;
    this.flag = flag;
    this.orderData = orderData;
  }
}
</script>

<style scoped>
.vanButton{
   background-color: #44BB00;
   width: 80%;
   margin-top: 200px;
 }
</style>
