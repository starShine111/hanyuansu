import request from '@/utils/request.js'

//管理员列表
export const getAllAdmin=(pageNum, pageSize)=>{
    return request.get('/admin/getAllAdmin',{
        params: { pageNum, pageSize }
    })
}
