<script setup lang="ts">
import { ref } from 'vue'
const $emit = defineEmits(['change', 'input'])

const props = defineProps({
  value: { 
    type: String, 
    default: ''
  },
})

const checked = ref(props.value)
const onChange = (val: string) => {
  $emit('change', val)
  $emit('input', val)
}
</script>

<template>
  <van-field name="grcs" label="感染次数">
    <template #input>
      <van-radio-group v-model="checked" @change="onChange" direction="horizontal">
        <van-radio name="1">1次</van-radio>
        <van-radio name="2">2次</van-radio>
        <van-radio name="3">多次</van-radio>
      </van-radio-group>
    </template>
  </van-field>
</template>

<style scoped>
</style>
