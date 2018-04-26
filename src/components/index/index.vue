<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
  <div class="index">
    <div class="slider">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="item in swipeData" :key="item.pic">
          <img :src="item.pic">
        </van-swipe-item>
      </van-swipe>
    </div>
    <cross-line></cross-line>
    <div class="index2">
      <img src="./img/swipe/index2.jpg"/>
    </div>
    <cross-line></cross-line>
    <div class="types">
      <types-item ></types-item>
    </div>

    <!-- 横线分隔条 -->
    <cross-line></cross-line>

    <div class="nearby">
      <div class="title-bar">
        <span>精品租恁</span>
      </div>
        <router-link to="/rentDetailInfo"><rent-list-item v-for="item in RentData" :item= "item" :key="item"></rent-list-item></router-link>
      <div class="bottomFix"></div>

      <div class="title-bar">
        <span>热门出售</span>
      </div>
      <sale-list-item v-for="item in SaleData" :item= "item" :key="item"></sale-list-item>
      <div class="bottomFix"></div>
    </div>

  </div>
  </van-pull-refresh>
</template>

<script>
  import typesItem from '@/components/base/types-item/types-item'
  import rentListItem from '@/components/base/shop-list-item/rent-list-item'
  import saleListItem from '@/components/base/shop-list-item/sale-list-item'
  import crossLine from '@/components/base/cross-line/cross-line'

  export default {
  components: {
    typesItem,
    rentListItem,
    saleListItem,
    crossLine
  },
  data () {
    return {
      isLoading: false,
      swipeData: [
        {pic: require('./img/swipe/1.jpg')},
        {pic: require('./img/swipe/2.jpg')},
        {pic: require('./img/swipe/3.jpg')},
        {pic: require('./img/swipe/4.jpg')}
      ],
      types:[
        {
          icon: require('./img/types/hot.png'),
          title: '热门'
        },
        {
          icon: require('./img/types/recommend.png'),
          title: '推荐'
        },
        {
          icon: require('./img/types/new.png'),
          title: 'UAV新品'
        },
        {
          icon: require('./img/types/uav.png'),
          title: '无人机'
        }
      ],
      RentData: [],
      SaleData: []
    }
  },
  props: {},
  watch: {},
  methods: {
    onRefresh() {
      setTimeout(() => {
        var that = this;
        this.$axios.get("http://127.0.0.1:8081/index/getRentInfo")
          .then(function (RentResult) {
            that.RentData = RentResult.data.data;
          })
          .catch(function (error) {
            console.log(error)
          });
        this.$axios.get("http://127.0.0.1:8081/index/getSaleInfo")
          .then(function (SaleResult) {
            that.SaleData = SaleResult.data.data;
          })
          .catch(function (error) {
            console.log(error)
          })
        this.$toast('刷新成功');
        this.isLoading = false;
      }, 500);
    }
  },
  filters: {},
  computed: {},
  created () {
    var that = this;
    this.$axios.get("http://127.0.0.1:8081/index/getRentInfo")
      .then(function (RentResult) {
        that.RentData = RentResult.data.data;
      })
      .catch(function (error) {
        console.log(error)
      });
    this.$axios.get("http://127.0.0.1:8081/index/getSaleInfo")
      .then(function (SaleResult) {
        that.SaleData = SaleResult.data.data;
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  mounted () {},
  destroyed () {}
}
</script>

<style scoped>
  .index {
    height: 100%;
  }
  .index2{
    margin-top: 2px;
  }
  .index2 img{
    width: 100%;
    height: 100%;
  }
  .slider{
    height: 135px;
    font-size: 30px;
    text-align: center;
    overflow: hidden;
    margin-top: 2px;
  }
  .slider img {
    width: 100%;
  }
  .types {
    overflow: hidden;
    padding-bottom: 20px;
    background-color: #fff;
    margin-top: 2px;
  }
  .nearby {

  }

  .bottomFix {
    height: 50px;
    background-color: transparent;
  }

  .title-bar {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 20px;
  }
  .title-bar span {
    display: inline-block;
    position: relative;
    font-weight: bold;
    color: #333;
  }
  .title-bar span:before {
    content: '';
    position: absolute;
    top: 20px;
    left: -45px;
    width: 30px;
    border-top: 1px solid #333;
    transform: scaleY(0.5);
  }
  .title-bar span:after {
    content: '';
    position: absolute;
    top: 20px;
    right: -43px;
    width: 30px;
    border-top: 1px solid #333;
    transform: scaleY(0.5);
  }
</style>
