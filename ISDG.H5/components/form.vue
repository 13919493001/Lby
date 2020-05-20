<template>
  <div class="form">
    <div class="title" v-if="title != ''">{{ title }}</div>
    <el-form ref="form" :model="form" label-width="0" :rules="rules">
      <el-form-item prop="username" v-if="status === 6">
        <el-input v-model="form.username" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item
        prop="phone"
        v-if="
          status === 1 ||
            status === 3 ||
            status === 4 ||
            status === 5 ||
            status === 6 ||
            status === 11
        "
      >
        <el-input v-model="form.phone" :placeholder="placeholder.p1"></el-input>
      </el-form-item>

      <el-form-item prop="email" v-if="status === 2 || status === 6">
        <el-input v-model="form.email" :placeholder="placeholder.p6"></el-input>
      </el-form-item>

      <el-form-item
        class="item_btn"
        prop="code1"
        v-if="status != 5 && status != 7"
      >
        <el-input v-model="form.code1" :placeholder="placeholder.p2"></el-input>
        <div v-if="showtime===null" class="btn" @click="sendcode">{{ placeholder.p3 }}</div>
        <div v-else class="btn">{{showtime}}</div>
      </el-form-item>

      <el-form-item
        prop="pwd"
        v-if="status === 3 || status === 5 || status === 6 || status === 7 || status === 11"
      >
        <el-input
          v-model="form.pwd"
          :placeholder="placeholder.p5"
          type="password"
        ></el-input>
      </el-form-item>

      <el-form-item
        prop="repwd"
        v-if="status === 3 || status === 6 || status === 7 || status === 11"
      >
        <el-input
          v-model="form.repwd"
          placeholder="确认密码"
          type="password"
        ></el-input>
      </el-form-item>

      <el-form-item class="codeBox" prop="code2" v-if="status != 7">
        <el-input v-model="form.code2" placeholder="验证码" class="code"></el-input>
        <img  class="imgCode" :src="imgCode" alt="" @click="getCode">
      </el-form-item>

      <el-form-item v-if="status === 4 || status === 5" class="autoLogin">
        <div class="autoLogin-inner1">
          <el-checkbox v-model="form.check" class="autoLogin-checkbox"></el-checkbox>
          <div>一周内自动登录</div>
        </div>
        <div @click="jump('/home/findPwd')" style="cursor: pointer">
          忘记密码?
        </div>
      </el-form-item>
      <el-form-item v-if="status === 6" class="read">
        <el-checkbox class="read-checkbox" v-model="form.check"></el-checkbox>
        <div class="xiyi">我已阅读并了解<span @click="open">《ISDG用户使用协议》</span></div>
      </el-form-item>
      <el-form-item>
        <div class="btn2" @click="submit">{{ placeholder.p4 }}</div>
      </el-form-item>
      <el-form-item v-if="status === 4 || status === 5" class="otherLogin">
        <div class="reg">
          还没有账号,<span @click="jump('/register')">立即注册!</span>
        </div>
        <div class="otherLogin-inner">
          <div>第三方登录:</div>
          <img src="@/static/icon/wx.png" alt="" @click="weixinLogin" />
          <img src="@/static/icon/wb.png" alt="" @click="weiboLogin" />
          <img src="@/static/icon/qq.png" alt="" @click="qqLogin" />
        </div>
      </el-form-item>
      <el-form-item v-if="status === 6" class="otherLogin">
        <div class="reg">
          已有账号,去<span @click="jump('/login')">登录</span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import api from '../plugins/api/api';
