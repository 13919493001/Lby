<template>
  <div class="points">
    <banner />
    <div class="textBox">
        <p class="text1">我的积分</p>
        <div class="text2">
          <p>{{integral}}</p>
          <!-- <p>我要提现</p> -->
        </div>
      </div>
    <div class="content">
      
      <div class="menu">
        <div
          class="item"
          :class="{ active: active === index }"
          v-for="(item, index) in menu"
          :key="index"
          @click="changeActive(index)"
        >
          {{ item }}
        </div>
      </div>
      <div class="main">
        <div class="item" v-for="(item,index) in list" :key="index">
          <div class="inner1">
            <div v-if="item.pm">获得</div>
            <div v-else>消费</div>
            <div>{{item.mark}}</div>
          </div>
          <div class="inner2">
            <!-- <div>可用/冻结中</div> -->
            <div v-if="item.pm">+{{item.number}}</div>
            <div v-else>-{{item.number}}</div>
            <div>{{item.add_time}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/plugins/api/api";
import banner from "@/components/common/banner";
export default {
  data() {
    return {
      menu: ["全部", "获得", "消费", "退货回收", "其它"],
      active: 0,
      list:[],
      integral:0,
      type:""
    };
  },
  components: {
    banner
  },
  mounted(){
    this.getList(this.type);
    api.personal.userInfo().then((res)=>{
        this.integral=res.data.integral
      })
  },
  methods:{
    changeActive(index){
      this.active=index
      if(this.active==0){
        this.type=""
        this.getList(this.type);
      }else if(this.active==1){
        this.type="gain"
        this.getList(this.type);
      }else if(this.active==2){
        this.type="deduction"
        this.getList(this.type);
      }else if(this.active==3){
        this.type="return"
        this.getList(this.type);
      }else if(this.active==4){
        this.type="other"
        this.getList(this.type);
      }
    },
    getList(type){
      console.log(type);
      
      api.personal.integralList({type:type}).then((res)=>{
        this.list=res.data
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.points {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: #f3f0f3;
  .textBox{
    position: absolute;
    left: 50%;
    top: 50px;
    transform: translateX(-50%);
    .text1{
      font-size: 26px;
      color: #fff;
    }
    .text2{
      display: flex;
      margin-top: 6px;
      justify-content: flex-start;
      align-items: center;
      :nth-child(1){
        width: 100px;
        text-align: center;
        color: #fff;
        font-size: 12px;
      }
      :nth-child(2){
        text-align: center;
        color: #fff;
        width: 86px;
        height: 30px;
        background-color: #fff;
        line-height: 30px;
        border-radius: 16px;
        color: #225c45;
        font-size: 12px;
      }
    }
  }
  .content {
    max-width: 1200px;
    padding: 36px 33px 66px 33px;
    box-sizing: border-box;
    background-color: #fff;
    margin: 0 auto;
    margin-top: -30px;
    position: relative;
    z-index: 2;
    .menu {
      width: 100%;
      margin: 0 auto;
      @include flex;
      .item {
        cursor: pointer;
        padding: 6px 16px;
        @include flex;
        margin-right: 10px;
        &:last-child {
          margin-right: 0;
        }
      }
      .active {
        color: #fff;
        background-color: #225c45;
      }
    }
    .main {
      width: 100%;
      @include flex(column);
      margin-top: 40px;
      .item {
        margin-bottom: 20px;
        padding: 18px 40px;
        box-sizing: border-box;
        width: 100%;
        border: 1px solid #eee;
        @include flex;
        justify-content: flex-start;
        &:last-child {
          margin-bottom: 0;
        }
        .inner1 {
          flex: 3;
          @include flex;
          justify-content: flex-start;
          div:first-child {
            flex: 1;
            font-size: 20px;
          }
          div:last-child {
            flex: 2;
            text-align: center;
          }
        }
        .inner2 {
          flex: 4;
          @include flex;
          justify-content: flex-start;
          margin-left: 30px;
          div:first-child {
            flex: 1;
            color: #888888;
            text-align: center;
          }
          div:nth-child(2) {
            flex: 1;
            text-align: center;
          }
          div:last-child {
            flex: 1;
            text-align: right;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .points {
    .textBox{
    position: absolute;
    left: 50%;
    top: 50px;
    transform: translateX(-50%) translateY(-50%);
    .text1{
      font-size: px(26);
      color: #fff;
    }
    .text2{
      margin-top: px(6);
      :nth-child(1){
        width: px(100);
        text-align: center;
        color: #fff;
        font-size: px(12);
      }
      :nth-child(2){
        text-align: center;
        color: #fff;
        width: px(86);
        height: px(30);
        background-color: #fff;
        line-height: px(30);
        border-radius: px(16);
        color: #225c45;
        font-size: px(12);
      }
    }
  }
    .content {
      width: 100%;
      padding: px(42) px(20) px(73) px(20);
      margin-top: px(-30);
      .menu {
        width: 100%;
        margin: 0 auto;
        @include flex;
        justify-content: space-between;
        font-size: px(24);
        .item {
          cursor: pointer;
          padding: px(13) px(30);
          @include flex;
          margin-right: 0;
        }
        .active {
          color: #fff;
          background-color: #225c45;
        }
      }
      .main {
        width: 100%;
        @include flex(column);
        margin-top: px(56);
        .item {
          margin-bottom: px(24);
          padding: px(23) px(35);
          box-sizing: border-box;
          width: 100%;
          border: 1px solid #eee;
          @include flex(column);
          align-items: flex-start;
          font-size: px(20);
          &:last-child {
            margin-bottom: 0;
          }
          .inner1 {
            flex: none;
            width: 100%;
            @include flex;
            justify-content: space-between;
            margin-bottom: px(20);
            div:first-child {
              flex: none;
              font-size: px(30);
            }
            div:last-child {
              flex: none;
              text-align: center;
            }
          }
          .inner2 {
            flex: none;
            width: 100%;
            @include flex;
            justify-content: space-between;
            margin-left: 0;
            div:first-child {
              flex: none;
              color: #888888;
              text-align: center;
            }
            div:nth-child(2) {
              flex: none;
              text-align: center;
            }
            div:last-child {
              flex: none;
              text-align: right;
            }
          }
        }
      }
    }
  }
}
</style>
