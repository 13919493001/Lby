 //登录相关接口
 import axios from "../axios"
 const login={
    login(params) {
        return axios.post(`/api/login`,params)
    },
    //短信验证码
    getVerify(phone){
        return axios.get(`/api/verify_yunpian?phone=`+phone)
    },
    //图形验证码
    getCaptcha(){
        return axios.get(`/api/captcha`)
    },
    //注册
    register(params){
        return axios.get(`/api/register`,{params})
    },
    //手机号修改密码
    changePassWord(data){
      return axios.post(`/api/register/reset`,data)
    },
    //qq登录
    qqLogin(){
        return axios.get(`/api/QQlogin`)
    },
    //wb登录
    wbLogin(){
        return axios.get(`/api/WBlogin`)
    },
    //wx登录
    wxLogin(){
        return axios.get(`/api/WXlogin`)
    },
    //手机号登录
    quickLogin(data){
        return axios.post(`/api/login/mobile`,data)
    },
    //手机号修改密码
    registerReset(data){
        return axios.post(`/api/register/reset`,data)
    },
 }
 export default login