<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <AppMenu />
      </el-aside>
      <el-container>
        <el-header>
          <AppHeader />
        </el-header>
        <el-main>
          <!-- 子路由出口 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import AppMenu from './AppMenu/AppMenu.vue'
import AppHeader from './AppHeader/AppHeader.vue'
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
}
.el-aside {
  width: auto;
  background-color: #304156;
  color: #333;
}
.el-header {
  height: 40px;
  background-color: #B3C0D1;
  color: #333;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
}
</style>
