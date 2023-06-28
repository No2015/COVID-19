<script setup lang="ts">
import { ref } from 'vue';
import { showToast, showFailToast } from 'vant';
import Chart1 from '../components/Analysis/Chart1.vue'
import Chart2 from '../components/Analysis/Chart2.vue'
import Chart3 from '../components/Analysis/Chart3.vue'
import Chart4 from '../components/Analysis/Chart4.vue'
import Chart5 from '../components/Analysis/Chart5.vue'
import axios from 'axios'

const data = ref<any>({})
const getAnalysis = () => {
  axios.post('http://cqwphp.com/Covid19/analysis', {}).then((res: any) => {
    if (res.data.ok) {
      data.value = res.data.data
    } else {
      showFailToast(res.data.message);
    }
  }).catch(() => {
    showToast('系统错误');
  })
};
getAnalysis()
</script>

<template>
  <div class="page-box">
    <h1 style="margin-bottom: 1rem;">新冠后遗症调查数据分析</h1>
    <div class="form-box">
      <div class="unit-box">
        <div class="unit-title">感染人群分析</div>
        <Chart1 :data="data"></Chart1>
      </div>
      <div class="unit-box">
        <div class="unit-title">感染次数分析</div>
        <Chart2 :data="data"></Chart2>
      </div>
      <div class="unit-box">
        <div class="unit-title">感染状况分析</div>
        <Chart3 :data="data"></Chart3>
      </div>
      <div class="unit-box">
        <div class="unit-title">后遗症人群分析</div>
        <Chart4 :data="data"></Chart4>
      </div>
      <div class="unit-box">
        <div class="unit-title">后遗症状况分析</div>
        <Chart5 :data="data"></Chart5>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.unit-box {
  margin: 20px 0;
}
.unit-title {
  text-align: left;
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 1;
  padding-left: 10px;
  border-left: 2px solid #ff5a0c;
  border-radius: 2px;
  font-weight: 600;
}
.unit-echarts {
  height: 200px;
}
.page-box {
  height: calc(100% + 20px);
  overflow: hidden;
}
.form-box {
  height: calc(100% - 40px);
  font-size: 14px;
  overflow: auto;
}
</style>
