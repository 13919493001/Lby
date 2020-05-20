<template>
  <div>
    
    <banner />
    <div class="content" v-for="(item,index) in list" :key="index">
      <div class="title">{{item.title}}</div>
      <div class="date">{{item.add_time}}</div>
      <div class="main">
        {{item.content}}
      </div>
      <div class="bottom">
        <div class="box">
          <div class="prev" v-if="lastShow" @click="goLast">上一条：{{last.title}}</div>
        </div>
        <div class="box">
          <div class="next" v-if="nextShow" @click="goNext">下一条：{{next.title}}</div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>


import api from '@/plugins/api/api'
import banner from "@/components/common/banner";
export default {
  components: {
    
    banner
  },
  data(){
    return{
      id:0,
      uid:0,
      list:[],
      last:{},
      next:{},
      lastShow:true,
      nextShow:true,
    }
  },
  created(){
    this.id=this.$route.query.id
    this.uid=this.$route.query.uid
    console.log(this.id,this.uid)
  },
  mounted(){
    api.personal.messageDetail({id:this.id,uid:this.uid}).then((res)=>{
      this.list=res.data.noticeinfo
      this.list[0].add_time=this.timestampToTime(this.list[0].add_time)
      this.last=res.data.upnotice
      this.next=res.data.downnotice
      if(this.next.id!=undefined){
        this.nextShow=true
      }else{
        this.nextShow=false
      }
      if(this.last.id!=undefined){
        this.lastShow=true
      }else{
        this.lastShow=false
      }
    })
  },
  methods:{
    timestampToTime(timestamp) {
       var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
       var Y = date.getFullYear() + '/';
       var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
       var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
       var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
       var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
       var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
        return Y+M+D+h+m+s;
    },
    goLast(){
      this.id=this.last.id
      api.personal.messageDetail({id:this.id,uid:this.uid}).then((res)=>{
      this.list=res.data.noticeinfo
      this.list[0].add_time=this.timestampToTime(this.list[0].add_time)
      this.last=res.data.upnotice
      this.next=res.data.downnotice
      if(this.next.id!=undefined){
        this.nextShow=true
      }else{
        this.nextShow=false
      }
      if(this.last.id!=undefined){
        this.lastShow=true
      }else{
        this.lastShow=false
      }
    })
    },
    goNext(){
      this.id=this.next.id
      api.personal.messageDetail({id:this.id,uid:this.uid}).then((res)=>{
      this.list=res.data.noticeinfo
      this.list[0].add_time=this.timestampToTime(this.list[0].add_time)
      this.last=res.data.upnotice
      this.next=res.data.downnotice
      if(this.next.id!=undefined){
        this.nextShow=true
      }else{
        this.nextShow=false
      }
      if(this.last.id!=undefined){
        this.lastShow=true
      }else{
        this.lastShow=false
      }
    })
    },
  }
};
</script>

<style lang="scss" scoped>
.content {
  max-width: 1200px;
  padding: 30px 10px 70px 10px;
  box-sizing: border-box;
  @include flex(column);
  margin: 0 auto;
  justify-content: flex-start;
  .title {
    font-size: 24px;
  }
  .date {
    width: 100%;
    margin-top: 16px;
    text-align: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #dcd9d9;
  }
  .main {
    margin-top: 23px;
    width: 100%;
    padding-bottom: 50px;
  }
  .bottom {
    width: 100%;
    @include flex;
    justify-content: space-between;
    div{
      cursor: pointer;
    }
  }
}

@media screen and (max-width: 768px) {
  .content {
    width: 100%;
    padding: px(50) 10px px(70) 10px;
    box-sizing: border-box;
    @include flex(column);
    margin: 0 auto;
    justify-content: flex-start;
    .title {
      font-size: px(36);
    }
    .date {
      width: 100%;
      margin-top: px(18);
      text-align: center;
      padding-bottom: px(20);
      border-bottom: 1px solid #dcd9d9;
      font-size: px(20);
    }
    .main {
      margin-top: px(30);
      width: 100%;
      padding-bottom: 50px;
      font-size: px(20);
    }
    .bottom {
      width: 100%;
      font-size: px(24);
      @include flex(column);
      align-items: flex-start;
      div {
        width: 100%;
      }
      .prev {
        padding-bottom: px(24);
        border-bottom: 1px solid #dfdede;
      }
      .next {
        padding-top: px(24);
      }
    }
  }
}
</style>
