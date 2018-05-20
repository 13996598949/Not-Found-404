<template>
  <div >
    <van-nav-bar left-arrow @click-left="onClickLeft" title="申请退还押金"/>
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
      refundDepositDto:{},
      orderId:{}
    }
  },
  methods: {
    toReceive(){
      Dialog.confirm({
        title: '提示',
        message: '提交快递信息后无法更改，是否填写正确？'
      }).then(() => {
        if (this.postCompany == '') {
          Toast("快递公司不能为空")
          return;
        }
        if (this.postNum == '') {
          Toast("快递单号不能为空")
          return;
        }

        this.refundDepositDto.orderId = this.orderId;
        this.refundDepositDto.postCompany = this.postCompany;
        this.refundDepositDto.postNum = this.postNum;

        var that = this;
        this.$axios.put(this.global.ip + "/order/toRefundDeposit", that.refundDepositDto)
          .then(function (result) {
            if (result.data.status != false) {
              that.$router.push({
                path: 'order_refundDeposit',
                query: {
                  orderId: that.orderId
                }
              })
            } else {
              Toast(result.data.message)
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      }).catch(()=>{

      })
    },
    onClickLeft(){
      this.$router.go(-1)
    },
  },
  created(){
    // 取到路由带过来的参数
    let orderId = this.$route.query.data;
    this.orderId = orderId;
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
