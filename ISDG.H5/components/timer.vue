<template>
  <!-- <span :endTime="endTime" :endText="endText"> -->
    <!-- <slot> -->
      <!-- {{content}} -->
      <div v-if="status==1">
        <div  class="order1" v-if="hour==0&&min==0&&sec==0">
          <div>(</div>
          {{endText}}
          <div>)</div>
          </div>
        <div class="order1" v-else>
          <div>(</div>
          <div>{{hour}}</div>
          <div>:</div>
          <div>{{min}}</div>
          <div>:</div>
          <div>{{sec}}</div>
          <div>)</div>
        </div>
      </div>
      <div v-else class="time">
        <div class="block">{{hour}}</div>
        <div>:</div>
        <div class="block">{{min}}</div>
        <div>:</div>
        <div class="block">{{sec}}</div>
      </div>
    <!-- </slot> -->
  <!-- </span> -->
</template>
<script>
  export default {
    data(){
      return {
      content: '',
      hour:0,
      min:0,
      sec:0
      }
    },
    props:{
      endTime:{
        default:0
      },
      endText:{
        type : String,
        default:'已过期'
      },
      status:{
        default:0
      }
    //   callback : {
    //     type : Function,
    //     default :''
    //   }
    },
    mounted () {
     this.countdowm(this.endTime)
     console.log(this.endTime,this.status);
     
    },
    methods: {
      countdowm(timestamp){
      let self = this;
      let timer = setInterval(function(){
        let nowTime = new Date();
        let endTime = new Date(timestamp * 1000);
        let t = endTime.getTime() - nowTime.getTime();
        if(t>0){
          let day = Math.floor(t/86400000);
          let hour=Math.floor((t/3600000)%24);
          let min=Math.floor((t/60000)%60);
          let sec=Math.floor((t/1000)%60);
          if(hour<=0){
              hour=0
          }else{
            hour = hour < 10 ? "0" + hour : hour;
          }
          min = min < 10 ? "0" + min : min;
          sec = sec < 10 ? "0" + sec : sec;
          let format = '';
        //   if(day > 0){
        //     format = `${day}天${hour}小时${min}分${sec}秒`;
        //   } 
        //   if(day <= 0 && hour > 0 ){
        //     format = `${hour}小时${min}分${sec}秒`; 
        //   }
        //   if(day <= 0 && hour <= 0){
        //     format =`${min}分${sec}秒`;
        //   }
        // format = `${hour}小时${min}分${sec}秒`; 
          self.content = format;
          self.hour = hour;
          self.min = min;
          self.sec = sec;
          }else{
           clearInterval(timer);
           self.content = self.endText;
        //    self._callback();
          }
         },1000);
        },
    //     _callback(){
    //     if(this.callback && this.callback instanceof Function){
    //        this.callback(...this);
    //      }
    //   }
    }
  }
</script>

<style lang="scss">
  .order1{
    display: flex;
    justify-content: flex-start;
  }
          .time {
        @include flex;
        color: #ff2e7a;
        .block {
          width: 30px;
          height: 30px;
          background: rgba(255, 46, 122, 1);
          @include flex;
          color: #fff;
          margin: 0 10px;
        }
      }
@media screen and (max-width: 768px) {
      .time {
          @include flex;
          color: #ff2e7a;
          .block {
            width: px(36);
            height: px(36);
            background: rgba(255, 46, 122, 1);
            @include flex;
            color: #fff;
            margin: 0 px(8);
          }
        }
}
</style>