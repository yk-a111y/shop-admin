<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <span>{{ $store.state.user?.account }}</span>
      <el-icon>
        <ArrowDown />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item @click="handleOut">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { logout } from '@/api/user'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'

const router = useRouter()
const store = useStore()

// 退出登录
const handleOut = async () => {
  // 1. 退出提示
  ElMessageBox.confirm('确认退出吗?', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    // 2. 确认发出退出请求
    await logout()
    // 3. 路由跳转
    router.push({
      name: 'login'
    })
    ElMessage({
      type: 'success',
      message: '退出成功'
    })
    // 4. 清除用户信息
    store.commit('setUser', null)
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消退出'
    })
  })
}
</script>

<style scoped lang="scss">
.el-dropdown-link {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  span {
    margin-right: 5px;
  }
}
</style>
