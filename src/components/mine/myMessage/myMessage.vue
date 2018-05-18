<template>
  <div style="height: 100%">
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh" style="height: 100%">
        <van-nav-bar left-arrow @click-left="onClickLeft" title="我的消息"/>
        <cross-line></cross-line>
          <div class="title-bar">
            <span>租赁区</span>
          </div>
          <div v-if="RentMessageData==''">
            <span style="font-size: 14px;text-align: center;padding-top: 30px">暂无消息！</span>
            <div class="bottomFix"></div>
          </div>
          <div v-if="RentMessageData!=''">
            <div class="seller-list-item" v-for="item in RentMessageData" :item= "item" :key="item">

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

                <div style="padding-top: 5px">
                  <span class="box fl">
                    <img :src="'http://127.0.0.1:8081/'+item.header" style="width: 30px;height: 30px;">
                    <p>{{item.personName}}:&nbsp;&nbsp;&nbsp;{{item.message}}</p>
                  </span>
                  <div class="fr">
                    <van-button size="small" @click="toRentReply(item.messageId)">回复</van-button>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="title-bar">
            <span>出售区</span>
          </div>
          <div v-if="SaleMessageData==''">
            <span style="font-size: 14px;text-align: center;padding-top: 30px">暂无消息！</span>
            <div class="bottomFix"></div>
          </div>
          <div v-if="SaleMessageData!=''">
            <div class="seller-list-item" v-for="item in SaleMessageData" :item= "item" :key="item">

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

                <div style="padding-top: 5px">
                  <span class="box fl">
                    <img :src="'http://127.0.0.1:8081/'+item.header" style="width: 30px;height: 30px;">
                    <p>{{item.personName}}:&nbsp;&nbsp;&nbsp;{{item.message}}</p>
                  </span>
                  <div class="fr">
                    <van-button size="small" @click="toSaleReply(item.messageId)">回复</van-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
  </van-pull-refresh>
    <van-dialog v-model="rent_show"
                show-cancel-button
                :before-close="rent_beforeClose">
      <van-field
        v-model="rentReply"
        label="回复"
        placeholder="请输入回复"
      />
    </van-dialog>

    <van-dialog v-model="sale_show"
                show-cancel-button
                :before-close="sale_beforeClose">
      <van-field
        v-model="saleReply"
        label="回复"
        placeholder="请输入回复"
      />
    </van-dialog>
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
        isLoading: false,
        userInfo: {},
        RentMessageData: [],
        SaleMessageData: [],
        rentReply:"",
        saleReply:"",
        rent_show:false,
        sale_show:false,
        rentReplyDto:{},
        saleReplyDto:{},
        messageId:""
      }
    },
    props: {
      item:{
        type:Object,
        default:{}
      }
    },
    methods:{
      toRentReply(id){
        this.rent_show=true;
        this.messageId = id
      },
      rent_beforeClose(action,done){
        if (action === 'confirm') {
          if (this.rentReply != "") {
            this.rentReplyDto.messageId = this.messageId;
            this.rentReplyDto.replyPersonId = this.userInfo.id;
            this.rentReplyDto.replyMessage = this.rentReply;
            var that = this;
            this.$axios.put(this.global.ip + "/rent/replyRentMessage", this.rentReplyDto)
              .then(function (result) {
                if (result.data.status != false) {
                  Toast("回复成功！")
                  that.rentReply=""
                  that.$axios.get(that.global.ip+"/rent/getMyMessageRentInfo/"+that.userInfo.id)
                    .then(function (result) {
                      if (result.data.status != false) {
                        that.RentMessageData = result.data.data;
                      }else {
                        Toast("系统错误！");
                        that.$router.push({path:"/mine"})
                      }
                    })
                    .catch(function (error) {
                      console.log(error)
                    });
                } else {
                  Toast(result.data.message);
                }
              })
              .catch(function (error) {
                console.log(error)
              });
            done();
          } else {
            Toast("回复不能为空哦！")
            done();
          }
        }else {
          done();
        }
      },
      toSaleReply(id){
        this.sale_show=true
        this.messageId = id
      },
      sale_beforeClose(action,done){
        if (action === 'confirm') {
          if (this.saleReply != "") {
            this.saleReplyDto.messageId = this.messageId;
            this.saleReplyDto.replyPersonId = this.userInfo.id;
            this.saleReplyDto.replyMessage = this.saleReply;
            var that = this;
            this.$axios.put(this.global.ip + "/sale/replySaleMessage", this.saleReplyDto)
              .then(function (result) {
                if (result.data.status != false) {
                  Toast("回复成功！")
                  that.saleReply=""
                  that.$axios.get(that.global.ip+"/sale/getMyMessageSaleInfo/"+that.userInfo.id)
                    .then(function (result) {
                      if (result.data.status != false) {
                        that.SaleMessageData = result.data.data;
                      }else {
                        Toast("系统错误！");
                        that.$router.push({path:"/mine"})
                      }
                    })
                    .catch(function (error) {
                      console.log(error)
                    });
                } else {
                  Toast(result.data.message);
                }
              })
              .catch(function (error) {
                console.log(error)
              });
            done();
          } else {
            Toast("回复不能为空哦！")
            done();
          }
        }else {
          done();
        }
      },
      onClickLeft(){
        this.$router.push({path:"/mine"})
      },
      onRefresh() {
        setTimeout(() => {
          var that = this;
          this.$axios.get(this.global.ip+"/rent/getMyMessageRentInfo/"+this.userInfo.id)
            .then(function (result) {
              if (result.data.status != false) {
                that.RentMessageData = result.data.data;
              }else {
                Toast("系统错误！");
                that.$router.push({path:"/mine"})
              }
            })
            .catch(function (error) {
              console.log(error)
            });

          this.$axios.get(this.global.ip+"/sale/getMyMessageSaleInfo/"+this.userInfo.id)
            .then(function (result) {
              if (result.data.status != false) {
                that.SaleMessageData = result.data.data;
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
      this.$axios.get(this.global.ip+"/rent/getMyMessageRentInfo/"+this.userInfo.id)
        .then(function (result) {
          if (result.data.status != false) {
            that.RentMessageData = result.data.data;
          }else {
            Toast("系统错误！");
            that.$router.push({path:"/mine"})
          }
        })
        .catch(function (error) {
          console.log(error)
        });

      this.$axios.get(this.global.ip+"/sale/getMyMessageSaleInfo/"+this.userInfo.id)
        .then(function (result) {
          if (result.data.status != false) {
            that.SaleMessageData = result.data.data;
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
  .box{
    display:flex;
    align-items: center;//子元素垂直居中
    justify-content: center;//子元素水平居中
    padding-top: 10px;
  }
  .box img{
    padding-left: 10px;
  }
</style>
