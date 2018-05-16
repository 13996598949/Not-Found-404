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
      editBuyPassword(oldPassword,newPassword,okPassword){
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
          this.$toast("密码输入不一致")
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
