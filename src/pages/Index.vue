<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRoute,useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { showToast, showLoadingToast, showSuccessToast, showFailToast } from 'vant';
import GRCS from '../components/Index/GRCS.vue';
import GR from '../components/Index/GR.vue';
import HYZ from '../components/Index/HYZ.vue';
import ZWPG from '../components/Index/ZWPG.vue';
import USERNAME from '../components/Index/USERNAME.vue';
import AREA from '../components/Index/AREA.vue';
import T1 from '../components/Index/T1.vue';
import OTHER from '../components/Index/OTHER.vue';
import XB from '../components/Index/XB.vue';
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const store = useStore()

console.log(route)
console.log(router)
console.log(store)
if (store.state.isWrite) {
  router.push('/list')
}

const onSubmit = (values: any) => {
  // console.log('submit', values);
  if (store.state.isWrite) {
    showToast('您已经提交了哦~');
    setTimeout(() => {
      router.push('/list')
    }, 1e3);
    return false
  }
  if (!values.gr) {
    showToast('问卷还没填写哦~');
    return false
  }
  showLoadingToast({
    message: '提交中...',
    forbidClick: true,
    duration: 0,
  });
  axios.post('http://cqwphp.com/Covid19/add', values).then((res: any) => {
    if (res.data.ok) {
      showSuccessToast(res.data.data);
      store.commit('setIsWtite', 1)
    } else {
      showFailToast(res.data.data);
      setTimeout(() => {
        router.push('/list')
      }, 1e3);
    }
  }).catch(() => {
    showToast('系统错误');
  })
};

type Fd = {
  [ket: string]: any
}
const onChange = (value: string, key: string) => {
  fd[key] = value
}
const fd: Fd = reactive({
  gr: '',
  hyz: '',
  grcs: '',
  zwpg: '',
  username: '',
  area: '',
  other: '',
  xb: '',
})

const hyzList = ref([
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
])
</script>

<template>
  <div class="page-box">
    <h1 style="margin-bottom: 1rem;">新冠后遗症调查问卷</h1>
    <router-link class="to-link" to="/list">提交记录</router-link>
    <div class="form-box">
      <van-form @submit="onSubmit">
        <div class="list-box">
          <GR v-model:value="fd.gr" @change="onChange($event, 'gr')"></GR>
          <template v-if="fd.gr === '1'">
            <GRCS v-model:value="fd.grcs"></GRCS>
            <ZWPG v-model:value="fd.zwpg"></ZWPG>
            <HYZ v-model:value="fd.hyz" @change="onChange($event, 'hyz')"></HYZ>
            <template v-if="fd.hyz === '1'">
              <div class="msg-title">长期有以下症状请勾选：</div>
              <T1 v-for="(item, key) in hyzList" :key="key" v-model:value="item.value" :name="item.name" :label="(key + 1 ) + '、' + item.label"></T1>
              <OTHER v-model:value="fd.other"></OTHER>
            </template>
          </template>
          <template v-if="fd.gr !== ''">
            <XB v-model:value="fd.xb" @change="onChange($event, 'xb')"></XB>
            <USERNAME v-model:value="fd.username" @change="onChange($event, 'username')"></USERNAME>
            <AREA v-model:value="fd.area" @change="onChange($event, 'area')"></AREA>
          </template>
        </div>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
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
.to-link {
  position: absolute;
  right: 10px;
  font-size: 12px;
  top: 10px;
  color: #ff5a0c
}
</style>
