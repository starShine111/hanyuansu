import request from '@/utils/request.js'

//登录
export const loginApi=(data)=>{
    return request.post('/seller/login',data);
}
//验证当前是否登录
export const getProfileApi=()=>{
    return request.get('/seller/profile')
}

export const logoutApi=()=>{
    return request.post('/admin/logout')
}