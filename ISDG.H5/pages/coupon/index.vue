<template>
  <div class="coupon">
    <div class="banner-all">
      <div class="banner-content">
        <div class="banner-title">优惠卷</div>
      </div>
    </div>
    <div class="content">
      <div class="main">
        <div class="item" v-for="(item, index) in couponList" :key="index">
          <div class="img">
            <img src="@/static/icon/coupon.png" alt="" />
            <div class="money">
              <div>￥<span>{{ item.coupon_price }}</span></div>
              <div>全场通用</div>
            </div>
            <div class="date">
              <div>使用条件：满{{item.title}}</div>
              <div>有效时间：{{item.start_time}} 至 {{item.end_time}}</div>
              <div>使用条件：满{{item.use_min_price}}</div>
            </div>
          </div>
          <div class="use">
            <div class="btn" @click="getCoupon(index)">点击领取</div>
          </div>
        </div>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="0"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        prev-text="上一页"
        next-text="下一页"
        :pager-size="limit"
      >
      </el-pagination>
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
      couponList:[],
      limit: 5, //每页显示数量
      pageTotal: 0, //总页数
      currentPage: 1, //当前页码
    };
  },
  methods: {
    init() {
      let params = {page: this.currentPage, limit:this.limit}
      api.activity.couponList(params).then(res => {
        console.log(res.data)
        this.couponList = res.data;
        this.pageTotal = res.data.length;
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.init();
    },
    getCoupon(index){
      api.home.couponsReceive({couponId:this.couponList[index].id}).then((res)=>{
        if(res.status==200){
					this.$message({
            message: res.msg,
            type: 'success'
          });
				}
      })
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.coupon {
  width: 100%;
  height: 100%;
  background-color: #fffeff;
}
/deep/.el-popup-parent--hidden {
  padding: 0 !important;
}
.banner-all {
  width: 100%;
  position: relative;
  height: 150px;
  background: url("~static/icon/banner.jpg");
  background-size: cover;
  .banner-content {
    max-width: 1200px;
    margin: 0 auto;
    @include flex;
    height: 100%;
    .banner-title {
      font-size: 24px;
      color: #fff;
      text-align: center;
      width: 100%;
    }
  }
}
.content {
  max-width: 1200px;
  margin-top: -30px;
  padding: 86px 20px 40px 20px;
  margin: 0 auto;
  @include pagination;
  .main {
    width: 100%;
    @include flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      width: 330px;
      height: 210px;
      margin-bottom: 48px;
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
    .el-pagination {
      margin-top: 40px;
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
    .banner-content {
      width: 100%;
      margin: 0 auto;
      .banner-title {
        margin-top: px(30);
        font-size: px(34);
        color: #fff;
        text-align: center;
        width: 100%;
      }
    }
  }
  .content {
    width: 100%;
    margin-top: px(-30);
    padding: px(59) 0 px(100) 0;
    margin: 0 auto;
    @include pagination("m");
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
