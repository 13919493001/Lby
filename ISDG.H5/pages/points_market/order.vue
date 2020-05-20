<template>
  <div class="order">
    <div class="content">
      <m-address @userInfo="UserInfo" @changeActive="changeActive" />
      <points-info @order="order" :id='id' />
    </div>
    <el-dialog title="请选择支付方式" :visible.sync="chosePayType">
      <div class="imgs">
        <div :class="{ active: active === 0 }" @click="changePayType(0)">
          <img src="@/static/icon/airpay.png" alt="" class="airpay"/>
          <span>支付宝</span>
        </div>
        <div :class="{ active: active === 1 }" @click="changePayType(1)">
          <img src="@/static/icon/wxpay.png" alt="" class="wxpay"/>
          <span>微信</span>
        </div>
        <div :class="{ active: active === 2 }" @click="changePayType(2)">
          <img src="@/static/icon/upay.png" alt="" class="upay"/>
          <span>银联</span>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="chosePayType = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
   <el-dialog :title="payText" :visible.sync="dialogVisible" center class="pay-dialog" @close="close">
      <div class="dialog-content">
        <div class="code">
          <img src="@/static/icon/2weicode.png" alt="" />
        </div>
        <div class="tips">
          <div class="tip1">
            <div>总计：</div>
            <span>￥{{payPrice}}</span>
          </div>
          <div class="tip2">
            <div>- 请使用
              <span>{{payText}}</span>
              扫描左图二维码进行支付</div>
            <div>- 请您在1小时内付款以免订单被取消，如有疑问，请联系客服。</div>
            <div>- 订单发货后您将收到订</div>
          </div>
          <!-- <div class="tip3">手机不在身边？可 <span>登录帐号付款</span></div> -->
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pointsInfo from "@/components/goodss/pointsInfo";
import mAddress from "@/components/market/address";
import api from "@/plugins/api/api";
export default {
  components: {
    pointsInfo,
    mAddress
  },
  data() {
    return {
      dialogVisible: false,
      id:0,
      num:0,
      // cartId:"",
      // orderKey:"",
      addressId:"",
      mark:"",
      comNum:1,
      groupId:0,
      payType:"zhifubao",
      numList:[],
      usual:false,
      Integrals:0,
      cartIds:"",
      payMoney:0,//多个商品总价
      couponId:0,
      payPrice:0,
      payText:"支付宝",
      chosePayType:false,
      active: 0,
      payInfo:{}
    };
  },
  methods: {
    sure(){
      this.chosePayType=false
      api.personal.getAddressDefault().then((res)=>{
                this.addressId=res.data.id
                api.home.orderGreate(this.payInfo.orderKey,{addressId:this.addressId,couponId:this.payInfo.couponId,payType:this.payType,mark:this.mark,useIntegral:this.payInfo.useIntegral,coupId:this.payInfo.coupId}).then((res)=>{
								if(res.status==200){
                  this.dialogVisible = true;
                }
						})
          })
    },
    changePayType(id){
      if(id==0){
        this.active=0
        this.payType="zhifubao"
        this.payText="支付宝"
      }else if(id==1){
        this.active=1
        this.payType="weixin"
        this.payText="微信"
      }else if(id==2){
        this.active=2
        this.payType="yinlian"
        this.payText="银联"
      }else{
        this.payType="zhifubao"
        this.payText="支付宝"
      }
    },
    changeActive(a){
      this.payType=a
       if(this.payType=="zhifubao"){
        this.payText="支付宝"
      }else if(this.payType=="weixin"){
        this.payText="微信"
      }else{
        this.payText="银联"
      }
    },
    order(data) {
      this.payPrice=data.payPrice
      this.payInfo=data
      this.chosePayType=true
    },
    UserInfo(data){
      this.mark=data.etc
      
    },
    close(){

    }
  },
  created(){
    this.id=this.$route.query.id

    
  }
};
</script>

<style lang="scss" scoped>
.imgs {
    margin-top: 27px;
    @include flex;
    justify-content: space-between;
    div {
      height: 45px;
      background-color: #fff;
      font-size: 16px;
      width: 32%;
      @include flex;
      cursor: pointer;
      span {
        margin-left: 14px;
      }
    }
    .active {
      box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
      font-weight: bold;
    }
  }
  .dialog-content {
    margin: 0 auto;
    @include flex;
    align-items: flex-start;
    .code {
      width: 124px;
      height: 124px;
      margin-right: 35px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .tips {
      color: #666666;
      .tip1 {
        @include flex;
        justify-content: flex-start;
        span {
          font-size: 18px;
          font-weight: bold;
        }
      }
      .tip2 {
        margin-top: 18px;
        div {
          margin-top: 5px;
          &:first-child {
            margin-top: 0;
          }
        }
      }
      .tip3 {
        margin-top: 18px;
        span {
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
.order {
  min-height: 100vh;
  background-color: #f6f6f6;
  max-width: 100%;
  .content {
    @include flex;
    max-width: 1200px;
    margin: 0 auto;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: flex-start;
    box-sizing: border-box;
    padding: 60px 10px;
  }
}

@media screen and (max-width: 768px) {
  /deep/.pay-dialog {
    width: calc(100vw - 20px);
    height: px(712);
    background: rgba(255, 255, 255, 1);
    .dialog-content {
      margin: 0 auto;
      @include flex(column);
      align-items: center;
      .code {
        width: px(188);
        height: px(188);
        margin-right: 0;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .tips {
        color: #666666;
        .tip1 {
          span {
            font-size: px(24);
          }
        }
        .tip2 {
          margin-top: px(30);
          div {
            margin-top: px(4);
            &:first-child {
              margin-top: 0;
            }
          }
        }
        .tip3 {
          margin-top: px(30);
          span {
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
    }
  }
  .content {
    @include flex;
    width: 100%;
    margin: 0 auto;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: flex-start;
    padding: px(40) px(20) px(80) px(20) !important;
  }
}
</style>
