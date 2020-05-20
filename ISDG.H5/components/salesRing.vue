<template>
  <div>
    <div class="goods">
      <div class="detail">
        <div class="detail_item">
          <div class="item">
            <div class="box" v-for="(item,index) in list" :key="index">
              <div class="sec1">
                <el-checkbox-group v-model="checkedproducts" v-if="status === 0"  @change="handleCheckedCitiesChange">
                  <el-checkbox :label="index" @change="change(index)">&nbsp;</el-checkbox>
                </el-checkbox-group>
                <img :src="item.productInfo[ponits].image" alt="" />
                <div class="name">
                  <div class="name-inner1">
                    {{item.productInfo[ponits].store_name}}
                  </div>
                  <div class="name-inner2">
                    <div>规格：{{item.product_attr_unique}}</div>
                  </div>
                  <div class="hidden-sm-and-up xs-inner">
                    <div v-if="status===0">数量:{{item.cart_num}}</div>
                    <div v-else>数量:{{commodity[index]}}</div>
                    <div class="xs-inner2">
                      <div>￥{{item.truePrice*item.cart_num}}</div>
                      <div>￥{{item.truePrice*item.cart_num-item.truePrice*proporition}}税后实际价格)</div>
                    </div>
                  </div>
                </div>
                <div class="mount hidden-xs-only">
                   <div v-if="status===0">数量:{{item.cart_num}}</div>
                    <div v-else>数量:{{commodity[index].cart_num}}</div>
                </div>
                <div class="price hidden-xs-only">
                  <div>￥{{item.truePrice*item.cart_num}}</div>
                  <div>￥{{item.truePrice*item.cart_num-item.truePrice*proporition}}(税后实际价格)</div>
                </div>
              </div>
              <div class="inner1" v-if="show[index]">
                <div class="title">退款数量</div>
                  <el-input-number v-model="num[index]" @change="handleChange" :min="1" :max="item.cart_num" label=""></el-input-number>
              </div>
            </div>
            <div class="sec2" v-if="status === 0">
              <!-- <div class="inner1">
                <div class="title">退款数量</div>
                  <el-input-number v-model="num" @change="handleChange" :min="1" :max="max" label=""></el-input-number>
              </div> -->
              <div class="inner2">
                <div class="title">退款原因</div>
                <div><el-input placeholder="输入退款原因" v-model="mark" @blur="changeMark"></el-input></div>
              </div>
            </div>
          </div>
          <!-- 我的退货 -->
          
          <div class="returnInfo" v-if="status === 1">
            <div class="inner">
              <div>退货原因</div>
              <div>{{detail.marks}}</div>
            </div>
            <div class="inner">
              <div>退款金额</div>
              <div>￥{{detail.truePrice}}</div>
            </div>
            <div class="inner">
              <div>退积分</div>
              <div>{{detail.use_integral}}积分</div>
            </div>
          </div>
          <!-- 退货  我的退货 -->
          <div class="rAdd" v-if="status === 1">
            <div class="title">寄回地址</div>
            <div class="content">
              <div>iSDG售后服务中心</div>
              <div>400-125-4587</div>
              <div>河南省 郑州市 XXXXXXISDG国贸大楼</div>
            </div>
          </div>
          <div class="salebtn" v-if="status === 1" @click="sure">确认</div>
          <div
            class="salebtn"
            v-if="status === 0"
            @click="next"
            >下一步</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/plugins/api/api";
