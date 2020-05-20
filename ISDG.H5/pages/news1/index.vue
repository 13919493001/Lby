<template>
  <div class="news">
    <banner :imgUrl="imgUrl" />
    <div class="content">
      <div class="title">
        <div>News</div>
        <div>品牌资讯</div>
      </div>
      <div class="items">
        <div class="item" v-for="(item, index) in list" :key="index">
          <img :src="item.image_input[num]" alt="" />
          <div class="stitle" @click="jump(item.id)">
            {{item.title}}
          </div>
          <div class="date">{{item.add_time}}</div>
          <div class="text">
            {{item.synopsis}}
          </div>
        </div>
      </div>
      <!-- <el-pagination
        background
        layout="prev, pager, next"
        :total=total
        :page-size=8
        prev-text="上一页"
        next-text="下一页"
        @prev-click="last"
        @next-click="next"
        :pager-count="5"
      >
      </el-pagination> -->
    </div>
  </div>
</template>

<script>
import banner from "@/components/news/banner";
import api from '@/plugins/api/api'
export default {
  components: {
    banner
  },
  created(){
    this.id=this.$route.query.id

  },
  methods: {
    jump(id) {
      this.$router.push({path:"/news1/detail",query:{id:id}});
    },
    last(){
      this.page-=1
      api.home.articleList(12,{page:this.page,limit:8}).then(res =>{
        console.log(res);
        this.list = res.data
      })
    },
    next(){
      this.page+=1
      api.home.articleList(12,{page:this.page,limit:8}).then(res =>{
        console.log(res);
        this.list = res.data
      })
    },
    timestampToTime(timestamp) {
	    var date = new Date(timestamp * 1000);
	    var Y = date.getFullYear() + '-';
	    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
	    var D = '-'+date.getDate() + ' ';
	    var h = date.getHours() + ':';
	    var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      var date=Y+M+D
	    return date
	  },
  },
  data(){
    return{
      imgUrl:"",
      limit:6,
      list:[],
      img:"",
      viewTop:0,
      page:0,
      total:0,
      num:0,
      id:0
    }
  },
  mounted(){
     api.home.shoppingGuides().then((res)=>{
        this.imgUrl=res.data[2].image
       
      })
      api.home.articleList(12,{page:this.page,limit:6}).then((res)=>{
        this.list=res.data
        this.total=res.data.length
        for(var i in this.list){
          
          this.list[i].add_time=this.timestampToTime(this.list[i].add_time)

        }
      })
      
      
  }
};
</script>

<style lang="scss" scoped>
.news {
  width: 100%;
  min-height: 100vh;
  background-color: #fffeff;
}
.content {
  padding: 65px 10px 88px 10px;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  @include pagination;
  .title {
    width: 100%;
    text-align: center;
    div:first-child {
      font-size: 55px;
      color: #e0e0e0;
    }
    div:last-child {
      font-size: 18px;
      margin-top: 10px;
    }
  }
  .items {
    margin-top: 50px;
    @include flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .item {
      margin-bottom: 50px;
      width: 30%;
      text-align: center;
      img {
        max-width: 100%;
        height: auto;
        object-fit: cover;
      }
      .stitle {
        width: 100%;
        font-size: 20px;
        margin-top: 50px;
        text-align: left;
        cursor: pointer;
      }
      .date {
        width: 100%;
        color: #888888;
        margin-top: 20px;
        text-align: left;
      }
      .text {
        width: 100%;
        height: 72px;
        text-align: left;
        line-height: 24px;
        color: #666666;
        @include ellipsis(3);
        margin-top: 25px;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .news {
    width: 100%;
    min-height: 100vh;
    background-color: #f7f4f8;
  }
  .content {
    padding: px(36) 10px px(80) 10px;
    width: 100%;
    margin: 0 auto;
    @include pagination("m");
    .title {
      width: 100%;
      text-align: center;
      div:first-child {
        font-size: px(80);
        color: #e0e0e0;
      }
      div:last-child {
        font-size: px(30);
        margin-top: 10px;
      }
    }
    .items {
      margin-top: px(50);
      @include flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .item {
        margin-bottom: px(80);
        width: 100%;
        text-align: center;
        img {
          max-width: 100%;
          height: auto;
          object-fit: cover;
        }
        .stitle {
          width: 100%;
          font-size: px(30);
          margin-top: px(50);
          text-align: left;
        }
        .date {
          width: 100%;
          color: #888888;
          font-size: px(20);
          margin-top: px(20);
          text-align: left;
        }
        .text {
          width: 100%;
          height: px(72);
          text-align: left;
          line-height: px(24);
          color: #666666;
          @include ellipsis(3);
          margin-top: px(25);
          font-size: px(24);
        }
      }
    }
  }
}
</style>
