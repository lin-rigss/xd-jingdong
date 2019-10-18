import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    token:'',    
    // cartarry 存储的是 购物车中的数据 因为存储在了本地存储中，所以从本地存储中获取
    cartarry:JSON.parse(localStorage.getItem('cartarry')) || [],
  },

  // vuex计算属性
  getters:{
      // countsum 计算属性是 购物车底部导航上面的小圆圈提示的购物车商品数量。
      countsum:state=>{
        let num = 0
        state.cartarry.forEach(item=>{
          num += item.cartCount
        })
        return num
      }
  },

  mutations: {

    //设置vuex的token
    settoken(state,token){
      state.token=token
    },

    //添加商品到购物车方法
    tocart(state,tag){
      // 查看添加的数据，在vuex中的购物车数据里面有没有  根据 商品的名称来查找
      let goods=state.cartarry.find(item=>item.title==tag.label)
      if(goods){ // 如果有，就让此商品的数量加1
        goods.cartCount+=1
      }else{ // 如果没有， 就将要添加的数据 push 到 vuex购物车数据里 
        // 注： 新添加的数据是一个对象，注意属性名要与之前的数据统一
        state.cartarry.push({title:tag.label,cartCount:1})
      }
    },

    //购物车商品数量加一
    cartadd(state,index){
      state.cartarry[index].cartCount++
    },
    //购物车商品数量减一
    cartremove(state,index){
      if(state.cartarry[index].cartCount>1){
        state.cartarry[index].cartCount--
      }else{ 
        // 否则， 商品数量小于1 的时候，就将传入索引的商品在购物车数据中删除 ，使用splice方法
        if(window.confirm('确定从购物车移除商品吗？')){
          state.cartarry.splice(index,1)
        }
      }
    },
    //清空购物车
    clearcart(state){
      state.cartarry=[]
    }

  },
  actions: {

  },
})




export default store
