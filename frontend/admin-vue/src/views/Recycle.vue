<template>
  <div class="page-container">
    <h2>商品回收站</h2>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input v-model="searchKeyword" style="width: 240px" placeholder="搜索任务名称" />
        </el-col>
        <el-col :span="6">
          <el-date-picker
              v-model="value"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
          </el-date-picker>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <div style="display: flex;justify-content: space-between">
        <span>
          批量操作：
          <el-button type="primary" @click="recoverAll ">批量恢复</el-button>
          <el-button type="danger" @click="batchDelete  ">彻底删除</el-button>
        </span>
        <span>共 {{count}} 条记录</span>
      </div>
    </el-card>
    <el-table :data="tableData" border @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="status" label="审核状态"></el-table-column>
      <el-table-column label="图片">
        <template #default="{row}">
          <el-image
            :src="row.mainImage"
            fit="cover"
            style="width: 150px;height: 150px"
            :preview-src-list="[row.mainImage]">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{row}">
          <el-button type="primary" size="small" @click="deleteById(row)">删除</el-button>
        </template>
      </el-table-column>
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
import {ElMessage, ElMessageBox} from "element-plus";
import {getRejectList} from "@/api/product.js";


const loading=ref(false);
const tableData=ref([]);
const pageNum = ref(1)
const pageSize = ref(10)
const total=ref(0);
const count=ref(0);
const loadData=async()=> {
  loading.value=true;
  try {
    const res=await getRejectList(pageNum.value,pageSize.value);
      tableData.value = res.data.list || []
      total.value=res.data.total;
      count.value=res.data.length || 0;
  }finally {
    loading.value=false;
  }
}
const selectedRows=ref([]);
const handleSelectionChange=(rows)=>{
  selectedRows.value=rows;
}
const deleteById=async (row)=>{
  await ElMessageBox.confirm(
      `确定要彻底删除商品吗？此操作不可恢复`,
      `删除商品`,
      {type:"error"}
  )
  await request.delete(`product/deleteById/${row.id}`)
  await loadData();
}
const batchDelete =async ()=>{
  if (selectedRows.value.length===0){
    ElMessage.warning("请选择要删除的商品")
    return
  }
  const ids=selectedRows.value.map(row=>row.id);
//  弹出确定框
  await ElMessageBox.confirm(
      `确定要彻底删除${ids.length}件商品吗？此操作不可恢复！`,
      '批量删除',
      {type:'error'}
  )
//  发生请求
    await request.delete('product/batchDelete',{data:ids})
    await loadData();
  selectedRows.value=[];
}

onMounted(()=>{
  loadData();
})
watch([pageNum,pageSize],()=>{
  loadData();
})
</script>

<style scoped>

</style>