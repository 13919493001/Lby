//个人中心接口管理
import axios from "../axios";
//个人中心
const personal = {
  personal() {
    return axios.get(`/api/category`)
  },
  //地址列表
  addressList() {
    return axios.get(`/api/address/list`)
  },
  //设置默认地址
  addressDefault(data){
    return axios.post(`/api/address/default/set`,data)
  },
  //编辑/添加地址
  editAddress(params) {
    return axios.post(`/api/address/edit`,params)
  },
  //获取单个地址
  getAddress(id){
    return axios.get(`/api/address/detail/`+id)
  },
   //获取默认地址
   getAddressDefault(){
    return axios.get(`/api/address/default`)
  },
  //删除地址
  delAddress(data){
    return axios.post(`/api/address/del`,data)
  },
  //消费清单
  cashList(){
    return axios.get('')
  },
  //提现申请
  cash(params) {
    return axios.post(`/api/extract/cash`,params)
  },
  //我的收藏列表
  collection(params) {
    return axios.get(`/api/collect/user`,params)
  },
  //我的优惠券
  myCoupon(type) {
    return axios.get(`/api/coupons/user/`+type)
  },
  //修改头像/昵称
  editPic(params) {
    return axios.post(`/api/user/edit`,params)
  },
  //绑定手机
  bangPhone(params) {
    return axios.post(`/api/binding`,params)
  },
  //订单列表
  orderList(params){
    return axios.get(`/api/order/list`,{params})
  },
  //当前登录用户信息
  userInfo(){
    return axios.get(`/api/userinfo`)
  },
  //获取收藏产品
  getCollect(data){
    return axios.get(`/api/collect/user`,{data})
  },
  //删除收藏产品
  collectDel(data){
    return axios.post(`/api/collect/del`,data)
  },
  //添加收藏产品
  collectAdd(data){
    return axios.post(`/api/collect/add`,data)
  },
  //个人中心
  User(){
    return axios.get(`/api/user`)
  },
  //购物车列表
  shoppingCar(){
    return axios.get(`/api/cart/list`)
  },
  //加入购物车
  addCar(data){
    return axios.post(`/api/cart/add`,data)
  },
  //购物车删除
  delCar(data){
    return axios.post(`/api/cart/del`,data)
  },
  //积分商城商品列表
  bonusMall(){
    return axios.get(`/api/store/goods/lst`)
  },
  //获取默认地址
  getDefaultAddress(){
    return axios.get(`/api/address/default`)
  },
  //修改购物车数量
  editCar(data){
    return axios.post(`/api/cart/num`,data)
  },
  //拼团产品详情
  groupDetail(id){
    return axios.get(`/api/combination/detail/`+id)
  },
  //获取购物车数量
  getcartNumber(data){
    return axios.get(`/api/cart/count`,data)
  },
  //推广
  spreadPeople(data){
    return axios.post(`/api/spread/people`,data)
  },
  //积分记录
  integralList(params){
    return axios.get(`/api/integral/list`,{params})
  },
  //订单支付
  orderPay(data){
    return axios.post(`/api/order/pay`,data)
  },
  //消息列表
  messageList(data){
    return axios.post(`/api/notice/lst`,data)
  },
  //消息详情
  messageDetail(data){
    return axios.post(`/api/notice/read`,data)
  },
  //秒杀详情
  seckillDetail(id){
    return axios.get(`/api/seckill/detail/`+id)
  },
  //订单详情
  orderDetail(id){
    return axios.get(`/api/order/detail/`+id)
  },
  //确认退货
  orderRefund(data){
    return axios.post(`/api/order/refund/verify`,data)
  },
  //订单收货
  orderTake(data){
    return axios.post(`/api/order/take`,data)
  },
  //删除已完成订单
  orderDel(data){
    return axios.post(`/api/order/del`,data)
  },
  //海报
  spreadBanner(){
    return axios.get(`/api/spread/banner`)
  },
  //消费记录
  shopList(params){
    return axios.get(`/api/shop/list`,{params})
  },
  //反馈分类
  feedbackCate(){
    return axios.get(`/api/user/feedbackcate`)
  },
  //反馈记录
  feedbackList(){
    return axios.get(`/api/user/feedbacklist`)
  },
  //反馈
  feedbackAdd(data){
    return axios.post(`/api/user/feedbackadd`,data)
  },
  //图片上传
  upload(data){
    return axios.post(`/api/upload/image`,data)
  },
  //换绑手机号
  cheakMobile(data){
    return axios.post(`/api/cheakmobile`,data)
  }
  ,
  changeMobile(data){
    return axios.post(`/api/changemobile`,data)
  },
  //邮箱
  sendemail(data){
    return axios.post(`/api/sendemail`,data)
  },
  cheakEmail(data){
    return axios.post(`/api/cheakemail`,data)
  },
  changeEmail(data){
    return axios.post(`/api/changeemail`,data)
  },
  //物流公司列表
  logistics(){
    return axios.get(`/api/logistics`)
  }
}
export default personal;