<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  value: { 
    type: Boolean, 
    default: false
  },
  name: { 
    type: String, 
    default: ''
  },
  label: { 
    type: String, 
    default: ''
  },
})

const checked = ref(props.value)
</script>

<template>
  <van-field :name="name" :label="label">
    <template #input>
      <van-checkbox v-model="checked" shape="square" />
    </template>
  </van-field>
</template>

<style scoped>
</style>
