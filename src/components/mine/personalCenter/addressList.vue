<template>
  <div>
    <van-nav-bar left-arrow @click-left="onClickLeft" title="收货地址列表"/>

    <cross-line></cross-line>

    <van-address-list v-if="this.flag=='rent'||this.flag=='sale'"
      v-model="list.id"
      :list="list"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    />

    <van-address-list v-if="this.flag=='person'"
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
        addressList:{},
        flag:""
      }
    },
    methods:{
      onClickLeft(){
        this.$router.go(-1)
      },
      onSelect(item){
        if (this.flag=='rent') {
          this.$router.push({
            path: 'rentToBuy',
            query: {
              data: item
            }
          })
        }else if (this.flag=='sale'){
          this.$router.push({
            path: 'saleToBuy',
            query: {
              data: item
            }
          })
        }
      },
      onAdd() {
        this.$router.push({path:'/insertAddressList'})
      },
      onEdit(item) {
        var that = this;
        this.$axios.get(this.global.ip+"/user/getAddressById/"+item.id)
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

      // 取到路由带过来的参数
      let routerParams = this.$route.query.data;
      this.flag = routerParams

      var that = this;
      this.$axios.get(this.global.ip+"/user/getAddressList/"+userInfo.id)
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
