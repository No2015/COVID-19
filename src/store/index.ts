import { createStore } from 'vuex';

const isWrite = window.localStorage.getItem('isWrite') || ''

export default createStore({
  state: {
    isWrite,
  },
  mutations: {
    setIsWtite(state, params) {
      window.localStorage.setItem('isWrite', params)
      state.isWrite = params
    }
  },
  actions: {},
  modules: {}
});
