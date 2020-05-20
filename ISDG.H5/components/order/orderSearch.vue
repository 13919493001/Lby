<template>
  <div>
    <div class="top">
      <div class="sec1">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          class="sdate"
          v-model="addTime"
        >
        </el-date-picker>
        <div class="text">至</div>
        <el-date-picker
          type="date"
          placeholder="选择日期"
          class="sdate"
          v-model="endTime"
        ></el-date-picker>
        <div class="btn" v-if="!isOrder" @click="search">搜索</div>
      </div>
      <div class="sec2" v-if="isOrder">
        <div class="input">
          <input type="text" placeholder="请输入订单编号" v-model="orderId" />
        </div>
        <div class="btn" @click="search">搜索</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOrder: {
      type: Boolean,
      default: true
    }
  },
  data(){
    return{
      orderId:"",
      addTime:'',
      endTime:'',
      aTime:"",
      eTime:""
    }
  },
  methods:{
    search(){
      this.aTime=new Date(this.addTime).valueOf()/1000
      this.eTime=new Date(this.endTime).valueOf()/1000
      if(this.isOrder==true){
        this.$emit("search",{orderId:this.orderId,addTime:this.addTime,endTime:this.endTime})
      }else{
        this.$emit("search",{addTime:this.aTime,endTime:this.eTime})
      }
      
    }
  }
};
</script>

<style lang="scss" scoped>
.top {
  @include flex;
  flex-wrap: wrap;
  .sec1 {
    @include flex;
    margin-bottom: 30px;
    margin-right: 20px;
    /deep/.sdate {
      width: 145px;
      height: 40px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(238, 238, 238, 1);
      border-radius: 20px;
      overflow: hidden;
      .el-input__inner {
        border: 0;
        padding-left: 14px;
      }
      .el-input__prefix {
        right: 18px;
        font-size: 18px;
        display: none;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      margin: 0 15px;
    }
  }
  .sec2 {
    @include flex;
    margin-bottom: 30px;
    .input {
      width: 363px;
      height: 40px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(238, 238, 238, 1);
      border-radius: 20px;
      overflow: hidden;
      line-height: 40px;
      input {
        width: 100%;
        padding: 0 17px;
        box-sizing: border-box;
        font-size: 14px;
        &::placeholder {
          color: #888888;
        }
      }
    }
  }
  .btn {
    width: 109px;
    height: 40px;
    background: #225c45;
    border-radius: 20px;
    @include flex;
    color: #fff;
    margin-left: 12px;
    cursor: pointer;
  }
}

@media screen and (max-width: 768px) {
  .top {
    .sec1 {
      margin: 0 auto;
      margin-bottom: px(38);
      /deep/.sdate {
        width: px(250);
        height: px(65);
        border-radius: px(32);
        .el-input__inner {
          width: 100%;
          height: 100%;
          padding-left: px(14);
          font-size: px(24);
        }
      }
      .text {
        font-size: px(24);
        color: #333;
        margin: 0 px(24);
      }
      .btn {
        width: px(127);
        height: px(65);
        border-radius: px(32);
        margin-left: px(10);
      }
    }
    .sec2 {
      margin: 0 auto;
      @include flex;
      margin-bottom: px(38);
      .input {
        width: px(535);
        height: px(65);
        border-radius: px(32);
        line-height: px(65);
        input {
          width: 100%;
          padding: 0 px(18);
          font-size: px(24);
        }
      }
      .btn {
        width: px(164);
        height: px(65);
        border-radius: px(32);
        margin-left: px(10);
      }
    }
  }
}
</style>
