<template>
  <div>
    <van-nav-bar left-arrow @click-left="onClickLeft" title="订单信息"/>
    <cross-line></cross-line>
    <van-steps :active="4" style="height: 65px">
      <van-step>已拍下</van-step>
      <van-step>已付款</van-step>
      <van-step>已发货</van-step>
      <van-step>交易成功</van-step>
      <van-step>已评价</van-step>
    </van-steps>

    <van-cell-group>
      <van-cell>
        <div class="price">
          {{this.orderData.price}}元
          <p v-if="this.flag=='rent'">(包含押金：{{this.orderData.deposit}}元)</p>
          <p>已评价</p>
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

      <center><van-button class="vanButton" bottom-action @click="show = true">查看评价</van-button></center>

    <van-popup v-model="show" position="right" style="height: 100%;width: 100%">
      <van-nav-bar left-arrow @click-left="onLeft" title="评价详情"/>
      <cross-line></cross-line>
      <van-cell-group v-for="item in evaluateData" :item= "item" :key="item">
        <van-cell>
          <div class="box">
            <img class="fl" :src="'http://127.0.0.1:8081/'+item.tallPersonPicture">
            <div style="padding-left: 20px"  class="fl">{{item.tallPersonAlias}}</div>
          </div>
          <div v-if="item.goodFlag==0" class="fr" style="text-align: right"><img style="width: 30px;height: 30px"  src="../../components/order/img/good.png"></div>
          <div v-if="item.goodFlag==1" class="fr" style="text-align: right"><img style="width: 30px;height: 30px"  src="../../components/order/img/bad.png"></div>
        </van-cell>
        <div style="padding-left: 20px;font-size: 14px;padding-top: 20px">{{item.tallPersonEvaluate}}</div>
        <div style="padding-left: 20px;font-size: 12px;padding-top: 20px;color: gray">{{item.tallTimeStr}}</div>
        <van-cell/>
        <cross-line></cross-line>
      </van-cell-group>
    </van-popup>
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
      flag:"",
      show:false,
      evaluateData:{}
    }
  },
  methods: {
    onLeft(){
      this.show = false
    },
    onClickLeft(){
      this.$router.push({path:'/mySale'})
    },
  },
  created(){
    // 取到路由带过来的参数
    let orderData = this.$route.query.data;
    let flag = this.$route.query.flag;
    this.flag = flag;
    this.orderData = orderData;

    var that = this
    if (flag=="rent") {
      this.$axios.get(this.global.ip+"/order/getEvaluateRentInfo/" + this.orderData.orderId)
        .then(function (result) {
          if (result.data.status != false) {
            that.evaluateData = result.data.data;
            console.log(that.evaluateData)
          } else {
            Toast(result.data.message)
          }
        })
        .catch(function (error) {
          console.log(error)
        });
    }else if (flag=="sale"){
      this.$axios.get(this.global.ip+"/order/getEvaluateSaleInfo/" + this.orderData.orderId)
        .then(function (result) {
          if (result.data.status != false) {
            that.evaluateData = result.data.data;
            console.log(that.evaluateData)
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
  .box{
    display:flex;
    align-items: center;//子元素垂直居中
    justify-content: center;//子元素水平居中
    padding-top: 10px;
  }
  .box img{
    padding-left: 10px;
    width: 40px;
    height: 40px;
  }
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
