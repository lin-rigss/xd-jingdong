import axios from 'axios'
import store from './store'
import router from './router'

//http全局拦截
//token要放在我们请求的header上面带回去给后端


export default function setAxios(){
    // 设置axios请求拦截
    axios.interceptors.request.use(
        config =>{ 
            // 判断 vuex中的state 中是否有token 
        if(store.state.token){
            // 有 token 就将 token 设置成请求头
            config.headers.token = store.state.token
        }      
        return config
        }
    )

    // 设置axios响应拦截  （ 每一次请求回来的数据都会在这里被拦截）
    axios.interceptors.response.use(
        response =>{
        if(response.status == 200){
            const data=response.data
            if(data.code == -1){ // 后台返回的-1 代表登录过期了
                // 1. 清空vuex中的token
                store.commit('settoken','')
                // 2. 清除本地存储中的 token
                localStorage.removeItem('token')
                // 跳转到登录页面 重新登录
                router.replace({path:'/login'})
            }
            return data
        }
        return response    
        }
    )  
    
}