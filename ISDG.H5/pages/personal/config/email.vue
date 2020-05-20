<template>
  <div class="password">
    <banner />
    <my-form
      :status="2"
      :placeholder="placeholder"
      title="修改邮箱"
      @submit="submit"
       :imgCode="imgCode"
      @getCode="getCode"
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
        p6: "请输入原绑定邮箱",
        p2: "请输入邮箱验证码",
        p3: "发送验证码",
        p4: "下一步"
      },
      imgCode:"",
    };
  },
  mounted(){
    this.getCode();
  },
  methods: {
    submit(form) {
      api.personal.cheakEmail({email:form.email,code:form.code1,captcha:form.code2}).then((res)=>{
        if(res.status==200){
          this.$router.push({
              name:'personal-config-emailS',
              params: {
                token: res.data.token,
              }
            }) 
        }else{
          this.getCode();
        }
      })
      console.log(form);
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
