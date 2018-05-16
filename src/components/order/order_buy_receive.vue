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

    <van-row gutter="1">
      <center><van-col span="12"><van-button class="vanCloseButton" bottom-action @click="show = true">我要退款</van-button></van-col></center>
      <center><van-col span="12"><van-button class="vanButton" bottom-action @click="receive_show = true">确认收货</van-button></van-col></center>
    </van-row>

    <van-actionsheet v-model="show"  :actions="refundList"/>
    <van-dialog
      v-model="receive_show"
      show-cancel-button
      :before-close="beforeClose"
    >
      <van-cell-group>
        <van-cell>
          <div style="text-align: center;padding-top: 10px;font-size: 20px"><b>确认收货</b></div>
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
      orderData:{},
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
      show:false,
      receive_show:false,
      flag:"",
      refundRes:"",
      toRefundDto:{},
      confirmDto:{},
      userInfo:{}
    }
  },
  methods: {
    beforeClose(action, done){
      if (action === 'confirm') {
        this.confirmDto.userId = this.userInfo.id;
        this.confirmDto.orderId = this.orderData.orderId;
        this.confirmDto.buyPassword = md5(this.buyPassword);
        var that = this;
        if (this.flag=="rent") {
          this.$axios.put("http://127.0.0.1:8081/order/toConfirmRentOrder",this.confirmDto)
            .then(function (result) {
              if (result.data.status != false) {
                Toast("收货成功！")
                that.$router.push({
                  path:"order_buy_confirm",
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
          this.$axios.put("http://127.0.0.1:8081/order/toConfirmSaleOrder",this.confirmDto)
            .then(function (result) {
              if (result.data.status != false) {
                Toast("收货成功！")
                that.$router.push({
                  path:"order_buy_confirm",
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
    renfundClick(name){
      this.refundRes = name.name;
      this.show = false;
      this.refund();
    },
    refund(){
      this.toRefundDto.orderId = this.orderData.orderId;
      this.toRefundDto.refundRes = this.refundRes;
      var that = this
      if (this.flag=="rent") {
        this.$axios.put("http://127.0.0.1:8081/order/toRefundRentOrder",this.toRefundDto)
          .then(function (result) {
            if (result.data.status != false) {
              that.$router.push({
                path: "order_refund",
                query: {
                  orderId: that.orderData.orderId,
                  flag:"rent"
                }
              })
            } else {
              Toast("系统错误!")
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      }else if (this.flag=="sale"){
        this.$axios.put("http://127.0.0.1:8081/order/toRefundSaleOrder",this.toRefundDto)
          .then(function (result) {
            if (result.data.status != false) {
              that.$router.push({
                path: "order_refund",
                query: {
                  orderId: that.orderData.orderId,
                  flag:"sale"
                }
              })
            } else {
              Toast("系统错误!")
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      }
    },
    receive(){
      this.$router.push({path:'/order_buy_confirm'})
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
