<template>
  <div class="banner">
    <img src="@/static/icon/news.png" alt="" class="bg" />
    <!-- <div class="content">
      <img src="@/static/demo/demo2.png" alt="" />
      <div class="right">
        <div class="text">
          approprriate crowd
        </div>
        <div class="text2">胶原蛋白口服液</div>
        <div class="btn">点击了解</div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  props:{
    imgUrl:String
  }
};
</script>

<style lang="scss" scoped>
.banner {
  position: relative;
  height: 100%;
  width: 100%;
  .bg {
    width: 100%;
    height: 580px;
    object-fit: cover;
  }
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @include flex;
    img {
      max-width: 450px;
      max-height: 450px;
      object-fit: cover;
      box-shadow: 0px 30px 30px -30px #849bb5;
    }
    .right {
      margin-left: 60px;
      color: #788fa8;
      width: 400px;
      .text {
        background: linear-gradient(
          0deg,
          rgba(84, 108, 134, 1) 0%,
          rgba(168, 185, 202, 1) 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 48px;
      }
      .text2 {
        @extend .text;
        font-size: 50px;
        margin-top: 5px;
      }
      .btn {
        margin-top: 30px;
        width: 150px;
        height: 45px;
        background: linear-gradient(
          90deg,
          rgba(84, 108, 134, 1),
          rgba(168, 185, 202, 1)
        );
        border-radius: 22px;
        @include flex;
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
@media screen and (max-width: 1200px) {
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @include flex;
    img {
      max-width: 300px !important;
      max-height: 300px !important;
      object-fit: cover;
      box-shadow: 0px 15px 15px -15px #849bb5;
    }
    .right {
      margin-left: 30px;
      color: #788fa8;
      width: 300px;
      .text {
        background: linear-gradient(
          0deg,
          rgba(84, 108, 134, 1) 0%,
          rgba(168, 185, 202, 1) 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 30px;
      }
      .text2 {
        font-size: 35px;
        margin-top: 5px;
      }
      .btn {
        margin-top: 30px;
        width: 120px !important;
        height: 35px !important;
        background: linear-gradient(
          90deg,
          rgba(84, 108, 134, 1),
          rgba(168, 185, 202, 1)
        );
        border-radius: 20px;
        @include flex;
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .banner {
    position: relative;
    height: px(400);
    width: 100%;
    .bg {
      width: 100%;
      height: px(400);
      object-fit: fill;
    }
    .content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      @include flex;
      img {
        max-width: px(300) !important;
        max-height: px(300) !important;
        object-fit: cover;
        box-shadow: 0px px(30) px(30) -px(30) #849bb5;
      }
      .right {
        margin-left: px(20);
        color: #788fa8;
        width: px(340);
        .text {
          background: linear-gradient(
            0deg,
            rgba(84, 108, 134, 1) 0%,
            rgba(168, 185, 202, 1) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: px(40);
        }
        .text2 {
          font-size: px(48);
          margin-top: 5px;
        }
        .btn {
          margin-top: px(20);
          width: px(200) !important;
          height: px(60) !important;
          font-size: px(22);
          background: linear-gradient(
            90deg,
            rgba(84, 108, 134, 1),
            rgba(168, 185, 202, 1)
          );
          border-radius: px(30);
          @include flex;
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
