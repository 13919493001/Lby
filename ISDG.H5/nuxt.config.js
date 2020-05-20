module.exports = {
  mode: "universal",
  /*
   ** Headers of the page
   */
  // server: {
  //   host: "192.168.1.43",
  //   default: 3000
    
  // },
  server: {
    host: "127.0.0.1",
    default: 3000
    
  },
  head: {
    // title: process.env.npm_package_name || "",
    title: "ISDG 官方网站",

    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no"
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicons.ico" }],
    script: [
      {
        src: "http://api.map.baidu.com/api?v=1.3",
        type: "text/javascript",
        charset: "utf-8"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [
    "element-ui/lib/theme-chalk/index.css",
    "@/assets/css/reset.css",
    "element-ui/lib/theme-chalk/display.css",
    "swiper/dist/css/swiper.css"
  ],
  styleResources: {
    scss: ["./assets/scss/index.scss"]
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/element-ui",
    { src: "@/plugins/vue-swiper.js", ssr: false },
    { src: "@/plugins/router.js", ssr: false },
    // { src:"@/plugins/axios.js",ssr:true }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/style-resources",
    // '@nuxtjs/proxy',
    
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
    prefix: '/api', // 表示给请求url加个前缀 /api
    credentials: true,
    withCredentials:true,
    crossDomain:true
  },
  proxy: {
    '/api': {
      // target: 'http://office2.chaoyi996.com:36541', // 目标接口域名
      // target: 'http://148.70.63.243:8080', // 目标接口域名
      target: 'http://192.168.1.102', // 目标接口域名
      // target:'http://admin.isdg.cn',
      changeOrigin: true, // 表示是否跨域
      crossDomain:true,
      withCredentials:true,
      pathRewrite: {
        '^/api': '', // 把 /api 替换成 /
      }
    }  
  },
  /*
   ** Build configuration
   */

  
  
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
