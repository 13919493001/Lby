import axios from "../axios";
//优惠券相关接口
//优惠券列表
const activity ={
  couponList(params) {
    return axios.get(`/api/coupons`,params)
  },
  //领取优惠券
  getCoupon(params) {
    return axios.post(`/api/coupon/receive`,params)
  },
  //限时秒杀相关接口
  //秒杀时间段
  time() {
    return axios.get(`/api/seckill/index`)
  },
  //限时秒杀商品列表
  seckillList(id,params) {
    return axios.get(`/api/seckill/list/${id}`,{query:params})
  },
  //秒杀商品详情
  seckillDetail(id) {
    return axios.get(`/api/seckill/detail/${id}`)
  }
}
export default activity;