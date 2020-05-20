<template>
  <div>
    <orderSearch @search="search" />
    <slot />
    
    <div class="goods"  v-for="(item,index) in List" :key="index">
      <div class="goods_all" @click="changeId(index)">
        <div
          class="goods_item"
          :style="{ background: show&&item.order_id==order_id ? '#F6F6F6' : '#fff' }"
        >
          <div class="date">
            <div>{{item.hour}}</div>
            <div class="line"></div>
            <div>{{item.date}}</div>
          </div>
          <div class="right">
            <div class="code">
              <div>订单编号:</div>
              <div>{{item.order_id}}</div>
            </div>
            <div class="inner1">
              <div class="wait">
                <div>{{item._status._title}}</div>
                <div v-show="item._status._type==0">(59:00:00)</div>
              </div>
              <div class="info">
                <div v-if="item.is_abroad==0">境内订单</div>
                <div v-else-if="item.is_abroad==3">境内订单/境外订单</div>
                <div v-else>境外订单</div>
                <div v-if="item.combination_id!=0">(拼团商品)</div>
                <div v-else-if="item.seckill_id!=0">(秒杀商品)</div>
                <!-- <div v-else-if="item.seckill_id!=0">(积分商品)</div> -->
                <div v-else>(普通商品)</div>
              </div>
            </div>
            <div class="inner2">
              <div class="mont">
                <div>数量:</div>
                <div>{{item.total_num}}</div>
              </div>
              <div class="price">
                <div>总计:</div>
                <div>￥{{item.pay_price}}</div>
              </div>
              <div class="look" @click="show = !show">
                <div>查看详情</div>
                <i class="el-icon-arrow-up" v-if="show&&item.order_id==order_id"></i>
                <i class="el-icon-arrow-down" v-else></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="detail" v-if="show&&item.order_id==order_id">
        <div class="detail_item">
          <div v-for="(items,idx) in item.cartInfo" :key="idx" class="item">
            <div class="sec1">
              <img :src="items.productInfo[number].image" alt="" />
              <div class="name">
                <div class="name-inner1">
                  {{items.productInfo[number].store_name}}
                </div>
                <div class="name-inner2">
                  <div>{{items.product_attr_unique}}</div>
                  <div class="hidden-sm-and-up xs-inner">
                    <div>数量:{{items.cart_num}}</div>
                    <div>￥{{items.truePrice*items.cart_num}}</div>
                  </div>
                </div>
              </div>
              <div class="mount hidden-xs-only">
                数量:{{items.cart_num}}
              </div>
              <div class="price hidden-xs-only">
                <div>￥{{items.truePrice*items.cart_num}}</div>
                <!-- <div>￥1200.00(税后实际价格)</div> -->
              </div>
              <div class="space hidden-xs-only"></div>
            </div>
          </div>
          <div class="returnInfo">
            <div class="inner">
              <div>退货数量</div>
              <div>1</div>
            </div>
            <div class="inner">
              <div>退货原因</div>
              <div>发错规格了，不想要了。</div>
            </div>
            <div class="inner">
              <div>退款金额</div>
              <div>￥1200.00</div>
            </div>
            <div class="inner">
              <div>退积分</div>
              <div>1000积分</div>
            </div>
          </div>
          <div class="rAdd">
            <div class="title">寄回地址</div>
            <div class="content">
              <div>iSDG售后服务中心</div>
              <div>400-125-4587</div>
              <div>河南省 郑州市 XXXXXXISDG国贸大楼</div>
            </div>
          </div>
          <div class="returnPath">
            <div class="title">退货流程</div>
            <div class="content">
              <div>
                <div>发起退货申请待审核</div>
                <div class="time">2019-12-26 12:00:00</div>
              </div>
              <div>
                <div>审核通过，待收货</div>
                <div class="time">2019-12-26 12:00:00</div>
              </div>
            </div>
          </div>
          <div class="saleRetrurn">
            <div class="title">退货单号</div>
            <div class="content">
              <el-select v-model="value" placeholder="请选择物流公司" class="select">
                <el-option
                  v-for="(item,index) in options"
                  :key="index"
                  :label="item.name"
                  :value="item.nmae"
                >
                </el-option>
              </el-select>
              <el-input
                class="select input"
                placeholder="请输入运单号"
              ></el-input>
              <div class="saleRetrurnTip">
                注：非必填，输入运单号，可以加速退款进度哟。
              </div>
              <div class="btn">提交</div>
              <div class="btn">取消退货</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/plugins/api/api";
