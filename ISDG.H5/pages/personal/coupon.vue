<template>
  <div class="address">
    <banner />
    <div class="content">
      <div class="main">
        <div class="item" v-for="(item, index) in list" :key="index">
          <div class="img">
            <img src="@/static/icon/coupon.png" alt="" />
            <div class="money">
              <div>￥<span>{{item.coupon_price}}</span></div>
              <div>{{item._msg}}</div>
            </div>
            <div class="date">
              <div>{{item.coupon_title}}</div>
              <div>有效时间：{{item.add_time}} 至 {{item.end_time}}</div>
              <div>使用条件：满{{item.use_min_price}}</div>
            </div>
          </div>
          <div class="use">
            <div class="btn" @click="goShopping">去使用</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import banner from "@/components/common/banner";
import api from "@/plugins/api/api";
export default {
  components: {
    banner
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {},
      list:[]
    };
  },
  mounted(){
    api.personal.myCoupon(1).then((res)=>{
      this.list=res.data
    })
  },
  methods:{
    goShopping:function(){
      this.$router.push("../goods");
    }
  }
};
</script>

<style lang="scss" scoped>
.address {
  width: 100%;
  min-height: 100vh;
  background-color: #fffeff;
}
/deep/.el-popup-parent--hidden {
  padding: 0 !important;
}
.content {
  max-width: 1200px;
  margin-top: -30px;
  padding: 35px 0 57px 0;
  margin: 0 auto;
  .main {
    width: 100%;
    @include flex;
    flex-wrap: wrap;
    .item {
      width: 330px;
      height: 210px;
      border-left: 30px solid #fffeff;
      border-right: 30px solid #fffeff;
      margin-bottom: 30px;
      .img {
        height: 150px;
        width: 100%;
        padding: 20px 20px 17px 20px;
        box-sizing: border-box;
        position: relative;
        @include flex(column);
        justify-content: space-between;
        align-items: flex-start;
        color: #fff;
        img {
          position: absolute;
          z-index: 0;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .money {
          position: relative;
          z-index: 1;
          @include flex;
          justify-content: space-between;
          align-items: flex-end;
          width: 100%;
          span {
            font-size: 40px;
          }
        }
        .date {
          position: relative;
          z-index: 1;
          div:first-child {
            margin-bottom: 10px;
          }
          div:last-child {
            margin-top: 10px;
          }
        }
      }
      .use {
        width: 100%;
        height: 64px;
        @include flex;
        justify-content: space-between;
        padding: 0 19px;
        box-sizing: border-box;
        background-color: #f6f6f6;
        color: #666;
        div {
          cursor: pointer;
        }
        .btn {
          width: 74px;
          height: 31px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(220, 220, 220, 1);
          border-radius: 15px;
          @include flex;
          &:hover {
            background-color: #7cb49e;
            color: #fff;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .content {
    width: 100%;
    margin-top: px(-30);
    padding: px(59) 0 px(100) 0;
    margin: 0 auto;
    .main {
      width: 100%;
      @include flex;
      flex-wrap: wrap;
      .item {
        width: px(336);
        height: px(210);
        border-left: px(18) solid #fffeff;
        border-right: px(18) solid #fffeff;
        margin-bottom: px(50);
        .img {
          height: px(150);
          width: 100%;
          padding: px(10) px(5) px(10) px(5);
          box-sizing: border-box;
          position: relative;
          @include flex(column);
          justify-content: space-between;
          align-items: flex-start;
          color: #fff;
          img {
            position: absolute;
            z-index: 0;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          .money {
            position: relative;
            z-index: 1;
            @include flex;
            justify-content: space-between;
            align-items: flex-end;
            width: 100%;
            font-size: px(20);
            span {
              font-size: px(50);
            }
          }
          .date {
            position: relative;
            z-index: 1;
            font-size: px(18);
            div:first-child {
              margin-bottom: 10px;
            }
          }
        }
        .use {
          width: 100%;
          height: px(64);
          font-size: px(18);
          @include flex;
          justify-content: space-between;
          padding: 0 px(13);
          box-sizing: border-box;
          background-color: #f6f6f6;
          color: #666;
          div {
            cursor: pointer;
          }
          .btn {
            width: px(116);
            height: px(40);
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(220, 220, 220, 1);
            border-radius: px(20);
            @include flex;
            &:hover {
              background-color: #7cb49e;
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
