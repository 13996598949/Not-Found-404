<template>
  <div>
    <van-nav-bar left-arrow @click-left="onClickLeft" title="订单信息"/>
    <cross-line></cross-line>
    <van-steps :active="this.orderData.active" style="height: 65px">
      <van-step>已拍下</van-step>
      <van-step>已付款</van-step>
      <van-step>已发货</van-step>
      <van-step>待收货</van-step>
      <van-step>待评价</van-step>
    </van-steps>

    <van-cell-group>
      <van-cell>
        <div class="price">
          {{this.orderData.price}}元
          <p>已发货</p>
        </div>
      </van-cell>

      <van-cell>
        <div>
          {{this.orderData.receiveName}}
          {{this.orderData.telephone}}
          <p>{{this.orderData.address}}</p>
        </div>
      </van-cell>

      <van-cell>
        <div class="product box">
          <img :src="'http://127.0.0.1:8081/'+this.orderData.picture">
          <span>{{this.orderData.productName}}</span>
        </div>
      </van-cell>

      <van-cell>
        <div class="orderInfo">
          <div>买家昵称<span class="fr">{{this.orderData.buyAlias}}</span></div>
          <div>订单编号<span class="fr">{{this.orderData.orderNum}}</span></div>
          <div>交易时间<span class="fr">{{this.orderData.buyTimeStr}}</span></div>
          <div>快递单号<span class="fr">{{this.orderData.postCompany}}  {{this.orderData.postNum}}</span></div>
        </div>
      </van-cell>

    </van-cell-group>
    <center><van-button class="vanCloseButton" bottom-action>等待买家收货</van-button></center>
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
      orderData:{},
    }
  },
  methods: {
    onClickLeft(){
      this.$router.push({path:'/mySale'})
    },
  },
  created(){
    // 取到路由带过来的参数
    let orderData = this.$route.query.data;
    let flag = this.$route.query.flag;
    this.flag = flag;

    var that = this
    if (flag=="rent") {
      this.$axios.get("http://127.0.0.1:8081/order/getRentOrderInfo/" + orderData.orderId)
        .then(function (result) {
          if (result.data.status != false) {
            that.orderData = result.data.data;
          } else {
            Toast(result.data.message)
          }
        })
        .catch(function (error) {
          console.log(error)
        });
    }else if (flag=="sale"){
      this.$axios.get("http://127.0.0.1:8081/order/getSaleOrderInfo/" + orderData.orderId)
        .then(function (result) {
          if (result.data.status != false) {
            that.orderData = result.data.data;
          } else {
            Toast(result.data.message)
          }
        })
        .catch(function (error) {
          console.log(error)
        });
    }
  }
}
</script>

<style scoped>
.price{
  padding-top: 25px;
  font-size: 35px;
  color: red;
  text-align: center;
}
.price p{
  padding-top: 10px;
  font-size: 10px;
  color: gray;
}
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
.vanButton{
  background-color: #44BB00;
  width: 80%;
  margin-top: 25px;
}
.vanCloseButton{
  background-color: slategray;
  width: 80%;
  margin-top: 25px;
}
</style>
