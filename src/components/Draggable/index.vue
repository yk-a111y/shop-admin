<template>
  <div ref="draggableContainer">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import type { PropType } from 'vue'
import Sortable from 'sortablejs'

// ref获取拖拽的容器
const draggableContainer = ref<HTMLDivElement | null>(null)

const props = defineProps({
  // 接收父组件传过来的activities[]
  modelValue: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  // 参考：https://github.com/SortableJS/Sortable#options
  options: {
    type: Object as PropType<Sortable.Options>,
    default: () => {}
  }
})

const sortable = ref<Sortable | null>(null)

onMounted(() => {
  initDraggable()
})

const initDraggable = () => {
  if (!draggableContainer.value) {
    console.error('容器不能为空')
    return
  }
  sortable.value = Sortable.create(draggableContainer.value, {
    animation: 300,
    // 检测到拖拽操作，触发update事件
    onUpdate (e) {
      // 改变前后的索引必须存在
      if (e.oldIndex !== undefined && e.newIndex !== undefined) {
        // 1. 删除拖拽的元素
        const item = props.modelValue.splice(e.oldIndex, 1)[0]
        // 2. 把删除的元素插入到新的位置
        props.modelValue.splice(e.newIndex, 0, item)
      }
    },
    ...props.options
  })
}

onUnmounted(() => {
  sortable.value?.destroy()
})
</script>

<style lang="scss" scoped>
:deep(.el-tag) {
  margin-right: 5px;
}
</style>
