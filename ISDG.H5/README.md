## 目录解构

```
├─components         组件
│ │ about.vue        个人中心相关推荐
│ │ form.vue         表单组件(所有的表单)
│ │ goods.vue        商品列表
│ │ goodsDetail.vue  商品详细
│ │ order.vue        购买后的订单页面
│ │ quickTab.vue     首页快捷按钮
│ │ salesReturn.vue  我要退货相关
│ │ salesRing.vue    退货相关
│ │ scrollTop.vue    回到顶部
│ │
│ ├─common           通用
│ │ banner.vue       个人中心banner部分
│ │ navbar.vue       所有页面头部
│ │ tabbar.vue       所有页面最后
│ │
│ ├─market           商城相关
│ │ add.vue          添加地址
│ │ address.vue      地址
│ │ chose.vue        选择地址
│ │ info.vue         商品信息
│ │
│ ├─news             品牌咨询
│ │ banner.vue       品牌咨询的banner
│ │
│ └─order
│ orderSearch.vue    个人中心部分页面的选择时间，搜索
│
├─layouts
│ default.vue        挂载页面，navbar，tabbar，scrollTop放在这
│ README.md
│
├─pages
│ │ car.vue          购物车
│ │ index.vue        首页
│ │ login.vue        登录
│ │ order.vue        订单
│ │ register.vue     注册
│ │ search.vue       搜索
│ │
│ ├─contactus        关于我们
│ │ index.vue
│ │
│ ├─coupon           优惠活动，不晓得是啥页面，所以放的是优惠卷
│ │ index.vue
│ │
│ ├─flashSale        限时秒杀
│ │ detail.vue       详情页
│ │ index.vue        限时秒杀首页
│ │
│ ├─goods            商品页
│ │ index.vue
│ │
│ ├─home             首页相关
│ │ findPwd.vue      找回密码
│ │ group.vue        swiper同一面设置不了多个轮播，所以把首页的团购提取为组件
│ │ hot.vue          同上，首页热门
│ │ setPwd.vue       设置密码
│ │
│ ├─news             品牌咨询
│ │ detail.vue
│ │ index.vue
│ │
│ ├─personal          个人中心
│ │ │ address.vue     地址管理
│ │ │ cashList.vue    消费清单
│ │ │ cashOut.vue     提现
│ │ │ collection.vue  收藏
│ │ │ coupon.vue      优惠卷
│ │ │ distribution.vue  分销
│ │ │ feedback.vue     反馈
│ │ │ index.vue        个人中心主页
│ │ │ mySalesR.vue     我要退货页
│ │ │ order.vue        我的订单(待付款 待收货 已完成 已取消)
│ │ │ points.vue       我的积分
│ │ │ shareCode.vue    我的分享码
│ │ │
│ │ ├─config            设置
│ │ │ email.vue         更改邮箱第一步
│ │ │ emailS.vue        邮箱第二步
│ │ │ index.vue         设置主页更改基本信息
│ │ │ password.vue      更改密码
│ │ │ phone.vue         更改手机第一步
│ │ │ phoneS.vue        手机第二步
│ │ │
│ │ ├─message          消息
│ │ │ detail.vue
│ │ │ index.vue
│ │ │
│ │ └─salesReturn       订单那点击的退货页
│ │ index.vue
│ │ next.vue
│ │
│ ├─points_market        积分商城
│ │ detail.vue
│ │ index.vue
│ │
│ └─story               品牌故事
│ index.vue
│
└─plugins
element-ui.js        element
README.md
router.js            路由的拦截，暂时只写了切换路由回到页面顶部
vue-swiper.js         swiper
```

## 需求
+ 品牌故事psd，有几个页面没写，这几个和品牌故事无关，也不知道放哪
+ 首页团购促销，这个的更多页应该和普通商品的列表页不一样
+ 商品购买，右边的帮助，有类似常见问题的页面，这个也没有

## scss
+ assets/scss/index.scss  封装了几个常用的函数
+ wap页面的px值,用的是scss的函数,写法为px(设计图的px)

## 1440px
+ 设计图为1440的，都被我搞成1200了
+ 如果要改直接改相应页面的.content 的max-width 为1440
+ 应该都不会变形

## etc
+ 这页面写的拉跨。。。。。。