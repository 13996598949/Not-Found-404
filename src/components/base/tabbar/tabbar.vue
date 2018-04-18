<template>
  <ul class="tab-bar">
    <router-link tag="li" to="/index"><i class="icon-index"></i><span>首页</span></router-link>
    <router-link tag="li" to="/rent"><i class="icon-rent"></i><span>租赁区</span></router-link>
    <router-link tag="li" to="/sale"><i class="icon-sale"></i><span>销售区</span></router-link>
    <router-link tag="li" to="/mine"><i class="icon-mine"></i><span>我的</span></router-link>
  </ul>
</template>

<script>
export default {
  components: {},
  data(){
    return {}
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
</style>
