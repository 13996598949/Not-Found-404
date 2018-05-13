<template>
  <div>
    <van-nav-bar left-arrow @click-left="onClickLeft" title="订单信息"/>
    <cross-line></cross-line>
    <van-steps :active="3" style="height: 65px">
      <van-step>已拍下</van-step>
      <van-step>已付款</van-step>
      <van-step>已发货</van-step>
      <van-step>交易成功</van-step>
      <van-step>待评价</van-step>
    </van-steps>

    <van-cell-group>
      <van-cell>
        <div class="price">
          {{this.orderData.price}}元
          <p>已收货</p>
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

    <center><van-button class="vanButton" bottom-action @click="show = true">评价卖家</van-button></center>

    <van-popup v-model="show" position="right" style="height: 100%;width: 100%">
      <van-nav-bar left-arrow @click-left="toLeft" title="评价"/>
      <van-cell-group>
        <van-cell>
          <van-field
            v-model="evaluate"
            type="textarea"
            placeholder="评价"
            rows="1"
            autosize
            style="height: 100px"
          />
        </van-cell>
        <van-cell style="margin: 0;padding: 0;">
          <div style="text-align: center;padding-top: 20px;padding-bottom: 20px">选择评价</div>
          <div id="good" class="evaluate fl" @click="active_good">
            <img src="../../components/order/img/good.png">
            赏好评
          </div>
          <div id="bad" class="evaluate fr" @click="active_bad">
            <img src="../../components/order/img/bad.png">
            差 评！
          </div>
        </van-cell>
      </van-cell-group>

      <center><van-button class="evaluateButton" bottom-action @click="toEvaluate">发表评价</van-button></center>
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
      evaluate:"",
      good:0,
      evaluateDto:{},
    }
  },
  methods: {
    active_good(){
      var good=document.getElementById("good");
      var bad=document.getElementById("bad");
      good.style.cssText="background-color: #F8DB60;";
      bad.style.cssText="background-color: white;";
      this.good=0;
    },
    active_bad(){
      var good=document.getElementById("good");
      var bad=document.getElementById("bad");
      bad.style.cssText="background-color: #F8DB60;";
      good.style.cssText="background-color: white;";
      this.good=1;
    },
    toLeft(){
      this.show=false
    },
    toEvaluate(){
      this.evaluateDto.orderId = this.orderData.orderId;
      this.evaluateDto.tallPersonId = this.orderData.buyId;
      this.evaluateDto.talledPersonId = this.orderData.sellId;
      this.evaluateDto.evaluate = this.evaluate;
      this.evaluateDto.goodFlag = this.good;
      this.evaluateDto.flag = "buy"
      var that = this;
      if (this.flag=="rent") {
        this.$axios.post("http://127.0.0.1:8081/order/toEvaluateRentOrder",this.evaluateDto)
          .then(function (result) {
            if (result.data.status != false) {
              Toast("评价成功！")
              that.$router.push({
                path:"order_sale_evaluate",
                query:{
                  data:result.data.data,
                  flag:"rent"
                }
              })
            }else {
              Toast(result.data.message)
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      }else if (this.flag=="sale"){
        this.$axios.post("http://127.0.0.1:8081/order/toEvaluateSaleOrder",this.evaluateDto)
          .then(function (result) {
            if (result.data.status != false) {
              Toast("评价成功！")
              that.$router.push({
                path:"order_sale_evaluate",
                query:{
                  data:result.data.data,
                  flag:"sale"
                }
              })
            }else {
              Toast(result.data.message)
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      }
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

    console.log(this.orderData)
  }
}
</script>

<style scoped>
  .evaluate{
    width: 50%;
    height:100%;
    text-align: center;
  }
  .evaluate img{
    width: 30px;
    height: 30px;
  }
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
  .evaluateButton{
    background-color: #F8DB60;
    color: black;
    width: 90%;
    margin-top: 200px;
  }
  .vanCloseButton{
    background-color: slategray;
    width: 80%;
    margin-top: 25px;
  }
</style>
