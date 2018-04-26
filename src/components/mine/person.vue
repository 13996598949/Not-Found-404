<template>
  <div>
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
          <img src="./img/header.png" width="40px" height="40px"/>
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

      <van-cell title="性别" is-link :value=this.sex @click="sex_show = true"><van-actionsheet v-model="sex_show"  :actions="sexList" :close-on-click-overlay=closeOnClickOverlay /></van-cell>

      <van-cell title="生日" is-link value="1995-10-23" />
      <van-cell title="收货地址管理" is-link value="重庆市" />
    </van-cell-group>
  </div>
</template>

<script>
  import crossLine from '@/components/base/cross-line/cross-line'
  export default {
    components: {crossLine},
    data () {
      return {
        closeOnClickOverlay: true,
        show: false,
        alias_show: false,
        sex_show: false,
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
        ]
      }
    },
    methods:{
      onSexClick(name){
        this.sex = name.name;
      },
      onClickLeft(){
        this.$router.go(-1)
      },
      onRead(file) {
        console.log(file)
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
  .hedaer {
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: white;
  }
</style>
