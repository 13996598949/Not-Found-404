<template>
  <div id="person">
    <van-nav-bar left-arrow @click-left="onClickLeft" title="个人中心"/>
    <cross-line></cross-line>
    <van-cell-group>

      <van-cell title="昵称" is-link v-model="this.userInfo.alias" @click="alias_show = true"/>
      <van-dialog v-model="alias_show"
                  show-cancel-button
                  :before-close="alias_beforeClose">
        <van-field
          v-model="alias"
          label="昵称"
          placeholder="请输入昵称"
        />
      </van-dialog>


      <!--<van-cell  title="头像" is-link>-->
        <!--<van-uploader :after-read="onRead" multiple>-->
          <!--<img id="header" :src="'http://127.0.0.1:8081/'+this.userInfo.header" width="40px" height="40px"/>-->
        <!--</van-uploader>-->
      <!--</van-cell>-->

      <van-cell title="真实姓名" is-link v-model=this.userInfo.personName @click="show = true"/>
      <van-dialog v-model="show"
                  show-cancel-button
                  :before-close="personName_beforeClose">
        <van-field
          v-model="personName"
          label="真实姓名"
          placeholder="请输入真实姓名"
        />
      </van-dialog>

      <van-cell title="性别" is-link v-model="this.userInfo.sex" @click="sex_show = true"></van-cell>
      <van-actionsheet v-model="sex_show"  :actions="sexList"/>

      <van-cell title="生日" is-link v-model="this.userInfo.birthdayStr" @click="birthday_show = true"/>
      <van-popup v-model="birthday_show" position="bottom">
        <van-datetime-picker
          v-show="birthday_show"
          v-model="birthday"
          @confirm="birthdayConfirm"
          @cancel="birthdayCancel"
          type="date"
          class="birthday"
        />
      </van-popup>

      <van-cell title="手机号" is-link v-model="this.userInfo.telephone" @click="phone_show = true"/>
      <van-dialog v-model="phone_show"
                  show-cancel-button
                  :before-close="tel_beforeClose">
        <van-field
          v-model="telephone"
          label="手机号"
          placeholder="请输入手机号"
        />
      </van-dialog>

      <van-cell title="邮箱" is-link v-model="this.userInfo.mail" @click="mail_show = true"/>
      <van-dialog v-model="mail_show"
                  show-cancel-button
                  :before-close="mail_beforeClose">
        <van-field
          v-model="mail"
          label="邮箱"
          placeholder="请输入邮箱地址"
        />
      </van-dialog>

      <van-cell title="修改登录密码" is-link @click="toEditLoginPassword"/>

      <van-cell title="修改交易密码" is-link @click="toEditBuyPassword"/>

      <van-cell title="收货地址管理" is-link  @click="toAddressList"/>

    </van-cell-group>


    <van-row gutter="1">
      <center><van-col span="12"><van-button class="vanCloseButton" bottom-action @click="cancelLogin">退出登录</van-button></van-col></center>
      <center><van-col span="12"><van-button class="vanButton" bottom-action @click="saveButton">保存</van-button></van-col></center>
    </van-row>

  </div>
</template>

<script>
  import crossLine from '@/components/base/cross-line/cross-line'
  import EditLoginPassword from '@/components/mine/personalCenter/editLoginPassword'
  import dayjs from 'dayjs'
  import { Toast } from 'vant';

  export default {
    components: {
      crossLine,
      EditLoginPassword
    },
    data () {
      return {
        show: false,
        alias_show: false,
        sex_show: false,
        phone_show: false,
        mail_show: false,
        sexList: [
          {
            name: '男',
            callback: this.onSexClick
          },
          {
            name: '女',
            callback: this.onSexClick
          }
        ],
        birthday_show:false,
        currentDate: new Date(),
        userInfo:{},
        result:"",
        alias:"",
        personName:"",
        birthday:"",
        telephone:"",
        mail:"",
      }
    },
    methods:{
      cancelLogin(){
        var storage = window.sessionStorage;
        storage.clear();
        this.$router.push({path:'/mine'})
      },
      toEditBuyPassword () {
        this.$router.push({path:'/editBuyPassword'})
      },
      toEditLoginPassword () {
        this.$router.push({path:'/editLoginPassword'})
      },
      toAddressList () {
        this.$router.push({path:'/addressList'})
      },
      saveButton(){
        var that = this;
        this.$axios.put("http://127.0.0.1:8081/user/editPersonInfo",this.userInfo)
          .then(function (result) {
            that.result = result.data.data;
            if (that.result != null) {
              Toast('保存成功');
              var storage = window.sessionStorage;
              var userInfo = JSON.stringify(that.result);
              storage.setItem("session",userInfo);
              that.$router.push({path:'/mine'})
            }else {
              Toast('保存失败');
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      },
      onSexClick(name){
        this.userInfo.sex = name.name;
        this.sex_show = false
      },
      onClickLeft(){
        this.$router.go(-1)
      },

      birthdayConfirm (val) {
        let newVal = dayjs(val).format('yyyy-MM-dd')
        this.userInfo.birthdayStr = newVal
        this.birthday_show = false
      },
      birthdayCancel () {
        this.birthday_show = false
      },
      alias_beforeClose(action,done) {
        if (action === 'confirm') {
          this.userInfo.alias = this.alias
          setTimeout(done, 1000);
        } else {
          done();
        }
      },
      personName_beforeClose(action,done){
        if (action === 'confirm') {
          this.userInfo.personName = this.personName
          setTimeout(done, 1000);
        } else {
          done();
        }
      },
      tel_beforeClose(action,done){
        if (action === 'confirm') {
          this.userInfo.telephone = this.telephone
          setTimeout(done, 1000);
        } else {
          done();
        }
      },
      mail_beforeClose(action,done){
        if (action === 'confirm') {
          this.userInfo.mail = this.mail
          setTimeout(done, 1000);
        } else {
          done();
        }
      }
    },
    created(){
      var storage = window.sessionStorage;
      var userInfo = JSON.parse(storage.getItem("session"));
      this.userInfo = userInfo;
    }
  }
</script>

<style scoped>
  .vanCloseButton{
    background-color: slategray;
    width: 80%;
    margin-top: 20px;
  }
  .birthday{
    position: fixed;
    z-index: 1;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .vanButton{
    background-color: #44BB00;
    width: 75%;
    margin-top: 20px;
  }
</style>
