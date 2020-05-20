<template>
  <div class="password">
    <banner />
    <my-form
      :status="3"
      :placeholder="placeholder"
      title="修改密码"
      :imgCode="imgCode"
      @getCode="getCode"
      @submit="submit"
    />
    <tabbar />
  </div>
</template>

<script>
import banner from "@/components/common/banner";
import tabbar from "@/components/common/tabbar";
import myForm from "@/components/form";
import axios from "@/plugins/axios";
import api from "@/plugins/api/api";

export default {
  components: {
    banner,
    myForm,
    tabbar,
  },
  data() {
    return {
      placeholder: {
        p1: "请输入手机号码",
        p2: "请输入短信验证码",
        p3: "发送短信",
        p4: "确认",
        p5: "密码"
      },
      imgCode:"",
      a:0
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
          }else{
            this.getCode();
          }
        })
      }
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
  },
   mounted(){
    this.getCode();
  }
};
</script>

<style lang="scss" scoped>
.password {
  width: 100%;
  min-height: 100vh;
  background-color: #f3f0f3;
}
</style>
