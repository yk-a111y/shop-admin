<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <AppMenu />
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <!-- 子路由出口 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import AppMenu from './components/AppMenu.vue'
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
}
.el-aside {
  background-color: #304156;
  color: #333;
}
.el-header {
  background-color: #B3C0D1;
  color: #333;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
}
</style>
