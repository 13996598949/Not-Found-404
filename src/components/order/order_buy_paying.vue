<template>
  <div>
    <van-nav-bar left-arrow @click-left="onClickLeft" title="订单信息"/>
    <cross-line></cross-line>
      <van-steps :active="this.orderData.active" style="height: 65px">
      <van-step>已拍下</van-step>
      <van-step>待付款</van-step>
      <van-step>待发货</van-step>
      <van-step>待收货</van-step>
      <van-step>待评价</van-step>
    </van-steps>

    <van-cell-group>
      <van-cell>
        <div class="price">
          {{this.orderData.price}}元
          <p>未付款</p>
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

    <van-row gutter="1">
      <center><van-col span="12"><van-button class="vanCloseButton" bottom-action @click="closePay">关闭交易</van-button></van-col></center>
      <center><van-col span="12"><van-button class="vanButton" bottom-action @click="show = true">我要付款</van-button></van-col></center>
    </van-row>

    <van-dialog
      v-model="show"
      show-cancel-button
      :before-close="beforeClose"
    >
      <van-cell-group>
        <van-cell style="height: 100px">付款金额：
          <div class="price">￥{{this.orderData.price}}</div>
        </van-cell>
        <van-cell>
            <van-field
              v-model="buyPassword"
              type="password"
              label="交易密码"
              placeholder="请输入交易密码"
              required
            />
        </van-cell>
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
  import CrossLine from "@/components/base/cross-line/cross-line"
  import { Toast } from 'vant';
  import { Dialog } from 'vant';
  import md5 from 'js-md5';
export default {
  components: {
    CrossLine
  },
  data () {
    return {
      buyPassword:"",
      show:false,
      orderData:{},
      flag:"",
      value: '',
      payDto:{},
      userInfo:{}
    }
  },
  methods: {
    beforeClose(action, done) {
      if (action === 'confirm') {
        var that = this;
        if (this.flag=="rent") {
          this.payDto.userId = this.userInfo.id;
          this.payDto.orderId = this.orderData.orderId;
          this.payDto.buyPassword = md5(this.buyPassword);
          this.$axios.put("http://127.0.0.1:8081/order/toPayRentOrder",this.payDto)
            .then(function (result) {
              if (result.data.status != false) {
                Toast("支付成功！")
                that.$router.push({
                  path:"order_buy_delivery",
                  query:{
                    data:result.data.data,
                    flag:"rent"
                  }
                })
              }else {
                that.buyPassword=""
                Toast(result.data.message)
              }
            })
            .catch(function (error) {
              console.log(error)
            });
        }
        else if (this.flag=="sale") {
          this.payDto.userId = this.userInfo.id;
          this.payDto.orderId = this.orderData.orderId;
          this.payDto.buyPassword = md5(this.buyPassword);
          this.$axios.put("http://127.0.0.1:8081/order/toPaySaleOrder",this.payDto)
            .then(function (result) {
              if (result.data.status != false) {
                Toast("支付成功！")
                that.$router.push({
                  path:"order_buy_delivery",
                  query:{
                    data:result.data.data,
                    flag:"sale"
                  }
                })
              }else {
                that.buyPassword=""
                Toast(result.data.message)
              }
            })
            .catch(function (error) {
              console.log(error)
            });
        }
        done();
      } else {
        done();
      }
    },
    closePay(){
      Dialog.confirm({
        title: '提示',
        message: '确定要关闭交易吗？'
      }).then(() => {
        var that = this;
        if (this.flag == "rent") {
          this.$axios.delete("http://127.0.0.1:8081/order/closeRentOrder/" + this.orderData.orderId + "/" + this.orderData.productId)
            .then(function (result) {
              if (result.data.status != false) {
                Toast("订单已关闭！")
                that.$router.push({path: "/mine"})
              } else {
                Toast("系统错误！")
              }
            })
            .catch(function (error) {
              console.log(error)
            });
        } else if (this.flag == "sale") {
          this.$axios.delete("http://127.0.0.1:8081/order/closeSaleOrder/" + this.orderData.orderId + "/" + this.orderData.productId)
            .then(function (result) {
              if (result.data.status != false) {
                Toast("订单已关闭！")
                that.$router.push({path: "/mine"})
              } else {
                Toast("系统错误！")
              }
            })
            .catch(function (error) {
              console.log(error)
            });
        }
      });
    },
    onClickLeft(){
      this.$router.push({path:'/myBuy'})
    },
  },
  created(){
    var storage = window.sessionStorage;
    var userInfo = JSON.parse(storage.getItem("session"));
    this.userInfo = userInfo;

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
