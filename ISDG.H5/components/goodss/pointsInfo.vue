<template>
  <!-- 商城 右边 商品介绍 -->
  <div class="info">
    <div class="goods">
      <div class="title">
        <p>共计 <span>1</span> 件商品</p>
        <p></p>
      </div>
      <div class="goods-info">
        <div class="goods-top">
          <div class="img">
            <img :src="comList.image" alt="" />
          </div>
          <div class="goods-name">
            <div>
              {{comList.store_name}}
            </div>
            <div>规格：{{comList.unit_name}}</div>
          </div>
        </div>
        <div class="goods-bottom">
          <div v-if="comList.is_postage">免运费</div>
          <div>价格：￥{{price*carNum}}</div>
          <div>数量：{{carNum}}</div>
        </div>
      </div>
      <div class="goods-price">
        <div class="price-inner">
          <div>商品总计</div>
          <div>价格：￥{{price*carNum}}</div>
        </div>
         <!-- <el-select v-model="value" placeholder="请选择优惠券" class="coupon" @change="changeCoupon(value)">
          <el-option
            v-for="(item,index) in options"
            :key="index"
            :value="index"
            :label="item.coupon_title"
            >
          </el-option>
        </el-select> -->
        <div class="price-inner">
          <div>运费</div>
          <div>￥{{postage}}</div>
        </div>
         <div class="price-inner">
          <div>积分</div>
          <div>{{points}}</div>
        </div>
        <!-- 免邮优惠券 -->
        <!-- <el-select v-model="values" placeholder="选择优惠券免邮" class="coupon" @change="changefreeMail(values)">
          <el-option
            v-for="(itm,idx) in freeMail"
            :key="idx"
            :value="idx"
            :label="itm.coupon_title"
            >
          </el-option>
        </el-select> -->
        <!-- <div class="price-inner">
          <div><el-checkbox v-model="checked" @change="usingIntegral">可用{{integral}}积分抵扣￥{{dprice}}元</el-checkbox></div>
        </div> -->
        <div class="price-inner">
          <div>总计</div>
          <div>￥{{payPrice}}+{{points}}积分</div>
          
        </div>
      </div>
      <div class="goods-tip">
        <div>说明</div>
        <div class="text">
          订单提交之后 1 小时内未付款，订单将被系
          统自动取消，请您尽快完成支付以确保商品
          能及时送达，国外商品和国内商品是分开寄 出
        </div>
      </div>
      <div class="goods-btn" @click="order">提交订单</div>
    </div>
    <div class="help">
      <div class="title">需要帮助？</div>
      <div class="item">
        <div class="">支付方式</div>
        <i class="el-icon-plus"></i>
        <i class="el-icon-minus" v-if="false"></i>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/plugins/api/api";
