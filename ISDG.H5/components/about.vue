<template>
  <div class="about">
    <!-- 相关推荐 -->
    <div class="title">相关推荐</div>
    <div class="content">
      <!-- <div class="item" v-for="(item, index) in list" :key="index">
        <div>
          <img :src="item.image" alt="" />
        </div>
        <div class="name">
          {{item.store_name}}
        </div>
        <div class="price">￥{{item.price}}</div>
      </div> -->
            <div v-swiper:swiper="swiperOption" class="swiper-option">
        <div class="swiper-wrapper">
          <div
            class="item swiper-slide"
            v-for="(item, index) in list"
            :key="index"
          >
            <div @click="goDetail(item.id)">
                <div>
          <img :src="item.image" alt="" />
        </div>
        <div class="name">
          {{item.store_name}}
        </div>
        <div class="price">￥{{item.price}}</div>
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
    </div>
  </div>
</template>

<script>
import api from "@/plugins/api/api";

export default {
  props:{
    id:{
      default:0
    }
  },
  data(){
    return{
      list:[],
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
    }
  },
  mounted(){
    console.log(this.likeInfo,this.id);
    
    if(this.id!=0){
      api.home.goodsDetail(this.id).then(res => {
      this.list=res.data.similarity
      })
    }else{
      api.home.hotsales().then((res)=>{
        this.list=res.data
      })
    }
  },
  methods:{
    goDetail(id){
          this.$router.push({path:'/goods/detail',query: {id:id}})
    }
  }
};
</script>

<style lang="scss" scoped>
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
.about {
  width: 100%;
  .title {
    font-size: 24px;
    color: #333;
    text-align: center;
    margin-top: 60px;
  }
  .content {
    margin-top: 58px;
    @include flex();
    justify-content: space-between;
    .item {
      @include flex(column);
      img {
        width: 144px;
        height: auto;
      }
      .name {
        margin-top: 55px;
        text-align: center;
        @include ellipsis(2);
      }
      .price {
        font-weight: bold;
        margin-top: 22px;
        text-align: center;
      }
    }
  }
}
@media screen and (max-width: 768px) {
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
</style>
