<template>
  <div class="order">
    
    <banner />
    <!--  -->
    <section class="content">
      <order :List="List" @search="search" :type="type">
        <div class="menu">
          <div
            v-for="(item, index) in menu"
            :key="index"
            class="item"
            :class="{ active: active === index }"
            @click="changeAtive(index)"
          >
            {{ item }}
          </div>
        </div>
      </order>
      <el-button type="primary" class="btn" v-if="length>0" @click="loadMore">加载更多</el-button>
      <p v-else class="txt">暂无数据</p>
      <about class="hidden-xs-only" />
    </section>
    
  </div>
</template>

<script>


import banner from "@/components/common/banner";
import about from "@/components/about";
import order from "@/components/order";
import api from "@/plugins/api/api";
export default {
  data() {
    return {
      menu: ["全部", "待付款", "待收货", "已完成", "已取消"],
      active: 0,
      List:[],
      show:false,
      list:[],
      comList:[],
      limit1:5,
      limit2:5,
      limit3:5,
      limit4:5,
      limit5:5,
      length:0,
      type:""
    };
  },
  methods:{
    changeAtive:function(index){
      this.active=index
      this.length=0
      this.List=[]
      if(this.active==0){
        this.type=""
        api.personal.orderList({limit:5}).then((res)=>{
          this.List=res.data
          this.getTime()
          this.length=this.List.length
        })
      }else if(this.active==1){
        this.type=0
        api.personal.orderList({type:0,page:0,limit:5}).then((res)=>{
          this.List=res.data
          this.getTime()
          this.length=this.List.length
        })
      }else if(this.active==2){
        this.type=2
        api.personal.orderList({type:2,page:0,limit:5}).then((res)=>{
          this.List=res.data
          this.getTime()
          this.length=this.List.length
        })
      }else if(this.active==3){
        this.type=3
        api.personal.orderList({type:3,page:0,limit:5}).then((res)=>{
          this.List=res.data
          this.getTime()
          this.length=this.List.length
        })
      }else if(this.active==4){
        this.type=5
        api.personal.orderList({type:5,page:0,limit:5}).then((res)=>{
          this.List=res.data
          this.getTime()
          this.length=this.List.length
        })
      }
      
      
      
    },
    loadMore(){
      if(this.active==0){
        this.limit1+=5
        this.type=""
        api.personal.orderList({limit:this.limit1}).then((res)=>{
          this.List=res.data
          this.getTime()
        })
      }else if(this.active==1){
        this.limit2+=5
        this.type=0
        api.personal.orderList({type:0,page:0,limit:this.limit2}).then((res)=>{
          this.List=res.data
          this.getTime()
        })
      }else if(this.active==2){
        this.limit3+=5
        this.type=2
        api.personal.orderList({type:2,page:0,limit:this.limit3}).then((res)=>{
          this.List=res.data
          this.getTime()
        })
      }else if(this.active==3){
        this.limit4+=5
        this.type=3
        api.personal.orderList({type:3,page:0,limit:this.limit4}).then((res)=>{
          this.List=res.data
          this.getTime()
        })
      }else if(this.active==4){
        this.limit5+=5
        this.type=5
        api.personal.orderList({type:5,page:0,limit:this.limit5}).then((res)=>{
          this.List=res.data
          this.getTime()
        })
      }
    },
    timestampToTime(timestamp) {
	    var date = new Date(timestamp * 1000);
	    var Y = date.getFullYear() + '-';
	    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
	    var D = date.getDate() + ' ';
	    var h = date.getHours() + ':';
	    var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      var date=new Array(Y+M,D)
	    return date
	  },
    getTime(){
      for(var i=0;i<this.List.length;i++){
        // console.log(this.timestampToTime(this.List[i].add_time))
        this.List[i].date=this.timestampToTime(this.List[i].add_time)[0]
        this.List[i].hour=this.timestampToTime(this.List[i].add_time)[1]
      }
    },
    search(data){
      this.List=data
      this.getTime();
    }
  },
   mounted:function(){
      if(this.$route.query.id==0){
        this.type=""
        api.personal.orderList({limit:5}).then((res)=>{
          this.List=res.data
          this.length=this.List.length
          this.getTime()
        })
      }else if(this.$route.query.id==1){
        this.type=0
        api.personal.orderList({type:0,page:0,limit:5}).then((res)=>{
          this.List=res.data
          this.length=this.List.length
          this.getTime()
        })
      }else if(this.$route.query.id==2){
        this.type=2
        api.personal.orderList({type:2,page:0,limit:5}).then((res)=>{
          this.List=res.data
          this.length=this.List.length
          this.getTime()
        })
      }else if(this.$route.query.id==3){
        this.type=3
        api.personal.orderList({type:3,page:0,limit:5}).then((res)=>{
          this.List=res.data
          this.length=this.List.length
          this.getTime()
        })
      }else if(this.$route.query.id==4){
        this.type=5
        api.personal.orderList({type:5,page:0,limit:5}).then((res)=>{
          this.List=res.data
          this.length=this.List.length
          this.getTime()
        })
      }    

  },
  components: {
    banner,
    about,
    order,
  },
  created:function(){
    this.active=this.$route.query.id
  }
};
</script>

<style lang="scss" scoped>
.order {
  width: 100%;
  min-height: 100vh;
  background-color: #f3f0f3;
  .content {
    max-width: 1200px;
    padding: 30px;
    box-sizing: border-box;
    background-color: #fff;
    margin: 0 auto;
    margin-top: -30px;
    position: relative;
    z-index: 2;
    margin-bottom: 40px;
    .menu {
      @include flex;
      .item {
        padding: 6px 17px;
        @include flex;
        color: #333333;
        font-size: 14px;
        cursor: pointer;
        margin-right: 30px;
      }
      .active {
        background-color: #225c45;
        color: #fff;
      }
    }
    .btn{
      width: 100px;
      position: absolute;
      left: 50%;
      margin-left: -50px;
      margin-top: 10px;
      background-color: #225c45;
      border: none;
      border-radius: 0;
    }
    .txt{
      width: 100px;
      position: absolute;
      left: 50%;
      margin-left: -50px;
      margin-top: 10px;
    }
  }
}

@media screen and (max-width: 768px) {
  .order {
    .content {
      width: 100%;
      padding: px(30) px(10) px(30) px(10);
      margin-top: px(-30);
      margin-bottom: px(80);
      .menu {
        @include flex;
        justify-content: space-between;
        .item {
          padding: px(13) px(33);
          font-size: px(24);
          margin-right: 0;
        }
      }
    }
  }
}
</style>
