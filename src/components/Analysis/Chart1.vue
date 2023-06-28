<template>
  <div class="unit-echarts" ref="chart"></div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  data: { 
    type: Object, 
    default: () => ({})
  },
})
const chart = ref<HTMLElement|null>(null)
let charts: any = null

const initEcharts = () => {

  const value1 = props.data.num_gr_0
  const value2 = props.data.num_gr_1 + props.data.num_gr_2 + props.data.num_gr_3

  const option = {
    color: ['#DE442C', '#F7CE6F', '#FF9214', '#C6CACD', '#BDE566', '#CC963D', '#F2B726'],
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '0'
    },
    series: [
      {
        name: '感染人群分析',
        type: 'pie',
        center: ['50%', '55%'],
        radius: '50%',
        data: [
          { value: value2, name: '感染' },
          { value: value1, name: '未感染' },
        ],
        label: {
            normal: {
                formatter: function(params: any) {
                  return `${params.name}  ${params.value}(人)`
                },
            },
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  if (!charts && chart.value) {
    charts = echarts.init(chart.value)
  }
  charts.setOption(option)
}
watch(props, () => {
  if (chart.value) {
    initEcharts()
  }  
}, {
  deep: true,
  immediate: true
})
</script>

<style scoped>
</style>
