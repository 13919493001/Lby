<template>
  <div class="feedback">
    
    <banner />
    <div class="banner">
      <div @click="change(0)" :class="{ active: active === 0 }">我要反馈</div>
      <div @click="change(1)" :class="{ active: active === 1 }">历史反馈</div>
    </div>
    <div class="content">
      <div class="feeding" v-if="active === 0">
        <div class="type">
          <div class="title">* 反馈类型</div>
          <div class="items">
            <div
              v-for="(item, index) in cate"
              :key="index"
              @click="changeActive(index)"
              :class="{ active: activeType === index }"
            >
              {{ item.cate_name }}
            </div>
          </div>
        </div>
        <div class="des">
          <div class="title">* 问题描述</div>
          <el-input type="textarea" v-model="feedback"></el-input>
        </div>
        <div class="upload">
          <div class="title">
            <span>请提供相关图片</span>
            <span>最多6张，单张不超过20M</span>
          </div>
          <div class="upload">
          <!-- <el-upload
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-success="handleRemove"> -->
          <el-upload
            list-type="picture-card"
             :auto-upload="false"
             action="Fake Action"
             :on-change="handleRemove"
            :http-request="handleRemove"
            :headers="headers"
            >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          </div>
          <!-- <el-upload class="uploader">
            <img src="@/static/icon/add.png" alt="" />
          </el-upload> -->
        </div>
        <div class="con">
          <div class="title">
            <span>联系方式</span>
            <span>手机号、微信号、邮箱</span>
          </div>
          <el-input
            type="text"
            v-model="tel"
            placeholder="清留下您的联系方式"
          ></el-input>
        </div>
        <div class="btn" @click="submit">提交</div>
      </div>
      <div class="history" v-if="active === 1">
        <div class="item" v-for="(item, index) in list" :key="index">
          <div class="top">
            <div class="time">
              <div>{{item.add_time}}</div>
              <div>{{item.cate_name}}</div>
            </div>
            <div class="status" v-if="item.handle==0">待处理</div>
            <div class="status" v-else>已处理</div>
          </div>
          <div class="middle">
            {{item.feedback}}
            <!-- <span>[查看全部]</span> -->
          </div>
          <div class="imgs">
            <img v-for="(items,idx) in item.image" :key="idx" :src="items" alt="" />
          </div>
          <div class="bottom">
            平台反馈：{{item.reply}}
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>


