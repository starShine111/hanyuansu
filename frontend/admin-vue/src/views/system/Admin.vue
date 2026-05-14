<template>
  <div class="page-container">
    <h2>管理员账号</h2>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input v-model="searchKeyword" style="max-width: 240px" placeholder="搜索任务名称" />
        </el-col>
        <el-col :span="12">
            <span>
              <el-button type="primary" @click="addAdmin ">新增</el-button>
            </span>
        </el-col>
      </el-row>
    </el-card>
    <el-table :data="tableData" border>
      <el-table-column prop="username" label="管理员账号"></el-table-column>
<!--      <el-table-column prop="price" label="价格"></el-table-column>-->
<!--      <el-table-column prop="status" label="登录状态"></el-table-column>-->
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
import {getAllAdmin} from "@/api/admin.js";


const loading=ref(false);
const pageNum = ref(1)
const pageSize = ref(10)
const tableData=ref([]);
const total=ref(0);
const loadData=async()=> {
  loading.value=true;
  try {
    const res=await getAllAdmin(pageNum.value,pageSize.value);
    tableData.value = res.data.list || []
    total.value=res.data.total;
  }finally {
    loading.value=false;
  }
}
const addAdmin=async ()=>{

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

onMounted(()=>{
  loadData();
})
watch([pageNum,pageSize],()=>{
  loadData();
})
</script>

<style scoped>

</style>