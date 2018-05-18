<template>
  <div>
    <van-nav-bar left-arrow @click-left="onClickLeft" title="订单信息"/>
    <cross-line></cross-line>

    <van-cell-group>
      <van-cell>
        <div style="font-size: 16px;text-align: center;padding-top: 20px">
          <b>该订单已被关闭</b>
        </div>
        <div class="price">
          {{this.orderData.price}}元
          <p>订单已关闭（买家退款）</p>
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
          <div>退款理由<span class="fr">{{this.orderData.refundRes}}</span></div>
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
      orderData:{}
    }
  },
  methods: {
    onClickLeft(){
      this.$router.push({path:'/mine'})
    },
  },
  created(){
    var storage = window.sessionStorage;
    var userInfo = JSON.parse(storage.getItem("session"));
    this.userInfo = userInfo;

    // 取到路由带过来的参数
    let orderId = this.$route.query.orderId;
    let flag = this.$route.query.flag;
    var that = this;
    if (flag=="rent") {
      this.$axios.get(this.global.ip+"/order/getRentOrderInfo/" + orderId)
        .then(function (result) {
          if (result.data.status != false) {
            that.orderData = result.data.data;
            console.log(that.orderData)
          } else {
          }
        })
        .catch(function (error) {
          console.log(error)
        });
    }else if (flag=="sale"){
      this.$axios.get(this.global.ip+"/order/getSaleOrderInfo/" + orderId)
        .then(function (result) {
          if (result.data.status != false) {
            that.orderData = result.data.data;
            console.log(that.orderData)
          } else {
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
  color: gray;
  text-align: center;
}
.price p{
  padding-top: 10px;
  color: gray;
  font-size: 10px;
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
