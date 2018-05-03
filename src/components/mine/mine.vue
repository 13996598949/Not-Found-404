<template>
  <div class="page">
    <div class="user-box">
      <div class="info">
        <img src="./img/header.jpg"/>
        <p class="username" @click="login">请登录</p>
      </div>
    </div>

    <cross-line></cross-line>

    <div class="nav">
        <div class="nav-item" @click="toPayingList">
          <img src="./img/paying.png">
          <p>待付款</p>
        </div>
      <div class="nav-item" @click="toDeliveryList">
        <img src="./img/sendProject.png"/>
        <p>待发货</p>
      </div>
      <div class="nav-item" @click="toReceiptList">
        <img src="./img/rePorject.png"/>
        <p>待收货</p>
      </div>
      <div class="nav-item" @click="toEvaluationList">
        <img src="./img/ok.png"/>
        <p>待评价</p>
      </div>
    </div>

    <cross-line></cross-line>

    <div class="menu">
      <div class="menu-item" @click="toPerson">
        <img src="./img/peopleMessage.png"/>个人中心<img class="fr" src="./img/right.png"/>
      </div>
      <!--<div class="menu-item" @click="toShoppingCart">-->
        <!--<img src="./img/cart.png">购物车<img class="fr" src="./img/right.png"/>-->
      <!--</div>-->
      <div class="menu-item" @click="toMyPublish">
        <img src="./img/public.png"/>我发布的<img class="fr" src="./img/right.png"/>
      </div>
      <div class="menu-item" @click="toMySale">
        <img src="./img/sell.png"/>我卖出的<img class="fr" src="./img/right.png"/>
      </div>
      <div class="menu-item" @click="toMyBuy">
        <img src="./img/buy.png"/>我买到的<img class="fr" src="./img/right.png"/>
      </div>
      <div class="menu-item" @click="toMyCollection">
        <img src="./img/collect.png"/>我收藏的<img class="fr" src="./img/right.png"/>
      </div>
    </div>
  </div>

</template>

<script>
  import crossLine from '@/components/base/cross-line/cross-line'
  import RouterLink from "vant/es/mixins/router-link";
export default {
  components: {
    RouterLink,
    crossLine
  },
  data () {
    return {}
  },
  created () {
  },
  methods: {
    login(){
      this.$router.push({path:'/login'})
    },
    toDeliveryList(){
      this.$router.push({path:'/deliveryList'})
    },
    toEvaluationList(){
      this.$router.push({path:'/evaluationList'})
    },
    toReceiptList(){
      this.$router.push({path:'/receiptList'})
    },
    toPayingList(){
      this.$router.push({path:'/payingList'})
    },
    toMyPublish () {
      this.$router.push({path:'/myPublish'})
    },
    toMySale () {
      this.$router.push({path:'/mySale'})
    },
    toMyBuy () {
      this.$router.push({path:'/myBuy'})
    },
    toMyCollection () {
      this.$router.push({path:'/myCollection'})
    },
    toPerson () {
      this.$router.push({path:'/person'})
    },
    toShoppingCart () {
      this.$router.push({path:'/shoppingCart'})
    }
  }
}
</script>

<style scoped>
.username{
  font-size: 20px;
  color: gainsboro;
}
.user-box{
  width: 100%;
  height: 150px;
  background-image: url("img/personBack.jpg");
  border: 1px solid transparent;
}
  .info{
    margin: auto 0;
    margin-top: 30px;
    text-align: center;
  }
  .info img{
    border-radius: 50%;
    height: 75px;
    width: 75px;
  }
  .nav{
    margin-top: 10px;
    height: 50px;
  }
 .nav-item{
    width: 25%;
    text-align: center;
    float: left;
    font-size: 14px;
  }
.nav-item img{
  width: 25px;
  height: 25px;
}
.menu{
  margin-top: 5px;
  color: gray;
}
.menu-item{
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 17px;
}
.menu-item img{
  width: 15px;
  height: 15px;
  padding-right: 5px;
}
.box{
  display:flex;
  align-items: center;//子元素垂直居中
  justify-content: center;//子元素水平居中
  padding-top: 10px;
}
.box img{
  padding-left: 10px;
}
</style>
