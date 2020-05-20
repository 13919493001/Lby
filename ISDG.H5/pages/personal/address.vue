<template>
  <div class="address">
    <banner />
    <div class="content">
      <add />
    </div>
  </div>
</template>

<script>
import banner from "@/components/common/banner";
import add from "@/components/market/chose";
export default {
  components: {
    add,
    banner
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.address {
  width: 100%;
  min-height: 100vh;
  background-color: #f7f4f8;
}
/deep/.el-popup-parent--hidden {
  padding: 0 !important;
}
.content {
  max-width: 1200px;
  margin-top: -30px;
  padding: 35px 0 57px 0;
  margin: 0 auto;
  /deep/.main {
    width: 100%;
    @include flex;
    flex-wrap: wrap;
    .item {
      border-left: 10px solid #f7f4f8;
      border-right: 10px solid #f7f4f8;
      width: 386px;
      height: 195px;
      background-color: #fff;
      @include flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 20px;
      box-sizing: border-box;
      margin-bottom: 20px;
      .left {
        width: 17px;
        height: 17px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(201, 201, 201, 1);
        border-radius: 50%;
        cursor: pointer;
      }
      .right {
        @include flex(column);
        width: 100%;
        height: 100%;
        justify-content: space-between;
        align-items: flex-start;
        padding-left: 20px;
        box-sizing: border-box;
        .title {
          width: 100%;
          @include flex;
          justify-content: space-between;
          .btns {
            @include flex;
            justify-content: flex-start;
            div {
              cursor: pointer;
              span {
                color: #666666;
              }
            }
            div:first-child {
              margin-right: 20px;
            }
          }
        }
        .add {
          div:not(:last-child) {
            color: #888888;
            margin-bottom: 10px;
          }
        }
        .tip {
          color: #666;
        }
      }
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
  .btn {
    width: 150px;
    height: 45px;
    background-color: #225c45;
    @include flex;
    margin: 0 auto;
    margin-top: 10px;
    color: #fff;
  }
}

@media screen and (max-width: 768px) {
  .content {
    width: 100%;
    margin-top: px(-30);
    padding: px(59) 0 px(100) 0;
    margin: 0 auto;
    /deep/.main {
      width: 100%;
      @include flex;
      flex-wrap: wrap;
      .item {
        width: 100%;
        height: 195px;
        background-color: #fff;
        @include flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 20px;
        box-sizing: border-box;
        margin-bottom: px(31);
        font-size: px(26);
        .left {
          width: px(30);
          height: px(30);
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(201, 201, 201, 1);
          border-radius: 50%;
          cursor: pointer;
        }
        .right {
          @include flex(column);
          width: 100%;
          height: 100%;
          justify-content: space-between;
          align-items: flex-start;
          padding-left: 20px;
          box-sizing: border-box;
          .title {
            width: 100%;
            @include flex;
            justify-content: space-between;
            .btns {
              @include flex;
              justify-content: flex-start;
              div {
                cursor: pointer;
                span {
                  color: #666666;
                }
              }
              div:first-child {
                margin-right: 20px;
              }
            }
          }
          .add {
            div:not(:last-child) {
              color: #888888;
              margin-bottom: 10px;
            }
          }
          .tip {
            color: #666;
          }
        }
        &:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
    .btn {
      width: px(700);
      height: px(80);
      background-color: #225c45;
      @include flex;
      margin: 0 auto;
      margin-top: 10px;
      color: #fff;
    }
  }
}
</style>
