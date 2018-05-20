<template>
  <div class="login">
    <van-nav-bar left-arrow @click-left="onClickLeft" title="登录"/>
    <cross-line></cross-line>
      <div class="welcome"><img src="../../../components/mine/login/img/welcome.png"></div>
      <div class="login-form">
        <div class="login-inp"><label>登录</label><input type="text" v-model="userLoginDto.userName"/></div>
        <div class="login-inp"><label>密码</label><input type="password" v-model="userLoginDto.loginPassword"></div>
        <div class="login-inp" @click="toLogin"><a>立即登录</a></div>
      </div>
    <div class="login-txt"><router-link to="/register">立即注册</router-link>|<a href="#" @click="show = true">忘记密码？</a></div>

    <van-dialog
      v-model="show"
      show-cancel-button
      :before-close="beforeClose"
    >
      <van-cell-group>
        <van-cell>
          <van-field
            v-model="userName"
            type="text"
            label="用户名"
            placeholder="请输入用户名"
            icon="clear"
            @click-icon="userName = ''"
            required
          />
        </van-cell>

        <van-cell>
          <van-field
            v-model="telephone"
            type="number"
            label="手机号"
            placeholder="请输入注册时的手机号"
            icon="clear"
            @click-icon="telephone = ''"
            required
          />
        </van-cell>

        <van-cell>
          <van-field
            center
            v-model="verification"
            label="短信验证码"
            placeholder="验证码"
            icon="clear"
            @click-icon="verification = ''"
            required
          >
            <van-button v-if="buttonEable" slot="button" size="small" type="primary" @click="sendVerification">发送验证码</van-button>
            <van-button v-if="!buttonEable" disabled slot="button" size="small" type="primary">重发({{this.time}}s)</van-button>
          </van-field>
        </van-cell>

        <van-cell>
          <van-field
            v-model="resetPassword"
            type="password"
            label="重置密码"
            placeholder="请输入密码"
            icon="clear"
            @click-icon="resetPassword = ''"
            required
          />
        </van-cell>
        <van-cell>
          <van-field
            v-model="okPassword"
            type="password"
            label="确认密码"
            placeholder="请再次输入密码"
            icon="clear"
            @click-icon="okPassword = ''"
            required
          />
        </van-cell>
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
  import CrossLine from "@/components/base/cross-line/cross-line"
  import { Toast } from 'vant';
  import { Dialog } from 'vant';
  import md5 from 'js-md5';
  export default {
    components: {
      CrossLine,
    },
    data () {
      return {
        userLoginDto:{
          userName:'',
          loginPassword:""
        },
        show:false,
        resetPassword:"",
        okPassword:"",
        telephone:"",
        verification:"",
        userName:"",
        resetDto:{},
        buttonEable:true,
        time:0
      }
    },
    methods:{
      sendVerification(){
        if (this.userName==''){
          Toast("请输入用户名");
          return;
        }
        if (this.telephone==''){
          Toast("请输入手机号");
          return;
        }

        var that = this;
        this.$axios.put(this.global.ip+"/user/sendVerification/"+this.telephone+"/"+this.userName)
          .then(function (result) {
            if (result.data.status!=false){
              Toast("发送成功");
            } else {
              Toast(result.data.message);
            }
          })
          .catch(function (error) {
            console.log(error)
          });

        that.buttonEable = false;
        that.time = 60;
        var timer = setInterval(function () {
          that.time--;
          if (that.time<=0) {
            that.buttonEable = true;
            clearInterval(timer)
          }
        }, 1000);
      },
      beforeClose(action, done){
        if (action === 'confirm') {
          if(this.userName==''){
            Toast("请输入用户名")
            done();
            return;
          }
          if(this.telephone==''){
            Toast("请输入手机号")
            done();
            return;
          }
          if(this.verification==''){
            Toast("请输入验证码")
            done();
            return;
          }
          if(this.resetPassword==''){
            Toast("请输入重置的密码")
            done();
            return;
          }

          if (this.resetPassword==this.okPassword) {
            this.resetDto.userName = this.userName;
            this.resetDto.mobileCode = this.verification;
            this.resetDto.resetPassword = md5(this.resetPassword);
            var that = this;
            this.$axios.put(this.global.ip+"/user/resetPassword",this.resetDto)
              .then(function (result) {
                if (result.data.status!=false){
                  Toast("密码重置成功！");
                  that.$router.push({path:'/login'});
                } else {
                  Toast(result.data.message);
                }
              })
              .catch(function (error) {
                console.log(error)
              });

            this.show = false
            done();
          }else {
            Toast("两次密码输入不一致！")
            done();
          }
        } else {
          done();
        }
      },
      toLogin(){
        if (this.userLoginDto.userName==''){
          Toast("用户名不能为空！")
          return;
        }
        if (this.userLoginDto.loginPassword==''){
          Toast("请输入密码！")
          return;
        }

        var storage = window.sessionStorage;
        this.userLoginDto.loginPassword = md5(this.userLoginDto.loginPassword)
        var that = this;
        this.$axios.put(this.global.ip+"/user/login",this.userLoginDto)
          .then(function (loginResult) {
            if (loginResult.data.status==false){
              Toast(loginResult.data.message);
              that.userLoginDto.loginPassword=""
            } else {
              var userInfo = JSON.stringify(loginResult.data.data);
              storage.setItem("session",userInfo);
              that.$router.push({path:'/mine'});
              Toast("登录成功");
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      },
      onClickLeft(){
        this.$router.push({path:"/mine"})
      }
    }
  }
</script>

<style scoped>
  .login{width:100%;height:100%;background:url(../../../components/mine/login/img/login-bg.png) no-repeat;background-size:cover;position:fixed;}
  .welcome{width:100%;margin:25% 0;}
  .welcome img{width:100%;}
  .login-inp{margin:0 30px 15px 30px;border:1px solid #fff;border-radius:25px;}
  .login-inp label{width:4em;text-align:center;display:inline-block;color:#fff;}
  .login-inp input{line-height:40px;color:#fff;background-color:transparent;border:none;outline: none;}
  .login-inp a{display:block;width:100%;text-align:center;line-height:40px;color:#fff;font-size:16px;letter-spacing:5px;}
  .login-txt{text-align:center;color:#fff;}
  .login-txt a{color:#fff;padding:0 5px;}
</style>
