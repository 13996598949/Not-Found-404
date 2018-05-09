<template>
  <div>
    <van-nav-bar left-arrow @click-left="onClickLeft" title="出售-发布"/>
    <cross-line></cross-line>
    <div>
      <van-cell-group>
        <van-field
          v-model="title"
          icon="clear"
          placeholder="标题"
          required
          @click-icon="title = ''"
        />

        <van-field
          v-model="desc"
          type="textarea"
          placeholder="描述"
          rows="1"
          autosize
          class="desc"
        />

        <van-cell class="upload">
          <p>上传图片</p>
          <van-uploader :after-read="onRead">
            <img id="picture" :src="'http://127.0.0.1:8081/'+this.saleProductDto.saleProductPicture" style="width: 40px;height: 40px"/>
          </van-uploader>
        </van-cell>

        <van-cell title="价格" is-link :value="this.saleProductDto.saleProductPrice" @click="price_show = true"/>
        <van-dialog v-model="price_show"
                    show-cancel-button
                    :before-close="price_beforeClose">
          <van-field
            v-model="price"
            label="价格"
            placeholder="请输入价格"
          >
          </van-field>
        </van-dialog>


        <van-cell title="分类" is-link v-if="this.saleProductDto.type==0" value="消费级" @click="type_show = true"/>
        <van-cell title="分类" is-link v-if="this.saleProductDto.type==1" value="专业级" @click="type_show = true"/>
        <van-dialog v-model="type_show"
                    show-cancel-button
                    :before-close="type_beforeClose">
          <van-radio-group v-model="type">
            <van-radio name="0">消费级</van-radio>
            <van-radio name="1">专业级</van-radio>
          </van-radio-group>
        </van-dialog>
      </van-cell-group>
      <center><van-button class="vanButton" bottom-action @click="saveButton">确定发布</van-button></center>
    </div>
  </div>
</template>

<script>
  import CrossLine from "@/components/base/cross-line/cross-line"
  import { Toast } from 'vant';
  export default {
    components: {
      CrossLine
    },
    data () {
      return {
        title: "",
        desc: "",
        price_show: false,
        type_show: false,
        price: "",
        picture:"",
        type: "0",
        userInfo:{},
        saleProductDto:{}
      }
    },
    methods: {
      saveButton(){
        this.saleProductDto.saleProductName = this.title;
        this.saleProductDto.saleProductDescribe = this.desc;

        var that = this;
        this.$axios.put("http://127.0.0.1:8081/sale/editSaleInfo/"+this.saleProductDto.id,this.saleProductDto)
          .then(function (result) {
            if (result.data.status != false) {
              let form = new FormData();
              form.append("multipartFile",that.picture);
              that.$axios.put("http://127.0.0.1:8081/sale/insertSaleInfoPicture/"+that.saleProductDto.id,form,{headers:{'Content-Type':'multipart/form-data'}})
                .then(function (result) {
                  if (result.data.status != false) {
                    Toast('修改成功');
                    that.$router.push({path:'/myPublish'})
                  }else {
                    Toast("商品图片上传失败");
                  }
                })
                .catch(function (error) {
                  console.log(error)
                });
            }else {
              Toast(result.data.message);
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      },
      price_beforeClose(action,done) {
        if (action === 'confirm') {
          this.saleProductDto.saleProductPrice = this.price;
          setTimeout(done, 1000);
        } else {
          done();
        }
      },
      type_beforeClose(action,done){
        if (action === 'confirm') {
          this.saleProductDto.type = this.type;
          setTimeout(done, 1000);
        } else {
          done();
        }
      },
      onClickLeft(){
        this.$router.push({path:'/myPublish'})
      },
      onRead(file) {
        var reader = new FileReader();
        reader.onload = function (e) {
          var img = document.getElementById("picture");
          img.src = e.target.result;
        }
        reader.readAsDataURL(file.file);
        this.picture = file.file;
      }
    },
    created(){
      var storage = window.sessionStorage;
      var userInfo = JSON.parse(storage.getItem("session"));
      this.userInfo = userInfo;

      // 取到路由带过来的参数
      let routerParams = this.$route.query.data;
      var that = this;
      this.$axios.get("http://127.0.0.1:8081/sale/getSaleDetailInfo/"+routerParams+"/"+this.userInfo.id)
        .then(function (RentResult) {
          if (RentResult.data.status != false) {
            that.saleProductDto = RentResult.data.data;
            that.title = that.saleProductDto.saleProductName;
            that.desc = that.saleProductDto.saleProductDescribe;
            that.picture = that.saleProductDto.saleProductPicture;
          }
        })
        .catch(function (error) {
          console.log(error)
        });
    }
  }
</script>

<style scoped>
  .desc{
    min-height: 100px;
  }
  .upload{
    padding-top: 10px;
    height: 100px;
  }
  .van-radio{
    padding-left: 10px;
    padding-top: 10px;
    height: 30px;
  }
  .vanButton{
    background-color: #44BB00;
    width: 75%;
    margin-top: 100px;
  }
</style>
