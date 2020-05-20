<template>
  <div class="cashList">
    
    <banner />
    <div class="content">
      <!--  -->
      <div class="items">
        <div class="item" v-for="(item, index) in collectList" :key="index">
          <img :src=item.image alt="" />
          <div class="title">
           {{item.store_name}}
          </div>
          <div class="price">
            <div>￥{{item.price}}</div>
            <i class="el-icon-delete" @click="del(index)"></i>
          </div>
        </div>
      </div>
      <!--  -->
      <!-- <el-pagination
        background
        layout="prev, pager, next"
        :total="36"
        prev-text="上一页"
        next-text="下一页"
        :pager-count="5"
      >
      </el-pagination> -->
    </div>
    
  </div>
</template>

<script>


import banner from "@/components/common/banner";
import api from "@/plugins/api/api";
export default {
  data() {
    return {
      currentPage:0,
      limit:20,
      collectList:[]
    };
  },
  components: {
    banner,
  },
  methods:{
    
    getCollect:function(){
      let params = {page: this.currentPage, limit:this.limit}
      api.personal.getCollect({page:1,limit:20}).then((res)=>{
        this.collectList=res.data
      })
    },
    del(index){
      api.personal.collectDel({id:this.list[index].pid}).then((res)=>{
					this.collectList.splice(index,1)
				})
    }
  },
  created(){
    this.getCollect()
  }
};
</script>

<style lang="scss" scoped>
.cashList {
  width: 100%;
  min-height: 100vh;
  background-color: #f3f0f3;
  .content {
    max-width: 1200px;
    padding: 50px 10px 50px 10px;
    box-sizing: border-box;
    background-color: #fff;
    margin: 0 auto;
    margin-top: -30px;
    position: relative;
    z-index: 2;
    @include pagination;
    .items {
      width: 100%;
      @include flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
    .item {
      @include flex(column);
      width: 300px;
      justify-content: flex-start;
      border-left: 42px solid #fff;
      border-right: 42px solid #fff;
      margin-bottom: 60px;
      img {
        max-width: 269px;
        max-height: 269px;
        object-fit: cover;
        margin-bottom: 70px;
      }
      .title {
        text-align: center;
        height: 56px;
        line-height: 28px;
        @include ellipsis(2);
      }
      .price {
        margin-top: 40px;
        width: 100%;
        @include flex;
        position: relative;
        i {
          font-size: 20px;
          position: absolute;
          top: 50%;
          margin-top: -10px;
          right: 0;
          cursor: pointer;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .cashList {
    .content {
      width: 100%;
      padding: px(42) px(10) px(73) px(10);
      margin-top: px(-30);
      @include pagination-m;
      .item {
        @include flex(column);
        width: px(300);
        justify-content: flex-start;
        border-left: px(30) solid #fff;
        border-right: px(30) solid #fff;
        margin-bottom: px(100);
        img {
          max-width: px(269);
          max-height: px(269);
          object-fit: cover;
          margin-bottom: px(70);
        }
        .title {
          text-align: center;
          height: px(50);
          line-height: px(24);
          font-size: px(24);
        }
        .price {
          margin-top: px(40);
          width: 100%;
          @include flex;
          position: relative;
          font-size: px(30);
          i {
            font-size: px(30);
            position: absolute;
            top: 50%;
            margin-top: px(-15);
            right: 0;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