export default {
  props: {
    id:{
      default: 0,
      type: Number
    }
  },
  computed: {

  },
  data(){
    return{
      comList:[],
      carNum:1,
      cartId:"",
      orderKey:"",
      options:[],
      freeMail:[],
      value:"",
      values:"",
      checked:false,
      integral:0,
      integrals:0,
      dprice:0,
      payPrice:0,
      price:0,
      postage:0,
      xPrice:0,
      minPrice:0,
      couponId:0,
      coupId:0,
      useIntegral:0,
      points:0
    }
  },
  mounted(){
    this.goodsDatail()
    this.carNum=this.$store.state.carNum
    this.points=this.$store.state.points
    if(this.$store.state.points!=0){
        this.useIntegral=1
    }
  },
  methods: {
    order() {
      this.$emit("order",{orderKey:this.orderKey,useIntegral:this.useIntegral,payPrice:this.payPrice,couponId:this.couponId,coupId:this.coupId});
    },
    goodsDatail() {
       api.personal.User().then((res)=>{
        if(res.status==200||res.data.status==200){
          this.integral=parseInt(res.data.integral)
          this.integrals=parseInt(res.data.integral)
          this.dprice=this.integral/100
      api.home.goodsDetail(this.id).then(res => {
        this.comList=res.data.storeInfo
        this.price=parseInt(this.comList.price)
        this.postage=parseInt(this.comList.postage)
        this.payPrice=this.price*this.carNum+this.postage
        this.xPrice=this.price*this.carNum+this.postage        
        api.personal.addCar({productId:this.id,cartNum:this.carNum,new:"1"}).then((res)=>{
          this.cartId=this.cartId+res.data.cartId+','
          api.home.orderConfirm({cartId:this.cartId}).then((res)=>{
                this.orderKey=res.data.orderKey
                this.options=res.data.usableCoupon
                for(let i=0;i<this.options.length;i++){
                  if(this.options[i].category_id==3){
                    this.freeMail.push(this.options[i])
                    this.options.splice(i,1)
                    console.log(this.freeMail);
                    
                  }
                }
              })
        })
        
      })
        }
        })
       
      
    },
    //   changeCoupon(index){
    //   this.checked=false
    //   this.minPrice=parseInt(this.options[index].use_min_price)
    //   this.payPrice=this.price*this.carNum+this.postage
    //   this.xPrice=this.payPrice
    //   if(this.xPrice>=this.minPrice){
    //     this.couponId=this.options[index].id
    //     if(this.options[index].discount!=0){
    //       this.payPrice=this.price*this.carNum*this.options[index].discount*0.01+this.postage
    //       if(this.integrals>this.payPrice*100){
    //         this.integral=Math.ceil(this.payPrice)*100
    //         this.dprice=this.payPrice     
    //       }else{
    //         this.integral=this.integral
    //         this.dprice=this.integral/100            
    //       }
    //     }else{
    //       this.payPrice=this.price*this.carNum-this.options[index].coupon_price+this.postage
    //     if(this.integrals>this.payPrice*100){
    //         this.integral=Math.ceil(this.payPrice)*100
    //         this.dprice=this.payPrice    
    //       }else{
    //         this.integral=this.integral
    //         this.dprice=this.integral/100            
    //       }
    //     }
    //     this.xPrice=this.payPrice
    //     // this.$emit("changeCoupon",this.couponId)
    //   }else{
    //     this.$message({
    //         message:"无法使用该优惠券",
    //         type:"warning"
    //       })
    //       this.payPrice=this.payPrice
    //       this.xPrice=this.payPrice
    //   }
    // },
    // //免邮
    // changefreeMail(idx){
    //   this.coupId=this.freeMail[idx].id
    //   this.payPrice=this.payPrice-this.postage      
    //   this.postage=0
      
    // },
    // usingIntegral(val){
      
    //   if(this.checked==true){
    //     this.useIntegral=1

    //     if(this.integrals>this.xPrice*100){
    //         this.integral=Math.ceil(this.xPrice)*100
    //         this.dprice=this.xPrice     
    //       }else{
    //         this.integral=this.integral
    //         this.dprice=this.integral/100            
    //       }
    //     this.payPrice=this.xPrice-this.dprice
    //     console.log(this.xPrice,this.payPrice,this.dprice);
        
    //   }else{
    //     this.useIntegral=0
    //     this.payPrice=this.payPrice+this.dprice
    //     console.log(this.xPrice,this.payPrice);

    //   }
    // }
  }
};
</script>

