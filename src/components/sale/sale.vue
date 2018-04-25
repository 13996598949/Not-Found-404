<template>
  <div>
      <Search></Search>
      <div class="nearby">
        <div class="title-bar">
          <span>热门出售</span>
        </div>
        <sale-list-item v-for="item in SaleData" :item= "item" :key="item"></sale-list-item>
        <div class="bottomFix"></div>
      </div>
  </div>
</template>

<script>
  import Search from "@/components/base/search/search"
  import saleListItem from '@/components/base/shop-list-item/sale-list-item'
export default {
  components: {
    Search,
    saleListItem
  },
  data () {
    return {
      SaleData: []
    }
  },
  props: {},
  watch: {},
  methods: {},
  filters: {},
  computed: {},
  created () {
    var that = this;
    this.$axios.get("http://127.0.0.1:8081/sale/getSaleAllInfo")
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
