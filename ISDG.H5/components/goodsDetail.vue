<template>
  <div>
    <div class="top">
      <div class="left">
        <!-- swiper1 -->
        <div class="swiper1">
          <div v-swiper:swiperTop="swiperOptionTop" class="swiper-container" v-if="imgList.length>0">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item, index) in imgList" :key="index">
                <img :src="item" />
              </div>
            </div>
            <div
              class="swiper-button-next swiper-button-white"
              slot="button-next"
            ></div>
            <div
              class="swiper-button-prev swiper-button-white"
              slot="button-prev"
            ></div>
          </div>
        </div>
        <!-- swiper2 -->
        <div class="swiper2">
          <div v-swiper:swiperThumbs="swiperOptionThumbs" class="swiper-thumbs" v-if="imgList.length>0">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item, index) in imgList" :key="index">
                <img :src="item" />
              </div>
            </div>
          </div>
        </div>
        <div class="like">
          <div class="collected" v-if="like" @click="changeLike">
            <p>收藏</p>
            <img src="@/static/icon/collection.png" alt="" />
          </div>
          <div class="collected" v-else @click="changeLike">
            <p>已收藏</p>
            <img src="@/static/icon/collected.png" alt="" />
          </div>
        </div>
      </div>
      <div class="right">
        <div class="title">
          {{comList.store_name}}
        </div>
        <div class="price">
          <div>￥<span>{{comList.price}}</span></div>
        </div>

        <div class="tip1" v-if="comList.is_postage">
          免运费
        </div>
        <div class="specs" v-for="(items,indexs) in cateList" :key="indexs">
          <div v-for="(itm,idx) in items.attr_values" :key="idx" :class="{cur:selectSize[indexs]==idx}" @click="changeNumber(indexs,idx,itm)">{{itm}}</div>
        </div>
        <div class="use">
          <div class="s-title">使用方法:</div>
          <div class="s-content">
            一日1次，晚上睡前半小时4粒，1袋1个月的量，温水送服。适用人群:
            成人食用1袋1个月的量，温水送服。 适用人群: 成人食用
          </div>
        </div>
        <div class="produce">
          <div class="s-title">产品简介:</div>
          <div class="s-content">
            {{comList.store_info}}
          </div>
        </div>
        <div class="btns">
         <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
          <div class="box">
            <div class="btn" @click="jump">{{ btnText }}</div>
            <div class="btn" @click="cartAdd" v-if="usual">加入购物车</div>
          </div>
        </div>
        <div class="call">
          <!-- <div>
            <a href="http://wpa.qq.com/msgrd?v=3&uin=202128094&site=qq&menu=yes" target="_blank" class="alink">
            <img src="@/static/icon/service.png" alt="" />
            <span>在线客服</span>
            </a>
          </div> -->
          <div>
            <img src="@/static/icon/phone.png" alt="" />
            <span>选购热线：400-3941-345</span>
          </div>
        </div>
        <div class="share">
          <span>分享：</span>
          <div @click="shareTo('wechat')">     
            <img src="@/static/icon/wx.png" alt="" />
          </div> 
          <div @click="shareTo('sina')">     
            <img src="@/static/icon/wb.png" alt="" />
          </div>
          <div @click="shareTo('qq')">     
            <img src="@/static/icon/qq.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="title">
        <div>商品详细</div>
        <div>Product details</div>
        <div class="line"></div>
      </div>
      <div class="main" v-html="comList.description"></div>
      <about :id="id" />
    </div>
  </div>
</template>

