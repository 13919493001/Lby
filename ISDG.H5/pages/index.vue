<template>
  <div>
    <!-- banner -->
    <div v-swiper:swiperTop="swiperOptionTop" class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in bannerImg" :key="index">
          <img :src="item.pic"/>
        </div>
      </div>
      <div class="swiper-pagination"></div>
      <!--分页器。如果放置在swiper-container外面，需要自定义样式。-->
    </div>
    <!--  -->
    <section class="content">
      <div class="hot">
        <div class="title">
          限时秒杀
        </div>
        <div class="s-title">准点上新 总有惊喜等你来拿</div>
        <div class="cutdown">
          <img src="@/static/icon/home1.png" alt="" />
          <div>{{ seckilltime }}</div>
          <!-- <div class="time">
            <div class="block">00</div>
            <div>:</div>
            <div class="block">25</div>
            <div>:</div>
            <div class="block">36</div>
          </div> -->
          <timer :endTime="endTime" endText="已结束"  v-if='endTime.length!=0' />
          <div class="c-more hidden-xs-only" @click="jump('/flashSale')">
            更多 <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </div>
      <div v-swiper:swiper="swiperOption" class="swiper-option">
        <div class="swiper-wrapper">
          <div
            class="item swiper-slide"
            v-for="(item, index) in flashList"
            :key="index"
          >
            <div @click="goDetail(item.id)">
                <div class="img">
                <div class="tip">秒杀中</div>
                <img :src="item.image" alt="" />
              </div>
              <div class="title">
                {{item.title}}
              </div>
              <div class="price">
                ￥{{item.price}}
              </div>
            </div>
            <div
              class="btn"
              @mouseover="
                isHover = true;
                hoverIndex = index;
              "
              @mouseleave="isHover = false"
              @click="goShopping(index)"
            >
              <img
                src="@/static/icon/icon5.png"
                alt=""
                v-if="isHover && hoverIndex === index"
              />
              <img src="@/static/icon/icon5-2.png" alt="" v-else />
              <div>立即购买</div>
            </div>
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
      <div class="hidden-sm-and-up hot-more"  @click="jump('/flashSale')">查看更多</div>
      <div class="video">
        <video controls autoplay="autoplay" muted="muted">
          <source src="@/static/index.mp4" type="video/mp4" />
        </video>
      </div>
      <div class="s-banner">
        <img src="@/static/icon/s-banner.jpg" alt="" class="img" />
        <div class="b-content"  @click="goCoupon">
          <div class="left">
            <div class="l-item" v-for="(copitem,copidx) in couponList" :key="copidx">
              <div><span>￥</span>{{copitem.coupon_price}}</div>
              <div>满{{copitem.use_min_price}}使用</div>
            </div>
            
          </div>
          <div class="right">
            <div class="r1">暖春倾献 超值优惠</div>
            <div class="r2">领取优惠券</div>
          </div>
        </div>
      </div>
    </section>
    <!--  -->
    <div class="group">
      <group />
      <div class="more" @click="more">更多</div>
    </div>
    <!--  -->
    <section class="content2">
      <div class="brand">
        <img src="@/static/icon/brand.png" alt="" />
        <div class="brand-content" @click="goStory">
          <div class="title">Brand stroy</div>
          <div class="s-title">健康生活·源于饮食</div>
          <div class="text">
            品牌故事文案内容从东京至全世界，ISDG品牌始终致力于推广日本传奇酵素与亚洲专业美妆技艺邀您前往体验isdg始终秉持的前沿创新
          </div>
          <div class="learn">了解更多<i class="el-icon-caret-right"></i></div>
        </div>
      </div>
      <div class="hot-goods">
        <div class="title">热销产品</div>
        <div class="s-title">汇聚买家达人力推产品</div>
        <hot :msg="likeInfo" />
      </div>
      <div class="class">
        <div class="title">营养课堂</div>
        <div class="s-title">
          365天，你在不同的 角色切换，要强的你也请记得每天放慢脚步
        </div>
        <div class="items">
          <div class="item" v-for="(item, index) in textList" :key="index" @click="goTextDetail(item.id)">
            <img :src="item.image_input[text1]" alt="" />
            <div class="inner">
              <div class="stitle">
                {{item.title}}
              </div>
              <div class="date">{{item.add_time}}</div>
              <div class="text">
                {{item.synopsis}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <quick-tab />
  </div>
</template>

<script>
import group from "./home/group";
import hot from "./home/hot";
import quickTab from "@/components/quickTab";
import timer from "@/components/timer"
import api from "@/plugins/api/api";
export default {
  components: {
    group,
    hot,
    quickTab,
    timer
  },
  data() {
    return {
      swiperOptionTop: {
        grabCursor: true,
        autoplay: true,
        loop: true,
        pagination: {
          el: ".swiper-pagination"
        }
      },
      swiperOption: {
        slidesPerView: "auto",
        spaceBetween: 50,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      isHover: false,
      hoverIndex: -1,
      res:"",
      bannerImg:"", //顶部轮播
      likeInfo:"", //热销产品
      seckilltime:"", //秒杀时间
      goodsList:"" ,//秒杀商品
      seckillId:114,
      currentPage:0,
      limit:3,
      flashList:[],
      id:[],
      payMoney:0,
      endTime:"",
      textList:[],
      text1:0,
      couponList:[]
    };
  },
  methods: {
    jump(url) {
      this.$router.push(url);
    },
    init() {
      //获取首页数据
      let params = {page: this.currentPage, limit:this.limit}
      api.home.banner().then(res => {
        // console.log(res.data)
        this.bannerImg = res.data.banner;
        this.likeInfo = res.data.likeInfo;
      });
      //获取秒杀时间
      api.activity.time().then(res => {
        // console.log(res.data);
        this.seckilldata = res.data.seckillTime;
        for(var i=0;i<res.data.seckillTime.length;i++) {
        if(this.seckilldata[i].state === "抢购中") {
          this.seckilltime = this.seckilldata[i].time;
          this.seckillId = this.seckilldata[i].id
          // console.log(this.seckilltime,this.seckillId)
        }
      }
        api.activity.seckillList(this.seckillId,{page: 0, limit:11}).then(res=>{
          this.flashList=res.data.product_info
          this.endTime=this.flashList[0].stop_time
          
        })
      });
     
    },
    //获取当前秒杀商品列表

    goCoupon(){
      this.$router.push({path:"coupon"})
    },
    goDetail(id){
      api.personal.User().then((res)=>{
        if(res.status==200){
          this.$router.push({path:'/flashSale/detail',query: {id:id}})
        }else{
          var that=this
          // this.$message({
          //   message:"请先登录",
          //   type:"warning"
          // })
          setTimeout(function(){ that.$router.push({path:'/login'}); }, 500);
        }
      })
    },
    goShopping(index){
      this.id=this.flashList[index].id
       this.$router.push({path:'/flashSale/order',query: {id: this.id}})
    },
    more(){
      this.$router.push('/goods')
    },
    goStory(){
      this.$router.push('/story')
    },
    goTextDetail(id){
      this.$router.push({path:"/news/detail",query:{id:id}})
    },
    timestampToTime(timestamp) {
	    var date = new Date(timestamp * 1000);
	    var Y = date.getFullYear() + '-';
	    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
	    var D = '-'+date.getDate() + ' ';
	    var h = date.getHours() + ':';
	    var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      var date=Y+M+D
	    return date
    }
  },
  created () {
    
    this.init ();
    // api.personal.userInfo((res)=>{
      
    // })
    api.home.articleList(24,{page:1,limit:3}).then((res)=>{
      this.textList=res.data
      for(var i in this.textList){
          
          this.textList[i].add_time=this.timestampToTime(this.textList[i].add_time)

        }
    })
    api.activity.couponList({page:1, limit:4}).then((res)=>{
      this.couponList=res.data
    })
  }
};
</script>

<style lang="scss">
.swiper-pagination-bullet {
  opacity: 1;
  background-color: #fff;
}
.swiper-pagination-bullet-active {
  background-color: #225c45;
}
.swiper-slide {
  img {
    width: 100%;
    object-fit: cover;
  }
}

.content {
  max-width: 1200px;
  padding: 33px 0 0 0;
  box-sizing: border-box;
  margin: 0 auto;
  .hot {
    width: 100%;
    text-align: center;
    .title {
      font-size: 40px;
    }
    .s-title {
      color: #666666;
      font-size: 14px;
      margin-top: 13px;
    }
    .cutdown {
      font-size: 16px;
      margin-top: 30px;
      @include flex;
      position: relative;
      .c-more {
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -15px;
        width: 77px;
        height: 30px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(238, 238, 238, 1);
        border-radius: 15px;
        @include flex;
        color: #666666;
        cursor: pointer;
        font-size: 13px;
      }
      img {
        margin-right: 10px;
      }
      .time {
        @include flex;
        color: #ff2e7a;
        .block {
          width: 30px;
          height: 30px;
          background: rgba(255, 46, 122, 1);
          @include flex;
          color: #fff;
          margin: 0 10px;
        }
      }
    }
  }
  .swiper-option {
    margin-top: 75px;
    width: 100%;
    .swiper-button-prev {
      background-size: 15px 26px;
      margin-top: -80px !important;
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAaCAYAAABozQZiAAAAv0lEQVQ4jZ3U2w2CQBBA0Qsd0IItzJQgLViClqAlaAnWoiWstVDC+CEQCfuYXRJ+SM6FhJ3BzKi5ReQgIkczozMzvJeqCvACBuDWN8IJeLtwBI4hhE8RpyBAFudgFpdgEntgFHvhDtfADa6FK26BAJ2INMHlzdcZAjy8cMEXYAF3VT27cQhhAsa/wNMb6AFaA+uvaglsDkltYHc8awLRwfAGkiPpCWSXQSlQXEO5gHv1qurAbwZkfnRyr97IF/AFmuizR23zqccAAAAASUVORK5CYII=");
    }
    .swiper-button-next {
      background-size: 15px 26px;
      margin-top: -80px !important;
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAaCAYAAABozQZiAAAAv0lEQVQ4jZ3S4Q2CQAxA4Uc3YAVXaEeQEVzBFZhFR9ARWOGYhRHqD9EIAnc9EhJK8r1eCLg7qnpW1ZO7E7nFzHpgAJKZKYFLgDswAi0wRAKSUpqAriYgALUB+TzUBOR3iAZk/SIS+MORwCYuDeziksAhzgUad895AMys5f0bKzABXXbz6gTPeWyBPrL5CtzmcSzevAVTSlMW70HIfO0jeIhzcBeXwE1cCv9wBC5wFH5xDQRoVPUCPKJwcewoBHgBxw21aqqpeVcAAAAASUVORK5CYII=");
    }
    .item {
      width: 260px;
      height: 100%;
      margin-bottom: 24px;
      .img {
        width: 100%;
        height: 260px;
        @include flex;
        background-color: #fff;
        position: relative;
        .tip {
          width: 75px;
          height: 25px;
          background: rgba(255, 46, 122, 1);
          border-radius: 12px;
          @include flex;
          color: #fff;
          position: absolute;
          z-index: 99;
          right: 3px;
          top: 3px;
        }
        img {
          width: auto;
          max-height: 260px;
          object-fit: cover;
        }
      }
      .title {
        height: 48px;
        line-height: 24px;
        text-align: center;
        width: 100%;
        margin-top: 34px;
        @include ellipsis(2);
      }
      .price {
        margin-top: 20px;
        width: 100%;
        text-align: center;
      }
      .btn {
        width: 150px;
        height: 50px;
        background: #fff;
        border-radius: 25px;
        @include flex;
        color: #333;
        margin: 0 auto;
        margin-top: 25px;
        border: 1px solid #e5e5e5;
        cursor: pointer;
        img {
          height: 18px;
          width: 14px;
          object-fit: cover;
          margin-right: 8px;
        }
        &:hover {
          background-color: #215b45;
          color: #fff;
          border-color: #215b45;
        }
      }
    }
  }
  .video {
    margin-top: 80px;
    width: 100%;
    height: 600px;
    video {
       width: 100%;
       height: 600px;
    object-fit: cover;
    }
  }
  .s-banner {
    width: 100%;
    margin-top: 88px;
    position: relative;
    .img {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }
    .b-content {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      box-sizing: border-box;
      @include flex;
      justify-content: space-around;
      height: 100%;
      .left {
        @include flex;
        .l-item {
          width: 100px;
          height: 100px;
          border: 1px dashed rgba(255, 255, 255, 0.7);
          border-radius: 50%;
          @include flex(column);
          color: #fff;
          margin-right: 30px;
          div:first-child {
            font-size: 42px;
            span {
              font-size: 14px;
              margin-right: 5px;
            }
          }
          div:last-child {
            margin-top: 8px;
            font-size: 14px;
          }
        }
      }
      .right {
        @include flex(column);
        .r1 {
          font-size: 42px;
          color: #fff;
          margin-bottom: 10px;
        }
        .r2 {
          width: 121px;
          height: 30px;
          border: 1px solid rgba(255, 255, 255, 1);
          border-radius: 15px;
          color: #fff;
          @include flex;
          cursor: pointer;
        }
      }
    }
  }
}

.group {
  width: 100%;
  background-color: #f6fafb;
  padding: 75px 0;
  .swiper-pagination-bullet {
    opacity: 1;
    background-color: #e5e5e5;
  }
  .swiper-pagination-bullet-active {
    background-color: #225c45;
  }
  .more {
    width: 220px;
    height: 60px;
    border: 1px solid rgba(210, 210, 210, 1);
    border-radius: 30px;
    @include flex;
    color: #666666;
    font-size: 16px;
    margin: 0 auto;
    margin-top: 40px;
  }
}
.content2 {
  @extend .content;
  padding-top: 100px;
  padding-bottom: 100px;
  text-align: center;
  .brand {
    width: 100%;
    position: relative;
    img {
      width: 100%;
      height: 380px;
      object-fit: cover;
    }
    .brand-content {
      width: 50%;
      height: 380px;
      background: rgba(34, 92, 69, 0.6);
      position: absolute;
      right: 0;
      top: 0;
      color: #fff;
      padding: 60px;
      box-sizing: border-box;
      padding-bottom: 0;
      transition: all 0.2s linear;
      text-align: left;
      &:hover {
        background: rgba(34, 92, 69, 0.7);
      }
      .title {
        font-size: 40px;
      }
      .s-title {
        font-size: 36px;
        margin-top: 19px;
      }
      .text {
        margin-top: 44px;
        line-height: 24px;
      }
      .learn {
        width: 100%;
        margin-top: 20px;
        text-align: right;
        position: relative;
        cursor: pointer;
        i {
          font-size: 14px;
          color: #fff;
        }
      }
    }
  }
  .hot-goods {
    width: 100%;
    margin-top: 100px;
    .swiper-pagination-bullet {
      opacity: 1;
      background-color: #e5e5e5;
    }
    .swiper-pagination-bullet-active {
      background-color: #225c45;
    }
    .title {
      font-size: 40px;
    }
    .s-title {
      color: #888888;
      margin-top: 14px;
    }
  }
  .class {
    margin-top: 100px;
    .title {
      font-size: 40px;
    }
    .s-title {
      color: #888888;
      margin-top: 14px;
    }
    .items {
      margin-top: 50px;
      @include flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .item {
        margin-bottom: 50px;
        width: 30%;
        text-align: center;
        img {
          height: 235px;
          width: 100%;
          object-fit: cover;
        }
        .stitle {
          width: 100%;
          font-size: 20px;
          margin-top: 50px;
          text-align: left;
          cursor: pointer;
        }
        .date {
          width: 100%;
          color: #888888;
          margin-top: 20px;
          text-align: left;
        }
        .text {
          width: 100%;
          height: 72px;
          text-align: left;
          line-height: 24px;
          color: #666666;
          @include ellipsis(3);
          margin-top: 25px;
          font-size: 14px;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .swiper-pagination-bullet {
    opacity: 1;
    background-color: #fff;
  }
  .swiper-pagination-bullet-active {
    background-color: #225c45;
  }
  .swiper-slide {
    img {
      width: 100%;
      height: px(428);
      object-fit: fill;
    }
  }

  .content {
    width: 100%;
    padding: px(33) 0 0 0;
    box-sizing: border-box;
    margin: 0 auto;
    .hot {
      width: 100%;
      text-align: center;
      .title {
        font-size: px(46);
      }
      .s-title {
        color: #666666;
        font-size: px(20);
        margin-top: px(13);
      }
      .cutdown {
        font-size: px(20);
        margin-top: px(30);
        @include flex;
        position: relative;
        .c-more {
          position: absolute;
          right: 0;
          top: 50%;
          margin-top: -15px;
          width: 77px;
          height: 30px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(238, 238, 238, 1);
          border-radius: 15px;
          @include flex;
          color: #666666;
          cursor: pointer;
          font-size: 13px;
        }
        img {
          margin-right: px(10);
          width: px(30);
          height: auto;
          object-fit: cover;
        }
        .time {
          @include flex;
          color: #ff2e7a;
          .block {
            width: px(36);
            height: px(36);
            background: rgba(255, 46, 122, 1);
            @include flex;
            color: #fff;
            margin: 0 px(8);
          }
        }
      }
    }
    .swiper-option {
      margin-top: px(75);
      width: 100%;
      padding-left: px(20);
      box-sizing: border-box;
      .swiper-button-prev {
        display: none;
        background-size: 15px 26px;
        margin-top: -80px !important;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAaCAYAAABozQZiAAAAv0lEQVQ4jZ3U2w2CQBBA0Qsd0IItzJQgLViClqAlaAnWoiWstVDC+CEQCfuYXRJ+SM6FhJ3BzKi5ReQgIkczozMzvJeqCvACBuDWN8IJeLtwBI4hhE8RpyBAFudgFpdgEntgFHvhDtfADa6FK26BAJ2INMHlzdcZAjy8cMEXYAF3VT27cQhhAsa/wNMb6AFaA+uvaglsDkltYHc8awLRwfAGkiPpCWSXQSlQXEO5gHv1qurAbwZkfnRyr97IF/AFmuizR23zqccAAAAASUVORK5CYII=");
      }
      .swiper-button-next {
        display: none;
        background-size: 15px 26px;
        margin-top: -80px !important;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAaCAYAAABozQZiAAAAv0lEQVQ4jZ3S4Q2CQAxA4Uc3YAVXaEeQEVzBFZhFR9ARWOGYhRHqD9EIAnc9EhJK8r1eCLg7qnpW1ZO7E7nFzHpgAJKZKYFLgDswAi0wRAKSUpqAriYgALUB+TzUBOR3iAZk/SIS+MORwCYuDeziksAhzgUad895AMys5f0bKzABXXbz6gTPeWyBPrL5CtzmcSzevAVTSlMW70HIfO0jeIhzcBeXwE1cCv9wBC5wFH5xDQRoVPUCPKJwcewoBHgBxw21aqqpeVcAAAAASUVORK5CYII=");
      }
      .item {
        width: px(280);
        height: 100%;
        .img {
          width: 100%;
          height: px(200);
          @include flex;
          background-color: #fff;
          img {
            width: auto;
            max-height: px(200);
            object-fit: cover;
          }
        }
        .tip {
          position: absolute;
          width: px(86) !important;
          height: px(30) !important;
          background: rgba(255, 46, 122, 1);
          border-radius: px(15) !important;
          @include flex;
          color: #fff;
          top: px(0);
          right: px(0);
          font-size: px(16);
        }
        .title {
          height: px(48);
          line-height: px(24);
          text-align: center;
          width: 100%;
          font-size: px(24);
          margin-top: px(54);
          @include ellipsis(2);
        }
        .price {
          margin-top: px(30);
          width: 100%;
          text-align: center;
          font-size: px(30);
        }
        .btn {
          width: px(155);
          height: px(52);
          background: #fff;
          border-radius: px(26);
          @include flex;
          color: #333;
          margin: 0 auto;
          margin-top: px(25);
          border: 1px solid #e5e5e5;
          cursor: pointer;
          font-size: px(14);
          img {
            height: px(18);
            width: px(14);
            object-fit: cover;
            margin-right: px(8);
          }
          &:hover {
            background-color: #215b45;
            color: #fff;
            border-color: #215b45;
          }
        }
      }
    }
    .hot-more {
      width: px(256);
      height: px(70);
      border: 1px solid rgba(210, 210, 210, 1);
      border-radius: px(35);
      margin: 0 auto;
      margin-top: px(50);
      color: #666666;
      font-size: px(18);
      @include flex;
    }
    .video {
      margin-top: px(80);
      width: 100%;
      height: px(380);
      padding: 0 20px;
      box-sizing: border-box;
      video {
       width: 100%;
        height: px(380);
    object-fit: cover;
    }
    }
    .s-banner {
      width: 100%;
      margin-top: px(25);
      position: relative;
      .img {
        width: 100%;
        height: px(190);
        object-fit: cover;
      }
      .b-content {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        box-sizing: border-box;
        @include flex;
        justify-content: space-between;
        height: 100%;
        padding: 0 20px;
        .left {
          @include flex;
          .l-item {
            width: px(120);
            height: px(120);
            border: 1px dashed rgba(255, 255, 255, 0.7);
            border-radius: 50%;
            @include flex(column);
            color: #fff;
            margin-right: px(20);
            div:first-child {
              font-size: px(40);
              span {
                font-size: px(14);
                margin-right: px(5);
              }
            }
            div:last-child {
              margin-top: px(8);
              font-size: px(14);
            }
          }
        }
        .right {
          @include flex(column);
          .r1 {
            font-size: px(42);
            color: #fff;
            margin-bottom: px(14);
          }
          .r2 {
            width: px(120);
            height: px(30);
            border: 1px solid rgba(255, 255, 255, 1);
            border-radius: px(15);
            color: #fff;
            @include flex;
            cursor: pointer;
            font-size: px(14);
          }
        }
      }
    }
  }

  .group {
    width: 100%;
    background-color: #f6fafb;
    padding: px(55) 0;
    .swiper-pagination-bullet {
      opacity: 1;
      background-color: #e5e5e5;
    }
    .swiper-pagination-bullet-active {
      background-color: #225c45;
    }
    .more {
      width: px(250);
      height: px(70);
      border: 1px solid rgba(210, 210, 210, 1);
      border-radius: px(35);
      @include flex;
      color: #666666;
      font-size: px(18);
      margin: 0 auto;
      margin-top: px(60);
    }
  }
  .content2 {
    padding: px(46) px(20) px(80) px(20);
    text-align: center;
    .brand {
      width: 100%;
      position: relative;
      @include flex(column);
      img {
        width: 100%;
        height: px(300);
        object-fit: cover;
      }
      .brand-content {
        width: 100%;
        height: 100%;
        background: rgba(34, 92, 69, 1);
        position: relative;
        right: 0;
        top: 0;
        color: #fff;
        padding: px(40);
        box-sizing: border-box;
        padding-bottom: 0;
        transition: all 0.2s linear;
        text-align: left;
        .title {
          font-size: px(40);
        }
        .s-title {
          font-size: px(36);
          margin-top: px(19);
        }
        .text {
          margin-top: px(42);
          line-height: px(24);
          font-size: px(20);
        }
        .learn {
          width: 100%;
          margin-top: px(20);
          font-size: px(20);
          text-align: right;
          position: relative;
          cursor: pointer;
          padding-bottom: px(45);
          i {
            font-size: px(20);
            color: #fff;
          }
        }
      }
    }
    .hot-goods {
      width: 100%;
      margin-top: px(62);
      .swiper-pagination-bullet {
        opacity: 1;
        background-color: #e5e5e5;
      }
      .swiper-pagination-bullet-active {
        background-color: #225c45;
      }
      .title {
        font-size: px(45);
      }
      .s-title {
        color: #888888;
        margin-top: px(20);
      }
    }
    .class {
      margin-top: px(100);
      .title {
        font-size: px(46);
      }
      .s-title {
        color: #888888;
        margin-top: px(17);
        font-size: px(20);
      }
      .items {
        margin-top: px(34);
        @include flex;
        justify-content: space-between;
        flex-wrap: wrap;
        width: 100%;
        .item {
          width: 100%;
          margin-bottom: px(50);
          @include flex;
          justify-content: flex-start;
          img {
            height: px(165);
            width: px(254);
            object-fit: cover;
          }
          .inner {
            .stitle {
              width: 100%;
              font-size: px(24);
              margin-top: 0;
              text-align: left;
              cursor: pointer;
              margin-top: px(15);
            }
            .date {
              width: 100%;
              color: #888888;
              margin-top: 0;
              text-align: left;
              font-size: px(28);
              margin-top: px(12);
            }
            .text {
              width: 100%;
              height: px(72);
              font-size: px(18);
              text-align: left;
              line-height: px(24);
              color: #666666;
              @include ellipsis(3);
              margin-top: px(14);
            }
          }
        }
      }
    }
  }
}
</style>
