<template>
  <div>
    <div class="goods">
      <van-nav-bar left-arrow @click-left="onClickLeft" title="商品详情"/>
      <cross-line></cross-line>
      <img :src="'http://120.78.206.183:8081/'+this.SaleData.saleProductPicture" style="width: 375px;height: 375px">

      <van-cell-group class="goods-cell-group">
        <van-cell>
          <div class="goods-title">{{ this.SaleData.saleProductName }}</div>
          <div class="goods-describe">{{ this.SaleData.saleProductDescribe }}</div>
          <div class="goods-price">{{ formatPrice(this.SaleData.saleProductPrice) }}</div>
        </van-cell>

        <div class="box fl">
          <img :src="'http://120.78.206.183:8081/'+this.SaleData.header" style="width: 50px;height: 50px"/>
          <p style="padding-left: 10px">{{this.SaleData.alias}}</p>
        </div>
      </van-cell-group>
    </div>

    <cross-line></cross-line>

    <p class="liuyan"><b>留言</b></p>
    <van-cell-group class="goods-cell-group">
      <van-cell>
        <!--<p style="padding-left: 10px">{{this.SaleData.alias}}:</p>-->
        <p style="font-size: 16px;text-align: center;">暂无留言</p>
      </van-cell>
    </van-cell-group>

    </div>
</template>

<script>
  import CrossLine from "@/components/base/cross-line/cross-line"
  import { Toast } from 'vant';
  import { Dialog } from 'vant';
export default {
  components: {
    CrossLine
  },
  data () {
    return {
      SaleData:{},
      userInfo:{}
    }
  },
  methods: {
    onClickLeft(){
      this.$router.go(-1)
    },
    formatPrice() {
      return '¥' + (this.SaleData.saleProductPrice).toFixed(2);
    }
  },
  created () {
    var storage = window.sessionStorage;
    var userInfo = JSON.parse(storage.getItem("session"));
    this.userInfo = userInfo;

    // 取到路由带过来的参数
    let routerParams = this.$route.query.data;
    var that = this;
    this.$axios.get(this.global.ip+"/sale/getSaleSimpleInfo/"+routerParams)
      .then(function (SaleResult) {
        that.SaleData = SaleResult.data.data;
      })
      .catch(function (error) {
        console.log(error)
      });
  }
}
</script>

<style lang="less" scoped>
  .liuyan{
    padding-top: 10px;
    padding-left: 5px;
    font-size: 20px;
    color: gray;
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
.goods {
  padding-bottom: 50px;
  &-title {
    font-size: 16px;
  }
  &-describe{
    font-size: 10px;
    color: gray;
  }
  &-price {
    color: #f44;
  }
  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }
  &-cell-group {
    margin: 15px 0;
    .van-cell__value {
      color: #999;
    }
  }
}
</style>
