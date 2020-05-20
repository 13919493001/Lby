<template>
  <div class="news">
    <img :src="imgUrl" alt="" class="banner">
    <div class="content">
      <div class="title">
        <div class="t1">{{list.title}}</div>
        <div class="t2">发表日期：{{list.add_time}} 浏览次数：{{list.visit}}</div>
      </div>
      <div class="main" v-html="list.content">
        
      </div>
    </div>
    <!-- <div class="footer">
      <div class="prev">
        <div>上一篇</div>
        <div>中国企业界通过跨国合作助力实现联合国可持续发展目标的</div>
      </div>
      <div class="next">
        <div>下一篇</div>
        <div>中国企业界通过跨国合作助力实现联合国可持续发展目标的</div>
      </div>
    </div> -->
  </div>
</template>

<script>
import banner from "@/components/news/banner";
import api from '@/plugins/api/api'
export default {
  components: {
    banner
  },
  data(){
    return{
      list:[],
      imgUrl:""
    }
  },
  methods: {},
  mounted(){
    api.home.articleDetail(this.$route.query.id).then((res)=>{
      this.list=res.data
      this.imgUrl=res.data.image_input[0]
    })
  }
};
</script>

<style lang="scss" scoped>
.news {
  width: 100%;
  background-color: #fffeff;
}
.banner{
  max-width: 100%;
  object-fit: cover;
}
.content {
  padding: 65px 10px 80px 10px;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  .title {
    width: 100%;
    padding-bottom: 18px;
    text-align: center;
    border-bottom: 1px solid #dcdcdc;
    .t1 {
      font-size: 24px;
    }
    .t2 {
      color: #888;
      font-size: 14px;
      margin-top: 24px;
    }
  }
  .main {
    padding: 50px 4px 0 4px;
  }
}
.footer {
  @include flex;
  border-top: 1px solid #DCDCDC;
  .prev {
    width: 50%;
    @include flex(column);
    padding-top: 40px;
    padding-bottom: 40px;
      cursor: pointer;
    border-right: 1px solid #DCDCDC;
    div:first-child {
      color: #888888;
    }
    div:last-child {
      margin-top: 20px;
    }
  }
  .next {
    @extend .prev;
    border-right: 0;
  }
}

@media screen and (max-width: 768px) {
  .news {
    width: 100%;
    background-color: #f7f4f8;
  }
  .content {
    padding: px(45) 0 px(45) 0;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    .title {
      width: 100%;
      padding-bottom: px(36);
      text-align: center;
      border-bottom: 1px solid #dcdcdc;
      .t1 {
        font-size: px(36);
      }
      .t2 {
        color: #888;
        font-size: px(24);
        margin-top: px(24);
      }
    }
    .main {
      padding: px(27) px(20) 0 px(20);
    }
  }
  .footer {
    @include flex(column);
    border-top: 0;
    .prev {
      width: 100%;
      @include flex(column);
      padding-top: px(52);
      padding-bottom: px(52);
      border-top: 1px solid #DCDCDC;
      border-right: 0;
      div:first-child {
        color: #888888;
      }
      div:last-child {
        margin-top: px(20);
      }
    }
    .next {
      border-right: 0;
    }
  }
}
</style>
