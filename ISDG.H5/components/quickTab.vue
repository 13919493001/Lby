<template>
  <div class="qucikTab hidden-xs-only">
    <div>
      <a href="http://wpa.qq.com/msgrd?v=3&uin=202128094&site=qq&menu=yes" target="_blank">
        <img src="@/static/icon/xiaoxi.png" alt />
        <i v-if="num != 0" class="num"></i>
      </a>
    </div>
    <el-popover placement="left-start" width="200" trigger="hover">
      <div class="main">
        <!-- <div
          class="item"
          @click="jump(item.QQ)"
          v-for="(item, index) in list"
          :key="index"
        > -->
        <div>
          <img src="@/static/icon/callqq.png" alt />
          <!-- <span>客服号:{{ item.QQ }}</span> -->
        </div>
      </div>
      <!-- <div slot="reference">
        <img src="@/static/icon/kefu.png" />
      </div> -->
    </el-popover>

    <el-popover
      placement="left-start"
      width="200"
      style="background:#056be9"
      trigger="hover"
    >
      <div class="tip">

        <img src="@/static/icon/2weicode.png" alt />
        <span>扫码进入手机端</span>
      </div>
      <div slot="reference">
          <img src="@/static/icon/erweima.png" alt />
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  data() {
    return {
      site: {},
      num: 0,
      list: []
    };
  },
  methods: {
    // jump(qq) {
    //   location.href = `tencent://message/?uin=${202128094}&Site=http://vps.shuidazhe.com&Menu=yes`;
    // }
  }
};
</script>

<style lang="scss" scoped>
.main {
  margin: 0 auto;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .item {
    cursor: pointer;
    width: 176px;
    height: 28px;
    border-radius: 14px;
    font-size: 14px;
    color: #333;
    background-color: #fff;
    display: flex;
    align-items: center;
    border: 1px solid rgba(229, 229, 229, 1);
    &:not(:first-child) {
      margin-top: 14px;
    }
    &:hover {
      background: rgba(52, 128, 221, 1);
      color: #fff;
      border-color: rgba(52, 128, 221, 1);
    }
    img {
      width: 24px;
      object-fit: cover;
      margin-right: -10px;
    }
    span {
      margin-left: 20px;
    }
  }
}
.tips {
  background-color: #056be9;
  height: 180px;
}
.tip {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  img {
    width: 160px;
    height: 160px;
  }
}
.num {
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #ff3300;
  color: #fff;
  font-size: 16px;
  right: 20%;
  top: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.qucikTab {
  position: fixed;
  right: 0;
  top: 220px;
  z-index: 999;
  div {
    width: 50px;
    height: 50px;
    background-color: #225c45;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    cursor: pointer;
    position: relative;
    img {
      width: 30px;
    }
    &:hover {
      background-color: #22644a;
    }
  }
}
</style>
