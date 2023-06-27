<script setup lang="ts">
import { ref, computed } from 'vue';
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
  page: -1,
  pageSize: 20,
  count: 0,
}
type Item = {
  [key: string]: any,
  id: number,
  gr: string,
  grcs: string,
  hyz: string,
  other: string,
  area: string,
  username: string,
  zwpg: string,
  t1: number,
  t2: number,
  t3: number,
  t4: number,
  t5: number,
  t6: number,
  t7: number,
  t8: number,
  t9: number,
  t10: number,
  t11: number,
  t12: number,
  status: number,
  addtime: string,
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
  zwpg: {
    '1': '轻微',
    '2': '一般',
    '3': '严重',
  }
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
      list.value = list.value.concat(res.data.list)
      pages.count = res.data.page.count
    } else {
      showFailToast(res.data.message);
    }
    refreshing.value = false;
    loading.value = false;
    if (list.value.length >= pages.count) {
      finished.value = true;
    }
  }).catch(() => {
    showToast('系统错误');
  })
};

const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const onRefresh = () => {

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};
const onLoad = () => {
  if (!finished.value) {
    pages.page ++
    getList()
  } else {
    refreshing.value = false;
    loading.value = false;
  }
};

const onDetail = (item: Item, index: number) => {
  showItem.value = item
  showIndex.value = index
  show.value = true
}
const show = ref(false)
const showIndex = ref(0)
const showItem = ref<Item>()
const getHyz = computed(() => {
  const hyz:Array<string> = []
  hyzList.forEach(el => {
    if (showItem.value && showItem.value[el.name]) {
      hyz.push(el.label)
    }
  })
  if (showItem.value?.other) {
    hyz.push(showItem.value?.other)
  }
  return hyz.join('、')
})
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
        <div class="td-5">操作</div>
      </div>
      <div class="list-box">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
          <div class="flex fxsb tr" v-for="(item, key) in list" :key="key">
            <div class="td-1">{{ key + 1 }}</div>
            <div class="td-2">{{ item.gr == '2' ? 0 : enums.grcs[item.grcs] }}次</div>
            <div class="td-3">{{ item.gr == '2' ? '-' : enums.hyz[item.hyz] }}</div>
            <div class="td-4">{{ item.addtime }}</div>
            <div class="td-5 btn-a" @click="onDetail(item, key)">详情</div>
          </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
  <van-popup
    v-model:show="show"
    closeable
    close-icon="close"
    position="bottom"
    :style="{ height: '50%', background: 'rgb(247,248,250)' }"
  >
    <div class="show-box">
      <div class="show-title">序号{{ showIndex + 1 }}</div>
      <van-cell-group>
        <!-- <van-cell title="是否感染新冠" :value="showItem?.gr === '1' ? '是' : '否'" /> -->
        <van-cell title="感染次数" :value="(showItem?.gr === '1' ? showItem?.grcs : 0) + '次'" />
        <van-cell title="感染程度" :value="showItem?.zwpg ? enums.zwpg[showItem?.zwpg] : '--'" />
        <van-cell center title="后遗症" :value="showItem?.hyz ? getHyz : '--'" />
        <van-cell center title="所在区域" :value="showItem?.area ? showItem?.area : '--'" />
        <van-cell center title="提交时间" :value="showItem?.addtime ? showItem?.addtime : '--'" />
      </van-cell-group>
    </div>
  </van-popup>
</template>

<style scoped lang="scss">
.page-box {
  height: calc(100% + 20px);
  overflow: hidden;
}
.form-box {
  height: calc(100% - 40px);
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
    width: 50px;
    text-align: center;
  }
  .td-4 {
    white-space: nowrap;
    width: 140px;
    text-align: center;
  }
  .td-5 {
    width: 40px;
    text-align: right;
  }
  .btn-a {
    cursor: pointer;
    color: rgb(11, 146, 224);
  }
}
.list-box {
  height: calc(100% - 20px);
  overflow: auto;
}
.show-box {
  text-align: left;
  padding: 20px 0 0;
  .show-title {
    padding: 0 20px 5px;
    font-weight: 600;
  }
}
</style>
