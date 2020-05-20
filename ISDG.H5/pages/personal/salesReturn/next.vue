<template>
  <div class="salesReturn">
    
    <banner />
    <!--  -->
    <section class="content">
      <sales-ring :status="1" :id="id" :marks="marks" />
    </section>
    
  </div>
</template>

<script>


import banner from "@/components/common/banner";
import salesRing from "@/components/salesRing";
export default {
  data() {
    return {
      id:"",
      marks:""
    };
  },
  components: {
    banner,
    salesRing
  },
  created(){
    this.id=this.$route.params.id
    this.marks=this.$route.params.mark
  }
};
</script>

<style lang="scss" scoped>
.salesReturn {
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
    border-bottom: 40px;
  }
}

@media screen and (max-width: 768px) {
  .salesReturn {
    .content {
      width: 100%;
      padding: px(30) px(10) px(30) px(10);
      margin-top: px(-30);
      border-bottom: px(80);
    }
  }
}
</style>
