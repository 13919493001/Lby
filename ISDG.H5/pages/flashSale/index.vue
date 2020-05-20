<template>
  <div>
    <div v-swiper:swiperTop="swiperOptionTop" class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in topImg" :key="index">
          <img :src="item" />
        </div>
      </div>
      <div class="swiper-pagination"></div>
      <!--分页器。如果放置在swiper-container外面，需要自定义样式。-->
    </div>
    <div class="content">
      <div class="title">限时秒杀</div>
      <div class="s-title">品牌官网 正品专业</div>
      <div class="menu">
        <div  v-for="(item,index) in seckilldate" :key="index" @click="getFlashGood(item.id,index)" :class="{active:id==item.id}" class="menu-item">
          {{item.time}} <span>{{item.state}}</span>
        </div>
        <!-- <div v-else class="menu-item">
          {{item.time}} <span>{{item.state}}</span>
        </div> -->
      </div>
      <flash-goods :flashSale="true" falshName="秒杀中" @jump="jump" :goodsList="goodsList"/>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="pageTotal"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        prev-text="上一页"
        next-text="下一页"
        @prev-click="last"
        @next-click="next"
        :hide-on-single-page="true"
        :pager-size="limit"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import flashGoods from "@/components/goodss/flashGoods";
import api from "@/plugins/api/api";
export default {
  components: {
    flashGoods
  },
  async asyncData() {
    let res = await api.activity.time().then(res => {
      return res
    })
    return {
      topImg: [res.data.lovely],
      seckilldate: res.data.seckillTime
    }
  },
  data() {
    return {
      swiperOptionTop: {
        grabCursor: true,
        autoplay: true,
        loop: true,
        pagination: {
          el: ".swiper-pagination"
        }
      },
      topImg:[],
      seckilldate:[],
      goodsList:[],
      time:"",
      id:0,
      limit: 9, //每页显示数量
      pageTotal: 0, //总页数
      currentPage: 1, //当前页码,
      num:1,
      pagination:true,
    }
  },
  methods: {
    jump() {
      this.$router.push("/flashSale/detail");
    },
    //显示当前秒杀商品列表
    seckilling() {
      for(var i=0;i<this.seckilldate.length;i++) {
          if(this.seckilldate[i].state === "抢购中") {
            this.num=i
            this.time = this.seckilldate[i].time;
            this.id = this.seckilldate[i].id;
            this.getFlashGood(this.id);
          }
          
        }
    },
    //根据时间段查询商品
    getFlashGood(id,index) {
      this.id=id
      this.num=index
      let params = {page:this.currentPage, limit:this.limit}
      api.activity.seckillList(id,params).then(res => {
        this.goodsList = res.data.product_info;
        this.pageTotal=res.data.product_count
        if(this.goodsList.length>=1){
          this.pagination=true
        }else{
          this.pagination=false
        }
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      api.activity.seckillList(id,{page:this.currentPage, limit:this.limit}).then(res => {
        this.goodsList = res.data.product_info;
      })
    },
    next(){
      this.currentPage+=1
      api.activity.seckillList(id,{page:this.currentPage, limit:this.limit}).then(res => {
        this.goodsList = res.data.product_info;
      })
    },
    last(){
      this.currentPage-=1
      api.activity.seckillList(id,{page:this.currentPage, limit:this.limit}).then(res => {
        this.goodsList = res.data.product_info;
      })
    }
  },
  created() {
    this.seckilling()
  }
};
</script>

<style lang="scss" scoped>
.swiper-pagination-bullet {
  opacity: 1;
  background-color: #fff;
}
.swiper-pagination-bullet-active {
  background-color: #225c45;
}
.swiper-slide {
  img {
    width: 100%;
    object-fit: cover;
  }
}

.content {
  padding: 60px 0;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  @include pagination;
  .title {
    font-size: 40px;
  }
  .s-title {
    color: #888888;
    margin-top: 10px;
  }
  .menu {
    margin-top: 40px;
    // @include flex;
    display: inline-flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    margin-bottom: 54px;
    .menu-item {
      padding: 12px 20px;
      background: #c9c9c9;
      color: #fff;
      font-size: 18px;
      border-radius: 22px;
      margin-right: 17px;
      white-space: nowrap;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
      span {
        font-size: 16px;
      }
    }
    .active {
      background-color: #225c45;
    }
  }
  .sub-content {
    .item {
      width: 338px;
      .img {
        width: 100%;
        height: 338px;
        img {
          max-width: 338px;
          max-height: 338px;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .swiper-pagination-bullet {
    opacity: 1;
    background-color: #fff;
  }
  .swiper-pagination-bullet-active {
    background-color: #225c45;
  }
  .swiper-slide {
    img {
      width: 100%;
      object-fit: cover;
    }
  }

  .content {
    padding: px(45) 0 px(100) 0;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    @include pagination("m");
    .title {
      font-size: px(46);
    }
    .s-title {
      color: #888888;
      margin-top: px(17);
      font-size: px(20);
    }
    .menu {
      margin-top: px(60);
      flex-wrap: nowrap;
      max-width: px(768);
      overflow-y: scroll;
      .menu ::-webkit-scrollbar {
        display: none;
      }
      @include flex;
      justify-content: flex-start;
      margin-bottom: px(30);
      padding-left: px(20);
      box-sizing: border-box;
      .menu-item {
        padding: px(14) px(30);
        background: #c9c9c9;
        color: #fff;
        font-size: px(18);
        border-radius: px(22);
        margin-right: px(17);
        cursor: pointer;
        &:last-child {
          margin-right: 0;
        }
        span {
          font-size: px(18);
        }
      }
      .active {
        background-color: #225c45;
      }
    }
    .sub-content {
      padding: 0 px(50);
      box-sizing: border-box;
    }
  }
}
</style>
