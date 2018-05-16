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
        <p style="padding-left: 10px">{{this.SaleData.alias}}:</p>
      </van-cell>
    </van-cell-group>

    <div class="goods">
      <van-goods-action>
        <van-goods-action-mini-btn icon="chat" @click="toDeleteSale">
          删除
        </van-goods-action-mini-btn>
        <van-goods-action-big-btn primary icon="chat" @click="toEditSale">
          编辑
        </van-goods-action-big-btn>
      </van-goods-action>
    </div>

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
    toDeleteSale(){
      Dialog.confirm({
        title: '提示',
        message: '确认要删除吗？'
      }).then(() => {
        var that = this;
        this.$axios.delete(this.global.ip+"/sale/deleteMyPublishSale/"+this.SaleData.id)
          .then(function (SaleResult) {
            if (SaleResult.data.status){
              Toast("删除成功!");
              that.$router.push({path:"/myPublish"})
            } else {
              Toast("删除失败!");
            }
          })
          .catch(function (error) {

          });
      }).catch(() => {

      });
    },
    toEditSale(){
      this.$router.push({
        path:'saleEdit',
        query: {
          data: this.SaleData.id
        }
      })
    },
    onClickLeft(){
      this.$router.push({path:"/myPublish"})
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
    this.$axios.get(this.global.ip+"/sale/getSaleDetailInfo/"+routerParams+"/"+this.userInfo.id)
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
