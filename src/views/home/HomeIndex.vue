<template>
  <h1>首页</h1>
  <p>{{ store.state.count }}</p>
  <el-button>测试按钮</el-button>
</template>

<script lang="ts" setup>
import { store } from '@/store'
import { getLoginInfo } from '@/api/user'
import { onMounted, ref } from 'vue'
import type { ILoginInfo } from '@/api/types/common'

const list = ref<ILoginInfo['slide']>([])

onMounted(() => {
  getLoginInfo().then(data => {
    console.log(data.logo_rectangle)
    list.value = data.slide
    console.log(list.value)
  })
})

</script>

<style lang="scss" scoped>
</style>
