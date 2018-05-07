<template>
  <div>
    <van-nav-bar left-arrow @click-left="onClickLeft" title="收货地址列表"/>

    <cross-line></cross-line>

    <van-address-list
      :list="list"
      @add="onAdd"
      @edit="onEdit"
    />

  </div>
</template>

<script>
  import crossLine from '@/components/base/cross-line/cross-line';
  import { Toast } from 'vant';

  export default {
    components: {crossLine},
    data () {
      return {
        list: [],
        addressList:{}
      }
    },
    methods:{
      onClickLeft(){
        this.$router.push({path:'/person'})
      },
      onAdd() {
        this.$router.push({path:'/insertAddressList'})
      },
      onEdit(item, index) {
        var that = this;
        this.$axios.get("http://127.0.0.1:8081/user/getAddressById/"+item.id)
          .then(function (result) {
            if (result.data.status != false) {
              that.addressList = result.data.data;
              that.$router.push({
                path:'editAddressList',
                query: {
                  data: that.addressList
                }
              })
            }else {
              Toast(result.data.message);
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      }
    },
    created(){
      var storage = window.sessionStorage;
      var userInfo = JSON.parse(storage.getItem("session"));

      var that = this;
      this.$axios.get("http://127.0.0.1:8081/user/getAddressList/"+userInfo.id)
        .then(function (result) {
          if (result.data.status != false) {
            that.list = result.data.data
          }else {
            Toast(result.data.message);
          }
        })
        .catch(function (error) {
          console.log(error)
        });
    }
  }
</script>

<style scoped>

</style>
