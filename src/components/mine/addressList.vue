<template>
  <div>
    <van-nav-bar left-arrow @click-left="onClickLeft" title="收货地址列表"/>

    <cross-line></cross-line>

    <van-address-list
      v-model="chosenAddressId"
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
        chosenAddressId: '1',
        list: [
          {
            id: '1',
            name: '张三',
            tel: '13000000000',
            address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
          },
          {
            id: '2',
            name: '李四',
            tel: '1310000000',
            address: '浙江省杭州市拱墅区莫干山路 50 号'
          }
        ]
      }
    },
    methods:{
      onClickLeft(){
        this.$router.go(-1)
      },
      onAdd() {
        this.$router.push({path:'/insertAddressList'})
        Toast('新增收货地址');
      },
      onEdit(item, index) {
        this.$router.push({path:'/editAddressList'})
        Toast('编辑收货地址:' + index);
      }
    },
    created(){
      console.log("sss")
    }
  }
</script>

<style scoped>

</style>
