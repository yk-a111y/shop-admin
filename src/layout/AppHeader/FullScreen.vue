<template>
  <el-icon @click="taggleFullScreen">
    <FullScreen />
  </el-icon>
</template>

<script setup lang="ts">
import { FullScreen } from '@element-plus/icons-vue'

const taggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}
</script>

<style scoped lang="scss">

</style>
