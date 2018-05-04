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
    <div class="login-txt"><router-link to="/register">立即注册</router-link>|<a href="#">忘记密码？</a></div>
  </div>
</template>

<script>
  import CrossLine from "@/components/base/cross-line/cross-line"
  export default {
    components: {
      CrossLine
    },
    data () {
      return {
        userLoginDto:{
          userName:'',
          loginPassword:""
        }
      }
    },
    methods:{
      toLogin(){
        var that = this;
        this.$axios.put("http://127.0.0.1:8081/user/login",this.userLoginDto)
          .then(function (loginResult) {
            that.$router.push({path:'/'})
          })
          .catch(function (error) {
            console.log(error)
          });
      },
      onClickLeft(){
        this.$router.go(-1)
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
