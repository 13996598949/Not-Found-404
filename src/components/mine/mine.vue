<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh" style="height: 100%">
      <div  style="height: 100%">
        <div class="user-box">
          <div class="info">
            <img v-if="this.userInfo == null" src="./img/default_header.jpg"/>
            <van-uploader :after-read="onRead" multiple>
              <img v-if="this.userInfo != null" id="header" :src="this.global.ip+'/'+this.userInfo.header" width="40px" height="40px"/>
            </van-uploader>
            <p v-if="this.userInfo == null" class="username" @click="login">点击登录</p>
            <p v-if="this.userInfo != null" class="username">{{this.userInfo.alias}}</p>
          </div>
        </div>

        <cross-line></cross-line>

        <div class="nav">
          <div class="nav-item" @click="toPayingList">
            <!--<img src="./img/paying.png">-->
            <van-icon v-if="this.CountData.payNum>0" style="font-size:21px;color:#1296db" name="cash-back-record" :info="this.CountData.payNum"/>
            <van-icon v-if="this.CountData.payNum<=0" style="font-size:21px;color:#1296db" name="cash-back-record"/>
            <van-icon v-if="this.userInfo == null" style="font-size:21px;color:#1296db" name="cash-back-record"/>
            <p>待付款</p>
          </div>
          <div class="nav-item" @click="toDeliveryList">
            <!--<img src="./img/sendProject.png"/>-->
            <van-icon v-if="this.CountData.deliveryNum>0" style="font-size:21px;color:#1296db" name="logistics" :info="this.CountData.deliveryNum"/>
            <van-icon v-if="this.CountData.deliveryNum<=0" style="font-size:21px;color:#1296db" name="logistics" />
            <van-icon v-if="this.userInfo == null" style="font-size:21px;color:#1296db" name="logistics" />
            <p>待发货</p>
          </div>
          <div class="nav-item" @click="toConfirmList">
            <!--<img src="./img/rePorject.png"/>-->
            <van-icon v-if="this.CountData.confirmNum>0" style="font-size:21px;color:#1296db" name="pending-deliver" :info="this.CountData.confirmNum"/>
            <van-icon v-if="this.CountData.confirmNum<=0" style="font-size:21px;color:#1296db" name="pending-deliver"/>
            <van-icon v-if="this.userInfo == null" style="font-size:21px;color:#1296db" name="pending-deliver"/>
            <p>待收货</p>
          </div>
          <div class="nav-item" @click="toEvaluationList">
            <!--<img src="./img/ok.png"/>-->
            <van-icon v-if="this.CountData.evaluateNum>0" style="font-size:21px;color:#1296db" name="completed" :info="this.CountData.evaluateNum"/>
            <van-icon v-if="this.CountData.evaluateNum<=0" style="font-size:21px;color:#1296db" name="completed"/>
            <van-icon v-if="this.userInfo == null" style="font-size:21px;color:#1296db" name="completed"/>
            <p>待评价</p>
          </div>
        </div>

        <cross-line></cross-line>

        <div class="menu">
          <div class="menu-item" @click="toPerson">
            <img src="./img/peopleMessage.png"/>个人中心<img class="fr" style="padding-top: 5px" src="./img/right.png"/>
          </div>
          <div class="menu-item" @click="toMyMessage">
            <img src="./img/message.png"/>我的消息<img class="fr"style="padding-top: 5px" src="./img/right.png"/>
          </div>
          <div class="menu-item" @click="toMyPublish">
            <img src="./img/public.png"/>我发布的<img class="fr" style="padding-top: 5px" src="./img/right.png"/>
          </div>
          <div class="menu-item" @click="toMySale">
            <img src="./img/sell.png"/>我卖出的<img class="fr" style="padding-top: 5px" src="./img/right.png"/>
          </div>
          <div class="menu-item" @click="toMyBuy">
            <img src="./img/buy.png"/>我买到的<img class="fr" style="padding-top: 5px" src="./img/right.png"/>
          </div>
          <div class="menu-item" @click="toMyCollection">
            <img src="./img/collect.png"/>我收藏的<img class="fr" style="padding-top: 5px" src="./img/right.png"/>
          </div>
        </div>
      </div>
  </van-pull-refresh>

</template>

<script>
  import crossLine from '@/components/base/cross-line/cross-line'
  import RouterLink from "vant/es/mixins/router-link";
  import { Toast } from 'vant';
