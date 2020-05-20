<template>
  <div class="contactus">
    <div class="content">
      <div class="text1">联系我们</div>
      <div class="Box">
        <div class="textBox">
          <p>请留下你的联系方式</p>
          <div class="input1">
            <p>姓名  ：</p>
            <input type="text">
          </div>
          <div class="input1">
            <p class="phone">电话号码 ：</p>
            <input type="text">
          </div>
          <div class="textarea">
            <p>备注 ：</p>
            <textarea name="" id="" cols="30" rows="10" placeholder="请输入备注"></textarea>
          </div>
          <div class="btn">提交</div>
        </div>
        <div class="box2">
          <p>我们的联系方式</p>
          <div class="imgBox">
            <img src="@/static/icon/phones.png" alt="">
            <p>400——800——6785</p>
          </div>
          <div class="imgBox">
            <img src="@/static/icon/emails.png" alt="">
            <p>isdg-yk@isdg.cn</p>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import api from '@/plugins/api/api'
export default {
  data(){
    return{
      imgUrl:"",
      limit:4,
      list:[],
      img:"",
      viewTop:0
    }
  },
  mounted(){
     api.home.shoppingGuides().then((res)=>{
        this.imgUrl=res.data[3].image
       
      })
      api.home.articleList(13,{page:0,limit:this.limit}).then((res)=>{
        this.list=res.data
      })
      
      
  }
};
</script>

<style lang="scss" scoped>
.contactus {
  width: 100%;
  background-color: #f7f4f8;
}
.banner {
  width: 100%;
  height: 580px;
}
.content {
  max-width: 800px;
  padding: 56px 10px 74px 10px;
  box-sizing: border-box;
  margin: 0 auto;
}
.text1{
  width: 800px;
  height: 24px;
  font-family: MicrosoftYaHei-Bold;
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 55px;
  letter-spacing: 0px;
  color: #333333;
  font-weight: bold;
}
.Box{
  width: 700px;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}
.box2{
  width: 200px;
}
.textBox{
  width: 500px;
}
.input1{
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  input{
    width: 400px;
    height: 20px;
    border: 1px solid #c8c8c8;
  }
}
.textarea{
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 20px;
  textarea{
    width: 396px;
  }
}
.phone{
  margin-left: -28px;
}
.btn{
  width: 360px;
  background-color: #225c44;
  height: 30px;
  color: white;
  text-align: center;
  line-height: 30px;
  margin-top: 30px;
  margin-left: 46px;
}

.imgBox{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 40px;
  img{
    width: 20px;
    height: 20px;
  }
  p{
    margin-left: 10px;
    color: #797979;
  }
}

@media screen and (max-width: 768px) {
  .banner {
    width: 100%;
    height: px(400);
  }
  .content {
    width: 100%;
    padding: px(77) 10px px(84) 10px;
    box-sizing: border-box;
  }
 .text1{
  width: px(800);
  height: px(24);
  font-family: MicrosoftYaHei-Bold;
  font-size: px(24);
  font-weight: normal;
  font-stretch: normal;
  line-height: px(55);
  letter-spacing: 0px;
  color: #333333;
  font-weight: bold;
}
.Box{
  width: px(700);
  display: flex;
  justify-content: space-between;
  margin-top: px(40);
}
.box2{
  width: px(200);
  font-size: px(10);
}
.textBox{
  width: px(500);
  font-size: px(10);
}
.input1{
  margin-top: px(20);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: px(20);
  input{
    width: px(400);
    height: px(20);
    border: 1px solid #c8c8c8;
  }
}
.textarea{
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: px(20);
  textarea{
    width: px(396);
    margin-left: px(20);
  }
}
.phone{
  margin-left: px(-20);
}
.btn{
  width: px(360);
  background-color: #225c44;
  height: px(30);
  color: white;
  text-align: center;
  line-height: px(30);
  margin-top: px(30);
  margin-left: px(46);
}

.imgBox{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: px(40);
  img{
    width: px(20);
    height: px(20);
  }
  p{
    margin-left: px(10);
    color: #797979;
  }
}
}
</style>
