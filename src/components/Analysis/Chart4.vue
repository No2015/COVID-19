<script setup lang="ts">
import { ref, onMounted } from 'vue'
import echarts from 'echarts'

const props = defineProps({
  data: { 
    type: Object, 
    default: () => (null)
  },
})

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