export default {
  components: {
    RouterLink,
    crossLine
  },
  data () {
    return {
      userInfo:{},
      header:"",
      userInfo:{},
      CountData:{},
      isLoading:false
    }
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        if (this.userInfo!=null){
          var that = this;
          this.$axios.get(this.global.ip+"/order/countOrderNum/"+this.userInfo.id)
            .then(function (result) {
              if (result.data.status != false) {
                that.CountData = result.data.data;
              }else {
                Toast("系统错误！");
                that.$router.push({path:"/index"})
              }
            })
            .catch(function (error) {
              console.log(error)
            });
        }
        this.$toast('刷新成功');
        this.isLoading = false;
      }, 500);
    },
    onRead(file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var img = document.getElementById("header");
        img.src = e.target.result;
      }
      reader.readAsDataURL(file.file);
      this.header = file.file;

      var that = this;
      let form = new FormData();
      form.append("multipartFile",this.header);
      this.$axios.put(this.global.ip+"/user/editHeader/"+this.userInfo.id,form,{headers:{'Content-Type':'multipart/form-data'}})
        .then(function (result) {
          that.result = result.data.data;
          if (result.data.status != false) {
            Toast('保存成功');
            var storage = window.sessionStorage;
            var userInfo = JSON.stringify(that.result);
            storage.setItem("session",userInfo);
            that.$router.push({path:'/mine'})
          }else {
            Toast(result.data.message);
          }
        })
        .catch(function (error) {
          console.log(error)
        });
    },
    login(){
      this.$router.push({path:'/login'})
    },
    toDeliveryList(){
      if (this.userInfo == null){
        this.$router.push({path:'/login'})
        Toast("请先登录！")
      }else {
        this.$router.push({path: '/deliveryList'})
      }
    },
    toEvaluationList(){
      if (this.userInfo == null){
        this.$router.push({path:'/login'})
        Toast("请先登录！")
      }else {
        this.$router.push({path: '/evaluationList'})
      }
    },
    toConfirmList(){
      if (this.userInfo == null){
        this.$router.push({path:'/login'})
        Toast("请先登录！")
      }else {
        this.$router.push({path: '/confirmList'})
      }
    },
    toPayingList(){
      if (this.userInfo == null){
        this.$router.push({path:'/login'})
        Toast("请先登录！")
      }else {
        this.$router.push({path: '/payingList'})
      }
    },
    toMyMessage(){
      if (this.userInfo == null){
        this.$router.push({path:'/login'})
        Toast("请先登录！")
      }else {
        this.$router.push({path: '/myMessage'})
      }
    },
    toMyPublish () {
      if (this.userInfo == null){
        this.$router.push({path:'/login'})
        Toast("请先登录！")
      }else {
        this.$router.push({path: '/myPublish'})
      }
    },
    toMySale () {
      if (this.userInfo == null){
        this.$router.push({path:'/login'})
        Toast("请先登录！")
      }else {
        this.$router.push({path: '/mySale'})
      }
    },
    toMyBuy () {
      if (this.userInfo == null){
        this.$router.push({path:'/login'})
        Toast("请先登录！")
      }else {
        this.$router.push({path: '/myBuy'})
      }
    },
    toMyCollection () {
      if (this.userInfo == null){
        this.$router.push({path:'/login'})
        Toast("请先登录！")
      }else {
        this.$router.push({path: '/myCollection'})
      }
    },
    toPerson () {
      if (this.userInfo == null){
        this.$router.push({path:'/login'})
        Toast("请先登录！")
      }else {
        this.$router.push({path: '/person'})
      }
    }
  },
  created(){
    var storage = window.sessionStorage;
    var userInfo = JSON.parse(storage.getItem("session"));
    this.userInfo = userInfo;

    if (this.userInfo!=null){
      var that = this;
      this.$axios.get(this.global.ip+"/order/countOrderNum/"+this.userInfo.id)
        .then(function (result) {
          if (result.data.status != false) {
            that.CountData = result.data.data;
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
}
</script>

<style scoped>
.username{
  font-size: 20px;
  color: gainsboro;
}
.user-box{
  padding-left: 2px;
  width: 99%;
  height: 150px;
  background-image: url("img/personBack.jpg");
  border: 1px solid transparent;
}
  .info{
    margin: auto 0;
    margin-top: 30px;
    text-align: center;
  }
.info p{
  margin-top: 8px;
}
  .info img{
    border-radius: 50%;
    height: 75px;
    width: 75px;
  }
  .nav{
    margin-top: 10px;
    height: 50px;
  }
 .nav-item{
    width: 25%;
    text-align: center;
    float: left;
    font-size: 14px;
  }
.nav-item img{
  width: 25px;
  height: 25px;
}
.menu{
  margin-top: 5px;
  color: gray;
}
.menu-item{
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 17px;
}
.menu-item img{
  width: 15px;
  height: 15px;
  padding-right: 5px;
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
