<template>
  <div>
    <a-button type="primary">11112222333331</a-button>
    <a-row>成舟</a-row>
    <a-button @click="handle">11111111111</a-button>
  </div>
</template>

<script setup>
// message 不是一个Vue组件，而是一个函数，因此无法通过 unplugin-vue-components 自动按需引入。
// 需要手动引入,不引入的话，ReferenceError: message is not defined
import { message } from 'ant-design-vue'

const handle = () => {
  message.success('This is a success message')
}
</script>

<style lang="scss" scoped></style>
