<template>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" style="height: 100%">
        <div style="height: 100%">
        <van-nav-bar left-arrow @click-left="onClickLeft" title="我买到的"/>
      <cross-line></cross-line>

      <div class="title-bar">
        <span>租赁区</span>
      </div>
      <div v-if="RentData==''">
        <span style="font-size: 14px;text-align: center;padding-top: 30px">暂未在租赁区购买产品哦~快去购买吧！</span>
        <div class="bottomFix"></div>
      </div>
      <div v-if="RentData!=''">
        <div class="seller-list-item" v-for="item in RentData" :item= "item" :key="item">

          <div class="left" @click="toRentSimpleInfo(item.productId)">
            <img :src="'http://127.0.0.1:8081/'+item.picture">
          </div>

          <div class="content">
            <div class="name" @click="toRentSimpleInfo(item.productId)">
              {{item.productName}}
            </div>

            <div class="mid">
              <span class="describe">{{item.productDescribe}}</span>
            </div>

            <div>
              <span class="price fl"><b>￥{{item.price}}/天&nbsp;&nbsp;&nbsp;租用{{item.rentDay}}天</b></span>
              <div class="fr">
                <van-button size="small" @click="toOrderRentInfo(item.orderId,item.active)">订单信息</van-button>
                <van-button v-if="item.active>=3" size="small" @click="toDeleteRentOrder(item.orderId)">删除</van-button>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="title-bar">
        <span>出售区</span>
      </div>
      <div v-if="SaleData==''">
        <span style="font-size: 14px;text-align: center;padding-top: 30px">暂未在出售区购买产品哦~快去购买吧！</span>
        <div class="bottomFix"></div>
      </div>
      <div v-if="SaleData!=''">
        <div class="seller-list-item" v-for="item in SaleData" :item= "item" :key="item">

          <div class="left" @click="toSaleSimpleInfo(item.productId)">
            <img :src="'http://127.0.0.1:8081/'+item.picture">
          </div>

          <div class="content">
            <div class="name" @click="toSaleSimpleInfo(item.productId)">
              {{item.productName}}
            </div>

            <div class="mid">
              <span class="describe">{{item.productDescribe}}</span>
            </div>

            <div>
              <span class="price fl"><b>￥{{item.price}}</b></span>
              <div class="fr">
                <van-button size="small" @click="toOrderSaleInfo(item.orderId,item.active)">订单信息</van-button>
                <van-button v-if="item.active>=3" size="small" @click="toDeleteSaleOrder(item.orderId)">删除</van-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

  </van-pull-refresh>
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
        isLoading: false,
        userInfo: {},
        RentData: [],
        SaleData: [],
      }
    },
    props: {
      item:{
        type:Object,
        default:{}
      }
    },
    methods:{
      toSaleSimpleInfo(id){
        this.$router.push({
          path:'saleSimpleInfo',
          query: {
            data: id
          }
        })
      },
      toRentSimpleInfo(id){
        this.$router.push({
          path:'rentSimpleInfo',
          query: {
            data: id
          }
        })
      },
      toDeleteRentOrder(id){
        Dialog.confirm({
          title: '提示',
          message: '确定要删除订单吗？'
        }).then(() => {
          var that = this;
          this.$axios.delete("http://127.0.0.1:8081/order/deleteRentOrder/" + id + "/" + "buy")
            .then(function (result) {
              if (result.data.status != false) {
                Toast("删除成功！")
                that.$axios.get("http://127.0.0.1:8081/order/getMyBuyRentInfo/"+that.userInfo.id)
                  .then(function (result) {
                    if (result.data.status != false) {
                      that.RentData = result.data.data;
                    }else {
                      Toast("系统错误！");
                      that.$router.push({path:"/mine"})
                    }
                  })
                  .catch(function (error) {
                    console.log(error)
                  });
              } else {
                Toast(result.data.message)
              }
            })
            .catch(function (error) {
              console.log(error)
            });
        }).catch(()=>{

        })
      },
      toOrderRentInfo(id,active){
        if (active != 5) {
        var that = this;
        this.$axios.get("http://127.0.0.1:8081/order/getRentOrderInfo/"+id)
          .then(function (result) {
            if (result.data.status != false) {
              if (result.data.data.active==0){
                that.$router.push({
                  path:"order_buy_paying",
                  query:{
                    data:result.data.data,
                    flag:"rent"
                  }
                })
              }else if (result.data.data.active==1){
                that.$router.push({
                  path:"order_buy_delivery",
                  query:{
                    data:result.data.data,
                    flag:"rent"
                  }
                })
              }else if (result.data.data.active==2){
                that.$router.push({
                  path:"order_buy_receive",
                  query:{
                    data:result.data.data,
                    flag:"rent"
                  }
                })
              }else if (result.data.data.active==3){
                that.$router.push({
                  path:"order_buy_confirm",
                  query:{
                    data:result.data.data,
                    flag:"rent"
                  }
                })
              }else if (result.data.data.active==4 && result.data.data.buy_evaluate_flag == 1){
                that.$router.push({
                  path:"order_buy_evaluate",
                  query:{
                    data:result.data.data,
                    flag:"rent",
                  }
                })
              }else if (result.data.data.active==4 && result.data.data.buy_evaluate_flag == 0){
                that.$router.push({
                  path:"order_buy_confirm",
                  query:{
                    data:result.data.data,
                    flag:"rent",
                  }
                })
              }
            }else {
              Toast("系统错误！")
            }
          })
          .catch(function (error) {
            console.log(error)
          });
        }else {
          this.$router.push({
            path: 'order_refund',
            query: {
              orderId: id,
              flag:"rent"
            }
          })
        }
      },
      toDeleteSaleOrder(id){
        Dialog.confirm({
          title: '提示',
          message: '确定要删除订单吗？'
        }).then(() => {
          var that = this;
          this.$axios.delete("http://127.0.0.1:8081/order/deleteSaleOrder/" + id + "/" + "buy")
            .then(function (result) {
              if (result.data.status != false) {
                Toast("删除成功！")
                that.$axios.get("http://127.0.0.1:8081/order/getMyBuySaleInfo/"+that.userInfo.id)
                  .then(function (result) {
                    if (result.data.status != false) {
                      that.SaleData = result.data.data;
                    }else {
                      Toast("系统错误！");
                      that.$router.push({path:"/mine"})
                    }
                  })
                  .catch(function (error) {
                    console.log(error)
                  });
              } else {
                Toast(result.data.message)
              }
            })
            .catch(function (error) {
              console.log(error)
            });
        }).catch(()=>{

        })
      },
      toOrderSaleInfo(id,active){
        console.log(active)
        if (active != 5) {
        var that = this;
        this.$axios.get("http://127.0.0.1:8081/order/getSaleOrderInfo/"+id)
          .then(function (result) {
            if (result.data.status != false) {
              if (result.data.data.active==0){
                that.$router.push({
                  path:"order_buy_paying",
                  query:{
                    data:result.data.data,
                    flag:"sale"
                  }
                })
              }else if (result.data.data.active==1){
                that.$router.push({
                  path:"order_buy_delivery",
                  query:{
                    data:result.data.data,
                    flag:"sale"
                  }
                })
              }else if (result.data.data.active==2){
                that.$router.push({
                  path:"order_buy_receive",
                  query:{
                    data:result.data.data,
                    flag:"sale"
                  }
                })
              }else if (result.data.data.active==3){
                that.$router.push({
                  path:"order_buy_confirm",
                  query:{
                    data:result.data.data,
                    flag:"sale"
                  }
                })
              }else if (result.data.data.active==4){
                that.$router.push({
                  path:"order_buy_evaluate",
                  query:{
                    data:result.data.data,
                    flag:"sale"
                  }
                })
              }
            }else {
              Toast("系统错误！")
            }
          })
          .catch(function (error) {
            console.log(error)
          });
        }else {
          this.$router.push({
            path: 'order_refund',
            query: {
              orderId: id,
              flag:"sale"
            }
          })
        }
      },
      onClickLeft(){
        this.$router.push({path:"/mine"})
      },
      onRefresh() {
        setTimeout(() => {
          var that = this;
          this.$axios.get("http://127.0.0.1:8081/order/getMyBuyRentInfo/"+this.userInfo.id)
            .then(function (result) {
              if (result.data.status != false) {
                that.RentData = result.data.data;
              }else {
                Toast("系统错误！");
                that.$router.push({path:"/mine"})
              }
            })
            .catch(function (error) {
              console.log(error)
            });

          this.$axios.get("http://127.0.0.1:8081/order/getMyBuySaleInfo/"+this.userInfo.id)
            .then(function (result) {
              if (result.data.status != false) {
                that.SaleData = result.data.data;
              }else {
                Toast("系统错误！");
                that.$router.push({path:"/mine"})
              }
            })
            .catch(function (error) {
              console.log(error)
            });
          this.$toast('刷新成功');
          this.isLoading = false;
        }, 500);
      }
    },
    created(){
      var storage = window.sessionStorage;
      var userInfo = JSON.parse(storage.getItem("session"));
      this.userInfo = userInfo;

      var that = this;
      this.$axios.get("http://127.0.0.1:8081/order/getMyBuyRentInfo/"+this.userInfo.id)
        .then(function (result) {
          if (result.data.status != false) {
            that.RentData = result.data.data;
          }else {
            Toast("系统错误！");
            that.$router.push({path:"/mine"})
          }
        })
        .catch(function (error) {
          console.log(error)
        });

      this.$axios.get("http://127.0.0.1:8081/order/getMyBuySaleInfo/"+this.userInfo.id)
        .then(function (result) {
          if (result.data.status != false) {
            that.SaleData = result.data.data;
          }else {
            Toast("系统错误！");
            that.$router.push({path:"/mine"})
          }
        })
        .catch(function (error) {
          console.log(error)
        });
    }
  }
