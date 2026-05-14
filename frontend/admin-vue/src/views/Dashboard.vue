<template>
  <el-card class="box-card">
    <h2>统计</h2>
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          prop="storesCount"
          label="用户数"
          width="160">
      </el-table-column>
      <el-table-column
          prop="storesCount"
          label="店铺数"
          width="160">
      </el-table-column>
      <el-table-column
          prop="address"
          label="今日订单"
          width="160">
      </el-table-column>
      <el-table-column
          prop="goodsCount"
          label="待审店铺"
          width="160">
      </el-table-column>
      <el-table-column
          prop="address"
          label="待审商品"
          width="160">
      </el-table-column>
    </el-table>
  </el-card>
  <div>
    <h2>图表</h2>
    <el-row :gutter="20">
      <el-col :span="14">
        <el-card class="box-card">
          <div ref="barChartRef" class="chart"></div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card class="box-bord">
          <div ref="pieChartRef" class="chart"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>

  <div>
    <h2>待审核</h2>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
<!--          <span style="font-weight: bold">待审核店铺<text style="color: red">({{totalShopsCount.length}})</text></span>-->
          <el-table :data="pendingShops" >
            <el-table-column prop="name" label="店铺名称"/>
            <el-table-column prop="owner" label="店主"/>
            <el-table-column prop="applyTime" label="申请时间"/>
            <el-table-column  label="操作">
              <template #default="{row}">
                <el-button type="danger" size="small" @click="rejectShop(row)">拒绝</el-button>
                <el-button type="primary" size="small" @click="approveShop(row)">通过</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-link type="primary" @click="goToProductAudit">查看更多</el-link>
        </el-card>
      </el-col>
        <el-col :span="12">
          <el-card class="box-card">
<!--            <span style="font-weight: bold">待审核商品<text style="color: red">({{totalGoodsCount.length}})</text></span>-->
            <el-table :data="pendingGoods" >
              <el-table-column prop="name" label="商品名称"/>
              <el-table-column prop="owner" label="所属店铺"/>
              <el-table-column prop="price" label="价格">
                <template #default="{row}">
                  ￥{{row.price}}
                </template>
              </el-table-column>
            </el-table>
            <el-link type="primary" @click="goToProductAudit">查看更多</el-link>
          </el-card>
        </el-col>
      </el-row>
  </div>

</template>

<script setup>
import {ref, onMounted, computed} from 'vue'
import * as echarts from 'echarts'
const barChartRef=ref(null);
const pieChartRef=ref(null);
const fetchPendingShops = async ()=>{
  const res=await request.get('/api/admin/shop/audit',{params:{limit:3}});
  pendingShops.value=res.data;
  totalShopsCount.value=res.total;
}
const fetchPendingGoods =async ()=>{
  const res=await request.get('/api/admin/product/audit',{params: {limit:3}});
  pendingGoods.value=res.data;
  totalGoodsCount.value=res.total;
}
onMounted(()=>{
//  初始化柱状图
  const barChart=echarts.init(barChartRef.value)
  barChart.setOption({
  //  柱状图配置
    title:{
      text:'近一周销售额趋势',
      left:'center',
      top:0,
      textStyle: { fontSize: 14, fontWeight: 'normal' }
    },
    xAxis:{
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value',
      name: '销售额 (元)',
      axisLabel: {              // 刻度标签
        formatter: '¥{value}'   // 格式化：在数值前加 ¥
      },
    },
    series:[
      {
        name: '销售额',
        type: 'bar',
        data: [12500, 14200, 13800, 16800, 21000, 24500, 19800],
        itemStyle: {
          borderRadius: [4, 4, 0, 0],  // 柱状图圆角
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#409EFF' },
              { offset: 1, color: '#79bbff' }
            ]
          }
        },
      },
      {
        name: '趋势',
        type: 'line',
        data: [12500, 14200, 13800, 16800, 21000, 24500, 19800],
        smooth:true
      }
    ]
  })
  //  初始化饼图
  const pieChart=echarts.init(pieChartRef.value)
  pieChart.setOption({
    //  饼图配置
    title: { text: '商品分类占比', left: 'center', top: 0 },
    tooltip: { trigger: 'item', formatter: '{b}: {d}%' },
    legend: { orient: 'vertical', left: 'left', top: 'center' },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '55%'],
      data: [
        { name: '电子产品', value: 35, itemStyle: { color: '#409EFF' } },
        { name: '服装鞋包', value: 25, itemStyle: { color: '#67C23A' } },
        { name: '家居生活', value: 20, itemStyle: { color: '#E6A23C' } },
        { name: '美妆护肤', value: 12, itemStyle: { color: '#F56C6C' } },
        { name: '食品生鲜', value: 8, itemStyle: { color: '#909399' } }
      ]
    }]
  })
  window.addEventListener('resize',()=>{
    barChart.resize()
    pieChart.resize()
  })
})
</script>

<style scoped>
.chart{
  /*width:100%;*/
  height: 350px;
}
el-col{

}
</style>