<script>
import about from "@/components/about";
import api from "@/plugins/api/api";
export default {
  props: {
    btnText: {
      default: "",
      type: String
    },
    id:{
      default: 0
    },
    usual: {
      default: false,
      type: Boolean
    }
  },
  components:{
    about
  },
  data() {
    return {
      swiperOptionTop: {
        // grabCursor: true,
        // centeredSlides: true,
        //loop: true,  /* 加了loop，不能同步，暂时忽略 */
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
         on:{ slideChange: ()=>{
          //  console.log(this.swiperTop.activeIndex);
          //   console.log('改变了，activeIndex为'+this.swiperTop.activeIndex); 
            this.swiperThumbs.slideTo(this.swiperTop.activeIndex, 500, false)
          }, }
      },
      swiperOptionThumbs: {
        centeredSlides: true,
        slidesPerView: "auto",
        touchRatio: 0.2,
        slideToClickedSlide: true,
        on:{ slideChange: ()=>{
          //  console.log(this.swiperThumbs.activeIndex);
          //   console.log('改变了，底部activeIndex为'+this.swiperThumbs.activeIndex);
            this.swiperTop.slideTo(this.swiperThumbs.activeIndex, 500, false)
          }, }
      },
      num:1,
      number:0,
      imgList:[],
      comList:[],
      postage:"",
      cate:[],
      cateList:[],
      selectSize:[],
      selectAttr:[],
      uniqueId:"",
      productValue:[],
      like:true,
    };
  },
  methods: {
    jump(url) {
      this.$store.state.carNum=this.num
      this.$store.state.uniqueId=this.uniqueId
      
      if(this.cateList.length>0&&this.uniqueId!=""){
        this.$emit("jump");
      }
      else if(this.cateList.length<=0){
        this.$emit("jump");
      }else{
        this.$message({
          message:"请选择产品属性"
        })
      }
    },
    goodsDatail() {
      let id = this.$props.id;
      api.home.goodsDetail(id).then(res => {
       this.imgList=res.data.storeInfo.slider_image
       this.comList=res.data.storeInfo
       this.like=!res.data.storeInfo.userCollect
       if(res.data.productAttr.length>0){
       this.cateList=res.data.productAttr
       this.productValue=res.data.productValue
       }
      })
    },
    handleChange:function(){
      // console.log(typeof this.num);
      
    },
    changeNumber:function(indexs,idx,itm){
      
      if(this.selectAttr[indexs]!==itm){
        this.$set(this.selectAttr,indexs,itm)
        this.$set(this.selectSize,indexs,idx)
      } else{
        this.$set(this.selectAttr,indexs,'')
        this.$set(this.selectSize,indexs,-1)
      }
      console.log(this.selectAttr.sort().join(','),this.productValue);
      for(var i in this.productValue){        
        if(this.productValue[i].suk==this.selectAttr.sort().join(',')){
          this.uniqueId=this.productValue[i].unique
          this.comList.price=this.productValue[i].price          
        }        
      }
      
    },
    cartAdd(){
      let productId=this.$props.id.toString()
      api.personal.addCar({productId:productId,cartNum:this.num,new:0,uniqueId:this.uniqueId}).then((res)=>{
        if(res.data.status==200||res.status==200){
          api.personal.getcartNumber().then((res)=>{
                  this.$store.state.cartNum=res.data.count
                  sessionStorage.setItem("cartNum",res.data.count)
                })
          this.$message({
            message:"加入购物车成功",
            type:"success"
          })
        }else{
          this.$message({
            message:res.data.msg||res.msg,
            type:"warning"
          })
        }
      })
      
    },
    changeLike(){
      this.like=!this.like
      if(this.like==false){
        api.personal.collectAdd({id:this.id}).then((res)=>{
          if(res.status==200){
            this.$message({
              message:"收藏成功",
              type:"success"
            })
          }else{
            this.$message({
              message:res.data.msg||res.msg,
              type:"warning"
            })
          }
        })
      }else if(this.like==true){
        api.personal.collectDel({id:this.id}).then((res)=>{
          if(res.status==200){
            this.$message({
              message:"取消成功",
              type:"success"
            })
          }else{
            this.$message({
              message:res.data.msg||res.msg,
              type:"warning"
            })
          }
        })
      }
    },
    shareTo(stype){
      var ftit = '';
      var flink = '';
      var lk = '';
      //获取文章标题
      ftit = this.comList.store_name
      //获取网页中内容的第一张图片
      flink = this.imgList[0]
      if(typeof flink == 'undefined'){
          flink='';
      }
      //当内容中没有图片时，设置分享图片为网站logo
      // if(flink == ''){
      //     lk = 'http://'+window.location.host+'/static/images/logo.png';
      // }
      //如果是上传的图片则进行绝对路径拼接
      if(flink.indexOf('/uploads/') != -1) {
          lk = 'http://'+window.location.host+flink;
      }
      //百度编辑器自带图片获取
      if(flink.indexOf('ueditor') != -1){
          lk = flink;
      }
      //qq空间接口的传参
      if(stype=='qzone'){
          window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+document.location.href+'?sharesource=qq&title='+ftit+'&pics='+lk+'&summary='+document.querySelector('meta[name="description"]').getAttribute('content'));
      }
      //新浪微博接口的传参
      if(stype=='sina'){
          window.open('http://service.weibo.com/share/share.php?url='+document.location.href+'?sharesource=weibo&title='+ftit+'&pic='+lk+'&appkey=2291870835');
      }
      //qq好友接口的传参
      if(stype == 'qq'){
          window.open('http://connect.qq.com/widget/shareqq/index.html?url='+document.location.href+'?sharesource=qzone&title='+ftit+'&pics='+lk+'&summary='+document.querySelector('meta[name="description"]').getAttribute('content')+'&desc='+ftit);
      }
      //生成二维码给微信扫描分享
      if(stype == 'wechat'){
          // window.open('inc/qrcode_img.php?url=http://zixuephp.net/article-1.html');
  
      }
    }
  },
  mounted() {
    this.goodsDatail();
    // const swiperTop = this.swiperTop;
    //   const swiperThumbs = this.swiperThumbs;
    //   swiperTop.controller.control = swiperThumbs; //控制缩略图和轮播图联动
    //   swiperThumbs.controller.control = swiperTop;
    // this.$nextTick(() => {
    //   console.log(123123);
    //   if(this.imgList.length>0){
    //   console.log(11111111111111111111111);
    //   const swiperTop = this.swiperTop;
    //   const swiperThumbs = this.swiperThumbs;
    //   swiperTop.controller.control = swiperThumbs; //控制缩略图和轮播图联动
    //   swiperThumbs.controller.control = swiperTop;
    //   }
    
    // });
    
  },
  updated(){
    // let obj=document.getElementsByClassName("main");
    // let imgs=document.getElementsByTagName("img");
    // console.log(imgs)
    // for(let i=0; i<imgs.length; i++){
    //   imgs[i].style.maxWidth='100%'
    // }
  }
};
</script>
<style>
.alink{
  color: #666;
  text-decoration: none;
  display: flex;
  align-items: center;
}
.main{
  box-sizing: border-box;
  overflow: hidden;
}
  .main img{
    max-width: 100vw !important;
    /* margin-left: 50%;
    transform: translateX(-50%) */
  }
