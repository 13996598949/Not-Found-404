<template>
  <div>
    <div class="types-item" @click="toRecommend">
      <img src="../../index/img/types/recommend.png" >
      <span>推荐</span>
    </div>
    <div class="types-item" @click="toNew">
      <img src="../../index/img/types/new.png" >
      <span>新品</span>
    </div>
    <div class="types-item" @click="toConsumer">
      <img src="../../index/img/types/buy.png" >
      <span>消费级</span>
    </div>
    <div class="types-item" @click="toProfessional">
      <img src="../../index/img/types/uav.png" >
      <span>专业级</span>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {}
  },
  methods: {
    toProfessional(){
      this.$router.push("/professional")
    },
    toConsumer(){
      this.$router.push("/consumer")
    },
    toNew(){
      this.$router.push("/newProduct")
    },
    toRecommend(){
      this.$router.push("/recommend")
    }
  },
  created () {},
}
</script>

<style scoped>
.types-item {
  float: left;
  display: inline-block;
  width: 25%;
  height: 50px;
  padding-top: 20px;
}
.types-item img {
  display: block;
	width: 30px;
  height: 30px;
	margin: 0 auto 12px;
}
.types-item span {
	display: block;
	font-size: 10px;
	line-height: 14px;
	text-align: center;
	color: #2f2f2f;
}

</style>
