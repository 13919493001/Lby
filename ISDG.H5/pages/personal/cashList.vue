<template>
  <div class="cashList">
    
    <banner />
    <div class="content">
      <order-search :isOrder="false" @search="search" />
      <!--  -->
      <div class="menu">
        <div
          class="item"
          :class="{ active: active === index }"
          v-for="(item, index) in menu"
          :key="index"
          @click="changeActive(index)"
        >
          {{ item }}
        </div>
      </div>
      <!--  -->
      <div class="table">
        <div class="th">
          <div>订单编号</div>
          <div>类型</div>
          <div>消费金额</div>
          <div>时间</div>
        </div>
        <div class="tr" v-for="(item, index) in list" :key="index">
          <div>{{item.link_id}}</div>
          <div>{{item.title}}</div>
          <div v-if="item.pm">+￥{{item.number}}</div>
          <div v-else>-￥{{item.number}}</div>
          <div>{{item.add_time}}</div>
        </div>
      </div>
      <!--  -->
     <el-pagination
        background
        layout="prev, pager, next"
        :total="count"
        :page-size="8"
        @prev-click="last"
        @next-click="next"
        @current-change="currentChange"
        prev-text="上一页"
        next-text="下一页"
        :hide-on-single-page="true"
        :current-page="page"
      >
      </el-pagination>
    </div>
    
  </div>
</template>

<script>


import banner from "@/components/common/banner";
import api from "@/plugins/api/api";
import orderSearch from "@/components/order/orderSearch";
export default {
  data() {
    return {
      active: 0,
      menu: ["全部", "购物消费", "退货"],
      list:[],
      count:0,
      page:1,
      type:""
    };
  },
  components: {
    banner,
    orderSearch
  },
  methods:{
    getList(type){
      api.personal.shopList({type:type,page:this.page,limit:8}).then((res)=>{
        this.list=res.data.info
        this.count=res.data.count
      })
    },
    changeActive(index){
      this.active=index
      if(this.active==0){
        this.type=""
        this.getList(this.type);
      }else if(this.active==1){
        this.type="pay_money"
        this.getList(this.type);
      }else if(this.active==2){
        this.type="return_money"
        this.getList(this.type);
      } 
    },
    search(data){
      api.personal.shopList({type:this.type,page:this.page,limit:8,addTime:data.addTime,endTime:data.endTime}).then((res)=>{
        this.list=res.data.info
        this.count=res.data.count
      })
    },
    last(){
      this.page-=1
      this.getList(this.type);
    },
    next(){
      this.page+=1
      this.getList(this.type);
    },
    currentChange(val){
      this.page=val
      this.getList(this.type);

    },
  },
  mounted(){
    this.getList();
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
    padding: 30px 30px 50px 30px;
    box-sizing: border-box;
    background-color: #fff;
    margin: 0 auto;
    margin-top: -30px;
    position: relative;
    z-index: 2;
    @include pagination;
    .menu {
      width: 100%;
      margin: 0 auto;
      @include flex;
      .item {
        cursor: pointer;
        padding: 6px 16px;
        @include flex;
        margin-right: 10px;
        &:last-child {
          margin-right: 0;
        }
      }
      .active {
        color: #fff;
        background-color: #225c45;
      }
    }
    .table {
      width: 100%;
      margin-top: 26px;
      margin-bottom: 57px;
      .th {
        @include flex;
        background-color: #fbfbfb;
        height: 35px;
        div {
          flex: 1;
          text-align: center;
        }
      }
      .tr {
        @include flex;
        height: 45px;
        border-bottom: 1px solid #e5e5e5;
        div {
          flex: 1;
          text-align: center;
          &:first-child {
            color: #809b72;
          }
          &:nth-child(2) {
            color: #888;
          }
          &:nth-child(4) {
            color: #888;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .cashList {
    .content {
      width: 100%;
      padding: px(42) px(20) px(73) px(20);
      margin-top: px(-30);
      @include pagination-m;
      .menu {
        width: 60%;
        margin: 0 auto;
        @include flex;
        justify-content: space-between;
        font-size: px(24);
        .item {
          cursor: pointer;
          padding: px(13) px(30);
          @include flex;
          margin-right: 0;
        }
        .active {
          color: #fff;
          background-color: #225c45;
        }
      }
      .table {
        width: 100%;
        margin-top: px(44);
        margin-bottom: px(65);
        .th {
          font-size: px(24);
          @include flex;
          background-color: #fbfbfb;
          height: px(62);
          div {
            flex: 1;
            text-align: center;
          }
        }
        .tr {
          font-size: px(20);
          @include flex;
          height: px(68);
          border-bottom: 1px solid #e5e5e5;
          div {
            flex: 1;
            text-align: center;
            &:first-child {
              color: #809b72;
            }
            &:nth-child(2) {
              color: #888;
            }
            &:nth-child(4) {
              color: #888;
            }
          }
        }
      }
    }
  }
}
</style>
