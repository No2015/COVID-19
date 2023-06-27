<script setup lang="ts">
import { ref } from 'vue'
const $emit = defineEmits(['change', 'input'])

const props = defineProps({
  value: { 
    type: String, 
    default: ''
  },
})

const other = ref(props.value)
const onChange = (val: string) => {
  $emit('change', val)
  $emit('input', val)
}
</script>

<template>
  <van-field
    v-model="other"
    name="other"
    type="textarea"
    label="其他症状"
    placeholder="请填写"
    @change="onChange"
  />
</template>

<style scoped>
</style>
