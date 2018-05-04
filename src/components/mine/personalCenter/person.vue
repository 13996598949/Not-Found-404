<template>
  <div id="person">
    <van-nav-bar left-arrow @click-left="onClickLeft" title="个人中心"/>
    <cross-line></cross-line>
    <van-cell-group>

      <van-cell title="昵称" is-link :value=this.alias @click="alias_show = true"/>
      <van-dialog v-model="alias_show"
                  show-cancel-button
                  :before-close="beforeClose">
        <van-field
          v-model="alias"
          label="昵称"
          placeholder="请输入昵称"
        />
      </van-dialog>


      <van-cell  title="头像" is-link>
        <van-uploader :after-read="onRead">
          <img src="../img/header.png" width="40px" height="40px"/>
        </van-uploader>
      </van-cell>

      <van-cell title="真实姓名" is-link :value=this.personame @click="show = true"/>
      <van-dialog v-model="show"
                  show-cancel-button
                  :before-close="beforeClose">
        <van-field
          v-model="personame"
          label="真实姓名"
          placeholder="请输入真实姓名"
        />
      </van-dialog>

      <van-cell title="性别" is-link :value="sex" @click="sex_show = true"></van-cell>
      <van-actionsheet v-model="sex_show"  :actions="sexList"/>

      <van-cell title="生日" is-link :value="birthday" @click="birthday_show = true"/>
      <van-datetime-picker
        v-show="birthday_show"
        v-model="currentDate"
        @confirm="birthdayConfirm"
        @cancel="birthdayCancel"
        type="date"
        class="birthday"
      />

      <van-cell title="手机号" is-link :value=this.telephone @click="phone_show = true"/>
      <van-dialog v-model="phone_show"
                  show-cancel-button
                  :before-close="beforeClose">
        <van-field
          v-model="telephone"
          label="手机号"
          placeholder="请输入手机号"
        />
      </van-dialog>

      <van-cell title="邮箱" is-link :value=this.mail @click="mail_show = true"/>
      <van-dialog v-model="mail_show"
                  show-cancel-button
                  :before-close="beforeClose">
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

    <center><van-button class="vanButton" bottom-action @click="saveButton">保存</van-button></center>

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
        telephone: "",
        mail: "",
        personame: "",
        alias: "",
        sex: "",
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
        birthday:'',
        currentDate: new Date()
      }
    },
    methods:{
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
        Toast('保存成功');
        this.onClickLeft();
      },
      onSexClick(name){
        this.sex = name.name;
        this.sex_show = false
      },
      onClickLeft(){
        this.$router.go(-1)
      },
      onRead(file) {
        console.log(file)
      },
      birthdayConfirm (val) {
        let newVal = dayjs(val).format('YYYY-MM-DD')
        this.birthday = newVal
        this.birthday_show = false
      },
      birthdayCancel () {
        this.birthday_show = false
      },
      beforeClose(action,done) {
        if (action === 'confirm') {
          setTimeout(done, 1000);
        } else {
          done();
        }
      }
    }
  }
</script>

<style scoped>
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
    margin-top: 250px;
  }
</style>