export default {
  
  props: {
    status: {
      /* 
        1 修改手机号 
        2 修改邮箱
        3 修改密码
        4 快捷登录
        5 登录
        6 注册
        7 找回密码
      */
      type: Number
    },
    placeholder: {
      /* 
        p1: 修改手机号
        p6:修改邮箱
        p2：输入手机或邮箱验证码
        p3: 发送手机或邮箱验证码
        p4: 下一步/确认
        p5: 密码
      */
      type: Object
    },
    title: {
      type: String,
      default: ""
    },
    imgCode:{
      type:String,
      default:""
    },
    phone:{
      default:""
    }
  },
  data() {
    var name = (rule, value, callback) => {
    var reg=new RegExp(/^[\u4E00-\u9FA5\w]{4,16}$/i);
    var result = value.replace(/[\u4E00-\u9FA5]/g,"aa");
      if (reg.test(result) === false) {
        callback(new Error("4-16个字符，可由汉字、数字、大小写英文字母组成"));
      } else {
        callback();
      }
    };
    var phone = (rule, value, callback) => {
      if (/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value) === false) {
        callback(new Error("输入正确的手机号码"));
      } else {
        callback();
      }
    };
    var email = (rule, value, callback) => {
      if (
        /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
          value
        ) === false
      ) {
        callback(new Error("输入正确的邮箱"));
      } else {
        callback();
      }
    };
    var pwd = (rule, value, callback) => {
      if (/^[a-zA-Z0-9]{8,16}$/.test(value) === false) {
        callback(new Error("设置8-16个字符，可由数字、大小写英文字母组成!"));
      } else {
        callback();
      }
    };
    var repwd = (rule, value, callback) => {
      if (value !== this.form.pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {check:false,phone:"",username:"",email:"",code1:"",code2:"",pwd:"",repwd:""},
      rules: {
        phone: [
          { required: true, message: "输入11位手机号码", trigger: "blur" },
          { validator: phone, trigger: "blur" }
        ],
        username: [
          {
            required: true,
            message: "4-16个字符，可由汉字、数字、大小写英文字母组成",
            trigger: "blur"
          },
          { validator: name, trigger: "blur" }
        ],
        email: [
          { required: true, message: "输入邮箱", trigger: "blur" },
          { validator: email, trigger: "blur" }
        ],
        code1: [{ required: true, message: "输入验证码", trigger: "blur" }],
        code2: [{ required: true, message: "输入验证码", trigger: "blur" }],
        pwd: [
          { required: true, message: "输入密码", trigger: "blur" },
          { validator: pwd, trigger: "blur" }
        ],
        repwd: [
          { validator: repwd, trigger: "blur" },
          { required: true, message: "再次输入密码", trigger: "blur" }
        ]
      },
      timeCounter: null,
      showtime:null
    };
    // var obj = new WxLogin({
    //     self_redirect:false,
    //     id:"login_container", 
    //     appid: "", 
    //     scope: "", 
    //     redirect_uri: "",
    //     state: "",
    //     style: "",
    //     href: ""
    // });
    
  },
  methods: {
    submit() {
      if(this.status==3){
        if (/^[a-zA-Z0-9]{8,16}$/.test(this.form.pwd) === false){
          this.$message({
                message: "请输入正确的密码格式",
                type: 'warning'
              });
        }else{
          this.$emit("submit", this.form);
        }
      }else{
        this.$emit("submit", this.form);
      }
      
    },
    resetForm() {
      this.$refs["form"].resetFields();
    },
    sendcode() {
      let params = this.form.phone
      if(this.placeholder.p2!="请输入邮箱验证码"){
        api.login.getVerify(params).then(res => {
          console.log(res)
          if(res.status ===200) {
            this.$message({
                message: res.msg,
                type: 'success'
              });
            this.countDown(60);
          } 
          else {
          }
        })
      }else{
        api.personal.sendemail({email:this.form.email}).then((res)=>{
          if(res.status ===200) {
            this.$message({
                message: res.msg,
                type: 'success'
              });
            this.countDown(60);
          } 
          else {
          }
        })
     
      }

    }
    ,
    open() {
      /* 协议弹框 */
      this.$emit("open");
    },
    jump(url) {
      this.$router.push(url);
    },
    getCode() { 
      this.$emit("getCode");
    },
    qqLogin(){
      // api.login.qqLogin().then((res)=>{

      // })
      var url=this.$store.state.url
      window.open(url+"/api/QQlogin"); 
    //   var childWindow;
    // function toQzoneLogin()
    // {
    //     childWindow = window.open("/api/QQlogin","TencentLogin","width=450,height=320,menubar=0,scrollbars=1, resizable=1,status=1,titlebar=0,toolbar=0,location=1");
    // } 
    
    // function closeChildWindow()
    // {
    //     childWindow.close();
    // }
    },
    weiboLogin(){
      var childWindow;
      api.login.wbLogin().then((res)=>{
        console.log(res);
        
        childWindow = window.open(res);
        // childWindow.close();
      })
    },
    weixinLogin(){
      var childWindow;
      api.login.wxLogin().then((res)=>{
        console.log(res);
        
        childWindow = window.open(res);
        // ,"TencentLogin","width=450,height=320,menubar=0,scrollbars=1, resizable=1,status=1,titlebar=0,toolbar=0,location=1"
        // childWindow.close();
      })
    },
    countDownText(s) {
      this.showtime = `${s}s`
    },
    countDown(times) {
      const self = this;
      // 时间间隔 1秒
      const interval = 1000;
      let count = 0;
      self.timeCounter = setTimeout(countDownStart, interval);
      function countDownStart() {
      if (self.timeCounter == null) {
      return false;
      }
      count++
      self.countDownText(times - count + 1);
      if (count > times) {
      clearTimeout(self.timeCounter)
      self.showtime = null;
      } else {
      self.timeCounter = setTimeout(countDownStart, interval)
      }
      }
    }
  },
  watch: {
    status(val) {
      this.resetForm();
    }
  },
  mounted(){
    if(this.phone!=""){
      this.form.phone=this.phone
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  max-width: 1200px;
  height: 600px;
  margin: 0 auto;
  @include flex(column);
  background-color: #fff;
  justify-content: flex-start;
  margin-top: -30px;
  position: relative;
  z-index: 2;
  .codeBox{
    .code{
      width: 70%;
      float: left;
      border-radius: 0;

    }
    .imgCode{
      width: 30%;
      display: inline-block;
      border: none;
      height: 45px;
      border-radius: 0;
    }
  }
  .title {
    font-size: 18px;
    margin-top: 60px;
  }
  /deep/.el-form {
    width: 365px;
    margin-top: 39px;
    .el-input__inner {
      height: 45px;
      border-radius: 5px;
      &:focus {
        border-color: #225c45 !important;
      }
    }
    .is-required {
      border-color: #225c45;
    }
    .item_btn {
      .el-form-item__content {
        @include flex;
        justify-content: flex-start;
        .el-input {
          width: 252px;
        }
        .btn {
          width: 104px;
          height: 45px;
          background-color: #225c45;
          border-radius: 5px;
          color: #fff;
          @include flex;
          cursor: pointer;
          margin-left: 9px;
        }
      }
    }
    .btn2 {
      width: 100%;
      height: 45px;
      background-color: #225c45;
      border-radius: 5px;
      color: #fff;
      @include flex;
      cursor: pointer;
    }
    .autoLogin {
      color: #888888;
      .el-form-item__content {
        line-height: 20px;
        .autoLogin-inner1 {
          @include flex;
          .autoLogin-checkbox {
            // width: 18px;
            // height: 18px;
            // border: 1px solid #dcdcdc;
            margin-right: 16px;
            cursor: pointer;
          }
        }
        width: 100%;
        padding: 0 30px;
        box-sizing: border-box;
        @include flex;
        justify-content: space-between;
        &::before {
          content: none;
        }
        &::after {
          content: none;
        }
      }
    }
    .otherLogin {
      .reg {
        @include flex;
        width: 100%;
        span {
          color: #5dd2b1;
          cursor: pointer;
        }
        margin-bottom: 10px;
      }
      .otherLogin-inner {
        @include flex;
        div {
          margin-right: 10px;
          color: #888888;
        }
        img {
          margin-right: 15px;
          cursor: pointer;
        }
      }
    }
    .read {
      color: #666666;
      .el-form-item__content {
        line-height: 20px;
        width: 100%;
        @include flex;
        justify-content: flex-start;
        &::before {
          content: none;
        }
        &::after {
          content: none;
        }
      }
      span {
        color: #5dd2b1;
        cursor: pointer;
      }
      .read-checkbox {
        // width: 18px;
        // height: 18px;
        // border: 1px solid #dcdcdc;
        margin-right: 16px;
        cursor: pointer;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .form {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    @include flex(column);
    background-color: #fff;
    justify-content: flex-start;
    margin-top: px(-30);
    position: relative;
    z-index: 2;
    .title {
      font-size: px(30);
      margin-top: px(89);
    }
    /deep/.el-form {
      width: px(600);
      margin-top: px(27);
      .el-input__inner {
        height: px(74);
        border-radius: 5px;
        &:focus {
          border-color: #225c45 !important;
        }
      }
      .is-required {
        border-color: #225c45;
      }
      .item_btn {
        .el-form-item__content {
          @include flex;
          justify-content: flex-start;
          .el-input {
            width: 252px;
          }
          .btn {
            width: 104px;
            height: px(74);
            background-color: #225c45;
            border-radius: 5px;
            color: #fff;
            @include flex;
            cursor: pointer;
            margin-left: 9px;
          }
        }
      }
      .btn2 {
        width: 100%;
        height: px(74);
        background-color: #225c45;
        border-radius: 5px;
        color: #fff;
        @include flex;
        cursor: pointer;
      }
      .autoLogin {
        font-size: px(26);
        color: #888888;
        .el-form-item__content {
          line-height: 20px;
          .autoLogin-inner1 {
            @include flex;
            .autoLogin-checkbox {
              // width: 14px;
              // height: 14px;
              // border: 1px solid #dcdcdc;
              margin-right: 16px;
              cursor: pointer;
            }
          }
          width: 100%;
          padding: 0 30px;
          box-sizing: border-box;
          @include flex;
          justify-content: space-between;
          &::before {
            content: none;
          }
          &::after {
            content: none;
          }
        }
      }
      .otherLogin {
        font-size: px(25);
        .reg {
          @include flex;
          width: 100%;
          span {
            color: #5dd2b1;
            cursor: pointer;
          }
          margin-bottom: 10px;
        }
        .otherLogin-inner {
          @include flex;
          div {
            margin-right: 10px;
            color: #888888;
          }
          img {
            margin-right: px(20);
            width: px(73);
            height: px(73);
            object-fit: cover;
            cursor: pointer;
          }
        }
      }
      .read {
        color: #666666;
        font-size: px(26);
        .el-form-item__content {
          line-height: px(20);
          width: 100%;
          @include flex;
          justify-content: flex-start;
          &::before {
            content: none;
          }
          &::after {
            content: none;
          }
        }
        span {
          color: #5dd2b1;
          cursor: pointer;
        }
        .xiyi{
          margin-top: px(-6);

        }
        // .read-checkbox {
        //   width: px(36);
        //   height: px(36);
        //   border: 1px solid #dcdcdc;
        //   margin-right: px(25);
        //   cursor: pointer;
        // }
      }
    }
  }
}
</style>
