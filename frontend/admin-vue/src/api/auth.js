import request from '@/utils/request.js'

//登录(管理员）
export const loginApi=(data)=>{
    return request.post('/admin/login',data);
}
//验证当前是否登录
export const getProfileApi=()=>{
    return request.get('/admin/profile')
}
//退出登录
export const logoutApi=()=>{
    return request.post('/admin/logout')
}
