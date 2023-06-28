<script setup lang="ts">
import { ref, onMounted } from 'vue'
import echarts from 'echarts'

const props = defineProps({
  data: { 
    type: Object, 
    default: () => (null)
  },
})
const hyzList = [
  {
    name: 't1',
    value: false,
    label: '乏力或疲倦'
  },
  {
    name: 't2',
    value: false,
    label: '思维障碍或不能集中精力'
  },
  {
    name: 't3',
    value: false,
    label: '呼吸急促或困难'
  },
  {
    name: 't4',
    value: false,
    label: '头痛'
  },
  {
    name: 't5',
    value: false,
    label: '头晕'
  },
  {
    name: 't6',
    value: false,
    label: '心跳加速'
  },
  {
    name: 't7',
    value: false,
    label: '胸口疼痛'
  },
  {
    name: 't8',
    value: false,
    label: '咳嗽'
  },
  {
    name: 't9',
    value: false,
    label: '关节或肌肉疼痛'
  },
  {
    name: 't10',
    value: false,
    label: '抑郁或焦虑'
  },
  {
    name: 't11',
    value: false,
    label: '发热'
  },
  {
    name: 't12',
    value: false,
    label: '嗅觉或味觉丧失'
  },
]
const chart = ref(null)
onMounted(() => {
  if (props.data) {
    initEcharts()
  }
})
const initEcharts = () => {
  console.log(chart.value)
}
</script>

<template>
  <div class="unit-echarts" ref="chart"></div>
</template>

<style scoped>
</style>
