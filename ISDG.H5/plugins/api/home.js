//首页相关接口管理
import axios from "../axios";
const home = {
  //首页数据
  banner() {
      return axios.get('/api/index')
  },
  //商品相关接口
    //获取产品分类
  goodsMenu() {
    return axios.get('/api/category')
  },
  //获取商品列表
  getGoods(params) {
    return axios.get(`/api/products`,{params})
  },
  //产品详情
  goodsDetail(id) {
    return axios.get(`/api/product/detail/`+id)
  },
  //拼团列表
  getGroupList(params) {
    return axios.get(`/api/combination/list`,params)
  },
  //优惠卷列表
  couponList(data){
    return axios.post(`/api/coupon/receive`,data)
  },
  //领取优惠券
  couponsReceive(data) {
    return axios.post(`/api/coupon/receive`,data)
  },
  //文章分类
  shoppingGuide(){
    return axios.get(`/api/article/shopping_directory`)
  },
  shoppingGuides(){
    return axios.get(`/api/article/category/list`)
  },
  //文章列表
  articleList(cid,params){  
    return axios.get(`/api/article/list/${cid}`,{params})
  },
  //文章详情
  articleDetail(id){
    return axios.get(`/api/article/details/`+id)
  },
  //订单确认
  orderConfirm(data){
    return axios.post(`/api/order/confirm`,data)
  },
  //订单取消
  orderCancel(data){
    return axios.post(`/api/order/cancel`,data)
  },
  //订单创建
  orderGreate(key,data){
    return axios.post(`/api/order/create/`+key,data)
  },
  //推荐商品列表
  hotsales(){
    return axios.get(`/api/product/hot`)
  }
}
export default home;