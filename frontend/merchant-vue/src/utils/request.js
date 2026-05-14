import axios from 'axios';
import {ElMessage} from "element-plus";

const request = axios.create({
    baseURL:`/api`,
    timeout:30000,
    withCredentials:true
});

//request拦截器
//请求前处理
request.interceptors.request.use(config=>{
    config.headers['Content-Type']='application/json;charset=utf-8';
    return config;
},error=>{
    return Promise.reject(error)
});
//接口响应后统一处理结果
request.interceptors.response.use(response=>{
    let res=response.data;
    if(typeof res==='string'){
        res=res?JSON.parse(res):res;
    }
    console.log('拦截器收到响应:', res)  // ← 加这行，看看返回什么
    if(res.code===200){
        if(res.message){
            ElMessage.success(res.message)
        }
        return res
    }
    ElMessage.error(res.message || '操作失败')
    return Promise.reject(new Error(res.message || '操作失败'))
},error=>{
    if(error.response.status===404){
        ElMessage.error("未找到请求接口")
    }
    else if(error.response.status===500){
        ElMessage.error("系统异常，请查看后端控制器")
    }else {
        console.error(error.message)
    }
    return Promise.reject(error)
});
export default request;