<template>
  <div>
    <div class="goods">
      <van-nav-bar left-arrow @click-left="onClickLeft" title="商品详情"/>
      <cross-line></cross-line>
      <img :src="'http://120.78.206.183:8081/'+this.RentData.rentProductPicture" style="width: 375px;height: 375px">

      <van-cell-group class="goods-cell-group">
        <van-cell>
          <div class="goods-title">{{ this.RentData.rentProductName }}</div>
          <div class="goods-describe">{{ this.RentData.rentProductDescribe }}</div>
          <div class="goods-price">{{ formatPrice(this.RentData.rentProductPrice) }}/天</div>
        </van-cell>

        <div class="box fl">
          <img :src="'http://120.78.206.183:8081/'+this.RentData.header" style="width: 50px;height: 50px"/>
          <p style="padding-left: 10px">{{this.RentData.alias}}</p>
        </div>
      </van-cell-group>
    </div>

    <cross-line></cross-line>

    <p class="liuyan"><b>留言</b></p>
    <van-cell-group class="goods-cell-group">
      <van-cell>
        <p style="padding-left: 10px">{{this.RentData.alias}}:</p>
      </van-cell>
    </van-cell-group>

    <div>
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
      RentData:{},
      userInfo:{},
    }
  },
  methods: {
    toOrderPaying(){
      if (this.userInfo == null) {
        this.$router.push({path: '/login'});
        Toast("请先登录");
      }else {
        this.$router.push({
          path: 'rentToBuy',
          query: {
            RentData: this.RentData
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
        if (that.RentData.collectFlag) {
          this.$axios.delete(this.global.ip+"/collect/deleteCollectRent/" + that.userInfo.id + "/" + this.RentData.id)
            .then(function (result) {
              if (result.data.status != false) {
                that.RentData.collectFlag = false
              }
            })
            .catch(function (error) {
              console.log(error)
            });
        } else {
          this.$axios.post(this.global.ip+"/collect/insertCollectRent/" + that.userInfo.id + "/" + this.RentData.id)
            .then(function (result) {
              if (result.data.status != false) {
                that.RentData.collectFlag = true
              }
            })
            .catch(function (error) {
              console.log(error)
            });
        }
        if (!this.RentData.collectFlag) {
          this.icon = "like"
        } else {
          this.icon = "like-o"
        }
      }
    },
    onClickLeft(){
      this.$router.go(-1)
    },
    formatPrice() {
      return '¥' + (this.RentData.rentProductPrice).toFixed(2);
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
    this.$axios.get(this.global.ip+"/rent/getRentDetailInfo/"+routerParams+"/"+id)
      .then(function (RentResult) {
        that.RentData = RentResult.data.data;
        if (that.RentData.collectFlag){
          that.icon = "like"
        } else {
          that.icon = "like-o"
        }
      })
      .catch(function (error) {
        console.log(error)
      });
  },
}
</script>

<style lang="less" scoped>
  .down {
    flex: 1;
    margin-top: 7px;
    font-size: 13px;
    color: #656565;
  }
  .down img{
    background-color: #F2FCFC;
    width: 15px;
    height: 15px;
  }
  .credit{
    background-color: #F2FCFC;
    color: #30D0CC;
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
