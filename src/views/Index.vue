<template>
    <div id="index">
        <!-- 轮播图 -->
        <cube-slide ref="slide" :data="items" @change="changePage">
            <cube-slide-item v-for="(item, index) in items" :key="index" @click.native="clickHandler(item, index)">
                <a :href="item.url">
                <img class="banner" :src="item.image">
                </a>
            </cube-slide-item>
        </cube-slide>
        <!-- 滚动分类                 :auto-play="false" 不自动轮播     -->
        <cube-slide ref="slidelists" :auto-play="false" :data="lists">
            <cube-slide-item v-for="(list, index) in lists" :key="index">
                <!-- 循环数据 二组数组数据 list -->
               <ul class="listul">
                   <li class="listli" v-for="(item,index1) in list" :key="index1">
                          <!-- 动态绑定 :href 点击 a 标签跳转 -->
                       <a :href="item.url">
                           <img :src="item.image" alt="">
                           <p>{{item.label}}</p>
                       </a>
                   </li>
               </ul>
            </cube-slide-item>
        </cube-slide>
    </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],//轮播图数组
      lists:[],//滚动分类数组
    }
  },
  methods: {
    changePage(current) {
    //   console.log('当前轮播图序号为:' + current)
    },
    clickHandler(item, index) {
    //   console.log(item, index)
    }
  },
 async created(){
     try{
         //获取轮播图数据    this.$http = axios
         const items=await this.$http.get('/api/banner')
         this.items=items.data
         //获取滚动分类数据
         const lists=await this.$http.get('/api/rollinglist')
         this.lists=lists.data
     }catch(err){
         console.log(err)
     }
  }
}
</script>

<style lang="stylus" scoped>
    #index
        a
            .banner
                display block
                width 100%
                height  175px
                

        // 分类的样式设置 flex 布局
        .listul
            display flex
            flex-wrap   wrap
        .listli
            width 20%
            justify-content center
            img
                width 35px
                height  35px
                border-radius  50%
                padding 5px 0
            p
                font-size  14px
                padding-bottom  10px
</style>

