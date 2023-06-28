<script setup lang="ts">
import { ref, watch, toRef } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  data: { 
    type: Object, 
    default: () => ({})
  },
})
const chart = ref<HTMLElement|null>(null)
let charts: any = null
const hyzList = [
  {
    name: 't_1',
    label: '乏力或疲倦'
  },
  {
    name: 't_2',
    label: '思维障碍或不能集中精力'
  },
  {
    name: 't_3',
    label: '呼吸急促或困难'
  },
  {
    name: 't_4',
    label: '头痛'
  },
  {
    name: 't_5',
    label: '头晕'
  },
  {
    name: 't_6',
    label: '心跳加速'
  },
  {
    name: 't_7',
    label: '胸口疼痛'
  },
  {
    name: 't_8',
    label: '咳嗽'
  },
  {
    name: 't_9',
    label: '关节或肌肉疼痛'
  },
  {
    name: 't_10',
    label: '抑郁或焦虑'
  },
  {
    name: 't_11',
    label: '发热'
  },
  {
    name: 't_12',
    label: '嗅觉或味觉丧失'
  },
  {
    name: 't_other',
    label: '其他'
  },
]
const initEcharts = () => {
  
  const option = {
    color: ['#DE442C', '#F7CE6F', '#FF9214', '#C6CACD', '#BDE566', '#CC963D', '#F2B726', '#DE442C88', '#F7CE6F88', '#FF921488', '#C6CACD88', '#BDE56688', '#CC963D88', '#F2B72688'],
    tooltip: {
      trigger: 'item'
    },
    // legend: {
    //   top: '0'
    // },
    series: [
      {
        name: '后遗症状况分析',
        type: 'pie',
        center: ['50%', '55%'],
        radius: '50%',
        data: hyzList.map(el => {
          return {
            value: props.data['num_' + el.name],
            name: el.label
          }
        }),
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
    ],
  };
  if (!charts && chart.value) {
    charts = echarts.init(chart.value)
  }
  console.log('>>>', option)
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

<template>
  <div class="unit-echarts" ref="chart"></div>
</template>

<style scoped>
</style>
