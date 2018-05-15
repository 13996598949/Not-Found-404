<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh" style="height: 100%">
    <div style="height: 100%">
      <van-nav-bar left-arrow @click-left="onClickLeft" title="我收藏的"/>
      <cross-line></cross-line>


        <div class="title-bar">
          <span>租恁收藏</span>
        </div>
        <div v-if="CollectRentData==''">
          <span style="font-size: 14px;text-align: center;padding-top: 30px">暂未收藏租赁产品哦~快去添加吧！</span>
          <div class="bottomFix"></div>
        </div>
        <div v-if="CollectRentData!=''">
          <div class="seller-list-item" v-for="item in CollectRentData" :item= "item" :key="item">
            <div class="left"  @click="toRentDetail(item.id,item.flag)">
              <img :src="'http://127.0.0.1:8081/'+item.rentProductPicture">
            </div>

            <div class="content">
              <div class="name"  @click="toRentDetail(item.id,item.flag)">
                {{item.rentProductName}}
              </div>

              <div class="mid">
                <span class="describe">{{item.rentProductDescribe}}</span>
              </div>

              <div>
                <span class="price fl"><b>￥{{item.rentProductPrice}}/天</b></span>
                <div class="fr">
                  <van-button size="small" @click="toDeleteRentMyCollect(item.id)">取消收藏</van-button>
                </div>
              </div>
            </div>
          </div>
          <div class="bottomFix"></div>
        </div>

          <div class="title-bar">
            <span>出售收藏</span>
          </div>
          <div v-if="CollectSaleData==''">
            <span style="font-size: 14px;text-align: center;padding-top: 30px">暂未收藏出售产品哦~快去添加吧！</span>
            <div class="bottomFix"></div>
          </div>
          <div v-if="CollectSaleData!=''">
            <div class="seller-list-item" v-for="item in CollectSaleData" :item= "item" :key="item">
                <div class="left" @click="toSaleDetail(item.id,item.flag)">
                  <img :src="'http://127.0.0.1:8081/'+item.saleProductPicture">
                </div>

                <div class="content">
                  <div class="name" @click="toSaleDetail(item.id,item.flag)">
                    {{item.saleProductName}}
                  </div>

                  <div class="mid">
                    <span class="describe">{{item.saleProductDescribe}}</span>
                  </div>

                  <div>
                    <span class="price fl"><b>￥{{item.saleProductPrice}}</b></span>
                    <div class="fr">
                      <van-button size="small" @click="toDeleteSaleMyCollect(item.id)">取消收藏</van-button>
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
  export default {
    components: {
      CrossLine
    },
    data () {
      return {
        userInfo:{},
        isLoading: false,
        CollectRentData:[],
        CollectSaleData:[]
      }
    },
    props: {
      item:{
        type:Object,
        default:{}
      }
    },
    methods:{
      toRentDetail(id,flag){
        if (flag==1){
          Toast("收藏的商品被卖了哦！o(╥﹏╥)o");
        } else if (flag==0) {
          this.$router.push({
            path: 'rentDetailInfo',
            query: {
              data: id
            }
          })
        }
      },
      toSaleDetail(id,flag){
        if (flag==1){
          Toast("收藏的商品被卖了哦！o(╥﹏╥)o");
        } else if (flag==0) {
          this.$router.push({
            path: 'saleDetailInfo',
            query: {
              data: id
            }
          })
        }
      },
      toDeleteRentMyCollect(id){
        var that = this;
        this.$axios.delete("http://127.0.0.1:8081/collect/deleteCollectRent/"+this.userInfo.id+"/"+id)
          .then(function (result) {
            that.$axios.get("http://127.0.0.1:8081/collect/getCollectRent/"+that.userInfo.id)
              .then(function (result) {
                that.CollectRentData = result.data.data;
              })
              .catch(function (error) {
                console.log(error)
              });
          })
          .catch(function (error) {
            console.log(error)
          });
      },
      toDeleteSaleMyCollect(id){
        var that = this;
        this.$axios.delete("http://127.0.0.1:8081/collect/deleteCollectSale/"+this.userInfo.id+"/"+id)
          .then(function (result) {
            that.$axios.get("http://127.0.0.1:8081/collect/getCollectSale/"+that.userInfo.id)
              .then(function (result) {
                that.CollectSaleData = result.data.data;
              })
              .catch(function (error) {
                console.log(error)
              });
          })
          .catch(function (error) {
            console.log(error)
          });
      },
      toEditMyPublish(id){
        this.$toast('编辑'+id);
      },
      onClickLeft(){
        this.$router.push({path:"/mine"})
      },
      onRefresh() {
        setTimeout(() => {
          var that = this;
          this.$axios.get("http://127.0.0.1:8081/collect/getCollectRent/"+this.userInfo.id)
            .then(function (result) {
              that.CollectRentData = result.data.data;
            })
            .catch(function (error) {
              console.log(error)
            });
          this.$axios.get("http://127.0.0.1:8081/collect/getCollectSale/"+this.userInfo.id)
            .then(function (result) {
              that.CollectSaleData = result.data.data;
            })
            .catch(function (error) {
              console.log(error)
            })
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
      this.$axios.get("http://127.0.0.1:8081/collect/getCollectRent/"+this.userInfo.id)
        .then(function (result) {
          that.CollectRentData = result.data.data;
          console.log(that.CollectRentData)
        })
        .catch(function (error) {
          console.log(error)
        });
      this.$axios.get("http://127.0.0.1:8081/collect/getCollectSale/"+this.userInfo.id)
        .then(function (result) {
          that.CollectSaleData = result.data.data;
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
</script>

<style scoped>
  .bottomFix {
    height: 50px;
    background-color: transparent;
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
  .user img{
    width: 25px;
    height: 25px;
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

  .content .name img{
    width: 25px;
    height: 25px;
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
</style>
