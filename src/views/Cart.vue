<template>
    <div>
        <div class="goods" v-for="(item,index) in cartarry" :key="index">
            {{item.title}}
            <div class="goodsright">
                <i class="cubeic-remove" @click="cartremove(index)"></i>
                <span>{{item.cartCount}}</span>
                <i class="cubeic-add" @click="cartadd(index)"></i>
            </div>            
        </div>
        <cube-button style="margin:10px 0;">下单</cube-button>
        <cube-button @click="clearcart">清空购物车</cube-button>
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
    data(){
        return{
            // 将购物车的数据存储在vuex 中，  因为 list 组件和 当前的组件，共用数据。
            // cartarr:[]
        }
    },
    // 组件的计算属性中， 获取 vuex 中的数据。
    computed:{
        ...mapState(['cartarry'])
    },
    methods:{
        // mapMutations 语法糖简写版
        ...mapMutations(['cartremove','cartadd','clearcart']),
        
        // //减少商品
        // removeCart(index){
        //     this.$store.commit('cartremove',index)
        // },
        // //增加商品
        // addCart(index){
        //     this.$store.commit('cartadd',index)
        // },
        // //清空购物车
        // clearcart(){
        //     this.$store.commit('clearcart')
        // }
        
       
    }
}
</script>

<style lang="stylus" scoped>
    .goods
        padding 10px
        text-align left 
        .goodsright
            float  right
        i 
            font-size 18px
</style>