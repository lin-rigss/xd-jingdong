<template>
    <div>
        <img class="headerimg" src="https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png" alt="">
       <cube-form
            :model="model"
            :schema="schema"
            @submit.prevent="submitHandler">
       </cube-form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            model:{
                username:'',
                password:''
            },
             schema:{
              // fields 字段
              fields:[
              //表单：用户名的设置
              {
                type: 'input',
                modelKey: 'username',
                label: '用户名',
                props: {
                  placeholder: '请输入用户名'
                },
                // rules设置 校验规则
                rules: {
                  // 是否必添
                  required: true,
                  // 类型：字符串
                  type:'string',
                  min:3,
                  max:15
                },
                // trigger 设置什么时候触发校验， blur 当失焦时进行校验
                trigger:'blur',
                // 校验的提示消息  与校验规制相对应
                messages:{
                  required:'用户名不能为空',
                  min:'用户名不能小于3个字符',
                  max:'用户名不能大于15个字符'
                }
              },
              //表单：密码的设置
              {
                type: 'input',
                modelKey: 'password',
                label: '密码',
                props: {
                  placeholder: '请输入密码',
                  // 类型是密码
                  type:'password',
                  // 显示小眼睛
                  eye:{
                    // 默认是 ****
                    open:false,
                  }
                },
                rules:{
                   required: true,
                },
                trigger:'blur',

              },
              //表单：提交按钮
              {
                type:'submit',
                label:'登录'
              }
           ]
         }
       }
     },
    methods:{
       async submitHandler(){
            try{                    // axios.post()
                const result= await this.$http.get('/api/login',{params:this.model})
                if(result.code=='0'){
                    this.$store.commit('settoken',result.token)
                    window.localStorage.setItem('token',result.token)
                   
                    // 判断路由是否带参，带参就重定向 那个参数地址，否则就去首页
                    if(this.$route.query.redirect){
                         this.$router.replace({path:this.$route.query.redirect})
                    }else{
                         this.$router.replace({path:'/botnav/index'})
                                                   // 去首页
                    }
                }else{
                     alert(result.message)
                }
            }catch(err){
                console.log(err)
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    .headerimg
        height  150px
        width  100%
</style>


