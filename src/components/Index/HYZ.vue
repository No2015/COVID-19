<template>
  <van-field name="hyz" label="是否有后遗症">
    <template #input>
      <van-radio-group v-model="checked" @change="onChange" direction="horizontal">
        <van-radio name="1">是</van-radio>
        <van-radio name="2">否</van-radio>
      </van-radio-group>
    </template>
  </van-field>
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

const checked = ref(props.value)
const onChange = (val: string) => {
  $emit('change', val)
  $emit('input', val)
}
</script>

<style scoped>
</style>
