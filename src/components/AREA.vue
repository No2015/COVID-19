<script setup lang="ts">
import { ref } from 'vue'
import { areaList } from '@vant/area-data';

const props = defineProps({
  value: { 
    type: String, 
    default: ''
  },
})

const result = ref(props.value);
const showArea = ref(false);
const onConfirm = (res: any) => {
  const { selectedOptions } = res
  showArea.value = false;
  result.value = selectedOptions.map((item: any) => item.text).join('/');
};
</script>

<template>
  <van-field
    v-model="result"
    is-link
    readonly
    name="area"
    label="所在地区"
    placeholder="点击选择省市区"
    @click="showArea = true"
  />
  <van-popup v-model:show="showArea" position="bottom">
    <van-area
      :area-list="areaList"
      @confirm="onConfirm"
      @cancel="showArea = false"
    />
  </van-popup>
</template>

<style scoped>
</style>
