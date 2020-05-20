<template>
  <div :class="{ login: type === 'nor', popover: type === 'popover' }">
    <div class="content">
      <div class="title">
        <div @click="toggle(0)" :class="{ active: active === 0 }">
          账户登录
        </div>
        <div @click="toggle(1)" :class="{ active: active === 1 }">
          快捷登录
        </div>
      </div>
      <my-form
        :status="4"
        :placeholder="quickLogin"
        @submit="submit1"
        :imgCode="imgCode"
        @getCode="getCode"
        v-if="active === 1"
      />
      <my-form
        :status="5"
        :placeholder="login"
        :imgCode="imgCode"
        @getCode="getCode"
        @submit="submit2"
        v-if="active === 0"
      />
    </div>
  </div>
</template>

<script>
import banner from "@/components/common/banner";
import myForm from "@/components/form";
import api from "@/plugins/api/api";
import axios from "@/plugins/axios";
export default {
  components: {
    banner,
    myForm
  },
  props: {
    type: {
      type: String,
      default: "nor"
    }
  },
  data() {
    return {
      quickLogin: {
        p1: "请输入注册手机号",
        p2: "请输入短信验证码",
        p3: "发送短信",
        p4: "登录"
      },
      login: {
        p1: "请输入注册手机号",
        p3: "验证码",
        p4: "登录",
        p5: "登录密码"
      },
      active: 0,
      imgCode:"",
      a:0,
      token:1
    };
  },
  methods: {
    //
    submit2(form) {
      console.log(form);
      let params = {account:form.phone, password:form.pwd,captcha:form.code2}
      api.login.login(params).then(res => {
        console.log(res.msg)
        if(res.status === 200) {
          this.$router.push('/');
          this.$message({
              message: res.msg,
              type: 'success'
            });
          api.personal.getcartNumber().then((res)=>{
            this.$store.state.cartNum=res.data.count
            sessionStorage.setItem("cartNum",res.data.count)
          })
          api.personal.userInfo().then((res)=>{
            this.$store.state.nikName=res.data.nickname
            sessionStorage.setItem("nikName",res.data.nickname)
          })
            sessionStorage.setItem("userToken",res.data.token)
            sessionStorage.setItem("isLogin",true)
            this.$store.dispatch("setToken",res.data.token)
        }else if(res.status==400&&res.msg!="该账号未注册，请先注册"){
          this.getCode();
        }else if(res.status==400&&res.data.register==1){
          this.$router.push("register")
        }
      })
    },
    //快捷登录
    submit1(form) {
      let params = {phone:form.phone, spread:0,captcha:form.code2,code:form.code1}
      api.login.quickLogin(params).then(res => {
        if(res.status === 200) {
          this.$message({
              message: res.msg,
              type: 'success'
            });
          this.$router.push('/');
          api.personal.getcartNumber().then((res)=>{
            this.$store.state.cartNum=res.data.count
            sessionStorage.setItem("cartNum",res.data.count)
          })
          api.personal.userInfo().then((res)=>{
            this.$store.state.nikName=res.data.nickname
            sessionStorage.setItem("nikName",res.data.nickname)
          })
            sessionStorage.setItem("userToken",res.data.token)
            sessionStorage.setItem("isLogin",true)
            this.$store.dispatch("setToken",res.data.token)
        }else if(res.status==400&&res.msg!="该账号未注册，请先注册"){
          this.getCode();
        }else if(res.status==400&&res.data.register==1){
          this.$router.push("register")
        }
      })
    },
    toggle(id) {
      this.active = id;
      this.getCode();
    },
    getCode(){
        axios.get('api/captcha',{
            responseType: 'arraybuffer'
        }).then((res) => {
           let base64='data:image/png;base64,' + btoa(
                new Uint8Array(res)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            this.imgCode=base64;
        });
        
        
        
    },
    change(data){
      // console.log(data);
      
    }
  },
  mounted(){
    axios.get('api/captcha',{
            responseType: 'arraybuffer'
        }).then((res) => {
           let base64='data:image/png;base64,' + window.btoa(
                new Uint8Array(res)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            this.imgCode=base64;
        });

    if(this.$route.query.token){
      api.personal.getcartNumber().then((res)=>{
        this.$store.state.cartNum=res.data.count
        sessionStorage.setItem("cartNum",res.data.count)
      })
      api.personal.userInfo().then((res)=>{
        this.$store.state.nikName=res.data.nickname
        sessionStorage.setItem("nikName",res.data.nickname)
      })
      sessionStorage.setItem("userToken",this.$route.query.token)
      sessionStorage.setItem("isLogin",true)
      this.$store.dispatch("setToken",this.$route.query.token)
      $nuxt.$store.dispatch('setLogin',true)
      console.log($nuxt.$store);
      this.$router.push('/')
      // location.href='/'
    }
  }
};
</script>

<style lang="scss" scoped>
.popover {
  width: 100%;
  background-color: #fff;
  .content {
    width: 100%;
    margin: 0 auto;
    padding: 0 0;
    .title {
      @include flex;
      height: 40px;
      border-bottom: 1px solid #dcdcdc;
      div {
        margin-right: 50px;
        height: 100%;
        @include flex;
        cursor: pointer;
        border-bottom: 3px solid transparent;
        &:last-child {
          margin-right: 0;
        }
      }
      .active {
        border-color: #5cd2b0;
      }
    }
    .form {
      margin-top: 0;
      width: 100%;
      height: 100% !important;
      background-color: #fff;
      padding-bottom: 0;
      /deep/.el-form {
        width: 100%;
      }
    }
  }
}
.login {
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
  .content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 30px 0;
    .title {
      @include flex;
      height: 40px;
      border-bottom: 1px solid #dcdcdc;
      div {
        margin-right: 50px;
        height: 100%;
        @include flex;
        cursor: pointer;
        border-bottom: 3px solid transparent;
        &:last-child {
          margin-right: 0;
        }
      }
      .active {
        border-color: #5cd2b0;
      }
    }
    .form {
      margin-top: 0;
      background-color: #f6f6f6;
      height: 100% !important;
    }
  }
}

@media screen and (max-width: 768px) {
  .login {
    background-color: #fbf8fb;
  }
  .content {
    width: 100%;
    margin: 0 auto;
    padding: px(80) 0;
    .title {
      @include flex;
      height: px(90) !important;
      border-bottom: 1px solid #dcdcdc;
      font-size: px(36);
      div {
        height: 100%;
        @include flex;
        cursor: pointer;
      }
    }
    .form {
      margin-top: 0;
      background-color: #fbf8fb !important;
      height: 100% !important;
      padding-top: px(25);
      /deep/.el-form {
        width: px(666);
        .el-input__inner {
          height: px(80);
          border-radius: 2px;
        }
        .btn2 {
          height: px(80);
          border-radius: 2px;
        }
        .autoLogin {
          .el-form-item__content {
            padding: 0;
          }
        }
      }
    }
  }
}
</style>
