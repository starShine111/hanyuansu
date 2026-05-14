<template>
  <div class="page-container">
    <h2>商品列表</h2>
    <el-table :data="tableData" border>
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column label="图片" >
        <template #default="{row}">
          <el-image
            :src="row.mainImage"
            fit="cover"
            style="width: 150px;height: 150px"
            :preview-src-list="[row.mainImage]">
            <template #error>
              <div style="width: 50px; height: 50px; background: #f0f0f0; display: flex; align-items: center; justify-content: center">
                <el-icon><Picture /></el-icon>
              </div>
            </template>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="价格">
        <template #default="{row}">
          <span v-if="row.minPrice && row.maxPrice">
            ¥{{ row.minPrice }} - ¥{{ row.maxPrice }}
          </span>
          <span v-else-if="row.minPrice">
          ¥{{ row.minPrice }}
        </span>
          <span v-else>暂无价格</span>
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
import {getAuditedList} from "@/api/product.js";


const loading=ref(false);
const pageNum = ref(1)
const pageSize = ref(10)
const tableData=ref([]);
const total=ref(0);
const loadData=async()=> {
  loading.value=true;
  try {
    const res=await getAuditedList(pageNum.value,pageSize.value);
      tableData.value = res.data.list || []
      total.value=res.data.total
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