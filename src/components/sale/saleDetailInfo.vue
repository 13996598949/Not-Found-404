<template>
  <div>
    <div class="goods">
      <van-nav-bar left-arrow @click-left="onClickLeft" title="商品详情"/>
      <cross-line></cross-line>
      <img :src="'http://127.0.0.1:8081/'+this.SaleData.saleProductPicture" style="width: 375px;height: 375px">

      <van-cell-group class="goods-cell-group">
        <van-cell>
          <div class="goods-title">{{ this.SaleData.saleProductName }}</div>
          <div class="goods-describe">{{ this.SaleData.saleProductDescribe }}</div>
          <div class="goods-price">{{ formatPrice(this.SaleData.saleProductPrice) }}</div>
        </van-cell>

        <div class="box fl">
          <img :src="'http://127.0.0.1:8081/'+this.SaleData.header" style="width: 50px;height: 50px"/>
          <p style="padding-left: 10px">{{this.SaleData.alias}}</p>
        </div>
      </van-cell-group>
    </div>

    <cross-line></cross-line>

    <p class="liuyan"><b>留言</b></p>
    <van-cell-group class="goods-cell-group">
      <van-cell>
        <p style="padding-left: 10px">{{this.SaleData.alias}}:</p>
      </van-cell>
    </van-cell-group>

    <div class="goods">
      <van-goods-action>
        <van-goods-action-mini-btn icon="chat">
          留言
        </van-goods-action-mini-btn>
        <van-goods-action-mini-btn :icon=icon @click="collect">
          收藏
        </van-goods-action-mini-btn>
        <van-goods-action-big-btn primary @click="toOrderPaying">
          立即下单
        </van-goods-action-big-btn>
      </van-goods-action>
    </div>

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
      icon: "like-o",
      SaleData:{},
      userInfo:{}
    }
  },
  methods: {
    toOrderPaying(){
      if (this.userInfo == null) {
        this.$router.push({path: '/login'});
        Toast("请先登录");
      }else {
        this.$router.push({
          path: 'saleToBuy',
          query: {
            SaleData: this.SaleData
          }
        })
      }
    },
    collect(){
      if (this.userInfo == null) {
        this.$router.push({path: '/login'});
        Toast("请先登录");
      } else {
        var that = this
        if (that.SaleData.collectFlag) {
          this.$axios.delete("http://127.0.0.1:8081/collect/deleteCollectSale/" + that.userInfo.id + "/" + this.SaleData.id)
            .then(function (result) {
              if (result.data.status != false) {
                that.SaleData.collectFlag = false
              }
            })
            .catch(function (error) {
              console.log(error)
            });
        } else {
          this.$axios.post("http://127.0.0.1:8081/collect/insertCollectSale/" + that.userInfo.id + "/" + this.SaleData.id)
            .then(function (result) {
              if (result.data.status != false) {
                that.SaleData.collectFlag = true
              }
            })
            .catch(function (error) {
              console.log(error)
            });
        }
        if (!this.SaleData.collectFlag) {
          this.icon = "like"
        } else {
          this.icon = "like-o"
        }
      }
    },
    onClickLeft(){
      this.$router.push({path:"/index"})
    },
    formatPrice() {
      return '¥' + (this.SaleData.saleProductPrice).toFixed(2);
    }
  },
  created () {
    var storage = window.sessionStorage;
    var userInfo = JSON.parse(storage.getItem("session"));
    this.userInfo = userInfo;

    var id;
    if (this.userInfo == null){
      id=0;
    } else {
      id=this.userInfo.id
    }

    // 取到路由带过来的参数
    let routerParams = this.$route.query.data;
    var that = this;
    this.$axios.get("http://127.0.0.1:8081/sale/getSaleDetailInfo/"+routerParams+"/"+id)
      .then(function (SaleResult) {
        that.SaleData = SaleResult.data.data;
        if (that.SaleData.collectFlag){
          that.icon = "like"
        } else {
          that.icon = "like-o"
        }
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
