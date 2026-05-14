import request from "@/utils/request.js"

// 获取待审核列表（audit_status = 'pending'）
export const getPendingList =(pageNum, pageSize)=>{
    return request.get('/admin/product/pending',{
        params: { pageNum, pageSize }
    })
}
// 获取已审核列表（audit_status = 'approved'）
export const getAuditedList =(pageNum, pageSize)=>{
    return request.get('/admin/product/audited',{
        params: { pageNum, pageSize }
    })
}
export const getRejectList =(pageNum, pageSize)=>{
    return request.get('/admin/product/rejected',{
        params: { pageNum, pageSize }
    })
}
// 审核通过
export const approveProduct = (id) => {
    return request.post('/admin/product/approve', { id })
}

// 审核拒绝
export const rejectProduct = (id, reason) => {
    return request.post('/admin/product/reject', { id, reason })
}
