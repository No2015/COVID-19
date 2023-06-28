<template>
  <van-field
    v-model="username"
    name="username"
    label="联系方式"
    placeholder="手机号/微信/QQ/邮箱等"
    @change="onChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const $emit = defineEmits(['change', 'input'])

const props = defineProps({
  value: { 
    type: String, 
    default: ''
  },
})

const username = ref(props.value)
const onChange = (val: string) => {
  $emit('change', val)
  $emit('input', val)
}
</script>

<style scoped>
</style>
