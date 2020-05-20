<template>
    <div>
        
    </div>
</template>
<script>
export default {
    data(){
        return{
            token:1,
        }
    },
    asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
        // if(query.token){
        //     store.state.token=query.token;
            
        //     redirect('/')
        // }
    },
    mounted(){
        console.log(this.$route.query.token);
        // this.$route.redirect('/')
        //assgin记录浏览历史，所以可以实现后退功能
        //replace不记录浏览历史替换当前页，不能后退
        //reload()刷新页面,里面如果参数为true，强制刷新ctrl+f5
         $nuxt.$store.dispatch('setLogin',true)
        sessionStorage.setItem('userToken',this.$route.query.token);
        sessionStorage.setItem('isLogin',true);
        console.log($nuxt.$store);
            // location.href='/'
       
    },
}
</script>