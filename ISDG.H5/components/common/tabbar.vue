<template>
  <div class="tabbar">
    <div class="sec1">
      <div class="content">
        <div class="item">
          <img src="@/static/icon/tabbar1.png" alt="" />
          <div>100%官方正品保证</div>
        </div>
        <div class="item">
          <img src="@/static/icon/tabbar2.png" alt="" />
          <div>支持多种支付方式</div>
        </div>
        <div class="item">
          <img src="@/static/icon/tabbar3.png" alt="" />
          <div>专享官网特惠礼遇</div>
        </div>
        <div class="item">
          <img src="@/static/icon/tabbar4.png" alt="" />
          <div>400—800—6785</div>
        </div>
      </div>
    </div>
    <div class="sec2">
      <div class="content">
        <div class="left">
          <div class="item" v-for="(item, index) in list" :key="index">
            <div class="title" @click="jump(index, item.path)">{{ item.title }}</div>
            <div
              v-for="(item2, index2) in item.childeren"
              @click="jump1(index,index2, item2.path)"
              :key="index2"
              class="subTitle"
            >
              <a href="https://www.kuaidi100.com/" class="alink" target="_blank" v-if="item2.title=='快递查询'">{{item2.title}}</a>
              <div v-else>{{ item2.title }}</div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="wx">
            <img src="@/static/demo/ISDG_WX.jpg" alt="" />
            <div>微信二维码</div>
          </div>
          <div class="wb">
            <img src="@/static/demo/ISDG_WB.png" alt="" />
            <div>微博二维码</div>
          </div>
        </div>
        <div class="link">
          友情链接：
          <a href="http://www.jyunintoiro.cn/#/home" target="_blank" rel="noopener noreferrer" class="alink">十人十彩</a>
        </div>
        <div class="copyright">
          <div>Copyright © 2017-2019 杭州城港电子商务有限公司 版权所有</div>
          <a href="http://www.beian.miit.gov.cn/state/outPortal/loginPortal.action;jsessionid=Et--n7HHLCxB9UI9DonwpMoT0l3KKqwrUxazdiAQieBSKVH2510T!-826076309" target="_blank" rel="noopener noreferrer" class="alink2" >浙ICP备19001416号-3</a>
          <div>客服邮箱：isdg-yk@isdg.cn 或致电：400-800-6785</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          title: "购物保障",
          path:"/story/shoppingGuide",
          childeren: [
            {
              title: "条款承诺",
              path: "/story/shoppingGuide?textId=13"
            },
            {
              title: "退款政策",
              path: "/story/shoppingGuide?textId=12"
            },
            {
              title: "商品退货流程",
              path: "/story/shoppingGuide?textId=34"
            }
          ]
        },
        {
          title: "新手上路",
          path:"/story/shoppingGuide",
          childeren: [
            {
              title: "新用户注册",
              path: "/register"
            },
            {
              title: "用户登录",
              path: "/login"
            },
            {
              title: "找回密码",
              path: "/home/findPwd"
            }
          ]
        },
        {
          title: "物流配送",
          path:"/story/shoppingGuide",
          childeren: [
            {
              title: "配送标准",
              path: "/story/shoppingGuide?textId=17"
            },
            {
              title: "快递查询",
              path: "#"
            }
          ]
        },
        {
          title: "关于我们",
          path:"/story/shoppingGuide",
          childeren: [
            {
              title: "关于我们",
              path: "/story/shoppingGuide?textId=18"
            },
            // {
            //   title: "联系我们",
            //   path: "/contactus"
            // }
          ]
        }
      ]
    };
  },
  methods:{
     jump(index, path) {
      this.$router.push({path:path,query:{id:index}});
    },
    jump1(index,index2, path) {
      this.$router.push({path:path,query:{id:index}});
    }
  }
};
</script>

<style lang="scss" scoped>
.alink{
  color: #FFF;
  text-decoration: none;
}