import api from "@/plugins/api/api";
import banner from "@/components/common/banner";
export default {
  components: {
    banner,
  },
  data() {
    return {
      active: 0,
      activeType: 0,
      desc: "",
      con: "",
      dialogImageUrl: '',
      dialogVisible: false,
      cate:[],
      id:31,
      list:[],
      uid:0,
      tel:"",
      feedback:"",
      headers:{'Content-Type': 'multipart/form-data'},
      images:[]
    };
  },
  methods:{
     handleRemove(file, fileList) {
        console.log(file, fileList);
        var param=new FormData()
        param.append("filename", fileList[0].raw, fileList[0].raw.name)
        api.personal.upload(param).then((res)=>{
          if(res.status==200){
            this.images.push(res.data.url)
          }
          
      })
      },
      handlePictureCardPreview(file) {
        console.log(file);
        
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      getList(){
        api.personal.feedbackCate().then((res)=>{
          this.cate=res.data
        })
        api.personal.feedbackList().then((res)=>{
          this.list=res.data
          for(var i=0;i<this.list.length;i++){
            this.list[i].add_time=this.timestampToTime(this.list[i].add_time)
          }
        })
        api.personal.userInfo().then((res)=>{
          this.uid=res.data.uid
        })
      },
      changeActive(index){
        this.activeType=index
        this.id=this.cate[index].id
      },
      timestampToTime(timestamp) {
	    var date = new Date(timestamp * 1000);
	    var Y = date.getFullYear() + '-';
	    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
	    var D = '-'+date.getDate() + ' ';
	    var h = date.getHours() + ':';
	    var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      var date=Y+M+D+h+m+s
	    return date
    },
    change(i){
      this.active=i
      if(this.active==1){
        api.personal.feedbackList().then((res)=>{
          this.list=res.data
          for(var i=0;i<this.list.length;i++){
            this.list[i].add_time=this.timestampToTime(this.list[i].add_time)
          }
        })
      }
    },
    submit(){
      api.personal.feedbackAdd({image:this.images,cate_id:this.id,feedback:this.feedback,tel:this.tel,uid:this.uid}).then((res)=>{
        if(res.status==200){
          this.$message({
            type:"success",
            message:res.msg
          })
          this.feedback="",
          this.tel=""
          this.images=[]
        }
      })
    }
  },
  mounted(){
    this.getList();
  }
};
</script>

<style lang="scss" scoped>

.feedback {
  width: 100%;
  min-height: 100vh;
  background-color: #f3f0f3;
}
.banner {
  width: 100%;
  height: 100%;
  background-color: #fff;
  @include flex;
  div {
    height: 100%;
    padding: 23px 27px;
    @include flex;
    color: #333;
    cursor: pointer;
  }
  .active {
    color: #fff;
    background-color: #225c45;
  }
}
.content {
  padding: 0 25px;
  padding-bottom: 65px;
  box-sizing: border-box;
  max-width: 1200px;
  margin: 0 auto;
  .feeding {
    margin-top: 40px;
    .type {
      .title {
        font-weight: bold;
      }
      .items {
        @include flex;
        justify-content: flex-start;
        margin-top: 19px;
        div {
          padding: 17px 43px;
          background: #fff;
          border-radius: 5px;
          margin-right: 17px;
          @include flex;
          cursor: pointer;
        }
        .active {
          background-color: #225c45;
          color: #fff;
        }
      }
    }
    .des {
      margin-top: 34px;
      .title {
        font-weight: bold;
        margin-bottom: 24px;
      }
      /deep/.el-textarea__inner {
        height: 188px;
        border-radius: 5px;
        &:focus {
          border-color: #225c45 !important;
        }
      }
    }
    .upload {
      margin-top: 26px;
      .title {
        span:last-child {
          color: #888888;
          font-size: 14px;
          margin-left: 20px;
        }
      }
      .uploader {
        width: 110px;
        height: 110px;
        background: #fff;
        border-radius: 5px;
        @include flex;
        margin-top: 26px;
        img {
          width: 37px;
          height: 37px;
        }
      }
    }
    .con {
      @extend .upload;
      margin-top: 42px;
      /deep/.el-input__inner {
        height: 45px;
        border-radius: 5px;
        margin-top: 25px;
        input::placeholder {
          color: #888888;
          font-size: 14px;
        }
        &:focus {
          border-color: #225c45 !important;
        }
      }
    }
    .btn {
      width: 150px;
      height: 45px;
      background-color: #225c45;
      @include flex;
      margin: 0 auto;
      color: #fff;
      margin-top: 45px;
      cursor: pointer;
    }
  }
  .history {
    .item {
      width: 100%;
      padding: 30px;
      padding-bottom: 0;
      box-sizing: border-box;
      background-color: #fff;
      &:first-child {
        margin-top: 36px;
      }
      &:not(:last-child) {
        border-bottom: 20px solid #f7f4f8;
      }
      .top {
        padding-bottom: 17px;
        @include flex;
        justify-content: space-between;
        border-bottom: 1px solid #eeeeee;
        .time {
          @include flex;
          justify-content: flex-start;
          font-size: 14px;
          div:first-child {
            color: #888888;
          }
          div:last-child {
            margin-left: 40px;
            color: #333;
            font-weight: bold;
          }
        }
        .status {
          color: #225c45;
        }
      }
      .middle {
        @include ellipsis(2);
        margin-top: 25px;
        height: 38px;
        line-height: 19px;
        span {
          color: #225c45;
          cursor: pointer;
        }
      }
      .imgs {
        margin-top: 24px;
        @include flex;
        justify-content: flex-start;
        overflow-x: auto;
        padding-bottom: 25px;
        img {
          margin-left: 20px;
          width: 100px;
          height: 100px;
          object-fit: cover;
          &:first-child {
            margin-left: 0;
          }
        }
      }
      .bottom {
        padding-top: 19px;
        padding-bottom: 25px;
        border-top: 1px solid #eee;
        color: #225c45;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .banner {
    width: 100%;
    height: 100%;
    background-color: #fff;
    @include flex;
    justify-content: flex-start;
    div {
      height: 100%;
      padding: px(30) px(25);
      @include flex;
      color: #333;
      cursor: pointer;
    }
    .active {
      color: #fff;
      background-color: #225c45;
    }
  }
  .content {
    padding: 0 px(20);
    padding-bottom: px(118);
    box-sizing: border-box;
    width: 100%;
    margin: 0 auto;
    font-size: px(24);
    .feeding {
      margin-top: px(60);
      .type {
        .title {
          font-weight: bold;
          font-size: px(24);
        }
        .items {
          @include flex;
          justify-content: flex-start;
          margin-top: 19px;
          div {
            padding: px(15) px(36);
            background: #fff;
            border-radius: px(5);
            margin-right: px(18);
            @include flex;
            cursor: pointer;
          }
          .active {
            background-color: #225c45;
            color: #fff;
          }
        }
      }
      .des {
        margin-top: 34px;
        .title {
          font-weight: bold;
          margin-bottom: 24px;
        }
        /deep/.el-textarea__inner {
          height: 188px;
          border-radius: 5px;
          &:focus {
            border-color: #225c45 !important;
          }
        }
      }
      .upload {
        margin-top: 26px;
        .title {
          span:last-child {
            color: #888888;
            font-size: px(24);
            margin-left: 20px;
          }
        }
        .uploader {
          width: 110px;
          height: 110px;
          background: #fff;
          border-radius: 5px;
          @include flex;
          margin-top: 26px;
          img {
            width: 37px;
            height: 37px;
          }
        }
      }
      .con {
        margin-top: 42px;
        /deep/.el-input__inner {
          height: 45px;
          border-radius: 5px;
          margin-top: 25px;
          input::placeholder {
            color: #888888;
            font-size: 14px;
          }
          &:focus {
            border-color: #225c45 !important;
          }
        }
      }
      .btn {
        width: px(668);
        height: px(80);
        margin: 0 auto;
        background-color: #225c45;
        @include flex;
        margin: 0 auto;
        color: #fff;
        margin-top: 45px;
        cursor: pointer;
      }
    }
    .history {
      .item {
        width: 100%;
        padding: px(30);
        padding-bottom: 0;
        box-sizing: border-box;
        background-color: #fff;
        &:first-child {
          margin-top: px(56);
        }
        &:not(:last-child) {
          border-bottom: 20px solid #f7f4f8;
        }
        .top {
          padding-bottom: 17px;
          @include flex;
          justify-content: space-between;
          border-bottom: 1px solid #eeeeee;
          .time {
            @include flex;
            justify-content: flex-start;
            font-size: px(24);
            div:first-child {
              color: #888888;
            }
            div:last-child {
              margin-left: 40px;
              color: #333;
              font-weight: bold;
            }
          }
          .status {
            color: #225c45;
          }
        }
        .middle {
          @include ellipsis(2);
          margin-top: px(26);
          font-size: px(20);
          height: 38px;
          line-height: 19px;
          span {
            color: #225c45;
            cursor: pointer;
          }
        }
        .imgs {
          margin-top: px(33);
          @include flex;
          justify-content: flex-start;
          overflow-x: auto;
          padding-bottom: px(38);
          img {
            margin-left: 20px;
            width: 100px;
            height: 100px;
            object-fit: cover;
            &:first-child {
              margin-left: 0;
            }
          }
        }
        .bottom {
          padding-top: px(26);
          padding-bottom: px(26);
          border-top: 1px solid #eee;
          color: #225c45;
        }
      }
    }
  }
}
</style>
