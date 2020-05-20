<template>
  <div>
    <orderSearch @search="search" />
    <slot />
    <div class="goods" v-for="(item,index) in List" :key="index">
      <div class="goods_all">
        <div
          class="goods_item"
          :style="{ background: show&&orderId==item.order_id ? '#F6F6F6' : '#fff' }"
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
                <div v-show="item._status._type==0">
                  <timer :endTime="item.add_time+1800" endText="已过期" :status="1" />
                </div>
              </div>
              <div class="info">
                <div v-if="item.is_abroad==0">境内订单</div>
                <div v-else-if="item.is_abroad==3">境内订单/境外订单</div>
                <div v-else>境外订单</div>
                <div v-if="item.combination_id!=0">(拼团商品)</div>
                <div v-else-if="item.seckill_id!=0">(秒杀商品)</div>
                <div v-else-if="item.cartInfo[nums].productInfo[nums].is_integral==1">(积分商品)</div>
                <div v-else>(普通商品)</div>
              </div>
            </div>
            <div class="inner2">
              <div class="mont">
                <div>数量:</div>
                <div>{{item.total_num}}</div>
              </div>
              <div v-if="item.is_abroad==0||item.is_abroad==1">包裹数量:1</div>
              <div v-else>包裹数量:2</div>
              <div class="price">
                <div>总计:</div>
                <div>￥{{item.pay_price}}</div>
              </div>
              <div class="look" @click="changeShow(index)">
                <div>查看详情</div>
                <i class="el-icon-arrow-up" v-if="orderId==item.order_id && show"></i>
                <i class="el-icon-arrow-down" v-else></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="detail" v-if="orderId==item.order_id && show">
        <div class="detail_item">
          <div v-if="group">
            <p class="abroad" v-if="abroad.length>0">包裹1(境内订单)</p>
            <div class="item" v-for="(items,idx) in abroad" :key="idx">
              <div class="sec1">
                <img :src="items.image" alt="" />
                <div class="name">
                  <div class="name-inner1">
                    {{items.store_name}}
                  </div>
                  <div class="name-inner2">
                    <div>规格：{{items.product_attr_unique}}</div>
            
                  </div>
                </div>
                <!-- 隐藏，重写 -->
                <div class="mount hidden-xs-only">
                  数量:{{items.number}}
                </div>
                <div class="price hidden-xs-only">
                  <div>￥{{items.price}}</div>
                </div>
                <div class="space hidden-xs-only"></div>
              </div>
            </div>
            <p class="abroad" v-if="abroadW.length>0&&abroad.length>0">包裹2(境外订单)</p>
            <p class="abroad" v-else-if="abroadW.length>0 && !abroad.length>0">包裹1(境外订单)</p>
            <p class="abroad" v-if="abroadW.length>0">以下跨境品不能退货不能开发票</p>
            <div class="item" v-for="(items,idx) in abroadW" :key="'0'+idx">
              <div class="sec1">
                <img :src="items.image" alt="" />
                <div class="name">
                  <div class="name-inner1">
                    {{items.store_name}}
                  </div>
                  <div class="name-inner2">
                    <div>规格：{{items.product_attr_unique}}</div>
            
                  </div>
                </div>
                <!-- 隐藏，重写 -->
                <div class="mount hidden-xs-only">
                  数量:{{items.number}}
                </div>
                <div class="price hidden-xs-only">
                  <div>￥{{items.price}}</div>
                </div>
                <div class="space hidden-xs-only"></div>
              </div>
            </div>
          </div>
          <div v-else>
            <p class="abroad" v-if="abroad.length>0">包裹1(境内订单)</p>
            <div class="item" v-for="(items,idx) in abroad" :key="idx">
              <div class="sec1">
                <img :src="items.productInfo[nums].image" alt="" />
                <div class="name">
                  <div class="name-inner1">
                    {{items.productInfo[nums].store_name}}
                  </div>
                  <div class="name-inner2">
                    <div>规格：{{items.product_attr_unique}}</div>
            
                  </div>
                </div>
                <!-- 隐藏，重写 -->
                <div class="mount hidden-xs-only">
                  数量:{{items.cart_num}}
                </div>
                <div class="price hidden-xs-only">
                  <div>￥{{items.productInfo[nums].price}}</div>
                </div>
                <div class="space hidden-xs-only"></div>
              </div>
            </div>
            <p class="abroad" v-if="abroadW.length>0&&abroad.length>0">包裹2(境外订单)</p>
            <p class="abroad" v-else-if="abroadW.length>0 && !abroad.length>0">包裹1(境外订单)</p>
            <p class="abroad" v-if="abroadW.length>0">以下跨境品不能退货不能开发票</p>
            <div class="item" v-for="(items,idx) in abroadW" :key="'0'+idx">
              <div class="sec1">
                <img :src="items.productInfo[nums].image" alt="" />
                <div class="name">
                  <div class="name-inner1">
                    {{items.productInfo[nums].store_name}}
                  </div>
                  <div class="name-inner2">
                    <div>规格：{{items.product_attr_unique}}</div>
            
                  </div>
                </div>
                <!-- 隐藏，重写 -->
                <div class="mount hidden-xs-only">
                  数量:{{items.cart_num}}
                </div>
                <div class="price hidden-xs-only">
                  <div>￥{{items.productInfo[nums].price}}</div>
                </div>
                <div class="space hidden-xs-only"></div>
              </div>
            </div>
          </div>
          <div class="account">
            <div class="space"></div>
            <div class="mount">
              <div>商品总计</div>
              <div>优惠券</div>
              <div>运费</div>
              <div v-if="detail.use_integral!='0.00'">积分</div>
              <div>总计</div>
            </div>
            <div class="price">
              <div>￥{{item.total_price}}</div>
              <div>-￥{{item.deduction_price}}</div>
              <div>￥{{item.total_postage}}</div>
              <div v-if="detail.use_integral!='0.00'">{{detail.use_integral}}</div>
              <div>￥{{item.pay_price}}</div>
            </div>
            <div class="space2"></div>
          </div>
          
          <div class="address">
            <div class="title">配送地址</div>
            <div class="info">
              <div>{{detail.real_name}}</div>
              <div>{{detail.user_address}}</div>
              <!-- <div>510712199112282324</div> -->
              <div>{{detail.user_phone}}</div>
              <div>普通快递</div>
              <div>
                工作日、非工作日、全天时段均可配送
              </div>
              <div>订单备注：{{mark}}</div>
            </div>
          </div>
          <div class="pay">
            <div class="title">支付方式</div>
            <div class="info">
              <div>{{pay_type}}</div>
            </div>
          </div>
          <div class="logistics" v-show="item._status._type!=0">
            <div class="title">物流信息</div>
            <div class="info">
              <div>物流公司 顺丰</div>
              <div>运单编号 aaaaaa</div>
              <div>物流电话 95338</div>
              <div class="logistics_detail">
                <div class="logistics_detail_title">您的订单正在处理中</div>
                <div class="time">2019-2-2 18:16:00</div>
              </div>
            </div>
          </div>
          <div class="btns">
            <div  class="btn" v-show="item.status==0&&item._status._type==0" @click="goPay(index)">去支付</div>
            <div  class="btn" v-show="item.status==2||item.status==4" @click="orderDel(index)">删除订单</div>
            <div @click="orderSure(index)" class="btn" v-show="item.status==1">确认收货</div>
            <div class="btn" v-show="item._status._type==-1||item._status._type==-2||item._status._type==3||item._status._type==1" @click="salesReturn(item.order_id)">申请退货</div>
            <div class="btn" v-show="item.status==0&&item._status._type==0" @click="cancelOrder(index)">取消订单</div>
            <div class="close" @click="hidden">收起详情</div>
          </div>
          <div class="tip">
            注:购物的部分商品，可在签收后7天内，发起退货！过期将自动关闭退货入口
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import orderSearch from "./order/orderSearch";
import api from "@/plugins/api/api";
import timer from "./timer"
export default {
  props: ["List","type"],
  data() {
    return {
      value: "",
      show:false,
      orderId:"",
      list:[],
      detail:[],
      mark:"",
      pay_type:"",
      nums:0,
      cartList:[],
      abroad:[],
      abroadW:[],
      group:false,
      exitType:1,//是否可退货
      is_abroad:0,//境内外
    };
  },
  components: {
    orderSearch,
    timer
  },
  methods: {
    changeShow(index){
      this.abroad=[]
      this.abroadW=[]
      this.orderId= this.$props.List[index].order_id
      this.show=!this.show
      api.personal.orderDetail(this.$props.List[index].order_id).then((res)=>{
        this.exitType=res.data.cartInfo[0].productInfo[0].return
        this.is_abroad=res.data.is_abroad
        this.detail=res.data
        this.cartList=res.data.cartInfo
        if(res.data.mark!=""){
          this.mark=res.data.mark
        }else{
          this.mark="无"
        }
        if(res.data.pay_type=="weixin"){
          this.pay_type="微信"
        }else if(res.data.pay_type=="zhifubao"){
          this.pay_type="支付宝"
        }else if(res.data.pay_type=="yinlian"){
          this.pay_type="银联"
        }
        if(res.data.combination_id==0){
          this.group=false
          for(var i=0;i<this.cartList.length;i++){
            if(this.cartList[i].productInfo[0].abroad==0){
              this.abroad.push(this.cartList[i])
            }else if(this.cartList[i].productInfo[0].abroad==1){
              this.abroadW.push(this.cartList[i])
            }
          }
        }else if(res.data.combination_id!=0){
          this.group=true
          for(var j=0;j<this.cartList[0].productInfo.length;j++){
            if(this.cartList[0].productInfo[j].abroad==0){
              this.abroad.push(this.cartList[0].productInfo[j])
            }else if(this.cartList[0].productInfo[j].abroad==1){
              this.abroadW.push(this.cartList[0].productInfo[j])
            }
          }
        }
      })
    },
    hidden:function(){
      this.show=false
    },
    search(data){
      api.personal.orderList({type:this.type,page:1,limit:5,search:data.orderId,stime:data.addTime,etime:data.endTime}).then((res)=>{
        if(res.status==200){
          this.$emit("search",res.data)
        }
      })
    },
    cancelOrder(index){
      api.home.orderCancel({id:this.List[index].order_id}).then((res)=>{
        if(res.status==200){
          this.$message({
            message:res.msg
          })
          this.show=false
          this.List.splice(index,1)
        }
        
      })
    },
    goPay(index){
      let params={uni:this.List[index].order_id,paytype:this.List[index].pay_type,from:"weixin"}
      api.personal.orderPay(params).then((res)=>{

      })      
    },
    salesReturn(id){
      if(this.exitType==0){
        this.$message({
          message:"此商品不可退货",
          type:"warning"
        })
      }else if(this.is_abroad==1){
        this.$message({
          message:"境外商品订单不可退货",
          type:"warning"
        })
      }else{
        this.$router.push({path:"/personal/salesReturn",query:{id:id}})
      }
      
    },
    orderDel(index){
      api.personal.orderDel({uni:this.List[index].order_id}).then((res)=>{
        if(res.status==200){
          this.List.splice(index,1)
          this.$message({
            message:res.msg
          })
        }
      })
    },
    orderSure(index){
      api.personal.orderTake({uni:this.List[index].order_id}).then((res)=>{
        if(res.status==200){
          this.List.splice(index,1)
          this.$message({
            message:res.msg
          })
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.abroad{
  width: 100%;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
.goods {
  margin-top: 27px;
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
        .checkbox {
          height: 100px;
          margin-right: 27px;
          .inner {
            width: 18px;
            height: 18px;
            @include flex;
            border: 1px solid #c9c9c9;
            i {
              font-size: 18px;
            }
            &:hover {
              border-color: #225c45;
            }
          }
        }
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
          flex: 2;
          height: 100px;
          text-align: center;
        }
        .space {
          flex: 2.1;
        }
      }
    }
    .account {
      margin-top: 28px;
      width: 100%;
      @include flex;
      flex-grow: 12.5;
      .space {
        flex: 8;
      }
      .space2 {
        flex: 1;
      }
      .mount {
        flex: 1.5;
        div {
          margin-bottom: 20px;
        }
      }
      .price {
        flex: 2;
        div {
          margin-bottom: 20px;
        }
      }
    }
    .address {
      margin-top: 38px;
      @include flex;
      justify-content: flex-start;
      align-items: flex-start;
      .info {
        color: #888888;
        margin-left: 44px;
        div {
          margin-bottom: 10px;
        }
      }
    }
    .pay {
      @extend .address;
      margin-top: 30px;
    }
    .logistics {
      @extend .pay;
      .logistics_detail {
        margin-top: 30px;
        .logistics_detail_title {
          color: #333;
        }
      }
    }
    .btns {
      @include flex;
      justify-content: flex-start;
      margin-top: 30px;
      margin-left: 100px;
      .btn {
        width: 131px;
        height: 45px;
        margin-left: 10px;
        background: #225c45;
        border: 1px solid #225c45;
        @include flex;
        color: #fff;
        cursor: pointer;
      }
      .btn2 {
        @extend .btn;
        background: #ffffff;
        border: 1px solid #000000;
        color: #333;
        margin-left: 19px;
      }
      .close {
        margin-left: 29px;
        color: #225c45;
        cursor: pointer;
      }
    }
    .tip {
      margin-top: 30px;
      margin-left: 100px;
      color: #888888;
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
    padding: px(10) px(17) px(80) px(17);
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
      .account {
        flex-grow: 1;
        justify-content: flex-start;
        .space {
          flex: none;
        }
        .space2 {
          flex: none;
        }
        .mount {
          flex: none;
          font-size: px(24);
        }
        .price {
          flex: none;
          color: #888;
          font-size: px(24);
          margin-left: px(35);
        }
      }
      .address {
        margin-top: px(47);
        font-size: px(20);
        .info {
          color: #888888;
          margin-left: px(58);
          div {
            margin-bottom: 10px;
          }
        }
      }
      .pay {
        margin-top: 30px;
      }
      .logistics {
        .logistics_detail {
          margin-top: 30px;
          .logistics_detail_title {
            color: #333;
          }
        }
      }
      .btns {
        @include flex;
        justify-content: flex-start;
        margin-top: 30px;
        margin-left: px(120);
        font-size: px(26);
        flex-wrap: wrap;
        .btn {
          width: px(200);
          height: px(70);
          margin-left: px(10);
        }
        .btn2 {
          margin-left: 19px;
        }
        .close {
          margin-left: 29px;
          color: #225c45;
          cursor: pointer;
        }
      }
      .tip {
        margin-top: 30px;
        margin-left: px(120);
        font-size: px(20);
        line-height: px(40);
        height: px(40);
        color: #888888;
      }
    }
  }
}
</style>
