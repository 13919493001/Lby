<template>
  <div class="detail">
    <div class="content">
      <goods-detail btnText="立即购买" @jump="jump" :id="id" :usual="usual" />
    </div>
  </div>
</template>

<script>
import goodsDetail from "@/components/goodsDetail";
export default {
  components: {
    goodsDetail
  },
  data(){
    return{
      id:0,
      usual:true,
    }
  },
  methods: {
    jump() {
      this.$router.push({path:"/order", query: {id:this.id}});
      
    }
  },
  created(){
    this.id=this.$route.query.id
  
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