</style>
<style lang="scss" scoped>

.top {
  @include flex;
  align-items: flex-start;
  flex-wrap: wrap;
  .left {
    width: 600px;
    position: relative;
    // .left:hover .like{
    //   color: red;
    // }
    @include flex(column);
    justify-content: flex-start;
    border: 20px solid #f7f4f8;
    .swiper1 {
      width: 100%;
      height: 720px;
      background-color: #fff;
      @include flex;
      .swiper-container {
        .swiper-wrapper {
          .swiper-slide {
            text-align: center;
            overflow: hidden;
            img {
              width: auto;
              max-height: 600px;
              object-fit: cover;
            }
          }
        }
        .swiper-button-prev {
          background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l4.2%2C4.2L8.4%2C22l17.8%2C17.8L22%2C44L0%2C22z'%20fill%3D'%23003333'%2F%3E%3C%2Fsvg%3E");
        }
        .swiper-button-next {
          background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L5%2C44l-4.2-4.2L18.6%2C22L0.8%2C4.2L5%2C0z'%20fill%3D'%23003333'%2F%3E%3C%2Fsvg%3E");
        }
      }
    }
    .swiper2 {
      width: 100%;
      height: 80px;
      margin-top: 20px;
      .swiper-thumbs {
        .swiper-wrapper {
          width: 100%;
          @include flex;
          -webkit-transform: translate3d(0, 0, 0) !important;
          -moz-transform: translate3d(0, 0, 0) !important;
          -ms-transform: translate3d(0, 0, 0) !important;
          -o-transform: translate3d(0, 0, 0) !important;
          transform: translate3d(0, 0, 0) !important;
          position: relative;
          .swiper-slide {
            text-align: center;
            width: 80px;
            height: 100%;
            background-color: #fff;
            margin-right: 10px;
            border: 1px solid #fff;
            &:last-child {
              margin-right: 0;
            }
            img {
              width: auto;
              max-height: 80px;
              object-fit: cover;
            }
          }
          .swiper-slide-active {
            border-color: #809b72;
          }
        }
      }
    }
    .like{
      width: 68px;
      height: 30px;
      text-align: center;
      position: absolute;
      right: 10px;
      top: 10px;
      .collected{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        text-align: center;
        width: 68px;
        height: 30px;
        background-color: #fff;
        border-radius: 6px;
        img{
          width: 20px;
          height: 20px;
          margin-left: 6px;
        }
      }
    }
  }
  .right {
    width: 520px;
    height: 100%;
    border: 20px solid #f7f4f8;
    padding-top: 17px;
    box-sizing: border-box;
    @include flex(column);
    align-items: flex-start;
    justify-content: flex-start;
    .title {
      font-size: 20px;
    }
    .price {
      margin-top: 20px;
      @include flex;
      align-items: flex-end;
      font-size: 18px;
      span {
        font-size: 30px;
      }
      div:nth-child(2) {
        margin-left: 15px;
        margin-right: 15px;
      }
    }
    .falsh {
      @include flex;
      margin-top: 20px;
      div:first-child {
        font-size: 30px;
        span {
          font-size: 18px;
        }
      }
      div:nth-child(2) {
        margin-left: 28px;
        font-size: 18px;
        text-decoration: line-through;
        color: #666666;
      }
      // div:last-child {
      //   margin-left: 23px;
      //   padding: 16px 20px;
      //   background-color: #225c45;
      //   font-size: 14px;
      //   color: #fff;
      //   @include flex;
      // }
    }
    .tip1 {
      margin-top: 20px;
      width: 100%;
      padding-bottom: 17px;
      border-bottom: 1px solid #dcdcdc;
    }
    .specs {
      height: 69px;
      width: 100%;
      border-bottom: 1px solid #dcdcdc;
      @include flex;
      justify-content: flex-start;
      div {
        padding: 15px 42px;
        background-color: #fff;
        @include flex;
        margin-right: 9px;
        cursor: pointer;
        &:last-child {
          margin-right: 0;
        }
      }
      .cur{
        border: 1px solid #225c45;
      }
    }
    .use {
      width: 100%;
      padding: 10px 0 10px 0;
      border-bottom: 1px solid #dcdcdc;
      .s-title {
        color: #666666;
      }
      .s-content {
        margin-top: 17px;
        height: 100%;
        line-height: calc(100% + 7px);
        color: #666666;
      }
    }
    .produce {
      @extend .use;
    }
    .btns {
      padding: 25px 0;
      border-bottom: 1px solid #dcdcdc;
      width: 100%;
      .box{
        display: flex;
        justify-content: flex-start;
      }
      .number {
        height: 40px;
        @include flex;
        justify-content: flex-start;
        div:first-child {
          height: 40px;
          width: 40px;
          background-color: #fff;
          @include flex;
          color: #666666;
          font-size: 14px;
          cursor: pointer;
        }
        div:last-child {
          @extend div:first-child;
        }
        div:nth-child(2) {
          height: 100%;
          width: 85px;
          margin: 0 8px;
          background-color: #fff;
          color: #666666;
          font-size: 14px;
          input {
            width: 100%;
            height: 100%;
            padding: 0 10px;
            box-sizing: border-box;
          }
        }
      }
      .btn {
        width: 154px;
        height: 45px;
        background-color: #225c45;
        @include flex;
        cursor: pointer;
        margin-top: 25px;
        margin-right: 20px;
        color: #fff;
      }
    }
    .call {
      @include flex;
      margin-top: 15px;
      div {
        @include flex;
        img {
          margin-right: 5px;
        }
      }
      div:last-child {
        margin-left: 20px;
      }
    }
    .share {
      @include flex;
      margin-top: 20px;
      img {
        width: 40px;
        height: 40px;
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
}
.bottom {
  margin-top: 50px;
  .title {
    width: 100%;
    text-align: center;
    padding-bottom: 24px;
    border-bottom: 1px solid #dcdcdc;
    position: relative;
    div:first-child {
      color: #003333;
      font-size: 30px;
    }
    div:nth-child(2) {
      color: #5dd2b1;
      font-size: 14px;
      margin-top: 10px;
    }
    .line {
      width: 77px;
      height: 3px;
      border-radius: 1px;
      background-color: #5dd2b1;
      left: 50%;
      position: absolute;
      margin-left: -35px;
      bottom: -2px;
    }
  }
}

@media screen and (max-width: 768px) {
  .top {
    width: 100%;
    @include flex;
    align-items: flex-start;
    flex-wrap: wrap;
    .left {
      width: 100%;
      @include flex(column);
      justify-content: flex-start;
      border: 0;
      .swiper1 {
        width: 100%;
        height: px(720);
        background-color: #fff;
        @include flex;
        .swiper-container {
          .swiper-wrapper {
            .swiper-slide {
              text-align: center;
              overflow: hidden;
              img {
                width: auto;
                max-height: px(600);
                object-fit: cover;
              }
            }
          }
          .swiper-button-prev {
            background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l4.2%2C4.2L8.4%2C22l17.8%2C17.8L22%2C44L0%2C22z'%20fill%3D'%23003333'%2F%3E%3C%2Fsvg%3E");
          }
          .swiper-button-next {
            background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L5%2C44l-4.2-4.2L18.6%2C22L0.8%2C4.2L5%2C0z'%20fill%3D'%23003333'%2F%3E%3C%2Fsvg%3E");
          }
        }
      }
      .swiper2 {
        width: 100%;
        height: px(128);
        margin-top: 20px;
        .swiper-thumbs {
          .swiper-wrapper {
            width: 100%;
            @include flex;
            -webkit-transform: translate3d(0, 0, 0) !important;
            -moz-transform: translate3d(0, 0, 0) !important;
            -ms-transform: translate3d(0, 0, 0) !important;
            -o-transform: translate3d(0, 0, 0) !important;
            transform: translate3d(0, 0, 0) !important;
            position: relative;
            .swiper-slide {
              text-align: center;
              width: px(128);
              height: 100%;
              background-color: #fff;
              margin-right: 10px;
              border: 1px solid #fff;
              &:last-child {
                margin-right: 0;
              }
              img {
                width: auto;
                max-height: px(128);
                object-fit: cover;
              }
            }
            .swiper-slide-active {
              border-color: #809b72;
            }
          }
        }
      }
    }
    .right {
      width: 100%;
      height: 100%;
      border: px(20) solid #f7f4f8;
      padding-top: px(58);
      box-sizing: border-box;
      @include flex(column);
      align-items: flex-start;
      justify-content: flex-start;
      .title {
        font-size: px(30);
      }
      .price {
        margin-top: px(32);
        @include flex;
        align-items: flex-end;
        font-size: px(32);
        span {
          font-size: px(40);
        }
        div:nth-child(2) {
          margin-left: px(20);
          margin-right: px(20);
        }
      }
      .falsh {
        @include flex;
        margin-top: px(32);
        font-size: px(32);
        div:first-child {
          font-size: px(40);
          span {
            font-size: px(40);
          }
        }
        div:nth-child(2) {
          margin-left: px(20);
          font-size: px(30);
          text-decoration: line-through;
          color: #666666;
        }
        // div:last-child {
        //   margin-left: px(20);
        //   padding: px(20) px(24);
        //   background-color: #225c45;
        //   font-size: px(24);
        //   color: #fff;
        //   @include flex;
        // }
      }
      .tip1 {
        margin-top: px(22);
        width: 100%;
        padding-bottom: px(16);
        font-size: px(20);
        border-bottom: 1px solid #dcdcdc;
      }
      .specs {
        height: px(104);
        width: 100%;
        border-bottom: 1px solid #dcdcdc;
        @include flex;
        justify-content: flex-start;
        div {
          padding: px(16) px(50);
          background-color: #fff;
          @include flex;
          margin-right: px(10);
          cursor: pointer;
          font-size: px(18);
          &:last-child {
            margin-right: 0;
          }
        }
      }
      .use {
        width: 100%;
        padding: px(36) 0 px(36) 0;
        border-bottom: 1px solid #dcdcdc;
        .s-title {
          color: #666666;
          font-weight: bold;
          font-size: px(24);
        }
        .s-content {
          margin-top: px(16);
          height: 100%;
          font-size: px(20);
          line-height: calc(100% + px(10));
          color: #666666;
        }
      }
      .btns {
        padding: px(38) 0;
        border-bottom: 1px solid #dcdcdc;
        width: 100%;
        .number {
          height: px(58);
          @include flex;
          justify-content: flex-start;
          div:first-child {
            height: px(58);
            width: px(58);
            background-color: #fff;
            @include flex;
            color: #666666;
            font-size: px(20);
            cursor: pointer;
          }
          div:nth-child(2) {
            height: 100%;
            width: px(100);
            margin: 0 px(8);
            background-color: #fff;
            color: #666666;
            font-size: px(20);
            input {
              width: 100%;
              height: 100%;
              padding: 0 px(10);
              box-sizing: border-box;
            }
          }
        }
        .btn {
          width: px(180);
          height: px(54);
          font-size: px(20);
          background-color: #225c45;
          @include flex;
          cursor: pointer;
          margin-top: px(30);
          margin-right: px(20);
          color: #fff;
        }
      }
      .call {
        color: #666;
        font-size: px(20);
        @include flex;
        margin-top: px(50);
        div {
          @include flex;
          img {
            margin-right: px(13);
            width: px(29);
            height: auto;
          }
        }
        div:last-child {
          margin-left: px(30);
        }
      }
      .share {
        color: #666;
        font-size: px(20);
        @include flex;
        margin-top: px(30);
        img {
          width: px(52);
          height: px(52);
          margin-left: 5px;
          cursor: pointer;
        }
      }
    }
  }
  .bottom {
    margin-top: px(68);
    .title {
      width: 100%;
      text-align: center;
      padding-bottom: px(34);
      border-bottom: 1px solid #dcdcdc;
      position: relative;
      div:first-child {
        color: #003333;
        font-size: px(40);
      }
      div:nth-child(2) {
        color: #5dd2b1;
        font-size: px(20);
        margin-top: 10px;
      }
      .line {
        width: px(77);
        height: 2px;
        border-radius: 1px;
        background-color: #5dd2b1;
        left: 50%;
        position: absolute;
        margin-left: px(-35);
        bottom: -1px;
      }
    }
    .main {
      // padding: px(30) 20px px(70) 20px;
      .main /deep/ img{
        max-width: 100% !important;
      }
    }
  }
}
</style>
