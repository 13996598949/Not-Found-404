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
          <span class="type fr" v-if="this.SaleData.type==0">消费级</span>
          <span class="type fr" v-if="this.SaleData.type==1">专业级</span>
        </van-cell>

        <div class="box fl">
          <img :src="'http://127.0.0.1:8081/'+this.SaleData.header" style="width: 50px;height: 50px"/>
          <p style="padding-left: 10px">{{this.SaleData.alias}}</p>
        </div>
      </van-cell-group>
    </div>

    <cross-line></cross-line>

    <div class="goods">
    <p class="liuyan"><b>留言</b></p>
    <p v-if="saleMessage==''"  style="padding-top:20px;font-size: 16px;text-align: center;">暂无留言！快来添加留言吧~</p>
    <van-cell-group v-if="saleMessage!=null" class="goods-cell-group" v-for="item in saleMessage" :item= "item" :key="item">
      <van-cell>
        <div class="box fl">
          <img :src="'http://127.0.0.1:8081/'+item.header" style="width: 30px;height: 30px">
          <p style="padding-left: 10px"><b>{{item.personName}}</b></p>
        </div>
        <div style="padding-top: 40px;padding-left: 50px">
          {{item.message}}
          <p style="color: gray">{{item.messageTimeStr}}</p>
        </div>
      </van-cell>
      <van-cell style="padding-left: 60px" v-if="item.replyPersonName != null">
        <div class="box fl">
          <img :src="'http://127.0.0.1:8081/'+item.replyHeader" style="width: 30px;height: 30px">
          <p style="padding-left: 10px"><b>{{item.replyPersonName}}</b></p>
        </div>
        <div style="padding-top: 40px;padding-left: 50px">
          {{item.replyMessage}}
          <p style="color: gray">{{item.replyTimeStr}}</p>
        </div>
      </van-cell>
    </van-cell-group>

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
      userInfo:{},
      saleMessage:{}
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

    this.$axios.get(this.global.ip+"/sale/getSaleMessage/"+routerParams)
      .then(function (MessageResult) {
        if(MessageResult.data.status != false) {
          that.saleMessage = MessageResult.data.data;
        }else {
          Toast(MessageResult.data.message)
        }
      })
      .catch(function (error) {
        console.log(error)
      });
  }
}
</script>

<style lang="less" scoped>
  .type{
    color: gray;
    font-size: 14px;
  }
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
