<template>
  <div class="login">
    <van-nav-bar left-arrow @click-left="onClickLeft" title="注册"/>
    <cross-line></cross-line>
      <div class="login-form">
        <div class="register">欢迎注册</div>
        <div class="login-inp"><label style="padding-left: 5px">用户名</label><input style="padding-left: 5px" maxlength="20" minlength="6" type="text" v-model="userDto.userName"/></div>
        <div class="login-inp"><label style="padding-left: 5px">登录密码</label><input style="padding-left: 5px" maxlength="20" minlength="6" type="password" v-model="userDto.loginPassword"/></div>
        <div class="login-inp"><label style="padding-left: 5px">交易密码</label><input style="padding-left: 5px" maxlength="20" minlength="6" type="password" v-model="userDto.buyPassword"/></div>
        <div class="login-inp"><label style="padding-left: 5px">昵称</label><input style="padding-left: 5px" maxlength="20" minlength="3" type="text" v-model="userDto.alias"/></div>
        <div class="login-inp"><label style="padding-left: 5px">姓名</label><input style="padding-left: 5px" maxlength="5" minlength="2" type="text" v-model="userDto.personName"/></div>
        <div class="login-inp"><label style="padding-left: 5px">邮箱</label><input style="padding-left: 5px" maxlength="30" minlength="5" type="text" v-model="userDto.mail"/></div>
        <div class="login-inp"><label style="padding-left: 5px">手机号</label><input style="padding-left: 5px" maxlength="11" minlength="11" type="text" v-model="userDto.telephone"/></div>
        <div class="login-inp" @click="toRegister"><a>立即注册</a></div>
      </div>
    <div class="login-txt"><router-link to="/login">已有账号？请点击登录</router-link></div>
  </div>
</template>

<script>
  import CrossLine from "@/components/base/cross-line/cross-line"
  import md5 from 'js-md5';
  import { Toast } from 'vant';
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
          telephone:"",
          alias:""
        },
      }
    },
    methods:{
      myValidate(name,data,length,level){
        // 账号正则
        var username = /^[a-zA-z]\w{3,15}$/;

        // 密码正则
        var password = /^(\w){6,20}$/;

        // 邮箱正则
        var mail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;

        // 手机号正则
        var telephone = /^1\d{10}$/;

        if (data==''&&level>0){
          Toast(name + "不能为空")
          return false;
        }
        if (data.length<length&&level>0){
          Toast(name+"至少需要"+length+"个字符")
          return false;
        }
        if (data.indexOf(" ") !=-1 &&level>0){
          Toast(name+"不能存在空格")
          return false;
        }
        if (!username.test(data)&&level==2){
          Toast(name+"只能由字母、数字、下划线组成，字母开头")
          return false;
        }

        if (!password.test(data)&&level==5){
          Toast(name+"只能输入6-20个字母、数字、下划线 ")
          return false;
        }

        if (!mail.test((data)) && level==3){
          Toast(name+"请输入正确的邮箱格式")
          return false;
        }

        if (!telephone.test((data)) && level==4){
          Toast(name+"请输入正确的手机号格式")
          return false;
        }

        return true
      },
      toRegister(){
        if (!this.myValidate("用户名",this.userDto.userName,6,2)){
          return;
        }
        if (!this.myValidate("登录密码",this.userDto.loginPassword,6,5)){
          return;
        }
        if(!this.myValidate("交易密码",this.userDto.buyPassword,6,5)){
          return;
        }
        if(!this.myValidate("昵称",this.userDto.alias,3,1)){
          return;
        }
        if (!this.myValidate("姓名",this.userDto.personName,2,1)){
          return;
        }
        if (!this.myValidate("邮箱",this.userDto.mail,5,3)){
          return;
        }
        if (!this.myValidate("手机号",this.userDto.telephone,11,4)){
          return;
        }
        this.userDto.loginPassword = md5(this.userDto.loginPassword)
        this.userDto.buyPassword = md5(this.userDto.buyPassword)
        var that = this;
        this.$axios.post(this.global.ip+"/user/register",this.userDto)
          .then(function (registerResult) {
            if (registerResult.data.status==false){
              Toast(registerResult.data.message);
              that.userDto=""
            } else {
              that.$router.push({path:'/login'})
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      },
      onClickLeft(){
        this.$router.push({path:'/login'})
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
