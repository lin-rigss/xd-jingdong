<template>
    <div class="panelsbox">
        <!-- 左边的滚动 分类导航 -->
        <cube-scroll class="leftpanels" ref="left">
            <ul>
                <li v-for="(list,index) in tabslabel" @click='selectlist(index)' :class="list.active?'active':''" :key='index'>
                    {{list.label}}
                </li>
            </ul>
        </cube-scroll>


        <!-- 右边的滚动 分类导航 -->
         <cube-scroll class="rightpanels" ref="right">
             <ul>
                 <li v-for="(tag,index) in tags" :key="index">
                     <img :src="tag.image" alt="">
                                      <!-- 添加到购物车的 i 标签  addtocart()添加到购物车方法 传入事件对象，及当前对象数据 -->
                     <p>{{tag.label}} <i class="cubeic-add" @click="addtocart($event,tag)"></i></p>
                 </li>
             </ul>
         </cube-scroll>


         <!-- 存储动画效果 的小球的容器  -->
         <div class="ball-wrap">
             <!-- 3个事件： 动画开始之前， 动画执行开始  ，动画执行结束 -->
             <transition
                @before-enter="beforeEnter"  
                @enter="enter"
                @afterEnter="afterEnter"
             >
                <!-- 使用 transition标签包裹 装小球的div -->
                <div class="ball" v-show="ball.show">
                    <div class="inner">
                        <i class="cubeic-add"></i>
                    </div>
                </div>
             </transition>
         </div>



    </div>
</template>

