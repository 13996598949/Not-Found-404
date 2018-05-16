<template>
  <div>
    <van-nav-bar left-arrow @click-left="onClickLeft" title="新增收货地址"/>

    <cross-line></cross-line>
    <van-cell-group>
      <van-field
        v-model="receiveName"
        label="收货人"
        type="text"
        icon="clear"
        placeholder="姓名"
        @click-icon="receiveName = ''"
        required
      />

      <van-field
        v-model="telephone"
        type="tel"
        icon="clear"
        label="联系方式"
        placeholder="手机号"
        @click-icon="telephone = ''"
        required
      />

      <van-cell title="收货地区" @click="toShow" required class="van-cell van-cell--clickable van-hairline van-address-edit__area">
          <span v-if="this.province==''">选择省份 选择城市 选择地区</span>
        <span v-if="this.province!=''">{{this.province}} {{this.city}} {{this.county}}</span>
      </van-cell>
      <van-popup v-model="show" position="bottom">
        <van-area :area-list="areaList" @confirm="confirm"/>
      </van-popup>

      <van-field
        v-model="district_detail"
        type="text"
        icon="clear"
        label="详细地址"
        placeholder="如街道、楼层、门牌号等"
        @click-icon="district_detail = ''"
        required
      />

      <van-field
        v-model="postal_code"
        type="number"
        icon="clear"
        label="邮政编码"
        placeholder="邮政编码（选填）"
        @click-icon="postal_code = ''"
      />
    </van-cell-group>

    <center><van-button class="vanButton" bottom-action @click="onSave">添加</van-button></center>

  </div>
</template>

<script>
  import crossLine from '@/components/base/cross-line/cross-line';
  import { Toast } from 'vant';
  export default {
    components: {crossLine},
    data () {
      return {
        areaList:{},
        province:"",
        city:"",
        county:"",
        receiveName:"",
        telephone:"",
        district_detail:"",
        postal_code:"",
        show:false,
        userInfo:{},
        addressDto:{}
      }
    },
    methods:{
      confirm(val){
        this.province = val["0"].name;
        this.city = val["1"].name;
        this.county = val["2"].name;
        this.show=false
      },
      toShow(){
        this.show=true;
      },
      onSave() {
        this.addressDto.receiveName = this.receiveName;
        this.addressDto.telephone = this.telephone;
        this.addressDto.province = this.province;
        this.addressDto.city = this.city;
        this.addressDto.county = this.county;
        this.addressDto.districtDetail = this.district_detail;
        this.addressDto.postalCode = this.postal_code;

        var that = this;
        this.$axios.post(this.global.ip+"/user/insertAddress/"+this.userInfo.id,this.addressDto)
          .then(function (result) {
            if (result.data.status != false) {
              Toast('添加成功！');
              that.$router.go(-1)
            }else {
              Toast(result.data.message);
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      },

      onClickLeft(){
        this.$router.go(-1)
      }
    },
    created(){
      var storage = window.sessionStorage;
      var userInfo = JSON.parse(storage.getItem("session"));
      this.userInfo = userInfo;

      this.$axios.get('/api/address').then(response => {
        this.areaList = response.data.data
      }, response => {
        console.log('数据加载失败')
      })
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
