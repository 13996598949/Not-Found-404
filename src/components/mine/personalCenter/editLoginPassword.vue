<template>
  <div>
    <van-nav-bar left-arrow @click-left="onClickLeft" title="修改登录密码"/>
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

    <center><van-button class="vanButton" bottom-action @click="editLoginPassword(oldPassword,newPassword,okPassword)">修改</van-button></center>
  </div>
</template>

<script>

  export default {
    components: {},
    data () {
      return {
        oldPassword: "",
        newPassword: "",
        okPassword: ""
      }
    },
    methods:{
      editLoginPassword(oldPassword,newPassword,okPassword){
        if (newPassword==okPassword){

        } else {
          this.$toast("密码输入不一致")
        }
      },
      onClickLeft(){
        this.$router.go(-1)
      },
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
