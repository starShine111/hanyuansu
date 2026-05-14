import { createRouter, createWebHistory } from 'vue-router'
import { getProfileApi } from '@/api/auth'
import Login from '@/views/login/Login.vue'
import HomeLayout from '@/views/HomeLayout.vue'
import Dashboard from '@/views/Dashboard.vue'
import ShopsLayout from '@/views/shop/ShopList.vue'
import ProductLayout from '@/views/shop/ProductList.vue'
import ShopAuditLayout from '@/views/audit/ShopAudit.vue'
import ProductAuditLayout from '@/views/audit/ProductAudit.vue'
import Recycle from '@/views/Recycle.vue'
import Admin from '@/views/system/Admin.vue'
import User from '@/views/system/User.vue'
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
          path:'/shopAudit',
          name:'ShopAudit',
          component:ShopAuditLayout,
          meta:{requiresAuth:true}
        },
        {
          path:'/productAudit',
          name:'productAudit',
          component:ProductAuditLayout,
          meta:{requiresAuth:true}
        },
        {
          path:'/product',
          name:'product',
          component:ProductLayout,
          meta:{requiresAuth:true}
        },
        {
          path:'/stores',
          name:'stores',
          component:ShopsLayout,
          meta:{requiresAuth:true}
        },
        {
          path:'/recycle',
          name:'recycle',
          component:Recycle,
          meta:{requiresAuth:true}
        },
        {
          path:'/admin',
          name:'admin',
          component:Admin,
          meta:{requiresAuth: true}
        },
        {
          path:'/user',
          name:'user',
          component:User,
          meta:{requiresAuth: true}
        }
      ]
    },
    {
      path:'/',
      redirect:'/home/dashboard'
    }
  ],
})
router.beforeEach(async (to,from)=>{
  const whiteList=['/login']
  if(to.meta.requiresAuth){
    //TODO:检查登录状态
    try {
      await getProfileApi()
      return true
    }catch (error){
       return '/login'
    }
  }else if(whiteList.includes(to.path)){
    return true
  }else {
    return '/login'
  }
})
export default router
