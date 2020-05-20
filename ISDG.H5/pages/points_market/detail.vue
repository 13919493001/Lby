<template>
  <div class="detail">
    <div class="content">
      <points-detail btnText="立即兑换" @jump="jump" :isFalsh="isFalsh" :id="id" />
    </div>
  </div>
</template>

<script>
import pointsDetail from "@/components/goodss/pointsDetail";
export default {
  data(){
    return{
      isFalsh:true,
      id:0,
      integral:0,
      price:0,
      idList:[]
    }
  },
  components: {
    pointsDetail
  },
  methods: {

    jump(data) {
      this.$router.push({path:"/points_market/order", query: {id: this.id}});
      
    }
  },
  created(){
    this.id=this.$route.query.id
    this.integral=this.$route.query.integral
    this.price=this.$route.query.price
  }
};
</script>

<style lang="scss" scoped>
.detail {
  width: 100%;
  min-height: 100vh;
  background-color: #f7f4f8;
}
.content {
  padding: 50px 0 100px 0;
  box-sizing: border-box;
  max-width: 1200px;
  margin: 0 auto;
}

@media screen and (max-width: 768px) {
  .content {
    padding: 0 0 px(90) 0;
    box-sizing: border-box;
    width: 100%;
    margin: 0 auto;
  }
}
</style>
