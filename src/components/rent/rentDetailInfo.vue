<template>
  <div>
    <div class="goods">
      <van-nav-bar left-arrow @click-left="onClickLeft" title="商品详情"/>
      <cross-line></cross-line>
      <img :src="goods.picture" style="width: 100%;height: 100%;">

      <van-cell-group class="goods-cell-group">
        <van-cell>
          <div class="goods-title">{{ goods.name }}</div>
          <div class="goods-describe">{{ goods.describe }}</div>
          <div class="goods-price">{{ formatPrice(goods.price) }}</div>
        </van-cell>

        <div class="box fl">
          <img :src="goods.header" style="width: 50px;height: 50px"/>
          <p style="padding-left: 10px">{{goods.username}}</p>
        </div>
      </van-cell-group>
    </div>

    <cross-line></cross-line>

    <p class="liuyan"><b>留言</b></p>
    <van-cell-group class="goods-cell-group">
      <van-cell>
        <p style="padding-left: 10px">{{goods.username}}:</p>
      </van-cell>
    </van-cell-group>

    <div class="goods">
      <van-goods-action>
        <van-goods-action-mini-btn icon="chat">
          留言
        </van-goods-action-mini-btn>
        <van-goods-action-mini-btn :icon=icon @click="collect">
          收藏
        </van-goods-action-mini-btn>
        <van-goods-action-big-btn primary>
          立即下单
        </van-goods-action-big-btn>
      </van-goods-action>
    </div>

    </div>
</template>

<script>
  import CrossLine from "@/components/base/cross-line/cross-line"
export default {
  components: {
    CrossLine
  },
  data () {
    return {
      icon: "like-o",
      isCollectFlag: false,
      goods: {
        username: "哈哈",
        header: require("../../components/mine/img/header.png"),
        id: '1',
        name: '御Mavic Pro铂金版',
        describe: '可折叠4K航拍无人机',
        price: 6899,
        picture: require('../../assets/project/UAV1.jpg')
      }
    }
  },
  props: {},
  watch: {},
  methods: {
    collect(){
      this.isCollectFlag = !this.isCollectFlag
      if (this.isCollectFlag){
        this.icon = "like"
      } else {
        this.icon = "like-o"
      }
    },
    onClickLeft(){
      this.$router.go(-1)
    },
    formatPrice() {
      return '¥' + (this.goods.price / 100).toFixed(2);
    }
  },
  filters: {},
  computed: {},
  created () {},
  mounted () {},
  destroyed () {}
}
</script>

<style lang="less" scoped>
  .liuyan{
    padding-top: 10px;
    padding-left: 5px;
    font-size: 20px;
    color: gray;
  }
  .box{
    display:flex;
    align-items: center;//子元素垂直居中
    justify-content: center;//子元素水平居中
    padding-top: 10px;
  }
  .box img{
    padding-left: 10px;
  }
.goods {
  padding-bottom: 50px;
  &-title {
    font-size: 16px;
  }
  &-describe{
    font-size: 10px;
    color: gray;
  }
  &-price {
    color: #f44;
  }
  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }
  &-cell-group {
    margin: 15px 0;
    .van-cell__value {
      color: #999;
    }
  }
}
</style>
