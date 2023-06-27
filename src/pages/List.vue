<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRoute,useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { showToast, showLoadingToast, showSuccessToast, showFailToast } from 'vant';
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const store = useStore()

console.log(route)
console.log(router)
console.log(store)

const getList = () => {
  axios.post('https://xinwucun.cn/Covid19/list', {}).then((res: any) => {
    if (res.data.ok) {
      list.value = res.data.data
    } else {
      showFailToast(res.data.data);
    }
  }).catch(() => {
    showToast('系统错误');
  })
};

const list = ref([])
</script>

<template>
  <div class="page-box">
    <h1 style="margin-bottom: 1rem;">新冠后遗症调查列表</h1>
    <div class="form-box">
      
    </div>
  </div>
</template>

<style scoped>
.page-box {
  height: 100%;
  overflow: hidden;
}
.form-box {
  height: calc(100% - 20px);
}
.list-box {
  /* height: calc(100% - 20px); */
  /* overflow: auto; */
}
.van-form {
  height: 100%;
  overflow: auto;
}
.msg-title {
  text-align: left;
  color: rgb(241, 21, 21);
  font-size: 0.875rem;
  padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
}
</style>
