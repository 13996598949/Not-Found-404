<template>
  <ul class="tab-bar">
    <router-link tag="li" to="/index"><i class="icon-index"></i><span>首页</span></router-link>
    <router-link tag="li" to="/rent"><i class="icon-rent"></i><span>租赁区</span></router-link>

    <div style="padding-left: 15px;padding-right: 15px;" @click="toPublish">
      <i class="icon-publish"></i><span style="color: gray">发布</span>
    </div>

    <van-popup v-model="publish_show" position="bottom" style="height: 150px;padding-top: 15px" >
      <div class="rent fl" @click="toRent">
        <img src="../../../components/base/tabbar/resource/rentLight.png"/>
        <p>我要出租</p>
      </div>

      <div class="sale fr" @click="toSale">
        <img src="../../../components/base/tabbar/resource/saleLight.png"/>
        <p>我要出售</p>
      </div>
    </van-popup>

    <router-link tag="li" to="/sale"><i class="icon-sale"></i><span>销售区</span></router-link>
    <router-link tag="li" to="/mine"><i class="icon-mine"></i><span>我的</span></router-link>
  </ul>
</template>

<script>
  import { Toast } from 'vant';
export default {
  components: {},
  data(){
    return {
      publish_show: false,
      userInfo:{}
    }
  },
  props: {},
  watch: {},
  methods: {
    toPublish(){
      if (this.userInfo == null){
        this.$router.push({path:'/login'})
        Toast("请先登录！")
      } else {
        this.publish_show = true;
      }
    },
    toRent(){
      this.$router.push({path:'/rentPublish'})
    },
    toSale(){
      this.$router.push({path:'/salePublish'})
    }
  },
  filters: {},
  computed: {},
  created () {
    var storage = window.sessionStorage;
    var userInfo = JSON.parse(storage.getItem("session"));
    this.userInfo = userInfo;
  },
  mounted () {},
  destroyed () {}
}
</script>

<style>
  .tab-bar {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 49px;
    text-align: center;
    border-top: 1px solid rgb(182, 182, 182);
    background-color: #fcfcfc;
    display: flex;
    flex-direction: row;
  }
  li {
    flex: 1;
    color: #999;
  }
  i {
    display: block;
    width: 25px;
    height: 25px;
    margin: 3px auto;
    /*background: url('./tabbarBg.png') no-repeat;*/
    background-size: 25px auto;
  }
  span {
    display: block;
    font-size: 12px;
  }
  .icon-index {
    background-image: url("resource/index.png");
    background-position: 0 -75px;
  }
  .icon-rent {
    background-image: url("resource/rent.png");
    background-position: 0 -25px;
  }
  .icon-publish {
    background-image: url("resource/publish.png");
    background-position: 0 -25px;
  }
  .icon-sale {
    background-image: url("resource/sale.png");
    background-position: 0 -25px;
  }
  .icon-mine {
    background-image: url("resource/mine.png");
    background-position: 0 -125px;
  }
  .router-link-active {
    color: #333;
  }
  .router-link-active .icon-index {
    background-image: url("resource/indexLight.png");
    background-position: 0 -50px;
  }
  .router-link-active .icon-rent {
    background-image: url("resource/rentLight.png");
    background-position: 0 0px;
  }
  .router-link-active .icon-sale {
    background-image: url("resource/saleLight.png");
    background-position: 0 0px;
  }
  .router-link-active .icon-mine {
    background-image: url("resource/mineLight.png");
    background-position: 0 -100px;
  }
  .rent{
    width: 50%;
    text-align: center;
  }
  .rent img{
    width: 100px;
    height: 100px;
  }
  .sale{
    width: 50%;
    text-align: center;
  }
  .sale img{
    width: 100px;
    height: 100px;
  }
</style>
