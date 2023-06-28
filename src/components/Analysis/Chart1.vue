<script setup lang="ts">
import { ref, onMounted, watch, toRef } from 'vue'
import echarts from 'echarts'

const props = defineProps({
  data: { 
    type: Object, 
    default: () => (null)
  },
})
const data = toRef(props.data)
const chart = ref(null)
const initEcharts = () => {
  console.log(chart.value)
  console.log(data.value)
}

onMounted(() => {
  if (data) {
    initEcharts()
  }
})

watch(data, () => {
  if (data.value) {
    initEcharts()
  }  
}, {
  deep: true,
})
</script>

<template>
  <div class="unit-echarts" ref="chart"></div>
</template>

<style scoped>
</style>
