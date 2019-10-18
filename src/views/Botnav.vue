<template>
    <div>
        <!-- 内容的  router-view  -->
        <transition :name="transitionName">         
            <router-view class="Router"></router-view>
        </transition>

        <!-- 底部导航 -->
        <cube-tab-bar
            v-model="selectedLabelDefault"
            :data="tabs"
            @click="clickHandler"
            @change="changeHandler"
            class="botnav">
        </cube-tab-bar>

        <!-- 购物车导航上面的小圆， 提示购物车商品数量 -->
        <span class="countsum">{{countsum}}</span>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      transitionName:'slide-right', // 设置路由动画的名称。     
      selectedLabelDefault: '首页', // 设置显示的底部导航 选中标签
      tabs: [{
        label: '首页',
        icon: 'cubeic-home'
      }, {
        label: '分类',
        icon: 'cubeic-tag'
      }, {
        label: '搜索',
        icon: 'cubeic-search'
      }, {
        label: '购物车',
        icon: 'cubeic-mall'
      }, {
        label: '我的',
        icon: 'cubeic-person'
      }]
    }
  },
  created(){
    // 当登录后，重定向 到各个导航页面的时候，底部导航并没有选中状态。设置 当路由跳转时， 下面的也跟随设置选中样式。
    switch(this.$route.path){
      case '/botnav/index':
      this.selectedLabelDefault='首页';
      break;
      case '/botnav/list':
      this.selectedLabelDefault='分类';
      break;
      case '/botnav/search':
      this.selectedLabelDefault='搜索';
      break;
      case '/botnav/cart':
      this.selectedLabelDefault='购物车';
      break;
      case '/botnav/mine':
      this.selectedLabelDefault='我的';
      break;
    }
  },

  
  // 获取vuex中的getters 中的计算属性  countsum  
  computed:{
      ...mapGetters(['countsum'])
  },

  methods: {
    // 点击当前，所触发的函数 
    clickHandler (label) {
      // if you clicked home tab, then print 'Home'
      console.log(label)
    },
    //点击每个导航，所触发的函数  
    changeHandler (label) {    
      switch(label){
          case '首页':
          this.$router.push('/botnav/index');
          break;
          case '分类':
          this.$router.push({path:'/botnav/list'});
          break;
          case '搜索':
          this.$router.push({path:'/botnav/search'});
          break;
          case '购物车':
          this.$router.push({path:'/botnav/cart'});
          break;
          case '我的':
          this.$router.push({path:'/botnav/mine'});
          break;
      }
    }
  }  
  
}
</script>

<style lang="stylus">
    // 如果要给组件添加其它样式，就要起一个类名，
    //注：.要保留原组件类名 +  .新类名   提高权重。
    .cube-tab-bar.botnav    
        position  fixed
        bottom  0     //固定定位到底部
        left 0
        z-index 1000
        width 100%
        background #fff
        .cube-tab div
            font-size  16px
            padding-top  3px
        i 
            font-size 20px

    // 设置路由动画效果
    .Router
        position absolute
        width  100%
        transition all 0.8s ease

    .silde-left-enter,.slide-right-leave-active
        opacity 0
        -webkit-transform  translate(100%,0) // x y 轴
        transform  translate(100%,0)

    .slide-left-leave-active,.slide-right-enter
        opacity 0
        -webkit-transform  translate(-100%,0)
        transform  translate(-100%,0)


    // 固定定位
    .countsum
      position  fixed
      bottom 33px
      right 23%
      z-index  1001
      width 18px
      height 18px
      line-height 18px
      border-radius 50%
      font-size 14px
      background red
      color #fff

</style>


