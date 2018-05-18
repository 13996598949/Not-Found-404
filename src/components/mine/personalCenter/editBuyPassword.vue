<template>
  <div>
    <van-nav-bar left-arrow @click-left="onClickLeft" title="修改交易密码"/>
    <van-cell-group>
      <van-field
        v-model="oldPassword"
        label="原密码"
        type="password"
        icon="clear"
        placeholder="请输入原密码"
        @click-icon="oldPassword = ''"
        required
      />

      <van-field
        v-model="newPassword"
        type="password"
        icon="clear"
        label="新密码"
        placeholder="请输入新密码"
        @click-icon="newPassword = ''"
        required
      />

      <van-field
        v-model="okPassword"
        type="password"
        icon="clear"
        label="确认密码"
        placeholder="确认密码"
        @click-icon="okPassword = ''"
        required
      />
    </van-cell-group>

    <center><van-button class="vanButton" bottom-action @click="editBuyPassword(oldPassword,newPassword,okPassword)">修改</van-button></center>
  </div>
</template>

<script>
  import { Toast } from 'vant';
  import md5 from 'js-md5';
  export default {
    components: {},
    data () {
      return {
        oldPassword: "",
        newPassword: "",
        okPassword: "",
        passwordDto:{}
      }
    },
    methods:{
      myValidate(name,data,length,level){
        // 密码正则
        var password = /^(\w){6,20}$/;
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
        if (!password.test(data)&&level==5){
          Toast(name+"只能输入6-20个字母、数字、下划线 ")
          return false;
        }

        return true;
      },
      editBuyPassword(oldPassword,newPassword,okPassword){
        if (!this.myValidate("原密码",oldPassword,6,5)){
          return;
        }
        if (!this.myValidate("新密码",newPassword,6,5)){
          return;
        }

        if (newPassword==okPassword){
          this.passwordDto.oldPassword = md5(oldPassword);
          this.passwordDto.newPassword = md5(newPassword);
          var that = this;
          this.$axios.put(this.global.ip+"/user/editBuyPassword/"+this.userInfo.id,this.passwordDto)
            .then(function (result) {
              if (result.data.status != false) {
                Toast('交易密码修改成功！');
                that.$router.push({path:'/mine'})
              }else {
                Toast(result.data.message);
              }
            })
            .catch(function (error) {
              console.log(error)
            });
        } else {
          Toast("密码输入不一致")
        }
      },
      onClickLeft(){
        this.$router.go(-1)
      },
    },
    created(){
      var storage = window.sessionStorage;
      var userInfo = JSON.parse(storage.getItem("session"));
      this.userInfo = userInfo;
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
    margin-top: 50px;
  }
</style>
