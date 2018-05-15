<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div>
      <van-nav-bar left-arrow @click-left="onClickLeft" title="消费级专区"/>
      <form action="/">
        <van-search
          v-model="value"
          placeholder="请输入商品名称"
          @search="toSearchConsumer"
        />
      </form>
      <van-tabs sticky>
        <van-tab title="全部">
          <div class="title-bar">
            <span>租赁区</span>
          </div>
          <div v-if="RentData==''">
            <span style="font-size: 14px;text-align: center;padding-top: 30px">租赁区暂无商品哦~</span>
            <div class="bottomFix"></div>
          </div>
          <div v-if="RentData!=''">
            <rent-list-item v-for="item in RentData" :item= "item" :key="item"></rent-list-item>
            <cross-line></cross-line>
          </div>

          <div class="title-bar">
            <span>出售区</span>
          </div>
          <div v-if="SaleData==''">
            <span style="font-size: 14px;text-align: center;padding-top: 30px">出售区暂无商品哦~</span>
            <div class="bottomFix"></div>
          </div>
          <div v-if="SaleData!=''">
            <sale-list-item v-for="item in SaleData" :item= "item" :key="item"></sale-list-item>
          </div>
        </van-tab>
        <van-tab title="租赁区">
          <div v-if="RentData==''">
            <span style="font-size: 14px;text-align: center;padding-top: 30px">租赁区暂无商品哦~</span>
            <div class="bottomFix"></div>
          </div>
          <div v-if="RentData!=''">
            <rent-list-item v-for="item in RentData" :item= "item" :key="item"></rent-list-item>
          </div>
        </van-tab>
        <van-tab title="出售区">
          <div v-if="SaleData==''">
            <span style="font-size: 14px;text-align: center;padding-top: 30px">出售区暂无商品哦~</span>
            <div class="bottomFix"></div>
          </div>
          <div v-if="SaleData!=''">
            <sale-list-item v-for="item in SaleData" :item= "item" :key="item"></sale-list-item>
          </div>
        </van-tab>
      </van-tabs>

    </div>
  </van-pull-refresh>
</template>

<script>
  import CrossLine from "@/components/base/cross-line/cross-line"
  import rentListItem from '@/components/base/shop-list-item/rent-list-item'
  import saleListItem from '@/components/base/shop-list-item/sale-list-item'
  import { Toast } from 'vant';
  export default {
    components: {
      CrossLine,
      rentListItem,
      saleListItem
    },
    data () {
      return {
        isLoading: false,
        userInfo: {},
        RentData: [],
        SaleData: [],
        value:""
      }
    },
    props: {
      item:{
        type:Object,
        default:{}
      }
    },
    methods:{
      toSearchConsumer(){
        var id;
        if (this.userInfo == null){
          id=0;
        } else {
          id=this.userInfo.id
        }

        var that = this;
        this.$axios.get("http://127.0.0.1:8081/index/getConsumerRent/"+id,{params:{"searchName":this.value}})
          .then(function (result) {
            if (result.data.status != false) {
              that.RentData = result.data.data;
            }else {
              Toast("系统错误！");
              that.$router.push({path:"/index"})
            }
          })
          .catch(function (error) {
            console.log(error)
          });

        this.$axios.get("http://127.0.0.1:8081/index/getConsumerSale/"+id,{params:{"searchName":this.value}})
          .then(function (result) {
            if (result.data.status != false) {
              that.SaleData = result.data.data;
            }else {
              Toast("系统错误！");
              that.$router.push({path:"/index"})
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      },
      onClickLeft(){
        this.$router.push({path:"/index"})
      },
      onRefresh() {
        setTimeout(() => {
          var that = this;
          var id;
          if (this.userInfo == null){
            id=0;
          } else {
            id=this.userInfo.id
          }
          this.$axios.get("http://127.0.0.1:8081/index/getConsumerRent/"+id,{params:{"searchName":this.value}})
            .then(function (result) {
              if (result.data.status != false) {
                that.RentData = result.data.data;
              }else {
                Toast("系统错误！");
                that.$router.push({path:"/index"})
              }
            })
            .catch(function (error) {
              console.log(error)
            });

          this.$axios.get("http://127.0.0.1:8081/index/getConsumerSale/"+id,{params:{"searchName":this.value}})
            .then(function (result) {
              if (result.data.status != false) {
                that.SaleData = result.data.data;
              }else {
                Toast("系统错误！");
                that.$router.push({path:"/index"})
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

      var id;
      if (this.userInfo == null){
        id=0;
      } else {
        id=this.userInfo.id
      }

      var that = this;
      this.$axios.get("http://127.0.0.1:8081/index/getConsumerRent/"+id,{params:{"searchName":this.value}})
        .then(function (result) {
          if (result.data.status != false) {
            that.RentData = result.data.data;
          }else {
            Toast("系统错误！");
            that.$router.push({path:"/index"})
          }
        })
        .catch(function (error) {
          console.log(error)
        });

      this.$axios.get("http://127.0.0.1:8081/index/getConsumerSale/"+id,{params:{"searchName":this.value}})
        .then(function (result) {
          if (result.data.status != false) {
            that.SaleData = result.data.data;
          }else {
            Toast("系统错误！");
            that.$router.push({path:"/index"})
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
  .bottomFix {
    height: 50px;
    background-color: transparent;
  }
</style>