import orderSearch from "./order/orderSearch";
export default {
  props: {
    status: {
      /* 
        0 退货第一步
        1 第二步
      */
      type: Number,
      default: 0
    },
    id:{
      type:String,
      default:""
    },
    marks:{
      type:String,
      default:""
    }
  },
  data() {
    return {
      num:[],
      max:10,
      list:[],
      mark:"",
      truePrice:"",
      checked:true,
      use_integral:0,
      ponits:0,
      checkedproducts:[],
      show:[],
      commodity:[],
      comList:[],
      detail:{
        use_integral:"",
        marks:"",
        truePrice:0
      },
      uid:1,
      coupon_price:0,//优惠券抵扣金额
      total_price:0,//总金额
      proporition:1,//抵扣比例
      deduction_price:0,//积分抵扣金额
    };
  },
  components: {
    orderSearch
  },
  mounted(){
    
      if(this.status==0){
        api.personal.orderDetail(this.id).then((res)=>{
          this.list=res.data.cartInfo
          this.coupon_price=parseFloat(res.data.coupon_price)
          this.deduction_price=parseFloat(res.data.deduction_price)
          this.total_price=parseFloat(res.data.total_price)
          if(res.data.coupon_price!="0.00"||res.data.deduction_price!="0.00"){
            this.proporition=(parseFloat(res.data.coupon_price)+parseFloat(res.data.deduction_price))/parseFloat(res.data.total_price)
          }
          for(let i=0;i<this.list.length;i++){
            this.num.push(this.list[i].cart_num)
            this.show.push(false)
            this.detail.truePrice=this.list[i].truePrice*this.list[i].cart_num-this.list[i].truePrice*this.proporition
          }
          this.use_integral=res.data.use_integral
          this.$set(this.detail,"use_integral",this.use_integral)
        })
      }else if(this.status==1){
        this.list=this.$store.state.salesReturn
        this.commodity=this.$store.state.commodity
        this.detail=this.$store.state.detail
        
      }
      api.personal.userInfo().then((res)=>{
        this.uid=res.data.uid
      })
      

  },
  methods: {
    handleChange(){
      this.comList=[]
      this.commodity=[]
      for(let i=0;i<this.checkedproducts.length;i++){
        this.comList.push(this.list[this.checkedproducts[i]])
        this.commodity.push({cart_id:this.list[this.checkedproducts[i]].id,cart_num:this.num[this.checkedproducts[i]]})
      }
      console.log(this.num);
      console.log(this.commodity);
    },
    next(){
      this.$store.commit("setReturn",this.comList)
      this.$store.commit("setCommodity",this.commodity)
      this.$store.commit("setDetail",this.detail)
      if(this.checkedproducts.length<=0){
        this.$message({
          message:"请选择需要退款的商品",
          type:"warning"
        })
      }else if(this.mark==""){
        this.$message({
          message:"请输入退款原因",
          type:"warning"
        })
      }
      else{
        this.$router.push({name:"personal-salesReturn-next",params:{id:this.id,mark:this.mark}})
      }
    },
    changeMark(){
      this.$set(this.detail,"marks",this.mark)
    },
    sure(){
      api.personal.orderRefund({uni:this.id,text:this.marks,uid:this.uid,commodity:this.commodity}).then((res)=>{
        if(res.status==200){
          this.$message({
            message:res.msg,
            type:"success"
          })
          this.$router.push("/personal")
        }
      })      
    },
    handleCheckedCitiesChange(value) {
      this.comList=[]
      this.commodity=[]
      this.checkedproducts=value
      for(let i=0;i<value.length;i++){
        this.commodity.push({cart_id:this.list[value[i]].id,cart_num:this.num[value[i]]})
        this.comList.push(this.list[value[i]])
      }
      console.log(this.commodity);
      
      
    },
    change(index){
      console.log(index);
      this.show[index]=!this.show[index]
      this.$set(this.show,index,this.show[index])
      
    }
  }
};
</script>