<script>
export default {
    data(){
        return{
            // 设置小球需要用到的 数据变量
            ball:{               
                show:false, // show 是否显示 
                el:'' // 元素
            },

           tags:[],
           tabslabel:[
               {
                   label:'热门推荐',
                   active:true
               },
               {
                   label:'手机数码',
                   active:false
               },
               {
                   label:'家用电器',
                   active:false
               },
               {
                   label:'家用空调',
                   active:false
               },
               {
                   label:'电脑产品',
                   active:false
               },
               {
                   label:'计生情趣',
                   active:false
               },
               {
                   label:'美妆护肤',
                   active:false
               },
               {
                   label:'口红',
                   active:false
               },
               {
                   label:'手袋',
                   active:false
               },
               {
                   label:'金银财宝',
                   active:false
               },
               {
                   label:'手机数码',
                   active:false
               },
               {
                   label:'手机数码',
                   active:false
               },
               {
                   label:'热门推荐',
                   active:true
               },
               {
                   label:'手机数码',
                   active:false
               },
               {
                   label:'家用电器',
                   active:false
               },
               {
                   label:'家用空调',
                   active:false
               },
               {
                   label:'电脑产品',
                   active:false
               },
               {
                   label:'计生情趣',
                   active:false
               },
           ] 
        }
    },
    created(){
        //第一次 获取 默认的分类数据  就是第0个
        this.getclassify(0)
    },
    methods:{
       //获取分类数据方法
       async getclassify(index){
           const result=await this.$http.get('/api/classify',{params:{type:index}})
           this.tags=result.data
        },

        //点击左侧分类的事件方法
        selectlist(index){
            this.tabslabel.forEach((val,ind)=>{
                if(index==ind){
                    // 如果id 相 则 active为true,添加类名。
                    val.active=true
                }else{
                     val.active=false
                }
            })
            // 点击的是哪一个，就传入当前的index，再次获取index相对应的数据。
            this.getclassify(index)
        },
      
        //添加商品到购物车 方法
        addtocart(ev,tag){
            // 调用 vuex 中的添加商品的方法，并传入 tag 添加的商品数据对象
            this.$store.commit('tocart',tag)

            //让小球显示出来
            this.ball.show=true
            //获取 事件源， 点击的那个元素。
            this.ball.el=ev.target
        },

        // 小球 动画开始之前方法
        beforeEnter(el){             
            // 获取点击的dom元素的位置
            const dom=this.ball.el // dom 是 点击的那个dom元素
            const rect=dom.getBoundingClientRect() //获取点击的dom元素的位置的原生方法
            console.log(rect)// 得到一个存储位置{bottom,height,left,right.top width.x y}所对应值的对象。 

            //让小球移动到点击的位置  元素位置的left值  - 可视窗口的 67% （购物车盒子距可视窗口x轴的67%的位置）  
            const x=rect.left-window.innerWidth*0.67
            const y=-(window.innerHeight-rect.top) // 获取Y轴，因为是向下移动，所以 为 - 负
            console.log(x,y)

            // 将 x y 的值 设置 元素和 小球 
            el.style.display='block'
            el.style.transform=`translate3d(0,${y}px,0)`
            const inner=el.querySelector('.inner')
            inner.style.transform=`translate3d(${x}px,0,0)`
        },

        // 小球 动画执行开始 方法 
        enter(el,done){
            //要触发重绘，才能实现动画效果
            document.body.offsetHeight

            //小球移动回到原点，就是购物车的位置
            el.style.transform=`translate3d(0,0,0)`
            const inner=el.querySelector('.inner')
            inner.style.transform=`translate3d(0,0,0)`

            //过渡完成后执行的事件
            el.addEventListener('transitionend',done)
            // 当只用 JavaScript 过渡的时候，在 enter 和 leave 中必须使用 done 进行回调。否则，它们将被同步调用，过渡会立即完成。
        }, 
               
        // 小球  动画执行结束 方法
        afterEnter(el){
            //结束隐藏小球
            this.ball.show=false
            el.style.display='none'
        }



    },
  
    mounted(){

        // 让左边盒子，与右边盒子有滚动效果

     // 使用原生获取元素 ，没有bug 滑动顺畅   
        // //设置滚动盒子的高度  获取左边 和右边的真实DOM元素，
        // const leftpanels=document.querySelector('.leftpanels')
        // const rightpanels=document.querySelector('.rightpanels')
        //  // 获取可视区域的高度
        // const bodyheight=document.documentElement.clientHeight
        // // 设置左边的高度 = 可视高度 减去  底部导航栏的高度
        // leftpanels.style.height=bodyheight-57+'px'
        // // 设置右边的高度 = 可视高度 减去  底部导航栏的高度
        // rightpanels.style.height=bodyheight-57+'px'



     // 使用 ref 获取的元素 ，有小 bug  ,没有点击操作的时候 滚动不了，只有点击后，才能滚动
        this.$nextTick(()=>{
           const leftpanels = this.$refs.left.$el
           const rightpanels = this.$refs.right.$el
           console.log(leftpanels,rightpanels);
            // 获取可视区域的高度
            const bodyheight=document.documentElement.clientHeight
            // 设置左边的高度 = 可视高度 减去  底部导航栏的高度
            leftpanels.style.height=bodyheight-57+'px'
            // 设置右边的高度 = 可视高度 减去  底部导航栏的高度
            rightpanels.style.height=bodyheight-57+'px'
        })  
       
    }
}
</script>

<style lang="stylus" scoped>

    // 动画小球容器的样式
    .ball-wrap
        .ball
            position fixed   // 固定定位在 购物车底部导航的位置
            left 67%
            bottom 10px
            z-index 1003
            color red
            transition all 1s cubic-bezier(0.49,-0.29,0.75,0.41) // 动画的贝塞尔曲线
            .inner
                width 14px
                height  14px
                transition all 1s linear



    .panelsbox
        display flex
        .leftpanels
            width 30%
            li
                height 50px
                line-height 50px
                border-bottom 1px solid #fff
                color #333
                background #f8f8f8
                font-size  14px
            .active
                background #fff
                color #e93b3d
        .rightpanels
            width 70%
            ul
                display flex
                flex-wrap  wrap
                li
                    width 50%
                    justify-content center
                    align-items center
                    font-size 15px
                    img 
                        width 80px
                        height  80px
                    .cubeic-add
                        font-size  18px
</style>


