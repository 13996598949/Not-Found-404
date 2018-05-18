<template>
  <div class="seller-list-item" >
    <div class="left" @click="toSaleDetail">
      <img :src="'http://127.0.0.1:8081/'+item.saleProductPicture">
    </div>

    <div class="content">
      <div class="name">
        <span class="fl" @click="toSaleDetail">{{item.saleProductName}}</span>
        <img v-if="!item.collectFlag" v-on:click="collect()"class="fr" src="./collect.png"/>
        <img v-if="item.collectFlag" v-on:click="collect()"class="fr" src="./collect2.png"/>
      </div>

      <div class="mid">
        <span class="describe">{{ item.saleProductDescribe }}</span>
      </div>

      <div class="down">
        <img class="fl" src="../../../assets/project/credit.png">
        <span class="credit fl" v-if="item.credit==1">信用优秀</span>
        <span class="credit fl" v-if="item.credit==2">信用极好</span>
        <span class="credit fl" v-if="item.credit==3">信用良好</span>
      </div>

      <div>
        <span><b class="price">￥{{ item.saleProductPrice }}</b>
          <span class="type fr" v-if="item.type==0">消费级</span>
          <span class="type fr" v-if="item.type==1">专业级</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import star from '@/components/base/star/star'
  import { Toast } from 'vant';
export default {
  components: {
    star
  },
  data () {
    return {
      userInfo:{},
      item:{},
      recordNumDto:{}
    }
  },
  props: {
  	item:{
  		type:Object,
  		default:{}
  	}
  },
  methods: {
    collect (){
      if (this.userInfo == null){
        this.$router.push({path:'/login'});
        Toast("请先登录");
      }else {
        var that = this
        if (that.item.userId == that.userInfo.id){
          Toast("不能收藏自己的商品哦~");
        }else {
          if (that.item.collectFlag) {
            this.$axios.delete(this.global.ip+"/collect/deleteCollectSale/" + that.userInfo.id + "/" + that.item.id)
              .then(function (result) {
                if (result.data.status != false) {
                  that.item.collectFlag = false
                }
              })
              .catch(function (error) {
                console.log(error)
              });
          } else {
            this.$axios.post(this.global.ip+"/collect/insertCollectSale/" + that.userInfo.id + "/" + that.item.id)
              .then(function (result) {
                if (result.data.status != false) {
                  that.item.collectFlag = true
                }
              })
              .catch(function (error) {
                console.log(error)
              });
          }
        }
      }
    },
    toSaleDetail() {
      var that = this;
      that.recordNumDto.id = that.item.id;
      that.recordNumDto.type = that.item.type;

      if (this.userInfo != null) {
        that.recordNumDto.userId = that.userInfo.id;
        if (this.item.userId == this.userInfo.id) {
          this.$router.push({
            path: 'saleAdminDetailInfo',
            query: {
              data: this.item.id
            }
          })
        } else {
          this.$router.push({
            path: 'saleDetailInfo',
            query: {
              data: this.item.id
            }
          })
          this.$axios.put(this.global.ip + "/sale/recordSaleNum", that.recordNumDto)
            .then(function (SaleResult) {
              if (SaleResult.data.status) {

              } else {
                Toast(SaleResult.data.message);
              }
            })
            .catch(function (error) {
              console.log(error)
            });
        }
      } else {
        this.$router.push({
          path: 'saleDetailInfo',
          query: {
            data: this.item.id
          }
        })

        this.$axios.put(this.global.ip + "/sale/recordSaleNum", that.recordNumDto)
          .then(function (SaleResult) {
            if (SaleResult.data.status) {

            } else {
              Toast(SaleResult.data.message);
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      }
    }
  },
  created () {
    var storage = window.sessionStorage;
    var userInfo = JSON.parse(storage.getItem("session"));
    this.userInfo = userInfo;
  },
}
</script>

<style scoped>
  .type{
    color: gray;
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
  .mid .star {
    margin-top: 3px;
    width: 70px;
    height: 10px;
  }
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
  .describe{
    font-size: 12px;
    color: slategray;
  }
  .credit{
    background-color: #F2FCFC;
    color: #30D0CC;
  }
  .price{
    font-size: 15px;
    color: red;
  }
</style>
