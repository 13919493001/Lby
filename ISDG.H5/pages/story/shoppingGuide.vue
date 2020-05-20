<template>
  <div class="contactus">
    <img :src="imgUrl" alt="" class="banner" />
    <div class="cate">
        <p v-for="(item,index) in list" :key="index" :class="{cur:num==item.id}" @click="changeNum(index)">{{item.title}}</p>
    </div>
    <div class="content" v-if="show">
        <div class="word">
            <div class="box" v-for="(items,idx) in textList" :key="idx" @click="goDetail(items.id)">
                <div class="text">
                    <p class="text1">{{items.title}}</p>
                    <p class="text2">{{items.synopsis}}</p>
                    <div class="text3">
                    <img src="@/static/icon/eye.png" alt="">
                    <p class="text4">浏览量：{{items.visit}}</p>
                    </div>
                </div>
                <div class="ringt">
                    <img src="@/static/icon/right.png" alt="">
                </div>
            </div>
        </div>
    </div>
    <textDetail v-else :id="id" :story="story" />
  </div>
</template>

<script>
import textDetail from "@/components/news/textDetail";
import api from '@/plugins/api/api'
export default {
  components: {
    textDetail
  },
    data(){
        return{
            num:0,
            list:[],
            textList:[],
            show:true,
            id:0,
            imgUrl:"",
            story:"",
        }
    },
    watch:{
      $route(to,from){
        console.log(to);
        this.num=this.list[to.query.id].id
        api.home.articleList(this.list[to.query.id].id).then((res)=>{
          this.textList=res.data
        })
        if(to.query.textId){
          this.goDetail(to.query.textId)
        }else if(to.query.textId==undefined){
          this.show=true
        }
        
      }
    },
    methods:{
      changeNum(index){
        this.num=this.list[index].id
        api.home.articleList(this.list[index].id).then((res)=>{
          this.textList=res.data
        })
        this.show=true
      },
      goDetail(id){
        this.show=false
        api.home.articleList(this.num).then((res)=>{
          this.textList=res.data
          for(var i=0; i<this.textList.length;i++){
          if(this.textList[i].id==id){
            this.story=this.textList[i].title
          }
        }
        })
        this.id=id
      }
    },
    created(){
      
    },
    mounted(){
      api.home.shoppingGuide().then((res)=>{
        this.list=JSON.parse(res)
        setTimeout(() => {
          this.num=this.list[this.$route.query.id].id
          if(this.$route.query.textId){
            this.goDetail(this.$route.query.textId)
            
          }
        }, 200);
        api.home.articleList(this.list[this.num].id).then((res)=>{
          this.textList=res.data
          for(var i=0; i<this.textList.length;i++){
          if(this.textList[i].id==this.id){
            this.story=this.textList[i].title            
          }
        }
        })
      })
      api.home.shoppingGuides().then((res)=>{
        this.imgUrl=res.data[0].image
        
       
      })
      
    }
    
};
</script>

<style lang="scss" scoped>
.contactus {
  width: 100%;
}
.banner {
  width: 100%;
  height: 580px;
}
.content {
  max-width: 100%;
  padding: 56px 10px 74px 10px;
  box-sizing: border-box;
  margin: 0 auto;
  background-color: #f6f6f6;
  min-height: 200px;
  .word{
      width: 1464px;
      margin: 0 auto;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .box{
        cursor:pointer;
        width: 340px;
        box-sizing: border-box;
	      height: 159px;
	      background-color: #ffffff;
        margin-bottom: 26px;
        margin-left: 13px;
        margin-right: 13px;
        padding: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .text{
            .text1{
                font-size: 16px;
                color: #333333;
                line-height: 55px;
            }
            .text2{
                font-size: 14px;
                line-height: 30px;
                height: 60px;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 245px;
                color: #b9b8b8;
            }
            .text3{
                display: flex;
                justify-content: flex-start;
                .text4{
                font-size: 14px;
                line-height: 30px;
                color: #888888;
                margin-left: 11px;
            }
            }
            
        }
      }
  }
}
.cate{
  max-width: 1200px;
  margin: 0 auto;
  background-color: #ffffff;
  height: 65px;
  display: flex;
  justify-content: center;
  margin-top: -1.5px;
  p{
    width: 116px;
	height: 65px;
    font-size: 16px;
    line-height: 65px;
    text-align: center;
    color: #333333;
    cursor:pointer;
  }
  .cur{
      background-color: #5dd2b1;
      color: #ffffff;
  }
}

@media screen and (max-width: 768px) {
  .banner {
    width: 100%;
    height: px(400);
  }
  .content {
    width: 100%;
    padding: px(77) 10px px(84) 10px;
    box-sizing: border-box;
    .word{
      width: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      
      
      .box{
        width: 100%;
	    height: px(159);
	    background-color: #ffffff;
        margin-bottom: px(26);
        margin-left: px(13);
        margin-right: px(13);
        padding: px(30);
        display: flex;
        justify-content: space-between;
        align-items: center;
        .text{
            .text1{
                font-size: px(16);
                color: #333333;
                line-height: px(55);
            }
            .text2{
                font-size: px(14);
                line-height: px(30);
                height: px(60);
                color: #b9b8b8;
            }
            .text3{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .text4{
                font-size: px(14);
                line-height: px(30);
                color: #888888;
                margin-left: px(11);
            }
            }
            
        }
      }
  }
  }
  .cate{
  max-width: px(1200);
  margin: 0 auto;
  background-color: #ffffff;
  height: px(65);
  display: flex;
  justify-content: center;
  margin-top:-2px;
  p{
    width: px(116);
	height: px(65);
    font-size: px(16);
    line-height: px(65);
    text-align: center;
    color: #333333;
  }
  .cur{
      background-color: #5dd2b1;
      color: #ffffff;
  }
}
}
</style>
