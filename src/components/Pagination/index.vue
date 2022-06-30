<template>
  <el-pagination
    :current-page="props.page"
    :page-size="props.limit"
    background
    :small="true"
    layout="total, sizes, prev, pager, next, jumper"
    :total="listCount"
    :page-sizes="[2, 3, 4]"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  />
</template>

<script lang="ts" setup>

interface PropsType {
  page: number,
  limit: number,
  listCount: number,
  loadList: () => void
}

const props = withDefaults(defineProps<PropsType>(), {
  page: 1,
  limit: 4,
  listCount: 0,
  loadList: () => {}
})

interface EmitsType {
  (e: 'update:page', page: number, a: string): void
  (e: 'update:limit', limit: number): void
}

const emit = defineEmits<EmitsType>()

const handleCurrentChange = (page: number) => {
  emit('update:page', page, 'dsadsa')
  props.loadList()
}

const handleSizeChange = (size: number) => {
  emit('update:page', 1, 'dsanjdnsa')
  emit('update:limit', size)
  props.loadList()
}
</script>

<style lang="scss" scoped>
.el-pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
