<template>
  <app-dialog-form
    :title="props.adminId ? '编辑管理员' : '添加管理员'"
    :confirm="handleConfirm"
    @closed="handleDialogClose"
    @open="handleDialogOpen"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item
        label="管理员账号"
        prop="account"
      >
        <el-input
          v-model="formData.account"
          placeholder="请输入管理员账号"
        />
      </el-form-item>
      <el-form-item
        label="管理员密码"
        prop="pwd"
      >
        <el-input
          v-model="formData.pwd"
          type="password"
          placeholder="请输入管理员密码"
        />
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="conf_pwd"
      >
        <el-input
          v-model="formData.conf_pwd"
          type="password"
          placeholder="请输入确认密码"
        />
      </el-form-item>
      <el-form-item
        label="管理员姓名"
        prop="real_name"
      >
        <el-input
          v-model="formData.real_name"
          placeholder="请输入管理员姓名"
        />
      </el-form-item>
      <el-form-item
        label="管理员身份"
        prop="roles"
      >
        <el-select
          v-model="formData.roles"
          multiple
          placeholder="请选择管理员身份"
        >
          <el-option
            v-for="item in roles"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="formData.status">
          <el-radio
            :label="1"
          >
            开启
          </el-radio>
          <el-radio
            :label="0"
          >
            关闭
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </app-dialog-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getRoles, getAdmin, updateAdmin, createAdmin } from '@/api/admin'
import type { PropType } from 'vue'
import type { IElForm, IFormRule } from '@/types/element-plus'
import type { ISelectOptions } from '@/api/types/form'
import { ElMessage } from 'element-plus'

// 定义emit
interface EmitsTypes {
  (e: 'update:admin-id', value: number | null): void,
  (e: 'success'): void
}
const emit = defineEmits<EmitsTypes>()
// 定义props
const props = defineProps({
  adminId: {
    type: Number as PropType<number | null>,
    default: null
  }
})

// 表单数据
const formLoading = ref(false)
const formData = ref({
  account: '',
  pwd: '',
  conf_pwd: '',
  roles: [] as number[],
  status: 0 as 1 | 0,
  real_name: ''
})
// 表单校验规则
const formRules: IFormRule = {
  account: [
    { required: true, message: '请输入管理员账号', trigger: 'blur' }
  ],
  pwd: [
    { required: true, message: '请输入管理员密码', trigger: 'blur' }
  ],
  conf_pwd: [
    { required: true, message: '请输入确认密码', trigger: 'blur' }
  ],
  roles: [
    { required: true, message: '请选择管理员角色', trigger: 'blur' }
  ],
  real_name: [
    { required: true, message: '请输入管理员姓名', trigger: 'blur' }
  ]
}

// 获取角色数据
const roles = ref<ISelectOptions[]>([])
const loadRoles = async () => {
  const data = await getRoles()
  roles.value = data
}

// dialog打开时的初始化
const handleDialogOpen = () => {
  formLoading.value = true
  Promise.all([loadRoles(), loadAdmin()]).finally(() => {
    formLoading.value = false
  })
}

// 编辑管理员时加载数据
const loadAdmin = async () => {
  if (!props.adminId) {
    return
  }
  const data = await getAdmin(props.adminId)
  formData.value = data
}

// dialog关闭时
const form = ref<IElForm | null>(null)
const handleDialogClose = () => {
  emit('update:admin-id', null)
  // 清除表单验证和表单数据
  form.value?.clearValidate()
  form.value?.resetFields()
}

// 表单提交
const handleConfirm = async () => {
  const valid = await form.value?.validate()
  if (!valid) {
    return
  }
  if (props.adminId) {
    // 编辑管理员
    await updateAdmin(props.adminId, formData.value)
  } else {
    // 添加管理员
    await createAdmin(formData.value)
  }
  emit('success')
  ElMessage.success(props.adminId ? '编辑成功' : '保存成功')
}
</script>

<style lang="scss" scoped>
</style>
