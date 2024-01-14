<script setup>
import { useUserStore } from '@/store/modules/user'
import axios from 'axios'
const userStore = useUserStore()
// const { count, name } = useStore()
// 直接通过解构的方式获取state中的值是非响应式的！
// 这就意味着后面在对 store 中的值进行修改之后，页面不会发生变化。
// const { count, name } = storeToRefs(useUserStore())
const count = computed(() => userStore.count)
const name = computed(() => userStore.name)
const double = computed(() => userStore.double)
const nickName = computed(() => userStore.nickName)
const otherGetter = computed(() => userStore.otherGetter)

// 同步修改store中的值
const handleChangeStore1 = () => {
  console.log('userStore', userStore)
  userStore.increment()
  // userStore.count++
}

// 异步修改store中的值
const handleChangeStore2 = () => {
  userStore.incrementAsync()
}

// 通过调用store的$reset()方法将state重置为初始值。
const reset = () => {
  userStore.$reset()
}

// 发起请求
const getData = () => {
  axios.get('/mock/getMapInfo').then((res) => {
    console.log('res', res)
  })
}

getData()
</script>

<template>
  <div>
    <a-button @click="handleChangeStore1">同步</a-button>
    <a-button type="primary" @click="handleChangeStore2">异步</a-button>
    <a-button type="primary" @click="reset">重置</a-button>
    <svg-icon icon-class="logo" />
    <p>count: {{ count }}</p>
    <p>double: {{ double }}</p>
    <p>name: {{ name }}</p>
    <p>nickName: {{ nickName }}</p>
    <p>otherGetter: {{ otherGetter }}</p>
  </div>
</template>

<style scoped></style>
