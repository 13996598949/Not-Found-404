<template>
  <div>
      <Search></Search>
      <div class="nearby">
        <div class="title-bar">
          <span>热门出售</span>
        </div>
        <shop-list-item v-for="item in shopList" :item= "item" :key="item"></shop-list-item>
        <div class="bottomFix"></div>
      </div>
  </div>
</template>

<script>
  import Search from "@/components/base/search/search"
  import shopListItem from '@/components/base/shop-list-item/shop-list-item'
export default {
  components: {
    Search,
    shopListItem
  },
  data () {
    return {
      shopList: [
        {
          "id": 1000,//id
          "credit":1,//1代表信用优秀、2代表信用极好、3代表信用良好
          "name": " 御 Mavic Air",//商品名
          "describe": "便携可折叠4K无人机 高清航拍",//商品描述
          "pic_url": require("../../assets/project/UAV1.jpg"),//图片地址
          "price": 4999,//价格
        },
        {
          "id": 1001,//id
          "credit":2,//1代表信用优秀、2代表信用极好、3代表信用良好
          "name": " 精灵 Phantom 4 Pro",//商品名
          "describe": "智能航拍无人机 4向避障",//商品描述
          "pic_url": require("../../assets/project/UAV2.jpg"),//图片地址
          "price": 3299,//价格
        },
        {
          "id": 1002,//id
          "credit":3,//1代表信用优秀、2代表信用极好、3代表信用良好
          "name": " 晓 Spark ",//商品名
          "describe": "掌上智能无人机 高清航拍 自拍神器",//商品描述
          "pic_url": require("../../assets/project/UAV3.jpg"),//图片地址
          "price": 9999,//价格
        },
        {
          "id": 1000,//id
          "credit":1,//1代表信用优秀、2代表信用极好、3代表信用良好
          "name": " 御 Mavic Air",//商品名
          "describe": "便携可折叠4K无人机 高清航拍",//商品描述
          "pic_url": require("../../assets/project/UAV1.jpg"),//图片地址
          "price": 4999,//价格
        },
        {
          "id": 1001,//id
          "credit":2,//1代表信用优秀、2代表信用极好、3代表信用良好
          "name": " 精灵 Phantom 4 Pro",//商品名
          "describe": "智能航拍无人机 4向避障",//商品描述
          "pic_url": require("../../assets/project/UAV2.jpg"),//图片地址
          "price": 3299,//价格
        },
        {
          "id": 1002,//id
          "credit":3,//1代表信用优秀、2代表信用极好、3代表信用良好
          "name": " 晓 Spark ",//商品名
          "describe": "掌上智能无人机 高清航拍 自拍神器",//商品描述
          "pic_url": require("../../assets/project/UAV3.jpg"),//图片地址
          "price": 9999,//价格
        },
        {
          "id": 1000,//id
          "credit":1,//1代表信用优秀、2代表信用极好、3代表信用良好
          "name": " 御 Mavic Air",//商品名
          "describe": "便携可折叠4K无人机 高清航拍",//商品描述
          "pic_url": require("../../assets/project/UAV1.jpg"),//图片地址
          "price": 4999,//价格
        },
        {
          "id": 1001,//id
          "credit":2,//1代表信用优秀、2代表信用极好、3代表信用良好
          "name": " 精灵 Phantom 4 Pro",//商品名
          "describe": "智能航拍无人机 4向避障",//商品描述
          "pic_url": require("../../assets/project/UAV2.jpg"),//图片地址
          "price": 3299,//价格
        },
        {
          "id": 1002,//id
          "credit":3,//1代表信用优秀、2代表信用极好、3代表信用良好
          "name": " 晓 Spark ",//商品名
          "describe": "掌上智能无人机 高清航拍 自拍神器",//商品描述
          "pic_url": require("../../assets/project/UAV3.jpg"),//图片地址
          "price": 9999,//价格
        }
      ]
    }
  },
  props: {},
  watch: {},
  methods: {},
  filters: {},
  computed: {},
  created () {},
  mounted () {},
  destroyed () {}
}
</script>

<style scoped>
div {
  height: 100%;
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
