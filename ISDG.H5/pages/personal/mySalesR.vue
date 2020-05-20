<template>
  <div class="mySalesR">
    
    <banner />
    <section class="content">
      <sales-return />
    </section>
    
  </div>
</template>

<script>


import banner from "@/components/common/banner";
import salesReturn from "@/components/salesReturn";
export default {
  data() {
    return {
      goods: {
        ptype: "s",
        status: 3
      }
    };
  },
  components: {
    banner,
    salesReturn,
  }
};
</script>

<style lang="scss" scoped>
.mySalesR {
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
  .mySalesR {
    .content {
      width: 100%;
      padding: px(30) px(10) px(30) px(10);
      margin-top: px(-30);
      border-bottom: px(80);
    }
  }
}
</style>