</script>

<style scoped>
  .seller-list-item {
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
    padding: 12.5px 0 12.5px 0;
    overflow: hidden;
    margin-left:10px;
    border-bottom: solid 1px #eee;
  }
  /*左侧图片*/
  .left {
    position: relative;
    flex: 0 0 86px;
    width: 86px;
  }
  .left span {
    display: inline-block;
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 28px;
    height: 14px;
    line-height: 14px;
    font-size: 12px;
    color: white;
  }
  .left img {
    border:solid 1px #e4e4e4;
    display: block;
    width: 84px;
    height: 63px;
    margin: 0 auto;
  }

  /*右侧内容*/
  .content {
    /*background-color: red;*/
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 15px 0 10px;
  }
  .content .name {
    font-size: 17px;
    color: #333;
    overflow: hidden;
    font-weight: bold;
    overflow: hidden;
  }

  .content .mid {
    flex: 1;
    margin-top: 7px;
    color: #666;
    font-size: 12px;
  }
  .content img{
    width: 20px;
    height: 20px;
  }
  .down img{
    background-color: #F2FCFC;
    width: 15px;
    height: 15px;
  }
  .describe{
    font-size: 12px;
    color: slategray;
  }
  .price{
    font-size: 15px;
    color: red;
  }

  .title-bar {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 20px;
  }
  .title-bar span {
    display: inline-block;
    position: relative;
    font-weight: bold;
    color: #333;
  }
  .title-bar span:before {
    content: '';
    position: absolute;
    top: 20px;
    left: -45px;
    width: 30px;
    border-top: 1px solid #333;
    transform: scaleY(0.5);
  }
  .title-bar span:after {
    content: '';
    position: absolute;
    top: 20px;
    right: -43px;
    width: 30px;
    border-top: 1px solid #333;
    transform: scaleY(0.5);
  }
</style>
