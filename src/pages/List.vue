<script setup lang="ts">
import { ref } from 'vue';
import { useRoute,useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { showToast, showFailToast } from 'vant';
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const store = useStore()

console.log(route)
console.log(router)
console.log(store)

const pages = {
  page: 0,
  pageSize: 20,
  count: 0,
}
type Item = {
  id: number,
  gr: string,
  grcs: string,
  hyz: string,
  addtime: string,
  other: string,
  area: string,
  username: string,
  zwpg: string,
  t1: string,
  t2: string,
  t3: string,
  t4: string,
  t5: string,
  t6: string,
  t7: string,
  t8: string,
  t9: string,
  t10: string,
  t11: string,
  t12: string,
}
type List = Array<Item>
type Enums = {
  [key: string]: any
}
const list = ref<List>([])

const enums: Enums = {
  grcs: {
    '1': '1',
    '2': '2',
    '3': '多',
  },
  hyz: {
    '1': '有',
    '2': '无',
  },
}

const hyzList = [
  {
    name: 't1',
    value: false,
    label: '乏力或疲倦'
  },
  {
    name: 't2',
    value: false,
    label: '思维障碍或不能集中精力'
  },
  {
    name: 't3',
    value: false,
    label: '呼吸急促或困难'
  },
  {
    name: 't4',
    value: false,
    label: '头痛'
  },
  {
    name: 't5',
    value: false,
    label: '头晕'
  },
  {
    name: 't6',
    value: false,
    label: '心跳加速'
  },
  {
    name: 't7',
    value: false,
    label: '胸口疼痛'
  },
  {
    name: 't8',
    value: false,
    label: '咳嗽'
  },
  {
    name: 't9',
    value: false,
    label: '关节或肌肉疼痛'
  },
  {
    name: 't10',
    value: false,
    label: '抑郁或焦虑'
  },
  {
    name: 't11',
    value: false,
    label: '发热'
  },
  {
    name: 't12',
    value: false,
    label: '嗅觉或味觉丧失'
  },
]

const getList = () => {
  axios.post('http://cqwphp.com/Covid19/list', pages).then((res: any) => {
    if (res.data.ok) {
      list.value = res.data.list
      pages.count = res.data.page.count
    } else {
      showFailToast(res.data.message);
    }
  }).catch(() => {
    showToast('系统错误');
  })
};

getList()
</script>

<template>
  <div class="page-box">
    <h1 style="margin-bottom: 1rem;">新冠后遗症调查列表</h1>
    <div class="form-box">
      <div class="flex fxsb th">
        <div class="td-1">序号</div>
        <div class="td-2">感染次数</div>
        <div class="td-3">后遗症</div>
        <div class="td-4">提交时间</div>
      </div>
      <div class="list-box">
        <div class="flex fxsb tr" v-for="(item, key) in list" :key="key">
          <div class="td-1">{{ key + 1 }}</div>
          <div class="td-2">{{ item.gr == '2' ? 0 : enums.grcs[item.grcs] }}次</div>
          <div class="td-3">{{ item.gr == '2' ? '-' : enums.hyz[item.hyz] }}</div>
          <div class="td-4">{{ item.addtime }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-box {
  height: 100%;
  overflow: hidden;
}
.form-box {
  height: calc(100% - 20px);
  font-size: 14px;
  .th {
    color: #070505;
    padding: 6px 0;
  }
  .tr {
    color: #706e6e;
    padding: 8px 0;
  }
  .td-1 {
    width: 30px;
    text-align: center;
  }
  .td-2 {
    width: 60px;
    text-align: center;
  }
  .td-3 {
    width: 60px;
    text-align: center;
  }
  .td-4 {
    white-space: nowrap;
    width: 140px;
    text-align: right;
  }
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
