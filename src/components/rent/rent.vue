<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh" style="height: 100%">
  <div style="height: 100%">
    <form action="/">
      <van-search
        v-model="value"
        placeholder="请输入商品名称"
        @search="toSearch"
      />
    </form>
    <div class="nearby">
      <div class="title-bar">
        <span>精品租赁</span>
      </div>
        <rent-list-item v-for="item in RentData" :item= "item" :key="item"></rent-list-item>
      <div class="bottomFix"></div>
    </div>
  </div>
  </van-pull-refresh>
</template>

<script>
  import rentListItem from '@/components/base/shop-list-item/rent-list-item'
export default {
  components: {
    rentListItem
  },
  data () {
    return {
      RentData: [],
      isLoading: false,
      userInfo:{},
      value:"",
    }
  },
  props: {},
  watch: {},
  methods: {
    toSearch(){
      var id;
      if (this.userInfo == null){
        id=0;
      } else {
        id=this.userInfo.id
      }
      var that = this;
      this.$axios.get("http://127.0.0.1:8081/rent/getRentAllInfo/"+id,{params:{"rentName":this.value}})
        .then(function (RentResult) {
          that.RentData = RentResult.data.data;
        })
        .catch(function (error) {
          console.log(error)
        });
    },
    onRefresh() {
      var id;
      if (this.userInfo == null){
        id=0;
      } else {
        id=this.userInfo.id
      }
      setTimeout(() => {
        var that = this;
        this.$axios.get("http://127.0.0.1:8081/rent/getRentAllInfo/"+id,{params:{"rentName":this.value}})
          .then(function (RentResult) {
            that.RentData = RentResult.data.data;
          })
          .catch(function (error) {
            console.log(error)
          });
        this.$toast('刷新成功');
        this.isLoading = false;
      }, 500);
    }
  },
  filters: {},
  computed: {},
  created () {
    var storage = window.sessionStorage;
    var userInfo = JSON.parse(storage.getItem("session"));
    this.userInfo = userInfo;

    var id;
    if (this.userInfo == null){
      id=0;
    } else {
      id=this.userInfo.id
    }
    var that = this;
    this.$axios.get("http://127.0.0.1:8081/rent/getRentAllInfo/"+id,{params:{"rentName":this.value}})
      .then(function (RentResult) {
        that.RentData = RentResult.data.data;
      })
      .catch(function (error) {
        console.log(error)
      });
  },
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