.tabbar {
  width: 100%;
  height: auto;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  color: #fff;
  .sec1 {
    font-size: px(14);
    width: 100%;
    background-color: #272727;
    .content {
      width: 100%;
      @include flex;
      flex-wrap: wrap;
      padding: px(30);
      box-sizing: border-box;
      justify-content: space-between;
      margin: 0 auto;
      .item {
        @include flex(column);
        align-items: center;
        img {
          margin: px(18);
        }
        &:nth-child(1) {
          img {
            width: px(34);
            height: px(34);
          }
        }
        &:nth-child(2) {
          img {
            width: px(29);
            height: px(29);
          }
        }
        &:nth-child(3) {
          img {
            width: px(35);
            height: px(30);
          }
        }
        &:nth-child(4) {
          img {
            width: px(32);
            height: px(32);
          }
        }
      }
    }
  }
  .sec2 {
    width: 100%;
    font-size: px(18);
    background-color: #000000;
    .alink2{
  color: #FFF;
  text-decoration: none;
  margin-top: -1px;
}
    .content {
      width: 100%;
      padding: px(60) px(40) px(80) px(40);
      @include flex;
      align-items: flex-start;
      box-sizing: border-box;
      flex-wrap: wrap;
      margin: 0 auto;
      .left {
        width: 100%;
        @include flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: flex-start;
        .item {
          @include flex(column);
          align-items: center;
          justify-content: flex-start;
          .title {
            cursor: pointer;
            font-size: px(24);
            margin-bottom: px(22);
            font-weight: bold;
          }
          .subTitle {
            div {
              margin-bottom: px(22);
              cursor: pointer;
            }
          }
        }
      }
      .right {
        width: 100%;
        margin: px(60);
        @include flex;
        img {
          width: px(118);
          height: px(118);
        }
        .wb {
          margin-left: px(20);
        }
      }
      .link {
        @include flex;
        width: 100%;
        margin-top: px(50);
        font-size: px(18);
      }
      .copyright {
        width: 100%;
        font-size: px(18);
        @include flex;
        flex-wrap: wrap;
        margin-top: px(30);
        div {
          margin-bottom: px(10);
        }
      }
    }
  }
}

@media screen and (min-width: 768px) {

  .tabbar {
    .sec1 {
      font-size: 14px;
      width: 100%;
      .content {
        max-width: 1200px;
        padding: 30px;
        .item {
          @include flex;
          img {
            margin: 0;
            margin-right: 16px;
          }
          &:nth-child(1) {
            img {
              width: 34px;
              height: 34px;
            }
          }
          &:nth-child(2) {
            img {
              width: 29px;
              height: 29px;
            }
          }
          &:nth-child(3) {
            img {
              width: 35px;
              height: 30px;
            }
          }
          &:nth-child(4) {
            img {
              width: 32px;
              height: 32px;
            }
          }
        }
      }
    }
    .sec2 {
      width: 100%;
      font-size: 18px;
      .alink2{
  color: #FFF;
  text-decoration: none;
  margin-top: -10px;
}
      .content {
        max-width: 1200px;
        padding: 40px 10px 40px 10px;
        background-color: #000000;
        justify-content: space-between;
        .left {
          width: 60%;
          @include flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: flex-start;
          .item {
            @include flex(column);
            align-items: center;
            justify-content: flex-start;
            .title {
              font-size: 18px;
              margin-bottom: 29px;
              font-weight: bold;
            }
            .subTitle {
              div {
                margin-bottom: 22px;
                cursor: pointer;
              }
              &:last-child {
                div {
                  margin-bottom: 0;
                }
              }
            }
          }
        }
        .right {
          width: 30%;
          font-size: 14px;
          margin: 0;
          @include flex;
          img {
            width: 95px;
            height: 95px;
          }
          .wx {
            div {
              text-align: center;
              margin-top: 10px;
            }
          }
          .wb {
            margin-left: 20px;
            @extend .wx;
          }
        }
        .link {
          @include flex;
          width: 100%;
          margin-top: 46px;
          font-size: 14px;
        }
        .copyright {
          width: 100%;
          font-size: 14px;
          @include flex;
          flex-wrap: wrap;
          margin-top: 24px;
          div {
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}
</style>
