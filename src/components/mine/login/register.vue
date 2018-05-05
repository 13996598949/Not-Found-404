<template>
  <div class="login">
    <van-nav-bar left-arrow @click-left="onClickLeft" title="注册"/>
    <cross-line></cross-line>
      <div class="login-form">
        <div class="register">欢迎注册</div>
        <div class="login-inp"><label style="padding-left: 5px">用户名</label><input style="padding-left: 5px" type="text" v-model="userDto.userName"/></div>
        <div class="login-inp"><label style="padding-left: 5px">登录密码</label><input style="padding-left: 5px" type="password" v-model="userDto.loginPassword"/></div>
        <div class="login-inp"><label style="padding-left: 5px">交易密码</label><input style="padding-left: 5px" type="password" v-model="userDto.buyPassword"/></div>
        <div class="login-inp"><label style="padding-left: 5px">姓名</label><input style="padding-left: 5px" type="text" v-model="userDto.personName"/></div>
        <div class="login-inp"><label style="padding-left: 5px">邮箱</label><input style="padding-left: 5px" type="text" v-model="userDto.mail"/></div>
        <div class="login-inp"><label style="padding-left: 5px">手机号</label><input style="padding-left: 5px" type="text" v-model="userDto.telephone"/></div>
        <div class="login-inp" @click="toRegister"><a>立即注册</a></div>
      </div>
    <div class="login-txt"><router-link to="/login">已有账号？请点击登录</router-link></div>
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
        userDto:{
          userName:"",
          loginPassword:"",
          buyPassword:"",
          personName:"",
          mail:"",
          telephone:""
        }
      }
    },
    methods:{
      toRegister(){
        var that = this;
        this.$axios.post("http://127.0.0.1:8081/user/register",this.userDto)
          .then(function (registerResult) {
            if (registerResult.data.status==false){
              alert(registerResult.data.message);
            } else {
              that.$router.push({path:'/login'})
            }
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
  .register{color: #FCFDFD;text-align: center;font-size: 40px;margin:10% 0;}
  .login{width:100%;height:100%;background:url(../../../components/mine/login/img/login-bg.png) no-repeat;background-size:cover;position:fixed;}
  .welcome img{width:100%;}
  .login-inp{margin:0 30px 15px 30px;border:1px solid #fff;border-radius:25px;}
  .login-inp label{width:4em;text-align:center;display:inline-block;color:#fff;}
  .login-inp input{line-height:40px;color:#fff;background-color:transparent;border:none;outline: none;}
  .login-inp a{display:block;width:100%;text-align:center;line-height:40px;color:#fff;font-size:16px;letter-spacing:5px;}
  .login-txt{text-align:center;color:#fff;}
  .login-txt a{color:#fff;padding:0 5px;}
</style>
