<template>
  <div class="password">
    <banner />
    <my-form
      :status="1"
      :placeholder="placeholder"
      title="修改手机"
      :imgCode="imgCode"
      @getCode="getCode"
      @submit="submit"
      :phone="phone"
    />
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
  data() {
    return {
      placeholder: {
        p1: "请输入原绑定手机",
        p2: "请输入手机验证码",
        p3: "发送短信",
        p4: "下一步",
      },
      imgCode:"",
      a:0,
      phone:""
    };
  },
  methods: {
    submit(form) {
      console.log(form);
      
      if((/^1[3456789]\d{9}$/.test(form.phone))&&(/^\d{6}$/.test(form.code1))){
        api.personal.cheakMobile({code:form.code1,phone:form.phone,captcha:form.code2}).then((res)=>{
          if(res.status==200){
            this.$router.push({
              name:'personal-config-phoneS',
              params: {
                token: res.data.token,
              }
            }) 
          }else{
            this.getCode();
          }
        })
      }else if(!(/^1[3456789]\d{9}$/.test(form.phone))){
        this.$message({
          message: "请输入正确的手机号",
          type: 'waring'
          });
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

    getuserInfo(){
      api.personal.userInfo().then((res)=>{
        this.phone=res.data.phone
      })
    }
  },
  mounted(){
    this.getCode();
    this.getuserInfo();

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
