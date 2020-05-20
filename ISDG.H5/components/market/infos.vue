<template>
  <!-- 商城 右边 商品介绍 -->
  <div class="info">
    <div class="goods">
      <div class="title">
        <p>共计 <span>{{comNum}}</span> 件商品</p>
        <p></p>
      </div>
      <p class="abroad" v-if="abroad.length>0">包裹1(境内订单)</p>
      <div class="goods-info" v-for="(item,index) in abroad" :key="index">
        <div class="goods-top">
          <div class="img">
            <img :src="item.productInfo.image" alt="" />
          </div>
          <div class="goods-name">
            <div>
              {{item.productInfo.store_name}}
            </div>
            <div v-if="item.product_attr_unique!=''">规格:{{item.productInfo.attrInfo.suk}}</div>
            <div v-else>规格:无</div>
          </div>
        </div>
        <div class="goods-bottom">
          <div v-if="item.productInfo.is_postage">免运费</div>
          <div>价格：￥{{item.truePrice}}</div>
          <div v-if="show1">数量：{{item.cart_num}}</div>
          <div v-else>数量：{{item.cart_num}}</div>
        </div>
      </div>
      <p class="abroad" v-if="abroadW.length>0&&abroad.length>0">包裹2(境外订单)</p>
      <p class="abroad" v-else-if="abroadW.length>0&&abroad.length<0">包裹1(境外订单)</p>
      <p class="abroad" v-if="abroadW.length>0">以下跨境品不能退货不能开发票</p>
      <div class="goods-info" v-for="(items,indexs) in abroadW" :key="indexs+'0'">
        <div class="goods-top">
          <div class="img">
            <img :src="items.productInfo.image" alt="" />
          </div>
          <div class="goods-name">
            <div>
              {{items.productInfo.store_name}}
            </div>
            <div v-if="items.product_attr_unique!=''">规格:{{items.productInfo.attrInfo.suk}}</div>
            <div v-else>规格:无</div>
          </div>
        </div>
        <div class="goods-bottom">
          <div v-if="items.productInfo.is_postage">免运费</div>
          <div>价格：￥{{item.truePrice}}</div>
          <div v-if="show1">数量：{{items.cart_num}}</div>
          <div v-else>数量：{{items.cart_num}}</div>
        </div>
      </div>
      <div class="goods-price">
        <div class="price-inner">
          <div>商品总计</div>
          <div>价格：￥{{comListPrice}}</div>
        </div>
        <div class="price-inner" v-if="Integrals!=0">
          <div>积分</div>
          <div>{{Integrals}}积分</div>
        </div>
         <el-select v-model="value" :placeholder="placeholder" class="coupon" v-if="usual" @change="changeCoupon(value)">
          <el-option
            v-for="(item,index) in options"
            :key="index"
            :value="index"
            :label="item.coupon_title"
            no-data-text="暂无可使用的优惠券"
            >
          </el-option>
        </el-select>
        <div class="price-inner">
          <div>运费</div>
          <div>￥{{postage}}</div>
        </div>
        <!-- 免邮优惠券 -->
        <el-select v-model="values" placeholder="选择优惠券免邮" class="coupon" v-if="postages" @change="changefreeMail(values)">
          <el-option
            v-for="(itm,idx) in freeMail"
            :key="idx"
            :value="idx"
            :label="itm.coupon_title"
            no-data-text="暂无免邮优惠券"
            >
          </el-option>
        </el-select>
         <div class="price-inner" v-if="usual">
          <div><el-checkbox v-model="checked" @change="usingIntegral">可用{{integral}}积分抵扣￥{{dprice}}元</el-checkbox></div>
        </div>
        <div class="price-inner">
          <div v-if="show">团购价</div>
          <div v-else>总计</div>
          <div v-if="Integrals!=0">￥{{price}}  +  {{Integrals}}积分</div>
          <div v-else>￥{{price}}</div>
          
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
    idList:{
      default: [],
      type: Array
    },
    cartList:{
      default: ()=>[],
      type:Array
    },
    numList:{
      default: ()=>[],
      type: Array
    },
    num:{
      default: 1,
      type: Number
    },
    comNum:{
      default: 1,
      type: Number
    },
    groupId:{
      type:Number,
      default:0
    },
    usual:{
      type:Boolean,
      default:false
    },
    Integrals:{
      type:Number,
      default:0
    },
    cartIds:{
      type:String,
      default:""
    },
    payMoney:{
      type:Number,
      default:0
    }
  },
  data(){
    return{
      postage:0,
      imgList:[],
      comList:[],
      price:0,
      options: [],
      value: '',
      values:"",
      placeholder:"选择优惠券",
      minPrice:0,
      payPrice:0,
      couponId:"",
      integral:0,
      checked:false,
      comListPrice:0, //商品总计
      show:false,
      cartId:"",
      orderKey:"",
      show1:false, //多个商品价格显示
      dprice:0,
      couponId:0,
      coupId:0,
      multiple:false,
      freeMail:[],
      copList:[],
      integrals:0,
      postages:false,
      abroad:[],
      abroadW:[],//境外
    }
  },
  methods: {
    order() {
      this.$emit("order",{orderKey:this.orderKey,useIntegral:this.useIntegral,payPrice:this.price,couponId:this.couponId,coupId:this.coupId});
    },
    goodsDatail() {
      console.log(this.cartList);
      
       api.personal.User().then((res)=>{
        if(res.status==200||res.data.status==200){
          this.integral=parseInt(res.data.integral)
          this.integrals=parseInt(res.data.integral)
          this.dprice=this.integral/100
          let id=this.$props.idList
          this.comListPrice=0
          var time
          api.personal.shoppingCar().then((res)=>{
            let data=res.data.valid
            for(let i=0; i<res.data.valid.length; i++){
              for(let j=0; j<this.cartList.length; j++){
                if(data[i].id==this.cartList[j]){
                  if(data[i].id==this.cartList[j]&&data[i].productInfo.abroad==0){
                    this.abroad.push(data[i])
                  }else if(data[i].id==this.cartList[j]&&data[i].productInfo.abroad==1){
                    this.abroadW.push(data[i])
                  }
                  if(this.payMoney!=0){
                    this.comListPrice=this.payMoney            
                    this.show1=true
                  }else{
                    this.comListPrice=this.comListPrice+parseFloat(data[i].productInfo.price)*data[i].cart_num
                    this.show1=false
                  }
                  
                  if(this.groupId==0){
                    this.postage=this.postage+parseFloat(data[i].productInfo.postage)
                    if(this.postage!=0){
                      this.postages=true
                    }
                    this.price=this.comListPrice+this.postage
                  }
                }
              }
              console.log(this.abroad,this.abroadW);

          }
          })
          api.home.orderConfirm({cartId:this.cartIds}).then((res)=>{
                this.orderKey=res.data.orderKey
                this.options=res.data.usableCoupon
                for(let a=0;a<this.options.length;a++){
                  if(this.options[a].category_id==3){
                    this.freeMail.push(this.options[a])
                    this.options.splice(a,1)
                    console.log(this.freeMail);
                    
                  }
                }
              })
          
        }
     
      
      
      
    })
      
      
    },
    //选择优惠券
    changeCoupon(index){
      this.checked=false
      this.price=this.comListPrice+this.postage
      this.minPrice=parseInt(this.options[index].use_min_price)
      this.payPrice=this.price
      console.log(this.price);
      
      console.log(index,this.minPrice);
      if(this.payPrice>=this.minPrice){
        this.couponId=this.options[index].id
        if(this.options[index].discount!=0){
          this.price=this.postage+this.comListPrice*this.options[index].discount*0.01
      console.log(this.price);

          if(this.integrals>this.price*100){
            this.integral=Math.ceil(this.price)*100
            this.dprice=this.price     
          }else{
            this.integral=this.integral
            this.dprice=this.integral/100            
          }
        }else{
        this.price=this.postage+this.comListPrice-this.options[index].coupon_price
      console.log(this.price);

        if(this.integrals>(this.price-this.postage)*100){
            this.integral=Math.ceil(this.price-this.postage)*100
            this.dprice=this.price-this.postage   
          }else{
            this.integral=this.integral
            this.dprice=this.integral/100            
          }
        }
      }else{
        this.$message({
            message:"无法使用该优惠券",
            type:"warning"
          })
          this.price=this.price
      }
    },
    //免邮
    changefreeMail(idx){
      this.coupId=this.freeMail[idx].id
      this.price=this.price-this.postage      
      this.postage=0
      
    },
    usingIntegral(val){
      if(val==true||this.Integrals!=0){
        this.useIntegral=1

        if(this.integrals>(this.price-this.postage)*100){
            this.integral=Math.ceil(this.price-this.postage)*100
            this.dprice=this.price-this.postage     
          }else{
            this.integral=this.integral
            this.dprice=this.integral/100            
          }
        console.log();
        this.price=this.price-this.dprice
      }else{
        this.useIntegral=0
        this.price=this.price+this.dprice
      }
    }
  },
  mounted(){
    //团购
    if(this.groupId!=0){
      this.show=true
      api.personal.groupDetail(this.groupId).then((res)=>{
        this.postage=parseInt(res.data.storeInfo.postage)
        this.price=parseInt(res.data.storeInfo.price)+this.postage

      })
    }else{
      this.show=false
      
    }
    if(this.Integrals!=0){
      this.useIntegral=1
    }else{
      this.useIntegral=0
    }
    console.log(this.useIntegral);
    
    this.goodsDatail()
    // api.personal.myCoupon(1).then((res)=>{
    //   this.options=res.data
    // })
  }
};
</script>

<style lang="scss" scoped>
.abroad{
  margin-bottom: 10px;
  margin-top: 10px;
}
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
