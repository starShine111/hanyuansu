<template>
  <div class="page-container">
    <h2>店铺列表</h2>
    <el-table :data="tableData" border>
      <el-table-column prop="name" label="店铺名称"></el-table-column>
      <el-table-column prop="ownerName" label="店主"></el-table-column>
      <el-table-column prop="status" label="审核状态"></el-table-column>
    </el-table>
  </div>
  <el-pagination
      v-model:current-page="pageNum"
      v-model:page-size="pageSize"
      :total="total"
      @current-change="loadData"
      @size-change="loadData"/>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue'
import request from "@/utils/request.js";
import {ElMessage} from "element-plus";
import {getAuditedList} from "@/api/shop.js";


const loading=ref(false);
const tableData=ref([]);
const pageNum=ref(1)
const pageSize=ref(10)
const total=ref(0)
const loadData=async()=> {
  loading.value=true;
  try {
    const res=await getAuditedList(pageNum.value,pageSize.value);
      tableData.value = res.data.list || []
      total.value=res.data.total;
    }finally {
    loading.value=false;
  }
}
onMounted(()=>{
  loadData();
})
watch([pageNum,pageSize],()=>{
  loadData();
})
</script>