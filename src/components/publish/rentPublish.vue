<template>
  <div>
    <van-nav-bar left-arrow @click-left="onClickLeft" title="出租-发布"/>
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
            <img id="picture" src="../../components/publish/img/uploadPicture.png" width="40px" height="40px"/>
          </van-uploader>
        </van-cell>

        <van-cell title="价格" is-link :value="'￥'+this.price+'/天'" @click="price_show = true"/>
        <van-dialog v-model="price_show"
                    show-cancel-button
                    :before-close="price_beforeClose">
          <van-field
            v-model="price"
            label="价格"
            placeholder="请输入价格"
          >
            <van-icon slot="icon">/天</van-icon>
          </van-field>
        </van-dialog>

        <van-cell title="押金" is-link :value="'￥'+this.deposit" @click="deposit_show = true"/>
        <van-dialog v-model="deposit_show"
                    show-cancel-button
                    :before-close="deposit_beforeClose">
          <van-field
            v-model="deposit"
            label="押金"
            placeholder="请输入押金"
          >
          </van-field>
        </van-dialog>


        <van-cell title="分类" is-link v-if="this.type==0" value="消费级" @click="type_show = true"/>
        <van-cell title="分类" is-link v-if="this.type==1" value="专业级" @click="type_show = true"/>
        <van-dialog v-model="type_show"
                    show-cancel-button
                    :before-close="type_beforeClose">
          <van-radio-group v-model="type">
            <van-radio name="0">消费级</van-radio>
            <van-radio name="1">专业级</van-radio>
          </van-radio-group>
        </van-dialog>
      </van-cell-group>
      <center><van-button v-if="isClick" class="vanButton" bottom-action @click="saveButton">确定发布</van-button></center>
      <center><van-button v-if="!isClick" loading class="vanButton" bottom-action>确定发布</van-button></center>
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
      deposit_show:false,
      deposit:"",
      price: "",
      picture:"",
      type: "0",
      userInfo:{},
      rentProductDto:{},
      isClick:true
    }
  },
  methods: {
    saveButton(){
      var space = /^\\s+$/;
      if (this.title==''){
        Toast("标题不能为空")
        return;
      }
      if (this.title.match(/^\s+$/)){
        Toast("标题不能全为空格")
        return;
      }
      if (this.price==''){
        Toast("价格不能为空")
        return;
      }
      if (this.price<0){
        Toast("价格不能为负数")
        return;
      }
      if (this.picture==''){
        Toast("请上传图片")
        return;
      }
      this.rentProductDto.rentProductName = this.title;
      this.rentProductDto.rentProductDescribe = this.desc;
      this.isClick=false;
      var that = this;
      this.$axios.post(this.global.ip+"/rent/insertRentInfo/"+this.userInfo.id,this.rentProductDto)
        .then(function (result) {
          if (result.data.status != false) {
            var id = result.data.data;
            let form = new FormData();
            form.append("multipartFile",that.picture);
            that.$axios.put(that.global.ip+"/rent/insertRentInfoPicture/"+id,form,{headers:{'Content-Type':'multipart/form-data'}})
              .then(function (result) {
                if (result.data.status != false) {
                  Toast('发布成功');
                  that.$router.push({path:'/index'})
                }else {
                  Toast("商品图片上传失败");
                  this.isClick=true;
                }
              })
              .catch(function (error) {
                console.log(error)
                this.isClick=true;
              });
          }else {
            Toast(result.data.message);
            this.isClick=true;
          }
        })
        .catch(function (error) {
          console.log(error)
          this.isClick=true;
        });
    },
    price_beforeClose(action,done) {
      if (action === 'confirm') {
        this.rentProductDto.rentProductPrice = this.price;
        setTimeout(done, 1000);
      } else {
        done();
      }
    },
    type_beforeClose(action,done){
      if (action === 'confirm') {
        this.rentProductDto.type = this.type;
        setTimeout(done, 1000);
      } else {
        done();
      }
    },
    deposit_beforeClose(action,done) {
      if (action === 'confirm') {
        this.rentProductDto.deposit = this.deposit;
        setTimeout(done, 1000);
      } else {
        done();
      }
    },
    onClickLeft(){
      this.$router.push({path:'/index'})
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
