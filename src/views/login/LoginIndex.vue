<template>
  <div class="login-container">
    <el-form
      class="login-form"
      ref="form"
      :rules="rules"
      @submit.prevent="handleSubmit"
    >
      <div class="login-form__header">
        <img
          class="login-logo"
          src="@/assets/logo.png"
          alt="拉勾心选"
        >
      </div>
      <!-- 用户名 -->
      <el-form-item prop="account">
        <el-input
          v-model="user.account"
          placeholder="请输入用户名"
        >
          <template #prefix>
            <el-icon>
              <User />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="pwd">
        <el-input
          v-model="user.pwd"
          placeholder="请输入密码"
          type="password"
        >
          <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item prop="imgcode">
        <div class="imgcode-wrap">
          <el-input
            v-model="user.imgcode"
            placeholder="请输入验证码"
          >
            <template #prefix>
              <el-icon><Key /></el-icon>
            </template>
          </el-input>
          <img
            class="imgcode"
            alt="验证码"
            :src="captchaSrc"
            @click="loadCaptcha"
          >
        </div>
      </el-form-item>
      <!-- 提交按钮 -->
      <el-form-item>
        <el-button
          class="submit-button"
          type="primary"
          :loading="loading"
          native-type="submit"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { User, Lock, Key } from '@element-plus/icons-vue'
import { onMounted, reactive, ref } from 'vue'
import { getCaptcha, login } from '@/api/user'
import type { IElForm, IFormRule } from '@/types/element-plus'
import { useRouter, useRoute } from 'vue-router'
import { store } from '@/store'

const user = reactive({
  account: 'admin',
  pwd: '123456',
  imgcode: ''
})
const rules = ref<IFormRule>({
  account: [
    { required: true, message: '请输入账号', trigger: 'change' }
  ],
  pwd: [
    { required: true, message: '请输入密码', trigger: 'change' }
  ],
  imgcode: [
    { required: true, message: '请输入验证码', trigger: 'change' }
  ]
})
const loading = ref(false)

onMounted(() => {
  loadCaptcha()
})

// 1. 验证码
const captchaSrc = ref('')
// 加载验证码
const loadCaptcha = async () => {
  const data = await getCaptcha()
  captchaSrc.value = URL.createObjectURL(data)
}

// 2. 登录逻辑
const form = ref<IElForm | null>(null)
const router = useRouter()
const route = useRoute()
const handleSubmit = async () => {
  // 表单验证
  const valid = form.value?.validate()
  if (!valid) return false
  // 验证通过
  loading.value = true
  // 请求提交
  const data = await login(user).finally(() => { loading.value = false })
  store.commit('setUser', {
    ...data.user_info,
    token: data.token
  })
  // 重定向
  let redirect = route.query.redirect || '/'
  if (typeof redirect !== 'string') redirect = '/'
  router.replace(redirect)
  // 处理响应
}
</script>

<style lang="scss" scoped>

.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 400px;
  height: 100vh;
  background-color: #2d3a4b;
}

.login-form {
  min-width: 350px;
  padding: 25px;
  border-radius: 6px;
  background: #fff;

  .login-form__header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
  }

  .el-form-item:last-child {
    margin-bottom: 0;
  }

  .submit-button {
    width: 100%;
  }

  .login-logo {
    width: 50%;
    height: 50%;
  }

  .imgcode-wrap {
    display: flex;
    align-items: center;
    .imgcode {
      height: 37px;
      margin-left: 20px;
    }
  }
}

::v-deep(.el-input__inner), .el-button {
  height: 30px;
}
</style>
