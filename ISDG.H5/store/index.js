import Vue from "vue";
import Vuex from "vuex";
// import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex);

const store = () => new Vuex.Store({
    state: {
        isLogin: false,
        token:"11111111",
        url:"http://192.168.1.31:8087",
        carNum:1,
        carId:"",
        points:0,
        uniqueId:"",
        cartNum:0,//购物车数量
        nikName:"",//用户名
        salesReturn:{},
        commodity:[],
        detail:{}
    },
    // plugins: [createPersistedState({
    //     storage: window.sessionStorage
    // })],
    mutations: {
        userStatus(state,user){
            if(user){
                state.isLogin=true;
                state.cartNum=sessionStorage.getItem("cartNum");
                state.nikName=sessionStorage.getItem("nikName");
            }
            else if(user == null){
                sessionStorage.setItem("userToken","");
                state.isLogin=false;
                state.token="";
            }
        },
        setLogin(state,type){
            state.isLogin=type;
            console.log(type,state.isLogin);
            
        },
        setReturn(state,data){
            state.salesReturn=data
            console.log(data,state.salesReturn);
            
        },
        setCommodity(state,data){
            state.commodity=data
            console.log(data,state.commodity);
            
        },
        setDetail(state,data){
            state.detail=data
            console.log(data,state.detail);
            
        },
    },
    actions:{
        setToken({commit},user){
            commit("userStatus",user)
        },
        setLogin({commit},type){
            commit('setLogin',type)
        }
    },
  });
export default store