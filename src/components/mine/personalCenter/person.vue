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

      <!--<van-cell title="生日" is-link v-model="this.userInfo.birthdayStr" @click="birthday_show = true"/>-->
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

      <van-cell title="我的账户" is-link @click="toMyAccount"/>

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
      toMyAccount(){
        this.$router.push({path:'/myAccount'})
      },
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
        this.$router.push({
          path:'addressList',
          query:{
            data:"person"
          }
        })
      },
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
      saveButton(){
        if(!this.myValidate("昵称",this.userInfo.alias,3,1)){
          return;
        }
        if (!this.myValidate("姓名",this.userInfo.personName,2,1)){
          return;
        }
        if (!this.myValidate("邮箱",this.userInfo.mail,5,3)){
          return;
        }
        if (!this.myValidate("手机号",this.userInfo.telephone,11,4)){
          return;
        }

        var that = this;
        this.$axios.put(this.global.ip+"/user/editPersonInfo",this.userInfo)
          .then(function (result) {
            that.result = result.data.data;
            if (result.data.status != false) {
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
        this.$router.push({path:'/mine'})
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
