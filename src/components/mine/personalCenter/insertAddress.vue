<template>
  <div>
    <van-nav-bar left-arrow @click-left="onClickLeft" title="新增收货地址"/>

    <cross-line></cross-line>

    <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      show-search-result
      :search-result="searchResult"
      @save="onSave"
      @change-detail="onChangeDetail"
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
        areaList,
        searchResult: []
      }
    },
    methods:{
      onSave() {
        Toast('save');
      },
      onChangeDetail(val) {
        if (val) {
          this.searchResult = [{
            name: '黄龙万科中心',
            address: '杭州市西湖区'
          }];
        } else {
          this.searchResult = [];
        }
      },
      onClickLeft(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>

</style>
