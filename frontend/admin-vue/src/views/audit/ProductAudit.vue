<template>
  <div class="page-container">
    <h2>商品审核</h2>
    <el-table :data="tableData" border>
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="status" label="审核状态"></el-table-column>
      <el-table-column label="操作">
        <template #default="{row}">
          <el-button type="primary" size="small" @click="handleActive(row)">通过</el-button>
          <el-button type="danger" size="small" @click="openRejectDialog(row)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNum"
      v-model:page-size="pageSize"
      :total="total"
      @current-change="loadData"
      @size-change="loadData"/>
    <RejectDialog
        v-model:dialogVisible="rejectVisible"
        title="拒接商品审核"
        :options="shopRejectedOptions"
        :showDetail="true"
        @confirm="confirmReject"/>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import request from "@/utils/request.js";
import {ElMessage} from "element-plus";
import {approveProduct, getPendingList, rejectProduct} from "@/api/product.js";
import RejectDialog from "@/components/RejectDialog.vue";

const pageNum = ref(1)
const pageSize = ref(10)
const tableData = ref([]);
const loading=ref(false);
const total=ref(0);

const currentRow=ref(null)
const rejectVisible=ref(false);
const shopRejectedOptions=[
  { value: '资料不完整', label: '📋 资料不完整' },
  { value: '信息不符', label: '❌ 信息不符' },
  { value: '经营范围不符', label: '🏷️ 经营范围不符' },
  { value: '重复申请', label: '🔄 重复申请' },
  { value: '其他', label: '📝 其他' }
];

const loadData=async()=> {
  loading.value=true;
  try {
    const res = await getPendingList(pageNum.value,pageSize.value);
    tableData.value = res.data.list || []
    total.value=res.data.total
  } finally {
    loading.value=false;
  }
}
const handleActive=async (row)=> {
  await approveProduct(row.id);
  await loadData()  // 刷新列表
}
const openRejectDialog=(row)=>{
  currentRow.value=row;
  rejectVisible.value=true;
}
//确定拒绝
const confirmReject=async (reason)=>{
  await rejectProduct(currentRow.value.id, reason)
  rejectVisible.value=false
  await loadData();
}

onMounted(()=>{
  loadData();
})
watch([pageNum,pageSize],()=>{
  loadData();
})
</script>