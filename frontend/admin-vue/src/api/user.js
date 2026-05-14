import request from '@/utils/request.js'

export const getAllUser=(pageNum, pageSize)=>{
    return request.get('/user/selectAll',{
        params: { pageNum, pageSize }
    })
}