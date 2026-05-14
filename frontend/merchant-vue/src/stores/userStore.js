import {defineStore} from 'pinia'
import {getProfileApi, loginApi, logoutApi} from "@/api/auth.js";

export const useUserStore=defineStore('user',{
    state:()=>({
        userInfo:null,
        isLoggedIn:false
    }),
    actions:{
        async  login(phone, password, rememberMe) {
            try {
                const res=await loginApi({phone, password, rememberMe});
                this.userInfo=res.data.userInfo
                this.isLoggedIn=true

                return {success:true}
            }catch (error){
                this.userInfo=null
                this.isLoggedIn=false
                return {success:false,message:error.message}
            }
        },
        async getProfile(){
            try {
                const res=await getProfileApi();
                this.userInfo=res.data
                this.isLoggedIn=true
                return true
            }catch {
                this.logout()
                return false
            }
        },
        async logout(){
            try {
                await logoutApi();
            }catch (error){
                console.error('退出请求失败',error)
            }finally {
                this.userInfo=null
                this.isLoggedIn=false
                localStorage.removeItem('userInfo')
                localStorage.removeItem('saved_username')
            }
        }
    }
})