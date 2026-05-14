import { createRouter, createWebHistory } from 'vue-router'
import { getProfileApi } from '@/api/auth'
import Login from '@/views/login/Login.vue'
import HomeLayout from '@/views/HomeLayout.vue'
import Dashboard from '@/views/Dashboard.vue'
import ProductLayout from '@/views/product/ProductLayout.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/home',
      name:'home',
      component:HomeLayout,
      children:[
        {
          path: '',                 // 空路径，访问 /home 时的默认页面
          redirect: '/home/dashboard'
        },
        {
          path:'dashboard',
          name:'dashboard',
          component:Dashboard,
          meta:{requiresAuth:true}
        },
        {
          path:'/product',
          name:'product',
          component:ProductLayout,
          meta:{requiresAuth:true}
        }
      ]
    },
    {
      path:'/',
      redirect:'/home/dashboard'
    },
    // {
    //   path: '/:pathMatch(.*)*',
    //   name: 'not-found',
    //   component: () => import('@/views/NotFound.vue')
    // }
  ],
})
router.beforeEach(async (to,from)=>{
  const whiteList=['/login']
  if(whiteList.includes(to.path)){
    return true
  }else if(to.meta.requiresAuth){
    //TODO:检查登录状态
    try {
      await getProfileApi()
      return true
    }catch (error){
      return  '/login'
    }
  }else {
    return  '/login'
  }
})
export default router
