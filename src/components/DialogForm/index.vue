<template>
  <el-dialog
    ref="dialog"
    width="50%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <slot />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button
          type="primary"
          @click="handleConfirm"
        >确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PropType } from 'vue'
import type { IElDialog } from '@/types/element-plus'

// 定义emit
// interface EmitsTypes {
//   (e: 'confirm'): void
// }
// const emit = defineEmits<EmitsTypes>()
// 定义props
const props = defineProps({
  confirm: {
    type: Function as PropType<() => Promise<void>>,
    default: () => Promise.resolve()
  }
})

// ref获取子组件，操作其visible属性控制展示状态
const dialog = ref<IElDialog | null>(null)
const handleCancel = () => {
  if (dialog.value) {
    dialog.value.visible = false
  }
}

// 确定按钮
const confirmLoading = ref(false)
const handleConfirm = async () => {
  confirmLoading.value = true
  // emit('confirm')
  await props.confirm()
  confirmLoading.value = false
}
</script>

<style lang="scss" scoped>

</style>
