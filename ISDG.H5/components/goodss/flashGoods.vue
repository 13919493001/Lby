<template>
  <div class="sub-content">
    <div class="item" v-for="(item, index) in goodsList" :key="index">
      <div
        class="img"
        @mouseenter="
          active = true;
          activeId = index;
        "
        @mouseleave="active = false"
      >
        <img :src="item.image" alt="" />
        <transition name="el-fade-in">
          <div class="buy" v-if="active && activeId === index">
            <div class="buy-btn" @click="goDetail(item.id)">
              <img src="@/static/icon/icon5-2.png" alt="" />
              <div>立即购买</div>
            </div>
          </div>
        </transition>
      </div>
     
       <div class="title" >
      {{item.title}}
      </div>
      <div class="price">
        {{item.price}}
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/plugins/api/api";
export default {
  props: {
    goodsList: {
      default:[],
      type:Array
    }
  },
  data() {
    return {
      active: false,
      activeId: -1,
    };
  },
  methods: {
    // jump() {
    //   this.$emit("jump");
    // },
    goDetail(id){

          this.$router.push({path:'/flashSale/detail',query: {id:id}})
    }

  }
};
</script>

<style lang="scss" scoped>
.sub-content {
  width: 100%;
  @include flex;
  flex-wrap: wrap;
  justify-content: space-between;
  &::after {
    content: "";
    width: 340px;
  }
  .item {
    width: 340px;
    height: 100%;
    margin-bottom: 24px;
    transition: all 0.2s linear;
    position: relative;
    .img {
      width: 100%;
      height: 340px;
      @include flex;
      background-color: #fff;
      position: relative;
      img {
        max-width: 340px;
        max-height: 340px;
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
      margin-top: 30px;
      width: 100%;
      text-align: center;
      font-weight: bold;
    }
    .oldPrice {
      color: #888888;
      margin-top: 10px;
      text-decoration: line-through;
    }
    .tip {
      position: absolute;
      width: 75px;
      height: 25px;
      background: rgba(255, 46, 122, 1);
      border-radius: 12px;
      @include flex;
      color: #fff;
      top: 16px;
      right: 16px;
    }
    .buy {
      width: 100%;
      height: 100%;
      background: rgba(17, 17, 17, 0.2);
      @include flex;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;
      .buy-btn {
        width: 150px;
        height: 50px;
        background: #fff;
        border-radius: 25px;
        @include flex;
        cursor: pointer;
        img {
          margin-right: 8px;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .sub-content {
    width: 100%;
    @include flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &::after {
      content: "";
      width: px(260);
    }
    .item {
      width: px(260);
      height: 100%;
      margin-bottom: px(90);
      font-size: px(24);
      .img {
        width: 100%;
        height: px(260);
        @include flex;
        background-color: #fff;
        img {
          max-width: px(260);
          max-height: px(260);
        }
      }
      .title {
        height: px(48);
        line-height: px(24);
        text-align: center;
        width: 100%;
        margin-top: 34px;
        font-size: px(24);
      }
      .price {
        margin-top: px(30);
        width: 100%;
        text-align: center;
      }
      .tip {
        position: absolute;
        width: px(86);
        height: px(30);
        background: rgba(255, 46, 122, 1);
        border-radius: px(15);
        @include flex;
        color: #fff;
        top: px(0);
        right: px(0);
        font-size: px(16);
      }
      .buy {
        width: 100%;
        height: 100%;
        background: rgba(17, 17, 17, 0.2);
        @include flex;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
        .buy-btn {
          width: px(160);
          height: px(60);
          background: #fff;
          border-radius: px(30);
          @include flex;
          cursor: pointer;
          font-size: px(20);
          img {
            margin-right: px(8);
            width: px(18);
            height: px(19);
          }
        }
      }
    }
  }
}
</style>
