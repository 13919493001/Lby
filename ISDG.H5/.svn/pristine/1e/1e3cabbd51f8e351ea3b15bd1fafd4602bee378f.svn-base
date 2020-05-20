<template>
  <transition name="el-fade-in">
    <div class="page-up" @click="scrollToTop" v-show="toTopShow">
      <i class="el-icon-arrow-up"></i>
      <div>top</div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      toTopShow: false
    };
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener("scroll", this.handleScroll, true);
    });
  },
  destroyed() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    handleScroll() {
      let dom = document.documentElement.scrollTop;
      this.scrollTop = dom;
      if (this.scrollTop > 1000) {
        this.toTopShow = true;
      } else {
        this.toTopShow = false;
      }
    },
    scrollToTop() {
      let timer = null;
      let _this = this;
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        if (_this.scrollTop > 5000) {
          _this.scrollTop -= 1000;
          document.documentElement.scrollTop = _this.scrollTop;
          timer = requestAnimationFrame(fn);
        } else if (_this.scrollTop > 1000 && _this.scrollTop <= 5000) {
          _this.scrollTop -= 500;
          document.documentElement.scrollTop = _this.scrollTop;
          timer = requestAnimationFrame(fn);
        } else if (_this.scrollTop > 200 && _this.scrollTop <= 1000) {
          _this.scrollTop -= 100;
          document.documentElement.scrollTop = _this.scrollTop;
          timer = requestAnimationFrame(fn);
        } else if (_this.scrollTop > 50 && _this.scrollTop <= 200) {
          _this.scrollTop -= 10;
          document.documentElement.scrollTop = _this.scrollTop;
          timer = requestAnimationFrame(fn);
        } else if (_this.scrollTop > 0 && _this.scrollTop <= 50) {
          _this.scrollTop -= 5;
          document.documentElement.scrollTop = _this.scrollTop;
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
          _this.toTopShow = false;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.page-up {
  position: fixed;
  right: 50px;
  bottom: 30px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
  opacity: 0.5;
  z-index: 100;
  width: 50px;
  height: 50px;
  background: rgba(34, 92, 69, 1);
  color: #fff;
  @include flex(column);
  font-size: 15px;
  .el-icon-caret-top {
    color: #fff;
    display: block;
    text-align: center;
  }
  p {
    display: none;
    text-align: center;
    color: #fff;
  }
  &:hover {
    opacity: 1;
  }
}

@media screen and (max-width: 768px) {
  .page-up {
    position: fixed;
    right: px(50);
    bottom: px(30);
    cursor: pointer;
    transition: 0.3s;
    box-shadow: 0 px(3) px(6) rgba(0, 0, 0, 0.5);
    z-index: 100;
    width: px(70);
    height: px(70);
    background: rgba(34, 92, 69, 1);
    color: #fff;
    @include flex(column);
    font-size: px(24);
    .el-icon-caret-top {
      color: #fff;
      display: block;
      text-align: center;
    }
    p {
      display: none;
      text-align: center;
      color: #fff;
    }
  }
}
</style>
