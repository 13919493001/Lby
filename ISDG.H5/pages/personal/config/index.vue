<template>
  <div class="index">
    
    <banner />
    <section class="content">
      <div class="main">
        <div class="avatar">
          <div class="title">修改头像</div>
          <div class="avatar-inner">
            <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              action="Fake Action"
            :http-request="handleRemove"
            :headers="headers">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <div class="name">
          <div class="title">修改昵称</div>
          <div><el-input v-model="name" @change="changeName"></el-input></div>
        </div>
        <div class="sex">
          <div class="title">性别设置</div>
          <el-select v-model="value" placeholder="请选择" @change="chnagesex">
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item"
              :value="index"
            >
            </el-option>
          </el-select>
        </div>
        <div class="date">
          <div class="title">出生年月</div>
          <el-date-picker v-model="date" type="date" placeholder="选择日期" @change="chnageBirthday">
          </el-date-picker>
        </div>
        <div class="phone">
          <div class="title">手机号码</div>
          <div class="inner">
            <div>{{info.phone}}</div>
            <div v-if="info.phone!=null" class="bind" @click="goChange">【更换绑定】</div>
            <div v-else class="bind" @click="goChange">【绑定手机号】</div>
          </div>
        </div>
        <div class="email">
          <div class="title">邮箱号码</div>
          <div class="inner">
            <div>{{info.email}}</div>
            <div v-if="info.email!=null" class="bind" @click="goChangeEmail">【更换绑定】</div>
            <div v-else class="bind" @click="goChangeEmail">【绑定邮箱】</div>
          </div>
        </div>
        <div class="password">
          <div class="title">修改密码</div>
          <nuxt-link to="config/password" tag="div" class="bind">【去修改】</nuxt-link>
        </div>
        <div class="btn" @click="submit">保存</div>
      </div>
    </section>
    
  </div>
</template>

<script>


import banner from "@/components/common/banner";
import api from "@/plugins/api/api";
export default {
  components: {
    banner,
  },
  data() {
    return {
      options: ["保密", "男", "女"],
      value: "",
      date: "",
      name:"",
      imageUrl: '',
      info:[],
      sex:0,
      email:"",
      headers:{'Content-Type': 'multipart/form-data'},
      images:[],
      birthday:0
    };
  },
  methods:{
    handleRemove(file) {
        console.log(file);
        this.imageUrl = URL.createObjectURL(file.file);
        var param=new FormData()
        param.append("filename", file.file, file.file.name)
        api.personal.upload(param).then((res)=>{
          if(res.status==200){
            this.images=res.data.url
          }
      })
    },
    changeName(){
      api.personal.editPic({avatar:this.images,nickname:this.name}).then((res)=>{
        if(res.status==200){
          api.personal.userInfo().then((res)=>{
            this.$store.state.nikName=res.data.nickname
            sessionStorage.setItem("nikName",res.data.nickname)
            
          })
        }
      })
    },
    chnageBirthday(){
      console.log(this.date);
      
      this.birthday=new Date(this.date).valueOf()/1000
      console.log(this.birthday);
      
      // api.personal.editPic({avatar:this.imageUrl,nickname:this.name,birthday:this.date,gender:this.sex}).then((res)=>{
      // })
    },
    chnagesex(){
      if(this.value==0){
        this.sex=0
      }else{
        this.sex=this.value
      }
      // api.personal.editPic({avatar:this.imageUrl,nickname:this.name,birthday:this.date,gender:this.sex}).then((res)=>{
      // })
    },
    goChange(){
      if(this.info.phone!=null){
        this.$router.push('config/phone')
      }else if(this.info.phone==null){
        this.$router.push('config/phoneS')
      }
    },
    goChangeEmail(){
      if(this.info.email!=null){
        this.$router.push('config/email')
      }else if(this.email.phone==null){
        this.$router.push('config/emailS')
      }
    },
    submit(){
      api.personal.editPic({avatar:this.images,nickname:this.name,birthday:this.birthday,gender:this.sex}).then((res)=>{
        if(res.status==200){
          this.$message({
            type:"success",
            message:res.msg
          })
        }
      })
    },
    timestampToTime(timestamp) {
	    var date = new Date(timestamp * 1000);
	    var Y = date.getFullYear() + '-';
	    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
	    var D = '-'+date.getDate() + ' ';
	    var h = date.getHours() + ':';
	    var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      var date=Y+M+D
	    return date
    }
  },
  mounted(){
    api.personal.userInfo().then((res)=>{
      this.imageUrl=res.data.avatar
      this.name=res.data.nickname
      this.info=res.data
      this.value=res.data.gender
      this.date=this.timestampToTime(res.data.birthday)
      this.email=res.data.email
    })
  }
};
</script>

