<template>
  <el-card class="box-card" style="display: flex;justify-content: center">
    <div class="statCard " style="background: #f85ca9;">
      <span>商品总数</span>
      <p>{{ statistics.productCount }}</p>
    </div>
    <div class="statCard "  style="background: #94faeb;">
      <span>订单总数</span>
      <p>{{ statistics.orderCount }}</p>
    </div>
    <div class="statCard "  style="background: #fcaf99;">
      <span>今日收入</span>
      <p>{{ statistics.todayIncome }}</p>
    </div>
    <div class="statCard "  style="background: #67b3fd;">
      <span>会员数</span>
      <p>{{ statistics.memberCount }}</p>
    </div>
  </el-card>
  <el-card class="box-card">
    <h2>最近订单</h2>
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          prop="storesCount"
          label="用户数"
          width="160">
      </el-table-column>
      <el-table-column
          prop="name"
          label="商品"
          width="160">
      </el-table-column>
      <el-table-column
          prop="money"
          label="金额"
          width="160">
      </el-table-column>
      <el-table-column
          prop="status"
          label="状态"
          width="160">
      </el-table-column>
      <el-table-column
          prop="address"
          label="操作"
          width="160">
        <button v-if="isShipping" >查看</button>
        <button v-else >处理</button>
      </el-table-column>
    </el-table>
  </el-card>
  <el-card class="box-card">
    <div ref="barChartRef" class="chart"></div>
  </el-card>

</template>

<script setup>
import {ref, onMounted, computed, reactive} from 'vue'
import * as echarts from 'echarts'

const statistics=ref({
  productCount: 0,
  orderCount: 0,
  todayIncome: 0,
  memberCount: 0
})
const barChartRef=ref(null);
const isShipping=ref(false);
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
  window.addEventListener('resize',()=>{
    barChart.resize()
  })
})
</script>

<style scoped>
.statCard{
  margin: 10px;
  width: 150px;
  height: 80px;
  float: left;
  text-align: center;
  border-radius: 10px;
  color: white;
}
.statCard span{
  border-bottom: 1px solid white;
}
.chart{
  /*width:100%;*/
  height: 350px;
}
el-col{

}
</style>