<template>
  <div class="address" @change="userInfo">
    <div class="phone">
      <div>账户（手机号码）:<span>{{phone}}</span></div>
      <div>我们将通过以上手机号码向您发送订单相关信息</div>
    </div>
    <div class="title">配送地址</div>
    <chose v-if="show" />
    <add v-else @addChange="addChange" />
    <el-form :model="form"  label-position="top">
      <el-form-item label="送货时间" class="date">
        <el-time-select
          v-model="form.value"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30'
          }"
          placeholder="工作日、非工作日均可配送"
        >
        </el-time-select>
      </el-form-item>
      <el-form-item label="订单备注">
        <el-input v-model="form.etc"></el-input>
      </el-form-item>
    </el-form>
    <!-- 支付 -->
    <!-- <div class="pay">
      <div class="title">支付方式</div>
      <div class="imgs">
        <div :class="{ active: active === 0 }" @click="changeActive(0)">
          <img src="@/static/icon/airpay.png" alt="" class="airpay"/>
          <span>支付宝</span>
        </div>
        <div :class="{ active: active === 1 }" @click="changeActive(1)">
          <img src="@/static/icon/wxpay.png" alt="" class="wxpay"/>
          <span>微信</span>
        </div>
        <div :class="{ active: active === 2 }" @click="changeActive(2)">
          <img src="@/static/icon/upay.png" alt="" class="upay"/>
          <span>银联</span>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import add from "./add";
import chose from "./chose";
import api from "@/plugins/api/api";
export default {
  components: {
    add,
    chose
  },
  data() {
    return {
      form: {},
      active: 0,
      value:"",
      show:false,
      phone:"",
      addressId:1,
      payType:"zhifubao"
    };
  },
  methods:{
    userInfo(){
      this.$emit("userInfo",this.form)
    },
    addChange(data){
      console.log(data);
      this.addressId=data
      
    },
    changeActive(id){
      if(id==0){
        this.active=0
        this.payType="zhifubao"
      }else if(id==1){
        this.active=1
        this.payType="weixin"
      }else if(id==2){
        this.active=2
        this.payType="yinlian"
      }else{
        this.payType="zhifubao"
      }
      this.$emit("changeActive",this.payType)
    }
  },
  created(){
    api.personal.User().then((res)=>{
      this.phone=res.data.phone
      if(res.status==200||res.data.status==200){
        api.personal.addressList().then((res)=>{
          if(res.data.length>0){
            this.show=true
          }else if(res.status==410000){
            var that=this
              setTimeout(function(){ that.$router.push({path:'/login'}); }, 1000);
          }else{
            this.show=false
          }
        })
      }
    })

  }
};
</script>

<style lang="scss" scoped>
.address {
  max-width: 750px;
  min-height: 200px;
  margin: 0 auto;
  @include form;
  /deep/.el-form .date .el-input__inner{
    width: 750px;
  }
}
.phone {
  width: 750px;
  height: 88px;
  box-sizing: border-box;
  background-color: #fff;
  padding: 25px 17px;
  @include flex(column);
  justify-content: space-between;
  align-items: flex-start;
  color: #888;
  span {
    color: #333333;
  }
}
.title {
  font-size: 24px;
  font-weight: bold;
  margin-top: 44px;
}
.pay {
  margin-top: 30px;
  margin-bottom: 20px;
  .title {
    font-size: 24px;
    font-weight: bold;
  }
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
}

@media screen and (max-width: 768px) {
  .address {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    @include form-m;
  }
  .phone {
    width: 100%;
    height: px(118);
    box-sizing: border-box;
    background-color: #fff;
    padding: px(30);
    @include flex(column);
    justify-content: space-between;
    align-items: flex-start;
    font-size: px(24);
    color: #888;
    span {
      color: #333333;
    }
  }
  .title {
    font-size: px(30);
    font-weight: bold;
    margin-top: px(64);
  }
  .pay {
    margin-top: px(30);
    margin-bottom: px(70);
    .title {
      font-size: px(30);
      font-weight: bold;
    }
    .imgs {
      margin-top: px(27);
      @include flex(column);
      justify-content: flex-start;
      div {
        height: px(64);
        background-color: #fff;
        font-size: px(25);
        width: 100%;
        @include flex;
        cursor: pointer;
        margin-bottom: px(35);
        &:last-child {
          margin-bottom: 0;
        }
        span {
          margin-left: px(22);
        }
        .airpay{
          width: px(40);
          height: px(40);
        }
        .wxpay{
          width: px(50);
          height: px(42);
        }
        .upay{
          width: px(65);
          height: px(44);
        }
      }
      .active {
        box-shadow: 0px 0px px(15) 0px rgba(0, 0, 0, 0.1);
        font-weight: bold;
      }
    }
  }
}
</style>
