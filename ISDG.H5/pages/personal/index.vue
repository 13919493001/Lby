<template>
  <div class="personal">
    <!--  -->
    <section class="top">
      <div class="content">
        <img :src="userInfo.avatar" />
        <div class="top_text">
          <div class="username">{{userInfo.nickname}}</div>
          <div class="id">会员ID110000056</div>
        </div>
      </div>
    </section>
    <!--  -->
    <section class="middle">
      <div class="m1">
        <div class="title">我的订单</div>
        <div class="items">
          <nuxt-link
            :to="{path:item.path,query:{id:item.id}}"
            class="item"
            v-for="(item, index) in menu1"
            :key="index"
            tag="div"
          >
            <div class="img_area " :style="{ background: item.bg }">
              <img :src="item.pcImg" />
            </div>
            <div>{{ item.name }}</div>
          </nuxt-link>
        </div>
      </div>
      <div class=" m1 m2">
        <div class="title">其它</div>
        <div class="items">
          <nuxt-link
            :to="item.path"
            class="item"
            v-for="(item, index) in menu2"
            :key="index"
            tag="div"
          >
            <div class="img_area " :style="{ background: item.bg }">
              <img :src="item.pcImg" />
            </div>
            <div>{{ item.name }}</div>
          </nuxt-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from "@/plugins/api/api";
export default {
  data() {
    return {
      userInfo:[],
      menu1: [
        {
          name: "待付款",
          pcImg: require("@/static/icon/pc/1.png"),
          path: "personal/order",
          bg: "#8ABAB6",
          id:1
        },
        {
          name: "待收货",
          pcImg: require("@/static/icon/pc/2.png"),
          path: "personal/order",
          bg: "#A8CBB6",
          id:2
        },
        {
          name: "已完成",
          pcImg: require("@/static/icon/pc/3.png"),
          path: "personal/order",
          bg: "#F4E6DF",
          id:3
        },
        {
          name: "已取消",
          pcImg: require("@/static/icon/pc/4.png"),
          path: "personal/order",
          bg: "#E1C3BF",
          id:4
        }
      ],
      menu2: [
        {
          name: "我的积分",
          pcImg: require("@/static/icon/pc/5.png"),
          path: "personal/points",
          bg: "#998484"
        },
        {
          name: "我要提现",
          pcImg: require("@/static/icon/pc/6.png"),
          path: "personal/cashOut",
          bg: "#599C9D"
        },
        {
          name: "消费清单",
          pcImg: require("@/static/icon/pc/7.png"),
          path: "personal/cashList",
          bg: "#488E9C"
        },
        {
          name: "我要退货",
          pcImg: require("@/static/icon/pc/8.png"),
          path: "personal/mySalesR",
          bg: "#A5D5AB"
        },
        {
          name: "我的分享码",
          pcImg: require("@/static/icon/pc/9.png"),
          path: "personal/shareCode",
          bg: "#A5D5AB"
        },
        {
          name: "我的分销",
          pcImg: require("@/static/icon/pc/10.png"),
          path: "personal/distribution",
          bg: "#E5C39E"
        },
        {
          name: "我的收藏",
          pcImg: require("@/static/icon/pc/11.png"),
          path: "personal/collection",
          bg: "#F0F4E5"
        },
        {
          name: "我的优惠券",
          pcImg: require("@/static/icon/pc/12.png"),
          path: "personal/coupon",
          bg: "#EDE85F"
        },
        {
          name: "收货地址",
          pcImg: require("@/static/icon/pc/13.png"),
          path: "personal/address",
          bg: "#CBF3CC"
        },
        {
          name: "建议与反馈",
          pcImg: require("@/static/icon/pc/14.png"),
          path: "personal/feedback",
          bg: "#A9DFBA"
        },
        {
          name: "消息中心",
          pcImg: require("@/static/icon/pc/15.png"),
          path: "personal/message",
          bg: "#90CEBE"
        },
        {
          name: "设置",
          pcImg: require("@/static/icon/pc/16.png"),
          path: "personal/config",
          bg: "#92DAD8"
        }
      ]
    };
  },
  mounted(){
    api.personal.User().then((res)=>{
      this.userInfo=res.data
      console.log(res.data);
      
    })
  }
};
</script>