import orderSearch from "./order/orderSearch";
export default {
  props: {},
  data() {
    return {
      show: false,
      options: [],
      value: "",
      List:[],
      length:0,
      number:0,
      order_id:""
    };
  },
  components: {
    orderSearch
  },
  methods: {
    getList(){
      api.personal.orderList({type:-1,page:0,limit:5}).then((res)=>{
          this.List=res.data
          this.getTime()
          this.length=this.List.length
        })
        api.personal.logistics().then((res)=>{
          this.options=res.data
        })
     },
     getTime(){
      for(var i=0;i<this.List.length;i++){
        // console.log(this.timestampToTime(this.List[i].add_time))
        this.List[i].date=this.timestampToTime(this.List[i].add_time)[0]
        this.List[i].hour=this.timestampToTime(this.List[i].add_time)[1]
      }
    },
    timestampToTime(timestamp) {
	    var date = new Date(timestamp * 1000);
	    var Y = date.getFullYear() + '-';
	    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
	    var D = date.getDate() + ' ';
	    var h = date.getHours() + ':';
	    var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      var date=new Array(Y+M,D)
	    return date
    },
    search(data){
      api.personal.orderList({type:-1,search:data.orderId,stime:data.addTime,etime:data.endTime}).then((res)=>{
        this.List=res.date
        this.getTime()
        this.length=this.List.length
      })
    },
    changeId(index){
      this.order_id=this.List[index].order_id
    }
  },
  mounted(){
    this.getList();
  }
};
</script>