<style lang="scss" scoped>
.title{
  width: auto;
  white-space: nowrap;
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
      .box{
        @include flex(column);
        justify-content: flex-start;
        align-items: flex-start;
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
          flex: 2.6;
          height: 100px;
          text-align: center;
        }
      }
              .inner1 {
          @include flex;
          justify-content: flex-start;
          margin-bottom: 20px;
          .title {
            margin-right: 30px;
          }
          .contral {
            @include flex;
            justify-content: flex-start;
            /deep/.el-input {
              width: auto;
              .el-input__inner {
                width: 74px;
                height: 35px;
                border-radius: 0;
                margin-left: 7px;
                margin-right: 7px;
                &:focus {
                  border-color: #225c45;
                }
              }
            }
            div:not(:nth-child(2)) {
              width: 35px;
              @include flex;
              height: 35px;
              border: 1px solid #e5e5e5;
              cursor: pointer;
            }
          }
        }
      }
      .sec2 {
        width: 100%;
        margin-top: 10px;
        // margin-left: 44px;
        padding-bottom: 33px;
        .inner1 {
          @include flex;
          justify-content: flex-start;
          .title {
            margin-right: 30px;
          }
          .contral {
            @include flex;
            justify-content: flex-start;
            /deep/.el-input {
              width: auto;
              .el-input__inner {
                width: 74px;
                height: 35px;
                border-radius: 0;
                margin-left: 7px;
                margin-right: 7px;
                &:focus {
                  border-color: #225c45;
                }
              }
            }
            div:not(:nth-child(2)) {
              width: 35px;
              @include flex;
              height: 35px;
              border: 1px solid #e5e5e5;
              cursor: pointer;
            }
          }
        }
        .inner2 {
          @extend .inner1;
          margin-top: 15px;
          /deep/.el-input__inner {
            width: 350px;
            height: 35px;
            border-radius: 0;
            margin-left: 0;
            margin-right: 0;
            &:focus {
              border-color: #225c45;
            }
          }
        }
      }
      .sec3 {
        width: 100%;
        margin-top: 10px;
        padding-bottom: 10px;
        .inner {
          @include flex;
          justify-content: flex-start;
          margin-bottom: 20px;
          div:first-child {
            width: 60px;
            margin-right: 40px;
          }
          div:last-child {
            color: #888888;
          }
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
      @include flex;
      justify-content: flex-start;
      align-items: flex-start;
      .title {
        margin-right: 42px;
      }
      .content {
        margin: 0;
        padding: 0;
        div {
          margin-bottom: 10px;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
.salebtn {
  width: 131px;
  height: 45px;
  background-color: #225c45;
  color: #fff;
  @include flex;
  margin-top: 26px;
  margin-left: 5px;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
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
        .box{
        @include flex(column);
        align-items: flex-start;

        justify-content: flex-start;
      border-bottom: 1px solid #eeeeee;
      height: 100%;
      width: 100%;
        .sec1 {
          width: 100%;
          @include flex;
          align-items: flex-start;
          flex-grow: 12.5;
          height: 100%;
          padding-bottom: px(34);
          box-sizing: border-box;
          .checkbox {
            height: px(30);
            margin-right: px(30);
            .inner {
              width: px(18);
              height: px(18);
              i {
                font-size: px(18);
              }
              &:hover {
                border-color: #225c45;
              }
            }
          }
          img {
            width: px(150);
            height: px(150);
          }
          .name {
            height: px(150);
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
            }
            .xs-inner {
              @include flex;
              width: 100%;
              justify-content: space-between;
              align-items: flex-start;
              color: #333333;
              .xs-inner2 {
                @include flex(column);
                align-items: flex-end;
              }
            }
          }
        }
                  .inner1 {
                    margin-bottom: px(20);
            .title {
              margin-right: 30px;
            }
            .contral {
              @include flex;
              justify-content: flex-start;
              /deep/.el-input {
                width: auto;
                .el-input__inner {
                  width: px(117);
                  height: px(55);
                  border-radius: 0;
                  margin-left: px(10);
                  margin-right: px(10);
                  padding: 0 px(10);
                  &:focus {
                    border-color: #225c45;
                  }
                }
              }
              div:not(:nth-child(2)) {
                width: px(55);
                @include flex;
                height: px(55);
                border: 1px solid #e5e5e5;
                cursor: pointer;
              }
            }
          }
        }

        .sec2 {
          width: 100%;
          margin-top: px(70);
          // margin-left: px(50);
          padding-bottom: px(60);
          font-size: px(22);
          .inner1 {
            .title {
              margin-right: 30px;
            }
            .contral {
              @include flex;
              justify-content: flex-start;
              /deep/.el-input {
                width: auto;
                .el-input__inner {
                  width: px(117);
                  height: px(55);
                  border-radius: 0;
                  margin-left: px(10);
                  margin-right: px(10);
                  padding: 0 px(10);
                  &:focus {
                    border-color: #225c45;
                  }
                }
              }
              div:not(:nth-child(2)) {
                width: px(55);
                @include flex;
                height: px(55);
                border: 1px solid #e5e5e5;
                cursor: pointer;
              }
            }
          }
          .inner2 {
            margin-top: 15px;
            /deep/.el-input__inner {
              width: px(500);
              height: px(55);
              border-radius: 0;
              margin-left: 0;
              margin-right: 0;
              font-size: px(20);
              &:focus {
                border-color: #225c45;
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
    }
  }
  .salebtn {
    width: px(700);
    height: px(80);
    font-size: px(30);
    margin: 0 auto;
    margin-left: 0;
    margin-top: px(80);
  }
}
</style>