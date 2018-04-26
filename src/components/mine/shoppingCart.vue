<template>
  <div class="wrapper">
    <div class="hedaer">购物车</div>
    <div style="width: 100%;height: 50px"></div>
    <div class="content" v-for="(item,index) in list" :key="index">
      <div class="content-check" @click="select(index)" :class="[item.checked? 'active' : '']">
      </div>
      <van-card
        :title="item.title"
        :desc="item.desc"
        :num="item.num"
        :price="item.price"
        class="content-card"
      />
    </div>
    <div style="width: 100%;height: 50px"></div>
    <van-submit-bar
      :price="price"
      button-text="提交订单"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        checked:false,
        price:10000,
        list: [
          {price: 1, title: '标题1', desc: '描述1', num: 1,checked:false},
          {price: 2, title: '标题2', desc: '描述2', num: 2,checked:false},
          {price: 2, title: '标题2', desc: '描述2', num: 2,checked:false},
          {price: 2, title: '标题2', desc: '描述2', num: 2,checked:false},
          {price: 2, title: '标题2', desc: '描述2', num: 2,checked:false},
          {price: 2, title: '标题2', desc: '描述2', num: 2,checked:false},
          {price: 2, title: '标题2', desc: '描述2', num: 2,checked:false},
        ]
      }
    },
    methods:{
      // 选择
      select (index) {
        if(this.list[index].checked){
          this.$set(this.list[index],'checked',false)
        } else {
          this.$set(this.list[index],'checked',true)
        }
      },
      onSubmit () {

      }
    }
  }
</script>

<style scoped>
  .wrapper {
    display: flex;
    height: 100%;
    flex-direction: column;
  }
  .hedaer {
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: white;
  }
  .content{
    display: flex;
    align-items: center;
  }
  .content:last-of-type{
    margin-bottom: 50px;
  }
  .content-check{
    width: 20px;
    height: 20px;
    border: 1px solid gray;
    border-radius: 50%;
    margin-left: 5px;
  }
  .active{
    background: #56bb38;
  }
  .content-card{
    margin-left: 10px;
    flex: 1;
  }
</style>
