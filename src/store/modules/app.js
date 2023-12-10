import { defineStore } from 'pinia'
export const useAppStore = defineStore({
  id: 'app',
  state: () => {
    return {
      count: 10
    }
  },
  getters: {},
  actions: {}
})
