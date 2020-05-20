<template>
  <div class="message">
    
    <banner />
    <div class="content">
      <div class="items">
        <div class="item" v-for="(item, index) in list" :key="index">
          <div class="top">
            <div>{{item.title}} <span v-if="item.is_send!=1">*</span></div>
            <div>{{item.add_time}}</div>
          </div>
          <div class="bottom">
            <div>
              {{item.content}}
            </div>
            <div @click="goDetail(item.id)">【查看详情】</div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>


import banner from "@/components/common/banner";
import api from '@/plugins/api/api'
export default {
  components: {
    
    banner
  },
  data(){
    return{
      list:[]
    }
  },
  mounted(){
    api.personal.User().then((res)=>{
      if(res.status==200){
        this.userId=res.data.uid
        api.personal.messageList({uid:this.userId}).then((res)=>{
          this.list=res.data
          for(var i=0;i<this.list.length;i++){
            this.list[i].add_time=this.timestampToTime(this.list[i].add_time)
          }
    })
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
    goDetail(id){
      this.$router.push({path:'message/detail',query:{id:id,uid:this.userId}})
    }
  }
};
</script>

<style lang="scss" scoped>
.message {
  width: 100%;
  min-height: 100vh;
  background-color: #f7f4f8;
}
.content {
  max-width: 1200px;
  padding: 45px 10px 70px 10px;
  box-sizing: border-box;
  margin: 0 auto;
  .items {
    @include flex(column);
    justify-content: flex-start;
    .item {
      width: 100%;
      padding: 30px;
      @include flex(column);
      box-sizing: border-box;
      justify-content: flex-start;
      background-color: #fff;
      margin-bottom: 15px;
      &:last-child {
        margin-bottom: 0;
      }
      .top {
        padding-bottom: 17px;
        width: 100%;
        border-bottom: 1px solid #eeeeee;
        @include flex;
        justify-content: space-between;
        div:first-child {
          span {
            color: #ff2e7a;
          }
          font-weight: bold;
        }
        div:last-child {
          color: #999999;
        }
      }
      .bottom {
        width: 100%;
        padding-top: 17px;
        @include flex;
        justify-content: space-between;
        div:first-child {
          width: 80%;
          color: #666666;
        }
        div:last-child {
          color: #5dd2b1;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .content {
    width: 100%;
    padding: px(50) 10px px(70) 10px;
    box-sizing: border-box;
    margin: 0 auto;
    .items {
      @include flex(column);
      width: 100%;
      justify-content: flex-start;
      .item {
        width: 100%;
        padding: px(20);
        @include flex(column);
        box-sizing: border-box;
        justify-content: flex-start;
        background-color: #fff;
        margin-bottom: 15px;
        border-radius: px(5);
        font-size: px(20);
        &:last-child {
          margin-bottom: 0;
        }
        .top {
          padding-bottom: px(14);
          width: 100%;
          border-bottom: 1px solid #eeeeee;
          @include flex;
          justify-content: space-between;
          font-size: px(24);
          div:first-child {
            span {
              color: #ff2e7a;
            }
            font-weight: bold;
          }
          div:last-child {
            color: #999999;
          }
        }
        .bottom {
          width: 100%;
          padding-top: px(14);
          @include flex;
          justify-content: space-between;
          div:first-child {
            width: 80%;
            color: #666666;
          }
          div:last-child {
            color: #5dd2b1;
          }
        }
      }
    }
  }
}
</style>