<style lang="scss" scoped>
.personal {
  width: 100%;
  min-height: 100vh;
  background-color: #f3f0f3;
}
.top {
  width: 100%;
  position: relative;
  @include flex;
  height: 150px;
  background: url("~static/icon/banner.png");
  background-size: cover;
  .content {
    @include flex;
    position: relative;
    z-index: 2;
    img {
      width: 85px;
      height: 85px;
      border-radius: 50%;
      object-fit: cover;
      border: 10px solid #fff;
      border-color: rgba($color: #fff, $alpha: 0.2);
      margin-right: 30px;
    }
    .top_text {
      @include flex(column);
      align-items: flex-start;
      color: #fff;
      .username {
        font-size: 24px;
      }
      .id {
        font-size: 14px;
        margin-top: 8px;
      }
    }
  }
}
.middle {
  width: 100%;
  .img_area {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    background: #8abab6;
    @include flex;
    margin-bottom: 19px;
  }
  .m1 {
    max-width: 1200px;
    height: 300px;
    background: #fff;
    border-radius: 5px;
    margin: 0 auto;
    margin-top: 40px;
    box-sizing: border-box;
    @include flex(column);
    justify-content: space-between;
    padding: 34px 33px 50px 33px;
    .title {
      font-size: 24px;
      color: #333;
    }
  }
  .m2 {
    height: 624px;
    .items {
      .item {
        border-bottom: 0;
        border-right: 0;
        &:nth-child(4n) {
          border-right: 1px solid #eee;
        }
        &:nth-child(n + 9) {
          border-bottom: 1px solid #eee;
        }
      }
    }
  }
}
.items {
  @include flex;
  flex-wrap: wrap;
  width: 100%;
  .item {
    @include flex(column);
    cursor: pointer;
    flex: 23%;
    padding: 30px 0;
    border: 1px solid #eee;
    &:not(:last-child) {
      border-right: 0;
    }
  }
}

@media screen and (max-width: 768px) {
  .top {
    .content {
      @include flex;
      position: relative;
      z-index: 2;
      img {
        width: px(118);
        height: px(118);
        border-radius: 50%;
        object-fit: cover;
        border: px(20) solid #fff;
        border-color: rgba($color: #fff, $alpha: 0.2);
        margin-right: 30px;
      }
      .top_text {
        @include flex(column);
        align-items: flex-start;
        color: #fff;
        .username {
          font-size: px(34);
        }
        .id {
          font-size: px(22);
          margin-top: 8px;
        }
      }
    }
  }
  .middle {
    width: 100%;
    .img_area {
      width: px(75);
      height: px(75);
      margin-bottom: px(18);
    }
    .m1 {
      width: 100%;
      height: 100%;
      background: #fff;
      border-radius: 0;
      margin: 0 auto;
      margin-top: 0;
      box-sizing: border-box;
      @include flex(column);
      justify-content: space-between;
      padding: px(50) px(20);
      .title {
        font-size: px(36);
        color: #333;
        margin-bottom: px(46);
      }
    }
    .m2 {
      padding-top: 0;
      height: 100%;
      .items {
        .item {
          border-bottom: 0;
          border-right: 0;
          &:nth-child(4n) {
            border-right: 1px solid #eee;
          }
          &:nth-child(n + 9) {
            border-bottom: 1px solid #eee;
          }
        }
      }
    }
  }
  .items {
    @include flex;
    flex-wrap: wrap;
    width: 100%;
    .item {
      @include flex(column);
      cursor: pointer;
      flex: 23%;
      padding: px(22) 0;
      border: 1px solid #eee;
      font-size: px(24);
      &:not(:last-child) {
        border-right: 0;
      }

      img {
        max-width: px(37);
        max-height: px(37);
      }
    }
  }
}
</style>
