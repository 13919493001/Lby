<template>
  <div class="contactus">
    <img src="@/static/icon/contactus1.png" alt="" class="banner" />
    <div class="content">
      <div class="left">
        <div class="l1">
          <img src="@/static/icon/contactus2.png" alt="" />
          <div>在线顾问</div>
        </div>
        <div class="l2">
          我们的在线客服在工作日9:00-22:00，节假日9:00-18:00（春节假期除外）提供咨询服务。
        </div>
        <div class="l3">
          <img src="@/static/icon/contactus3.png" alt="" />在线顾问
        </div>
        <div class="l4">
          <img src="@/static/icon/contactus4.png" alt="" />
          <div>客服咨询热线</div>
        </div>
        <div class="l5">
          我们的热线客服从工作日9:00-22:00，节假日9:00-18:00（春节假期除外）为您提供在线购物、
          线下门店及商品资讯，
        </div>
        <div class="l6">
          <div>来电请致:</div>
          <img src="@/static/icon/contactus5.png" alt="" />
          <div>400—800—6785</div>
        </div>
        <div class="l7">
          邀请您关注ISDG官方微信公众号、官方微博
        </div>
        <div class="l8">了解选购和最新资讯</div>
        <div class="l9">
          <div class="inner">
            <img src="@/static/demo/ISDG_WX.jpg" alt="" />
            <div>微信公众号</div>
          </div>
          <div class="inner">
            <img src="@/static/demo/ISDG_WB.png" alt="" />
            <div>官方微博</div>
          </div>
        </div>
        <!-- <div class="l10">
          <img src="@/static/icon/contactus6.png" alt="" />
          <div>公司地址</div>
        </div>
        <div class="l11">
          中国 河南省 郑州市 XXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        </div> -->
      </div>
      <!-- <div id="allmap"></div> -->
    </div>
  </div>
</template>

<script>
export default {
  // methods: {
  //   init() {
  //     // 百度地图API功能
  //     var map = new BMap.Map("allmap"); // 创建Map实例
  //     var point = new BMap.Point(119.316, 26.085);
  //     map.centerAndZoom(point, 15); // 初始化地图,设置中心点坐标和地图级别
  //     //添加地图类型控件
  //     map.addControl(
  //       new BMap.MapTypeControl({
  //         mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
  //       })
  //     );
  //     var address = "福州市鼓楼区五一北路129号榕城商贸中心21楼";
  //     var marker = new BMap.Marker(point); // 创建标注
  //     map.addOverlay(marker); // 将标注添加到地图中
  //     var opts = {
  //       width: 200, // 信息窗口宽度
  //       height: 100, // 信息窗口高度
  //       title: "", // 信息窗口标题
  //       offset: new BMap.Size(0, 0)
  //     };
  //     var infoWindow = new BMap.InfoWindow(address, opts); // 创建信息窗口对象

  //     map.openInfoWindow(infoWindow, point); //开启信息窗口
  //     marker.addEventListener("click", function() {
  //       map.openInfoWindow(infoWindow, point); //开启信息窗口
  //     });
  //     var top_left_navigation = new BMap.NavigationControl();
  //     map.addControl(top_left_navigation); //添加缩放偏移控件
  //     map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
  //   }
  // },
  // mounted() {
  //   this.init();
  // }
};
</script>

<style lang="scss" scoped>
.contactus {
  width: 100%;
  background-color: #f6f5f8;
}
.banner {
  width: 100%;
  height: auto;
  object-fit: cover;
}
.content {
  max-width: 1200px;
  padding: 60px 10px 80px 10px;
  box-sizing: border-box;
  margin: 0 auto;
  @include flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  .left {
    width: 575px;
    margin: 0 auto;
    .l1 {
      @include flex;
      font-size: 16px;
      font-weight: bold;
      justify-content: flex-start;
      img {
        margin-right: 7px;
      }
    }
    .l2 {
      margin-top: 20px;
    }
    .l3 {
      margin-top: 25px;
      width: 150px;
      height: 45px;
      background-color: #225c45;
      cursor: pointer;
      @include flex;
      color: #fff;
      img {
        margin-right: 7px;
      }
    }
    .l4 {
      margin-top: 30px;
      @extend .l1;
    }
    .l5 {
      height: 48px;
      line-height: 24px;
      margin-top: 20px;
    }
    .l6 {
      margin-top: 14px;
      @include flex;
      justify-content: flex-start;
      div:last-child {
        font-weight: bold;
      }
      img {
        margin-left: 7px;
      }
    }
    .l7 {
      margin-top: 40px;
      font-size: 16px;
      font-weight: bold;
    }
    .l8 {
      margin-top: 24px;
    }
    .l9 {
      margin-top: 20px;
      @include flex;
      justify-content: flex-start;
      .inner {
        img {
          width: 93px;
          height: 93px;
          object-fit: cover;
        }
        @include flex(column);
        div {
          margin-top: 10px;
          color: #888888;
        }
        &:last-child {
          margin-left: 27px;
        }
      }
    }
    .l10 {
      margin-top: 40px;
      @extend .l1;
    }
    .l11 {
      margin-top: 18px;
      color: #888888;
    }
  }
  #allmap {
    width: 600px;
    height: 600px;
    overflow: hidden;
    margin: 0 auto;
  }
}

@media screen and (max-width: 768px) {
  .banner {
    width: 100%;
    height: px(339);
    object-fit: cover;
  }
  .content {
    width: 100%;
    padding: px(48) 10px 0 10px;
    box-sizing: border-box;
    margin: 0 auto;
    @include flex(column);
    justify-content: flex-start;
    align-items: flex-start;
    .left {
      width: 100%;
      margin: 0 auto;
      font-size: px(20);
      .l1 {
        @include flex;
        font-size: px(30);
        font-weight: bold;
        justify-content: flex-start;
        img {
          margin-right: px(8);
          width: px(25);
          height: auto;
        }
      }
      .l2 {
        margin-top: px(20);
      }
      .l3 {
        margin-top: px(25);
        width: px(200);
        height: px(60);
        background-color: #225c45;
        cursor: pointer;
        @include flex;
        color: #fff;
        img {
          margin-right: px(8);
          width: px(32);
          height: auto;
        }
      }
      .l4 {
        margin-top: px(30);
      }
      .l5 {
        height: px(48);
        line-height: px(24);
        margin-top: px(20);
      }
      .l6 {
        margin-top: px(14);
        @include flex;
        justify-content: flex-start;
        div:last-child {
          font-weight: bold;
        }
        img {
          margin-left: px(8);
        }
      }
      .l7 {
        margin-top: px(40);
        font-size: px(30);
        font-weight: bold;
      }
      .l8 {
        margin-top: px(24);
      }
      .l9 {
        margin-top: px(20);
        @include flex;
        justify-content: flex-start;
        .inner {
          img {
            width: px(123);
            height: px(123);
            object-fit: cover;
          }
          @include flex(column);
          div {
            margin-top: px(10);
            color: #888888;
          }
          &:last-child {
            margin-left: px(28);
          }
        }
      }
      .l10 {
        margin-top: px(40);
      }
      .l11 {
        margin-top: px(18);
        color: #888888;
      }
    }
    #allmap {
      width: 100%;
      height: px(600);
      overflow: hidden;
      margin: 0 auto;
      margin-top: px(50);
    }
  }
}
</style>
