import Vue from 'vue'
import Router from 'vue-router'
import {REDIRECT_URL} from '@/constants'
import {FLODER} from '@/constants'
import teacher from '@/pages/teacher/router'
import sysSetting from '@/pages/system/router'
Vue.use(Router)
const routers =  new Router({
  routes: [

    {
      path: '/main',
      name: 'main',
      component: (resolve)=>require(['@/Main.vue'],resolve),
      redirect: '/main/home',
      beforeEnter (to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建
        if(!localStorage.getItem('user')){
          console.log(12333);
          location.replace(REDIRECT_URL+FLODER);
        }
        next();
      },
      children: [
        {
          path: 'home',
          name:'mains',
          component: (resolve)=>require(['@/pages/system/welcome.vue'],resolve),
        },
        {
          path: 'test',
          name:'test',
          component: (resolve)=>require(['@/test/test.vue'],resolve),
        },
        {
          path: 'testtemp',
          name:'testtemp',
          component: (resolve)=>require(['@/test/testTemp.vue'],resolve),
        },
        {
          path: 'teacher',
          name:'teacher',
          redirect:'/main/teacher/teacherhome',
          component: (resolve)=>require(['@/pages/right.vue'],resolve),
          children:teacher
        },
        {
          path: 'sys',
          name:'sys',
          component: (resolve)=>require(['@/pages/right.vue'],resolve),
          redirect:'/main/sys/grade',
          children:sysSetting
        },

      ],

    },
    {
      path: '/login',
      name: 'login',
      component: (resolve)=>require(['@/login.vue'],resolve),
      beforeEnter (to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建
        if(localStorage.getItem('user')){
          next({ name: 'main' })
        }else{
          next();
        }

      }
    },
    {
      path: '/bbview',
      name: 'bbview',
      component: (resolve)=>require(['@/fullPage.vue'],resolve),
      redirect: '/bbview/homes',
      children: [
        {
          path: 'homes',
          name:'bbhome',
          component: (resolve)=>require(['@/pages/system/bbview.vue'],resolve),
        },
        {
          path: 'uploadData',
          name:'uploadData',
          component: (resolve)=>require(['@/pages/teacher/gradeSettingAdmin.vue'],resolve),
        }
      ]
    },
    {
      path: '*',
      name: 'login2',
      component: (resolve)=>require(['@/login.vue'],resolve),
      beforeEnter (to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建
        if(localStorage.getItem('user')){
          next({ name: 'main' })
        }else{
          next();
        }

      }
    }
  ]
})

export default routers;
