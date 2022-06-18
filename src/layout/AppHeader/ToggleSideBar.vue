<template>
  <el-icon
    v-if="$store.state.isCollapse"
    @click="handlerCollapse"
  >
    <Expand />
  </el-icon>
  <el-icon
    v-else
    @click="handlerCollapse"
  >
    <Fold />
  </el-icon>
</template>

<script lang="ts" setup>
import { store } from '@/store'
import { Expand, Fold } from '@element-plus/icons'

const handlerCollapse = () => {
  store.commit('setIsCollapse', !store.state.isCollapse)
}
</script>

<style lang="scss" scoped>
.el-icon {
  width: 30px;
  height: 30px;
}
</style>