<style lang="scss" scoped>
.goods {
  border: 1px solid rgba(238, 238, 238, 1);
  .goods_all {
    width: 100%;
  }
  .goods_item {
    width: 100%;
    height: 82px;
    background: rgba(255, 255, 255, 1);
    padding: 16px;
    box-sizing: border-box;
    @include flex;
    color: #333;
    .date {
      @include flex(column);
      div:first-child {
        font-size: 30px;
      }
      .line {
        width: 100%;
        height: 1px;
        background: rgba(229, 229, 229, 1);
        margin-bottom: 9px;
        margin-top: 2px;
      }
      div:last-child {
        color: #888888;
      }
    }
    .flex {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
    .right {
      width: calc(100% - 60px);
      @include flex;
      flex-wrap: wrap;
      .code {
        flex: 3;
        margin-left: 30px;
        @extend .flex;
      }
      .inner1 {
        @include flex;
        flex: 4;
        .wait {
          flex: 1;
          margin-left: 5px;
          @extend .flex;
          color: #888888;
        }
        .info {
          flex: 1;
          @extend .flex;
        }
      }
      .inner2 {
        @include flex;
        flex: 5.5;
        .mont {
          flex: 1.5;
          @extend .flex;
        }
        .price {
          flex: 2;
          @extend .flex;
        }
        .look {
          cursor: pointer;
          flex: 2;
          @extend .flex;
          color: #225c45;
          i {
            color: #666666;
            margin-left: 10px;
          }
        }
      }
    }
  }
}
.detail {
  padding: 24px 30px 40px 30px;
  box-sizing: border-box;
  .detail_item {
    width: 100%;
    .item {
      @include flex(column);
      justify-content: flex-start;
      border-bottom: 1px solid #eeeeee;
      height: 100%;
      width: 100%;
      .sec1 {
        width: 100%;
        @include flex;
        flex-grow: 12.5;
        height: 140px;
        img {
          width: 100px;
          height: 100px;
          object-fit: cover;
        }
        .name {
          height: 100px;
          flex: 7;
          margin-left: 17px;
          .name-inner1 {
            height: 34px;
            line-height: 17px;
            @include ellipsis(2);
          }
          .name-inner2 {
            color: #888888;
          }
        }
        .mount {
          flex: 1.4;
          height: 100px;
          text-align: center;
        }
        .price {
          flex: 2.6;
          height: 100px;
          text-align: center;
        }
        .space {
          flex: 1.5;
        }
      }
    }
    .returnInfo {
      width: 100%;
      padding: 25px 0;
      border-bottom: 1px solid #eeeeee;
      .inner {
        @include flex;
        justify-content: flex-start;
        margin-bottom: 20px;
        &:last-child {
          margin-bottom: 0;
        }
        div:first-child {
          width: 60px;
          margin-right: 40px;
        }
        div:last-child {
          color: #888888;
        }
      }
    }
    .rAdd {
      padding: 25px 0;
      border-bottom: 1px solid #eeeeee;
      // @include flex;
      // justify-content: flex-start;
      // align-items: flex-start;
      .title {
        margin-right: 42px;
      }
      .content {
        div {
          margin-bottom: 10px;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
    .returnPath {
      @extend .rAdd;
      .content {
        // @include flex(column);
        .time {
          color: #888888;
          display: inline;
        }
      }
    }
    .saleRetrurn {
      @extend .returnPath;
      border-bottom: 0;
      .content {
        align-items: flex-start;
        .select {
          /deep/i {
            color: #000;
          }
          /deep/.el-input__inner {
            width: 253px;
            height: 45px;
            border-radius: 0;
            border: 1px solid #000000;
            &::placeholder {
              color: #000000;
            }
          }
        }
        .saleRetrurnTip {
          color: #888888;
        }
        .btn {
          width: 253px;
          height: 45px;
          background-color: #225c45;
          color: #fff;
          @include flex;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .goods {
    .goods_all {
      width: 100%;
    }
    .goods_item {
      height: 100%;
      background: rgba(255, 255, 255, 1);
      padding: px(20) px(16);
      box-sizing: border-box;
      @include flex;
      color: #333;
      .date {
        @include flex(column);
        div:first-child {
          font-size: px(50);
        }
        .line {
          margin-bottom: px(10);
          margin-top: px(10);
        }
        div:last-child {
          color: #888888;
          font-size: px(20);
        }
      }
      .flex {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
      }
      .right {
        width: calc(100% - 50px);
        @include flex(column);
        align-items: flex-start;
        padding: 0 px(30);
        box-sizing: border-box;
        font-size: px(20);
        .code {
          flex: none;
          width: 100%;
          margin-left: 0;
          justify-content: flex-start;
          margin-bottom: px(26);
          font-size: px(24);
        }
        .inner1 {
          @include flex;
          flex: none;
          justify-content: space-between;
          width: 100%;
          margin-bottom: px(26);
          .wait {
            margin-left: 0;
            flex: none;
          }
          .info {
            flex: none;
          }
        }
        .inner2 {
          @include flex;
          width: 100%;
          flex: none;
          justify-content: space-between;
          .mont {
            flex: none;
          }
          .price {
            flex: none;
          }
          .look {
            flex: none;
            i {
              margin-left: px(10);
            }
          }
        }
      }
    }
  }

  .detail {
    padding: px(57) px(17) px(80) px(17);
    font-size: px(20);
    .detail_item {
      width: 100%;
      .item {
        @include flex(column);
        justify-content: flex-start;
        border-bottom: 1px solid #eeeeee;
        height: 100%;
        width: 100%;
        .sec1 {
          width: 100%;
          @include flex;
          flex-grow: 12.5;
          height: 100%;
          padding-bottom: px(34);
          box-sizing: border-box;
          img {
            width: px(100);
            height: px(100);
          }
          .name {
            height: px(100);
            flex: 7;
            margin-left: 17px;
            font-size: px(24);
            color: #333333;
            @include flex(column);
            justify-content: space-between;
            .name-inner1 {
              width: 100%;
              height: px(56);
              line-height: px(28);
              @include ellipsis(2);
            }
            .name-inner2 {
              color: #888888;
              width: 100%;
              @include flex;
              justify-content: space-between;
              .xs-inner {
                @include flex;
                div:first-child {
                  margin-right: px(48);
                }
                color: #333333;
              }
            }
          }
        }
      }
      .returnInfo {
        padding: px(40) 0;
        .inner {
          margin-bottom: px(20);
          div:first-child {
            width: px(80);
            margin-right: px(40);
          }
        }
      }
      .rAdd {
        padding: px(40) 0;
        .title {
          margin-right: px(40);
        }
        .content {
          div {
            margin-bottom: 10px;
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
      .returnPath {
        .content {
          @include flex(column);
          .time {
            color: #888888;
          }
        }
      }
      .saleRetrurn {
        border-bottom: 0;
        .content {
          align-items: flex-start;
          font-size: px(20);
          .select {
            /deep/i {
              color: #000;
            }
            /deep/.el-input__inner {
              width: px(352);
              height: px(63);
              font-size: px(20);
            }
          }
          .saleRetrurnTip {
            color: #888888;
          }
          .btn {
            width: px(200);
            font-size: px(20);
            height: px(70);
            background-color: #225c45;
            color: #fff;
            @include flex;
          }
        }
      }
    }
  }
}
</style>
