<template>
  <div class="seller-list-item" >
    <div class="left" @click="toRentDetail">
      <img :src="'http://127.0.0.1:8081/'+item.rentProductPicture">
    </div>

    <div class="content">
      <div class="name">
        <span class="fl" @click="toRentDetail">{{item.rentProductName}}</span>
        <img v-if="isCollectFlag" v-on:click="collect()"class="fr" src="./collect.png"/>
        <img v-if="!isCollectFlag" v-on:click="collect()"class="fr" src="./collect2.png"/>
      </div>

      <div class="mid">
        <span class="describe">{{ item.rentProductDescribe }}</span>
      </div>

      <div class="down">
        <img class="fl" src="../../../assets/project/credit.png">
        <span class="credit fl" v-if="item.credit==1">信用优秀</span>
        <span class="credit fl" v-if="item.credit==2">信用极好</span>
        <span class="credit fl" v-if="item.credit==3">信用良好</span>
      </div>

      <div>
        <span class="price"><b>￥{{ item.rentProductPrice }}/天</b></span>
      </div>
    </div>
  </div>
</template>

<script>
  import star from '@/components/base/star/star'
export default {
  components: {
    star
  },
  data () {
    return {
      isCollectFlag: true
    }
  },
  props: {
  	item:{
  		type:Object,
  		default:{}
  	}
  },
  watch: {},
  methods: {
    toRentDetail(){
      this.$router.push({
        path:'rentDetailInfo',
        query: {
          data: this.item.id
        }
      })
    },
    collect (){
      this.isCollectFlag=!this.isCollectFlag
    }
  },
  filters: {},
  computed: {
  },
  created () {},
  mounted () {},
  destroyed () {}
}
</script>

<style scoped>
  .seller-list-item {
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
    padding: 12.5px 0 12.5px 0;
    overflow: hidden;
    margin-left:10px;
    border-bottom: solid 1px #eee;
  }
  /*左侧图片*/
  .left {
    position: relative;
    flex: 0 0 86px;
    width: 86px;
  }
  .left span {
    display: inline-block;
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 28px;
    height: 14px;
    line-height: 14px;
    font-size: 12px;
    color: white;
  }
  .left img {
    border:solid 1px #e4e4e4;
    display: block;
    width: 84px;
    height: 63px;
    margin: 0 auto;
  }

  /*右侧内容*/
  .content {
    /*background-color: red;*/
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 15px 0 10px;
  }
  .content .name {
     font-size: 17px;
     color: #333;
     overflow: hidden;
     font-weight: bold;
     overflow: hidden;
   }
  .content .name span{
    font-size: 17px;
    font-weight: bold;
  }

  .content .mid {
    flex: 1;
    margin-top: 7px;
    color: #666;
    font-size: 12px;
  }
  .content img{
    width: 20px;
    height: 20px;
  }
  .mid .star {
    margin-top: 3px;
    width: 70px;
    height: 10px;
  }
  .down {
    flex: 1;
    margin-top: 7px;
    font-size: 13px;
    color: #656565;
  }
  .down img{
    background-color: #F2FCFC;
    width: 15px;
    height: 15px;
  }
  .describe{
    font-size: 12px;
    color: slategray;
  }
  .credit{
    background-color: #F2FCFC;
    color: #30D0CC;
  }
  .price{
    font-size: 15px;
    color: red;
  }
</style>
