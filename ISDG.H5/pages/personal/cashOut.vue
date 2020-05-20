<template>
  <div class="cash">
    
    <banner />
    <div class="cash-content">
      <div class="content">
        <div class="title">请输入提现金额<span>（手续费为0.5%）</span></div>
        <div class="main">
          <div class="inner1">
            <div>￥</div>
            <div><input type="text" placeholder="0" v-model="price" ></div>
            
          </div>
          <div class="line"></div>
          <div class="inner2">
            <div>可提现</div>
            <!-- <div>￥{{extractPrice}}（0积分)</div> -->
            <div>￥{{extractPrice}}</div>
            <div style="color:#5DD2B1" @click="all">全部提现</div>
          </div>
          <div class="inner3">
            <div>暂不可提现</div>
            <div>￥{{extractTotalPrice}}</div>
            <!-- <div>0积分</div> -->
          </div>
        </div>
        <div class="btn" @click="submit">提现</div>
      </div>
    </div>
    
  </div>
</template>

<script>


import api from "@/plugins/api/api";
import banner from "@/components/common/banner";
export default {
  components: {
    
    banner
  },
  data(){
    return{
      extractPrice:0,
      price:0,
      name:"",
      extractTotalPrice:0
    }
  },
  mounted(){
    this.getExtractPrice();
  },
  methods:{
    getExtractPrice(){
      api.personal.User().then((res)=>{
        this.extractPrice=parseFloat(res.data.extractPrice)
        this.extractTotalPrice=parseFloat(res.data.extractTotalPrice)-this.extractPrice
      })
      api.personal.userInfo().then((res)=>{
        this.name=res.data.nickname
      })
    },
    all(){
      this.price=this.extractPrice
    },
    submit(){
      api.personal.cash({extract_type:"weixin",money:this.price,name:this.name})
    }
  }
};
</script>

<style lang="scss" scoped>
.cash {
  width: 100%;
  min-height: 100vh;
  background-color: #f6f6f6;
}
.cash-content {
  width: 100%;
  margin: 0 auto;
  padding: px(100) 0 px(120) 0;
  position: relative;
  z-index: 2;
  background-color: #fff;
}
.content {
  @include flex(column);
  .btn{
      width: 131px;
    height: 45px;
    margin-left: 10px;
    background: #225c45;
    border: 1px solid #225c45;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    color: #fff;
    cursor: pointer;
    margin-top: 20px;
  }
  .title {
    font-size: px(24);
    span {
      color: #5dd2b1;
    }
  }
  .main {
    padding: px(40) px(50) px(60) px(50);
    width: px(609);
    border: 1px solid #eeeeee;
    margin-top: px(68);
    @include flex(column);
    .inner1 {
      @include flex;
      width: 100%;
      position: relative;
      div:first-child {
        font-size: px(50);
        position: absolute;
        left: 0;
      }
      div:last-child {
        font-size: px(110);
        color: #225c45;
        input{
          height: px(116);
          line-height: px(80);
          color: #225c45;
          font-size: px(66);
          width: px(200);
        }
         ::-webkit-input-placeholder {
            color: #225c45;
          font-size: px(110);
    }
      }
      margin-bottom: px(45);
    }
    .line {
      width: px(545);
      height: 1px;
      margin: 0 auto;
      background-color: #eeeeee;
      margin-bottom: px(45);
    }
    .inner2 {
      @include flex;
      width: 100%;
      color: #666666;
      font-size: px(20);
      justify-content: space-between;
      margin-bottom: px(22);
    }
    .inner3 {
      @extend .inner2;
      margin-bottom: 0;
    }
  }
}

@media screen and (min-width: 768px) {
  .cash-content {
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 50px;
    padding-bottom: 118px;
    box-sizing: border-box;
    margin-top: -30px;
  }
  .content {
    @include flex(column);
    .title {
      font-size: 14px;
      span {
        color: #5dd2b1;
      }
    }
    .main {
      padding: 28px 38px 23px 38px;
      width: 520px;
      margin-top: 51px;
      @include flex(column);
      .inner1 {
        @include flex;
        width: 100%;
        align-items: center;
        position: relative;
        div:first-child {
          font-size: 30px;
          position: absolute;
          left: 0;
        }
        div:last-child {
          font-size: 66px;
          color: #225c45;
          input{
          height: 80px;
          line-height: 80px;
          color: #225c45;
          font-size: 66px;
          width: 200px;
        }
         ::-webkit-input-placeholder {
            color: #225c45;
          font-size: px(130);
    }
        }
        margin-bottom: 30px;
      }
      .line {
        width: 400px;
        height: 1px;
        margin: 0 auto;
        background-color: #eeeeee;
        margin-bottom: 30px;
      }
      .inner2 {
        @include flex;
        width: 100%;
        color: #666666;
        font-size: 14px;
        justify-content: space-between;
        margin-bottom: 19px;
        div:last-child {
          cursor: pointer;
        }
      }
      .inner3 {
        margin-bottom: 0;
      }
    }
  }
}
</style>
