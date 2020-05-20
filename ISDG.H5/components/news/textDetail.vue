<template>
  <div class="shadow">
      <banner :num=1 :story="story" />
    <div class="detail">
        <p class="text1">{{detail.title}}</p>
        <p class="text2">浏览量  {{detail.visit}}</p>
        <p class="text3" v-html="detail.content"></p>
        <!-- <img v-for="(item,index) in detail.image_input" :key="index" :src="item" alt="" class="img"> -->
    </div>
  </div>
</template>

<script>
import banner from "@/components/common/banner";
import api from '@/plugins/api/api'
export default {
    props:{
        id:{
            default:0
        },
        story:{
            type:String,
            default:""
        }
    },
    components: {
        banner
    },
    data(){
        return{
            detail:[],
        }
    },
    watch:{
        id(newVal){
        this.getTextDetail(newVal);
        }
    },
    mounted(){
        // api.home.articleDetail(this.$props.id).then((res)=>{
        //     this.detail=res.data
        // })
        this.getTextDetail(this.$props.id);
    },
   methods:{
        getTextDetail(id){
        api.home.articleDetail(id).then((res)=>{
            this.detail=res.data
        })
    }
   }
};
</script>

<style lang="scss" scoped>
.shadow{
    width: 100%;
    background: #f6f6f6;
    .detail{
        width: 1213px;
        min-height: 1029px;
        margin: 0 auto;
        .text1{
            width: 1213px;
            height: 24px;
            font-family: MicrosoftYaHei-Bold;
            font-size: 24px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 55px;
            letter-spacing: 0px;
            color: #333333;
            text-align: center;
        }
        .text2 {
            width: 1213px;
            height: 14px;
            font-family: MicrosoftYaHei;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 30px;
            letter-spacing: 0px;
            color: #888888;
            margin-top: 16px;
            text-align: center;

        }
        .text3{
            width: 1186px;
            min-height: 200px;
            font-family: MicrosoftYaHei;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 30px;
            letter-spacing: 0px;
            color: #333333;
            margin-top: 52px;
            .text3 /deep/ img{
        max-width: 100% !important;
      }
        }
        .img{
            width: 1200px;
	        height: 466px;
            margin: 0 auto;
            margin-top: 65px;

        }
    }  
}
 
@media screen and (max-width: 768px) {
.shadow{
    width: 100%;
    background: #f6f6f6;
    .detail{
        width: 100%;
        min-height: px(1029);
        margin: 0 auto;
        .text1{
            width: 100%;
            height: px(24);
            font-family: MicrosoftYaHei-Bold;
            font-size: px(24);
            font-weight: normal;
            font-stretch: normal;
            line-height: px(53);
            letter-spacing: 0px;
            color: #333333;
            text-align: center;
        }
        .text2 {
            width: 100%;
            height: px(14);
            font-family: MicrosoftYaHei;
            font-size: px(14);
            font-weight: normal;
            font-stretch: normal;
            line-height: px(30);
            letter-spacing: 0px;
            color: #888888;
            margin-top: px(16);
            text-align: center;

        }
        .text3{
            width:100%;
            min-height: px(200);
            font-family: MicrosoftYaHei;
            font-size: px(14);
            font-weight: normal;
            font-stretch: normal;
            line-height: px(30);
            letter-spacing: 0px;
            color: #333333;
            margin-top: px(52);
        }
        .img{
            width: 100%;
	        height: px(446);
            margin-top: px(65);
        }
    }  
}
}
</style>
