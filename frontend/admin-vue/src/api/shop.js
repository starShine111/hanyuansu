import request from "@/utils/request.js"

// 获取待审核列表（audit_status = 'pending'）
export const getPendingList =(pageNum, pageSize)=>{
    return request.get('/admin/shop/pending',{
        params: { pageNum, pageSize }
    })
}
// 获取已审核列表（audit_status = 'approved'）
export const getAuditedList =(pageNum, pageSize)=>{
    return request.get('/admin/shop/audited',{
        params: { pageNum, pageSize }
    })
}
// 审核通过
export const approve = (id) => {
    return request.post('/admin/shop/approve', { id })
}

// 审核拒绝
export const reject = (id, reason) => {
    return request.post('/admin/shop/reject', { id, reason })
}

