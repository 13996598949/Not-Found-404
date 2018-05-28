<template>
  <div>
    <van-nav-bar left-arrow @click-left="onClickLeft" title="我的账户"/>
    <cross-line></cross-line>

    <div style="height: 100%">
      <van-cell-group>
        <van-cell style="padding-top: 50%">
          <div style="text-align: center"><img src="../../../components/mine/img/account.png"></div>
          <div style="text-align: center;padding-top: 10%">我的余额</div>
          <div class="account">{{ formatPrice(this.userInfo.account) }}</div>
        </van-cell>
      </van-cell-group>
    </div>

    <center><van-button class="vanButton" bottom-action @click="show = true">充值</van-button></center>

    <van-dialog
      v-model="show"
      show-cancel-button
      :before-close="beforeClose"
    >
      <van-cell-group>
        <van-cell style="height: 100px">
          <van-field
            v-model="account"
            type="number"
            label="充值金额:"
            required
          />
          <van-field
            v-model="buyPassword"
            type="password"
            label="交易密码"
            placeholder="请输入交易密码"
            required
          />
        </van-cell>
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
  import { Toast } from 'vant';
  import md5 from 'js-md5';
  import crossLine from '@/components/base/cross-line/cross-line'
  export default {
    components: {
      crossLine
    },
    data () {
      return {
        userInfo:{},
        account:0,
        show:false,
        accountDto:{},
        buyPassword:""
      }
    },
    methods:{
      myValidate(name,data){

        if (data==''){
          Toast(name + "不能为空")
          return false;
        }
        if (data.indexOf(" ") !=-1){
          Toast(name+"不能存在空格")
          return false;
        }
        return true;
      },
      beforeClose(action,done){
        if (action === 'confirm') {
          if (!this.myValidate("充值金额",this.account)){
            this.account=0;
            done();
            return;
          }
          if (!this.myValidate("交易密码",this.buyPassword)){
            this.buyPassword="";
            done();
            return;
          }
          if (this.account.length>6){
            Toast("充值金额最多只能输入六位数！")
            done();
            return;
          }
          this.accountDto.userId = this.userInfo.id;
          this.accountDto.account = this.account;
          this.accountDto.buyPassword = md5(this.buyPassword);
          var that = this;
          this.$axios.put(this.global.ip+"/user/updateAccount",this.accountDto)
            .then(function (result) {
              if (result.data.status != false) {
                Toast("充值成功！")
                that.userInfo = result.data.data;
                var storage = window.sessionStorage;
                storage.setItem("session",JSON.stringify(result.data.data))
                that.$router.go(-1)
              }else {
                that.account=0
                that.buyPassword=""
                Toast(result.data.message)
              }
            })
            .catch(function (error) {
              console.log(error)
            });
          done();
        } else {
          done();
        }
      },
      onClickLeft(){
        this.$router.go(-1)
      },
      formatPrice(account) {
        return '¥' + (account).toFixed(2);
      }
    },
    created(){
      var storage = window.sessionStorage;
      var userInfo = JSON.parse(storage.getItem("session"));
      this.userInfo = userInfo;
      var that = this;
      this.$axios.get(this.global.ip+"/user/getUserInfoById/"+this.userInfo.id)
        .then(function (result) {
          if (result.data.status != false) {
            that.userInfo = result.data.data;
            var storage = window.sessionStorage;
            storage.setItem("session",JSON.stringify(result.data.data))
          }else {
            Toast(result.data.message)
          }
        })
        .catch(function (error) {
          console.log(error)
        });


      if(userInfo == null){
        this.$router.push({path:'/mine'})
      }
    }
  }
</script>

<style scoped>
  .vanButton{
    background-color: #44BB00;
    width: 75%;
    margin-top: 20%;
  }
  .account{
    text-align: center;
    font-size: 20px;
    padding-top: 5%;
  }
</style>
