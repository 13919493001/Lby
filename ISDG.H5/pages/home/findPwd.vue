<template>
  <div class="reg">
    <div class="content">
      <div class="title">
        <div>
          找回密码
        </div>
      </div>
      <my-form :status="11" :placeholder="reg"   @submit="submit" :imgCode="imgCode" @getCode="getCode" />
    </div>
  </div>
</template>

<script>
import banner from "@/components/common/banner";
import myForm from "@/components/form";
import axios from "@/plugins/axios";
import api from "@/plugins/api/api";
export default {
  components: {
    banner,
    myForm
  },
  data() {
    return {
      reg: {
        p1: "请输入手机号",
        p2: "请输入手机验证码",
        p3: "发送短信",
        p5: "请输入新密码",
        p4: "确认"
      },
      imgCode:""
    };
  },
  methods: {
    submit(form) {
      console.log(form);
      let  params = {
        account: form.phone,
        captcha:form.code2,
        code:form.code1,
        password:form.pwd
      };
      if(form.pwd === form.repwd) {
        api.login.registerReset(params).then(res => {
          console.log(res)
          if(res.status === 200) {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            this.$router.push('/login')
          }else{
            this.getCode();
          }
        })
      }
      // if((/^1[3456789]\d{9}$/.test(form.phone))&&(/^\d{6}$/.test(form.code1))){
      //   this.$router.push({
      //     path:'/home/setPwd',
      //     query: {
      //       account: form.phone,
      //       captcha: form.code1
      //     }
      //   }) 
      // }else if(!(/^1[3456789]\d{9}$/.test(form.phone))){
      //   this.$message({
      //     message: "请输入正确的手机号",
      //     type: 'waring'
      //     });
      // }else if(!(/^\d{6}$/.test(form.code1))){
      //   this.$message({
      //     message: "请输入正确的验证码",
      //     type: 'waring'
      //     });
      // }
    },
    open() {
      this.dialogVisible = true;
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
        
        
        
    }
  },
  mounted(){
    this.getCode();
  }
};
</script>

<style lang="scss" scoped>
.reg {
  width: 100%;
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
        height: 100%;
        @include flex;
        cursor: pointer;
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
  .reg {
    background-color: #fbf8fb;
  }
  .content {
    width: 100%;
    margin: 0 auto;
    padding: px(80) 0;
    .title {
      @include flex;
      height: 40px;
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
      }
    }
  }
}
</style>
