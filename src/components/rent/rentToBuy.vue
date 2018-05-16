<template>
  <div>
    <div>
      <van-nav-bar left-arrow @click-left="onClickLeft" title="租用宝贝"/>
      <cross-line></cross-line>
      <div class="seller-list-item">

        <div class="left">
          <img :src="'http://120.78.206.183:8081/'+this.resultData.rentProductPicture">
        </div>

        <div class="content">
          <div class="name">
            {{this.resultData.rentProductName}}
          </div>

          <div class="mid">
            <span class="describe">{{this.resultData.rentProductDescribe}}</span>
          </div>

          <div>
            <span class="price fl"><b>￥{{this.resultData.rentProductPrice}}/天</b></span>
          </div>
        </div>
      </div>

      <div class="rent_day fl">
        租用天数(最少需租用3天)：
        <div>
        <van-stepper
           v-model="rentDay"
           integer
           :min="3"
           :step="1"
           :default-value="3"
        />
        </div>
      </div>

      <div class="address" v-if="this.address!=undefined">
        <van-cell title="收货地址:" is-link  @click="toAddressList">
          <div>{{this.address.name}} {{this.address.tel}}</div>
          <div>{{this.address.address}}</div>
        </van-cell>
      </div>
      <div class="address" v-if="this.address==undefined">
        <van-cell title="收货地址:" is-link  @click="toAddressList">

        </van-cell>
      </div>
        <van-submit-bar
          :price="formatPrice(this.resultData.rentProductPrice,rentDay)"
          button-text="确认下单"
          @submit="onSubmit"
        />
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
      resultData:{},
      address:{},
      userInfo:{},
      orderRentDto:{},
      price:"",
      rentDay:3,
    }
  },
  methods: {
    onSubmit(){
      this.orderRentDto.sellId = this.resultData.userId;
      this.orderRentDto.buyId = this.userInfo.id;
      this.orderRentDto.productId = this.resultData.id;
      this.orderRentDto.rentDay = this.rentDay;
      this.orderRentDto.addressId = this.address.id;
      this.orderRentDto.price = this.price/100;

      var that = this;
      this.$axios.post(this.global.ip+"/order/insertRentOrder",that.orderRentDto)
        .then(function (result) {
          if (result.data.status != false) {
            that.$router.push({
              path:"order_buy_paying",
              query:{
                data:result.data.data,
                flag:"rent"
              }
            })
          }else {
            Toast("系统错误！")
          }
        })
        .catch(function (error) {
          console.log(error)
        });
    },
    toAddressList(){
      this.$router.push({
        path:"addressList",
        query:{
          data:"rent"
        }
      })
    },
    onClickLeft(){
      this.$router.push({
        path:"rentDetailInfo",
        query:{
          data:this.resultData.id
        }
      })
    },
    formatPrice(price,rentday) {
      this.price = price*rentday*100;
      return (this.price);
    }
  },
  created () {
    var storage = window.sessionStorage;
    var userInfo = JSON.parse(storage.getItem("session"));
    this.userInfo = userInfo;

    // 取到路由带过来的参数
    let address = this.$route.query.data;
    let resultData = this.$route.query.RentData;
    if (address != undefined) {
      storage.setItem("address", JSON.stringify(address));
    }
    if (resultData != undefined){
      storage.setItem("resultData",JSON.stringify(resultData));
    }
    this.address = JSON.parse(storage.getItem("address"));
    this.resultData = JSON.parse(storage.getItem("resultData"));
  },
}
</script>

<style lang="less" scoped>
  .address{
    width: 100%;
    margin-bottom: 5px;
    padding: 12.5px 0 12.5px 0;
    border-bottom: solid 1px #eee;
  }
  .address div{
    font-size: 12px;
    color: gray;
  }
  .rent_day{
    font-size: 12px;
    margin-bottom: 5px;
    width: 360px;
    padding: 12.5px 0 12.5px 0;
    margin-left:10px;
    border-bottom: solid 1px #eee;
  }
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

  .describe{
    font-size: 12px;
    color: slategray;
  }
  .price{
    font-size: 15px;
    color: red;
  }
</style>
