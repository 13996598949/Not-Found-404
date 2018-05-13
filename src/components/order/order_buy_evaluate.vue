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

      <center><van-button class="vanButton" bottom-action @click="toEvaluate">查看评价</van-button></center>
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
      orderData:{},
      flag:""
    }
  },
  methods: {
    toEvaluate(){
      this.$router.push({path:'/'})
    },
    onClickLeft(){
      this.$router.push({path:'/myBuy'})
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
