<template>
  <div class="scroll">
    <navbar />
    <transition name="el-zoom-in-top">
      <nuxt />
    </transition>
    <scrollTop />
    <el-backtop target=".scroll"></el-backtop>
    <tabbar />
  </div>
</template>

<script>
import navbar from "@/components/common/navbar";
import tabbar from "@/components/common/tabbar";
import scrollTop from "@/components/scrollTop";
import api from "@/plugins/api/api";
export default {
  components: {
    navbar,
    tabbar,
    scrollTop
  },
  methods: {},
  
  mounted() {
    // api.personal.userInfo().then((res)=>{

    // })
      if (localStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(localStorage.getItem("store"))
        )
      );
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里

    window.addEventListener("beforeunload", () => {
      localStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
};
</script>

<style lang="scss" scoped></style>
