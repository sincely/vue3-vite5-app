import { defineStore } from 'pinia'
import { useAppStore } from './app'
// 定义store, user是store的名称，该名称必须唯一，不可重复
// options模式
export const useUserStore = defineStore({
  // id必须唯一，不可重复
  id: 'user',
  // 需要通过函数的方式定义state，
  state: () => {
    return {
      count: 1,
      name: '成舟'
    }
  },
  // getters
  getters: {
    nickName(state) {
      return state.name + '测试'
    },
    double(state) {
      return state.count * 2
    },
    // 访问其他 getter
    otherGetter(state) {
      const otherStore = useAppStore()
      return state.count + otherStore.count
    }
  },
  // 可以直接通过this来访问state中的属性
  // Action也可通过this访问整个Store的实例Action也可以是异步的，还可以访问其他Store的Action。
  actions: {
    // 同步
    increment() {
      this.count++
    },
    // 异步
    incrementAsync() {
      setTimeout(() => {
        this.count++
      }, 1000)
    }
  },
  persist: true // 是否持久化 默认为false 不持久化,采用默认配置

  // 使用 localStorage 进行存储
  // store.$id 作为 storage 默认的 key
  // 使用 JSON.stringify/JSON.parse 进行序列化/反序列化
  // 整个 state 默认将被持久化
  // 如何你不想使用默认的配置，那么你可以将一个对象传递给Store的persist属性来配置持久化。

  // persist: {
  //   // 在这里进行自定义配置
  //   // 这个 Store 将被持久化存储在 localStorage 中的 my-custom-key key 中。
  //   key: 'my-custom-key',
  //   // 这个 Store 将被持久化存储在 sessionStorage 中。
  //   storage: sessionStorage,
  //   // 这个 Store 将只有 save.me 和 saveMeToo 被持久化。
  //   paths: ['count'],
  //   beforeRestore: (ctx) => {
  //     console.log(`about to restore '${ctx.store.$id}'`)
  //   },
  //   afterRestore: (ctx) => {
  //     console.log(`just restored '${ctx.store.$id}'`)
  //   },
  //   debug: true
  // }
})

// Setup 模式
// import { defineStore } from 'pinia'
// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   function increment() {
//     count.value++
//   }
//   return { count, increment }
// })
