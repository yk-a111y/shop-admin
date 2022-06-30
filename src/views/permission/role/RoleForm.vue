<template>
  <app-dialog-form
    :title="props.roleId ? '编辑角色' : '添加角色'"
    @closed="handleDialogClosed"
    @open="handleDialogOpen"
    :confirm="handleSubmit"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item
        label="角色名称"
        prop="role_name"
      >
        <el-input
          v-model="formData.role_name"
          placeholder="请输入角色名称"
        />
      </el-form-item>
      <el-form-item label="是否启用">
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
      <el-form-item label="角色权限">
        <el-tree
          ref="tree"
          node-key="id"
          show-checkbox
          :data="menus"
          :props="{
            label: 'title'
          }"
        />
      </el-form-item>
    </el-form>
  </app-dialog-form>
</template>

<script lang="ts" setup>
import { getMenus, getRole, saveRole } from '@/api/role'
import type { Menu } from '@/api/types/role'
import type { IElForm, IFormRule, IElTree } from '@/types/element-plus'
import { ElMessage } from 'element-plus'
import type { PropType } from 'vue'
import { ref, nextTick } from 'vue'

// emit
interface EmitsType {
  (e: 'update:role-id', value: number | null): void,
  (e: 'success'): void
}
const emit = defineEmits<EmitsType>()
// props
const props = defineProps({
  roleId: {
    type: Number as PropType<number | null>,
    default: null
  }
})

// 表单数据
const formData = ref({
  role_name: '',
  status: 0 as 0 | 1,
  checked_menus: [] as number[]
})
const formLoading = ref(false)
// 校验规则
const formRules: IFormRule = {
  role_name: [
    { required: true, message: '请输入角色名称', trigger: 'blur' }
  ]
}
// 菜单列表
const menus = ref<Menu[]>([])
// 表单组件
const form = ref<IElForm | null>(null)
// 树形组件
const tree = ref<IElTree | null>(null)

// 对话框打开
const handleDialogOpen = async () => {
  formLoading.value = true
  props.roleId
    ? await loadRole().finally(() => { formLoading.value = false })
    : await loadMenus().finally(() => { formLoading.value = false })
}
const loadMenus = async () => {
  const data = await getMenus()
  menus.value = data.menus
}
const loadRole = async () => {
  if (!props.roleId) return
  const { menus: menusData, role } = await getRole(props.roleId)
  menus.value = menusData
  await nextTick() // 等待菜单树渲染完成
  formData.value.role_name = role.role_name
  formData.value.status = role.status
  setCheckedMenus(role.rules.split(',').map(item => Number.parseInt(item)))
}
const setCheckedMenus = (menus: number[]) => {
  menus.forEach(menuId => {
    const node = tree.value?.getNode(menuId)
    if (node && node.isLeaf) {
      tree.value?.setChecked(menuId, true, false)
    }
  })
}

// 关闭对话框
const handleDialogClosed = () => {
  emit('update:role-id', null)
  form.value?.clearValidate()
  form.value?.resetFields()
}

// 对话框表单数据提交
const handleSubmit = async () => {
  const valid = await form.value?.validate()
  if (!valid) return
  // 获取选中节点id的方法
  formData.value.checked_menus = [
    ...tree.value?.getCheckedKeys(true),
    ...tree.value?.getHalfCheckedKeys()
  ]
  await saveRole(props.roleId || 0, formData.value)
  emit('success')
  ElMessage.success('保存成功')
}
</script>

<style lang="scss" scoped>

</style>
