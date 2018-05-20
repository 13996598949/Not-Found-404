<template>
  <div>
    <van-nav-bar left-arrow @click-left="onClickLeft" title="订单信息"/>
    <cross-line></cross-line>
    <van-steps :active="this.orderData.active" style="height: 65px">
      <van-step>已拍下</van-step>
      <van-step>已付款</van-step>
      <van-step>待发货</van-step>
      <van-step>待收货</van-step>
      <van-step>待评价</van-step>
    </van-steps>

    <van-cell-group>
      <van-cell>
        <div class="price">
          {{this.orderData.price}}元
          <p v-if="this.flag=='rent'">(包含押金：{{this.orderData.deposit}}元)</p>
          <p>已付款，等待卖家发货</p>
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
        </div>
      </van-cell>

    </van-cell-group>

      <center><van-button class="vanCloseButton" bottom-action @click="show = true">我要退款</van-button></center>
      <van-actionsheet v-model="show"  :actions="refundList"/>
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
      refundList:[
        {
          name: '我不想买了',
          callback: this.renfundClick
        },
        {
          name: '信息填写错误，重新拍',
          callback: this.renfundClick
        },
        {
          name: '质量问题',
          callback: this.renfundClick
        },
        {
          name: '其他原因',
          callback: this.renfundClick
        }
      ],
      userInfo:{},
      orderData:{},
      flag:"",
      show:false,
      refundRes:"",
      toRefundDto:{}
    }
  },
  methods: {
    renfundClick(name){
      this.refundRes = name.name;
      this.show = false;
      this.refund();
    },
    refund(){
      this.toRefundDto.userId = this.userInfo.id;
      this.toRefundDto.orderId = this.orderData.orderId;
      this.toRefundDto.refundRes = this.refundRes;
      this.toRefundDto.price = this.orderData.price;
      var that = this
      if (this.flag=="rent") {
        this.$axios.put(this.global.ip+"/order/toRefundRentOrder",this.toRefundDto)
          .then(function (result) {
            if (result.data.status != false) {
              Toast("退款成功！")
              var storage = window.sessionStorage;
              storage.setItem("session",JSON.stringify(result.data.data));
              that.$router.push({
                path: "order_refund",
                query: {
                  orderId: that.orderData.orderId,
                  flag:"rent"
                }
              })
            } else {
              Toast(result.data.message)
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      }else if (this.flag=="sale"){
        this.$axios.put(this.global.ip+"/order/toRefundSaleOrder",this.toRefundDto)
          .then(function (result) {
            if (result.data.status != false) {
              Toast("退款成功！")
              var storage = window.sessionStorage;
              storage.setItem("session",JSON.stringify(result.data.data));
              that.$router.push({
                path: "order_refund",
                query: {
                  orderId: that.orderData.orderId,
                  flag:"sale"
                }
              })
            } else {
              Toast(result.data.message)
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      }
    },
    onClickLeft(){
      this.$router.push({path:"/myBuy"})
    },
  },
  created(){
    var storage = window.sessionStorage;
    var userInfo = JSON.parse(storage.getItem("session"));
    this.userInfo = userInfo;

    // 取到路由带过来的参数
    let orderData = this.$route.query.data;
    let flag = this.$route.query.flag;
    this.orderData = orderData;
    this.flag = flag;
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
