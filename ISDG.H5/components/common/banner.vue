<template>
  <div>
    <div class="banner" v-if="num==1">
      <div class="banner-content">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <div class="nowurl">当前位置:</div>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item >{{story}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div v-if="title" class="banner-title">{{ title }}</div>
      </div>
    </div>
    <div class="banner-all" v-else>
      <div class="banner-content">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <div class="nowurl">当前位置:</div>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/personal'}">个人中心</el-breadcrumb-item>
        </el-breadcrumb>
        <div v-if="title" class="banner-title">{{ title }}</div>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    num:{
      type:Number,
      default:0
    },
    story:{
      type:String,
      default:""
    }
  },
  data(){
    return{
    
    }
  }
};
</script>

<style lang="scss" scoped>
.banner-all {
  width: 100%;
  position: relative;
  height: 150px;
  background: url("~static/icon/banner.jpg");
  background-size: cover;
  .banner-content {
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 35px;
    box-sizing: border-box;
    /deep/.el-breadcrumb {
      display: flex;
      color: #fff !important;
      width: 100%;
      .nowurl {
        margin-right: 10px;
      }
      .el-breadcrumb__item {
        color: #fff;
        .el-breadcrumb__inner {
          color: #fff;
          font-weight: 400 !important;
        }
      }
    }
    .banner-title {
      margin-top: 10px;
      font-size: 24px;
      color: #fff;
      text-align: center;
      width: 100%;
    }
  }
}
.banner{
  width: 100%;
  position: relative;
  height: 100px;
  background: none; 
  .banner-content {
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 35px;
    box-sizing: border-box;
    /deep/.el-breadcrumb {
      display: flex;
      color: #888 !important;
      width: 100%;
      .nowurl {
        margin-right: 10px;
      }
      .el-breadcrumb__item {
        color: #888;
        .el-breadcrumb__inner {
          color: #888;
          font-weight: 400 !important;
        }
      }
    }
    .banner-title {
      margin-top: 10px;
      font-size: 24px;
      color: #888;
      text-align: center;
      width: 100%;
    }
  }
}
 

@media screen and (max-width: 768px) {
  .banner-all {
    width: 100%;
    position: relative;
    height: px(200);
    background: url("~static/icon/banner.jpg");
    background-size: cover;
  }
  .banner-content {
      width: 100%;
      margin: 0 auto;
      padding: px(0) px(20);
      box-sizing: border-box;
      /deep/.el-breadcrumb {
        display: flex;
        color: #fff !important;
        width: 100%;
        margin-top: px(-40);
        .nowurl {
          margin-right: px(10);
          font-size: px(20);
        }
        .el-breadcrumb__item {
          color: #fff;
          font-size: px(20);
          .el-breadcrumb__inner {
            color: #fff;
            font-weight: 400 !important;
          }
        }
      }
      .banner-title {
        margin-top: px(30);
        font-size: px(34);
        color: #fff;
        text-align: center;
        width: 100%;
      }
    }
    .banner {
    width: 100%;
  position: relative;
  height: px(100);
  background: none; 
    .banner-content {
      width: 100%;
      margin: 0 auto;
      // padding: px(30) px(20);
      box-sizing: border-box;
      /deep/.el-breadcrumb {
        display: flex;
        color: #888 !important;
        width: 100%;
        .nowurl {
          margin-right: px(10);
          font-size: px(20);
        }
        .el-breadcrumb__item {
          color: #888;
          font-size: px(20);
          .el-breadcrumb__inner {
            color: #888;
            font-weight: 400 !important;
          }
        }
      }
      .banner-title {
        margin-top: px(30);
        font-size: px(34);
        color: #888;
        text-align: center;
        width: 100%;
      }
    }
  }
  
}
</style>
