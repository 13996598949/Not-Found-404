<template>
  <div>
    <van-nav-bar left-arrow @click-left="onClickLeft" title="退还押金申请"/>
    <cross-line></cross-line>

    <van-cell-group>

      <van-cell>
        <div class="product box" style="padding-top: 5%">
          <img :src="'http://127.0.0.1:8081/'+this.resultData.rent_product_picture">
          <span>{{this.resultData.rent_product_name}}</span>
        </div>
      </van-cell>

      <van-cell>
        <div class="orderInfo">
          <div>订单编号<span class="fr">{{this.resultData.orderNum}}</span></div>
          <div>交易时间<span class="fr">{{this.resultData.createTimeStr}}</span></div>
          <div>退还快递单号<span class="fr">{{this.resultData.postCompany}}&nbsp;&nbsp;&nbsp;{{this.resultData.postNum}}</span></div>
        </div>
      </van-cell>

      <van-cell>
        <div v-if="this.resultData.active=='6'" style="font-size: 16px;text-align: center;padding-top: 10%">
          退还押金申请已提交，等待卖家确认...
        </div>
        <div v-if="this.resultData.active=='7'" style="font-size: 16px;text-align: center;padding-top: 10%">
          押金已退还
        </div>
      </van-cell>

    </van-cell-group>
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
      resultData:{}
    }
  },
  methods: {
    onClickLeft(){
      this.$router.push({path:"/myBuy"})
    },
  },
  created(){
    var storage = window.sessionStorage;
    var userInfo = JSON.parse(storage.getItem("session"));
    this.userInfo = userInfo;

    // 取到路由带过来的参数
    let orderId = this.$route.query.orderId;
    var that = this;
    this.$axios.get(this.global.ip+"/order/getRefundDepositInfo/" + orderId)
      .then(function (result) {
        if (result.data.status != false) {
          that.resultData = result.data.data;
          console.log(that.orderData)
        } else {
        }
      })
      .catch(function (error) {
        console.log(error)
      });
  }
}
</script>

<style scoped>
.product{
  padding-left: 10px;
}
.product span{
  padding-left: 10px;
  font-size: 15px;
}
.product img{
  width: 60px;
  height: 60px;
}
.box{
  display:flex;
  align-items: center;//子元素垂直居中
  justify-content: center;//子元素水平居中
  padding-top: 10px;
}
.orderInfo{
  color: gray;
}
</style>
