<template>
  <el-space
    size="large"
    class="left"
  >
    <ToggleSideBar />
    <BreadCrumb />
  </el-space>
  <el-space class="right">
    <UserInfo />
    <FullScreen />
  </el-space>
</template>

<script setup lang="ts">
import ToggleSideBar from './ToggleSideBar.vue'
import BreadCrumb from './BreadCrumb.vue'
import FullScreen from './FullScreen.vue'
import UserInfo from './UserInfo.vue'

</script>

<style scoped lang="scss">
i {
  font-size: 19px;
  cursor: pointer;
}
.left, .right{
  float: left;
  height: 100%;
}
.right {
  float: right;
}
</style>
