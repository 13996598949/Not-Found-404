<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div>
      <van-nav-bar left-arrow @click-left="onClickLeft" title="我收藏的"/>
      <cross-line></cross-line>

      <div class="seller-list-item" v-for="item in publishData" :item= "item" :key="item">
        <div class="left">
          <img :src="item.picture">
        </div>

        <div class="content">
          <div class="name">
            {{item.name}}
          </div>

          <div class="mid">
            <span class="describe">{{item.describe}}</span>
          </div>

          <div>
            <span class="price fl"><b>￥{{item.price}}</b></span>
            <div class="fr">
              <van-button size="small" @click="toDeleteMyPublish(item.id)">取消收藏</van-button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </van-pull-refresh>
</template>

<script>
  import CrossLine from "@/components/base/cross-line/cross-line"
  export default {
    components: {
      CrossLine
    },
    data () {
      return {
        isLoading: false,
        publishData:[
          {
            id: '1',
            name: '御Mavic Pro铂金版',
            describe: '可折叠4K航拍无人机',
            price: 6899,
            picture: require('../../../assets/project/UAV1.jpg')
          },
          {
            id: '2',
            name: '御Mavic Pro铂金版',
            describe: '可折叠4K航拍无人机',
            price: 6899,
            picture: require('../../../assets/project/UAV2.jpg')
          }
        ]
      }
    },
    props: {
      item:{
        type:Object,
        default:{}
      }
    },
    methods:{
      toDeleteMyPublish(id){
        this.$toast('删除'+id);
      },
      toEditMyPublish(id){
        this.$toast('编辑'+id);
      },
      onClickLeft(){
        this.$router.go(-1)
      },
      onRefresh() {
        setTimeout(() => {
          var that = this;
          this.$axios.get("http://127.0.0.1:8081/")
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
    }
  }
</script>

<style scoped>
  .user{

  }
  .user img{
    width: 25px;
    height: 25px;
  }
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

  .content .name img{
    width: 25px;
    height: 25px;
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
  .down img{
    background-color: #F2FCFC;
    width: 15px;
    height: 15px;
  }
  .describe{
    font-size: 12px;
    color: slategray;
  }
  .price{
    font-size: 15px;
    color: red;
  }
</style>
