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
  <van-field name="zwpg" label="自我评估">
    <template #input>
      <van-radio-group v-model="checked" @change="onChange" direction="horizontal">
        <van-radio name="1">轻微</van-radio>
        <van-radio name="2">一般</van-radio>
        <van-radio name="3">严重</van-radio>
      </van-radio-group>
    </template>
  </van-field>
</template>

<style scoped>
</style>