<style lang="scss" scoped>
.btn{
  width: 100px;
  height: 40px;
  background-color: #225c45;
  color: white;
  line-height: 40px;
  text-align: center;
}
.index {
  width: 100%;
  min-height: 100vh;
  background-color: #f3f0f3;
}
.content {
  max-width: 1200px;
  height: 600px;
  background-color: #fff;
  margin: 0 auto;
  margin-top: -30px;
  position: relative;
  z-index: 3;
  @include flex;
  align-items: flex-start;
  padding-top: 58px;
  box-sizing: border-box;
  .main {
    max-width: 600px;
    @include flex(column);
    justify-content: flex-start;
  }
  .avatar {
    @include flex;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 26px;
    .title {
      margin-right: 100px;
    }
    .avatar-inner {
      @include flex;
      justify-content: flex-start;
      img {
        width: 84px;
        height: 84px;
        border-radius: 50%;
        object-fit: cover;
      }
      .btn {
        width: 75px;
        height: 30px;
        background: #225c45;
        border-radius: 15px;
        color: #fff;
        @include flex;
        margin-left: 20px;
        cursor: pointer;
      }
    }
  }
  .name {
    @extend .avatar;
    /deep/.el-input__inner {
      width: 180px;
    }
  }
  .sex {
    @extend .avatar;
    /deep/.el-input__inner {
      width: 180px;
      height: 40px;
    }
  }
  .date {
    @extend .avatar;
    /deep/.el-input__inner {
      width: 180px;
    }
  }
  .phone {
    @extend .avatar;
    color: #999999;
    .bind {
      margin-left: 50px;
      color: #5dd2b1;
      cursor: pointer;
    }
    .inner {
      @include flex;
      justify-content: flex-start;
    }
  }
  .email {
    @extend .phone;
  }
  .password {
    @extend .phone;
    .bind {
      margin-left: 0;
    }
  }
}

@media screen and (max-width: 768px) {
  .content {
    width: 100%;
    height: 100%;
    padding: px(60) px(20);
    box-sizing: border-box;
    background-color: #fff;
    margin: 0 auto;
    margin-top: px(-30);
    position: relative;
    z-index: 3;
    @include flex;
    align-items: flex-start;
    justify-content: space-between;
    box-sizing: border-box;
    font-size: px(24);
    .main {
      width: 100%;
      @include flex(column);
      justify-content: flex-start;
    }
    .avatar {
      @include flex;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 26px;
      .title {
        margin-right: 0;
      }
      img {
        width: px(125);
        height: px(125);
        border-radius: 50%;
        object-fit: cover;
      }
      .btn {
        width: px(112);
        height: px(45);
        background: #225c45;
        border-radius: px(15);
        color: #fff;
        @include flex;
        margin-left: 20px;
        cursor: pointer;
      }
    }
    .name {
      /deep/.el-input__inner {
        width: 180px;
      }
    }
    .sex {
      /deep/.el-input__inner {
        width: 180px;
        height: 40px;
      }
    }
    .date {
      /deep/.el-date-editor.el-input {
        width: 180px;
      }
      /deep/.el-input__inner {
        width: 180px;
      }
    }
    .phone {
      color: #999999;
      .bind {
        margin-left: px(27);
        color: #5dd2b1;
        cursor: pointer;
      }
      .inner {
        justify-content: flex-end;
      }
    }
    .password {
      .bind {
        margin-left: 0;
      }
    }
  }
}
</style>