<style lang="scss" scoped>
.info {
  width: 325px;
  margin: 0 auto;
  .goods {
    width: 100%;
    padding: 30px;
    box-sizing: border-box;
    background-color: #fff;
    .title {
      width: 100%;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      span:nth-child(1) {
        color: #fe2e7a;
      }
    }
    .goods-info {
      padding: 30px 0;
      width: 100%;
      border-top: 1px solid #eeeeee;
      border-bottom: 1px solid #eeeeee;
      .goods-top {
        @include flex;
        justify-content: space-between;
        height: 100%;
        .img {
          width: 75px;
          height: 75px;
          @include flex;
          img {
            max-width: 75px;
            max-height: 75px;
            object-fit: cover;
          }
        }
        .goods-name {
          height: 75px;
          @include flex(column);
          align-items: flex-start;
          justify-content: flex-start;
          div:first-child {
            @include ellipsis(2);
            width: 185px;
            height: 34px;
            line-height: 17px;
          }
          div:last-child {
            color: #888888;
            margin-top: 18px;
          }
        }
      }
      .goods-bottom {
        @include flex;
        margin-top: 20px;
        justify-content: space-between;
      }
    }
    .goods-price {
      padding: 30px 0;
      border-bottom: 1px solid #eee;
      /deep/ .el-input__inner{
        border: none;
        padding: 0;
        color: #333;
      }
      /deep/ .el-select{
        width: 100%;
      }
      .coupon{
        border: none !important;
        width: 100%;
        padding: 0;
        color: #333;
        margin-bottom: 10px;
      }
      .price-inner {
        @include flex;
        justify-content: space-between;
        margin-bottom: 20px;
        &:last-child {
          font-weight: bold;
          margin-bottom: 0;
        }
      }
    }
    .goods-tip {
      padding-top: 10px;
      padding-bottom: 24px;
      .text {
        color: #888;
        margin-top: 15px;
        line-height: calc(100% + 7px);
      }
    }
    .goods-btn {
      width: 277px;
      height: 45px;
      background-color: #225c45;
      @include flex;
      cursor: pointer;
      color: #fff;
    }
  }
  .help {
    width: 100%;
    height: 100%;
    padding: 30px 20px;
    box-sizing: border-box;
    background-color: #fff;
    margin-top: 27px;
    .title {
      font-weight: bold;
      padding-bottom: 14px;
      border-bottom: 1px solid #eeeeee;
    }
    .item {
      padding: 20px 0;
      @include flex;
      justify-content: space-between;
      border-bottom: 1px solid #eeeeee;
    }
  }
}

@media screen and (max-width: 768px) {
  .address[data-v-2dbde69c] .el-form .date .el-input__inner {
    width: 100%;
  }
  .info {
    width: 100%;
    margin: 0 auto;
    .goods {
      width: 100%;
      padding: px(30);
      box-sizing: border-box;
      background-color: #fff;
      font-size: px(22);
      .title {
        width: 100%;
        margin-bottom: 12px;
        span {
          color: #fe2e7a;
        }
      }
      .goods-info {
        padding: 30px 0;
        width: 100%;
        border-top: 1px solid #eeeeee;
        border-bottom: 1px solid #eeeeee;
        .goods-top {
          @include flex;
          justify-content: space-between;
          height: 100%;
          .img {
            width: px(118);
            height: px(118);
            @include flex;
            img {
              max-width: px(118);
              max-height: px(118);
              object-fit: cover;
            }
          }
          .goods-name {
            height: 75px;
            @include flex(column);
            align-items: flex-start;
            justify-content: flex-start;
            width: calc(100% - 60px);
            margin-left: px(35);
            div:first-child {
              @include ellipsis(2);
              height: px(48);
              width: 100%;
              line-height: px(24);
              font-size: px(24);
            }
            div:last-child {
              color: #888888;
              margin-top: 20px;
            }
          }
        }
        .goods-bottom {
          @include flex;
          margin-top: 20px;
          justify-content: space-between;
        }
      }
      .goods-price {
        padding: px(40) 0;
        border-bottom: 1px solid #eee;
        font-size: px(24);
        .coupon{
        border: none;
        width: 100%;
        color: #333;
        margin-bottom: px(10);
        padding: 0;
      }
        .price-inner {
          @include flex;
          justify-content: space-between;
          margin-bottom: 20px;
          &:last-child {
            font-weight: bold;
            margin-bottom: 0;
          }
        }
      }
      .goods-tip {
        padding-top: 10px;
        padding-bottom: 24px;
        .text {
          color: #888;
          margin-top: 15px;
          line-height: calc(100% + 7px);
        }
      }
      .goods-btn {
        width: 277px;
        height: 45px;
        background-color: #225c45;
        @include flex;
        color: #fff;
        font-size: px(30);
        margin: 0 auto;
      }
    }
    .help {
      width: 100%;
      height: 100%;
      padding: px(36);
      box-sizing: border-box;
      background-color: #fff;
      margin-top: px(43);
      .title {
        font-size: px(30);
        font-weight: bold;
        padding-bottom: px(20);
        border-bottom: 1px solid #eeeeee;
      }
      .item {
        font-size: px(24);
        padding: px(30) 0;
        @include flex;
        justify-content: space-between;
        border-bottom: 1px solid #eeeeee;
      }
    }
  }
}
</style>
