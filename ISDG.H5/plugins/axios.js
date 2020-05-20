import axios from "axios";
import qs from "qs";
import Vue from "vue";
import store from "../store/index";
// axios.defaults.baseURL = "http://192.168.1.31:8087";
axios.defaults.baseURL = "/api";
axios.defaults.withCredentials = true;
// axios.defaults.dataType='jsonp';
axios.defaults.crossDomain =true;
//请求拦截器
axios.interceptors.request.use(
  config => {
    let{ method, url, data} = config;
    if(method ==="post") {
      data = qs.stringify(data);
    }
    if(sessionStorage.getItem('userToken')){
      config.headers['Authori-zation']='Bearer '+sessionStorage.getItem('userToken');
    }
    config.headers['content-type']='application/json';
    // config.headers['Cookie']='PHPSESSID=a4bf32cd5d2bd6a7fa29ef947105a05f';
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// //响应拦截
axios.interceptors.response.use(
  response => {
    response.credentials = true;
    if(response.status === 200) {
      
      switch(response.data.status||response.status) {
        case 410000:
          // store.state.isLogin=false;
          // Vue.$store
          $nuxt.$store.dispatch('setToken',null)
          window.sessionStorage.clear();
          Vue.prototype.$message.error("请登录");
          
          setTimeout(() => {
            location.href = "/login";
          }, 100);
        case 400:
          Vue.prototype.$message({
            message:response.msg||response.data.msg,
            type:"warning"
          })
          // setTimeout(() => {
          //   location.href = "/goods";
          // }, 100);
        default:
          return response.data;
      }
      return response.data;
    }
  },
  error => {
    return Promise.reject(error)
  }
);
export default axios;