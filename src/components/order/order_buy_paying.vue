<template>
  <div>
    <van-nav-bar left-arrow @click-left="onClickLeft" title="订单信息"/>
    <cross-line></cross-line>
    <van-steps :active="active" style="height: 60px">
      <van-step>已拍下</van-step>
      <van-step>待付款</van-step>
      <van-step>待发货</van-step>
      <van-step>待收货</van-step>
      <van-step>待评价</van-step>
    </van-steps>

    <van-cell-group>
      <van-cell>
        <div class="price">
          {{product.price}}元
          <p>未付款</p>
        </div>
      </van-cell>

      <van-cell>
        <div>
          {{address.person}}
          {{address.telephone}}
          <p>{{address.location}}</p>
        </div>
      </van-cell>

      <van-cell>
        <div class="product box">
          <img :src="product.picture"/>
          <span>{{product.title}}</span>
        </div>
      </van-cell>

      <van-cell>
        <div class="orderInfo">
          <div>买家昵称<span class="fr">{{orderInfo.alias}}</span></div>
          <div>订单编号<span class="fr">{{orderInfo.orderNum}}</span></div>
          <div>交易时间<span class="fr">{{orderInfo.time}}</span></div>
        </div>
      </van-cell>

    </van-cell-group>

    <van-row gutter="1">
      <center><van-col span="12"><van-button class="vanCloseButton" bottom-action @click="closePay">关闭交易</van-button></van-col></center>
      <center><van-col span="12"><van-button class="vanButton" bottom-action @click="toPay">我要付款</van-button></van-col></center>
    </van-row>
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
      active: 0,
      product:{
        picture: require("../../assets/project/UAV1.jpg"),
        price: 22.00,
        title: "御Mavic Pro铂金版"
      },
      address:{
        person: "凌鹏",
        telephone: "13996598949",
        location: "重庆市理工大学花溪校区"
      },
      orderInfo:{
        alias: "le471925552",
        orderNum: "123456789987654321",
        time: "2018-05-04 00:03"
      }
    }
  },
  methods: {
    closePay(){

    },
    toPay(){
      this.$router.push({path:'/order_buy_delivery'})
    },
    onClickLeft(){
      this.$router.push({path:'/mine'})
    },
  },
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
