<template>
  <page-container>
    <!-- 查询部分 -->
    <app-card>
      <template #header>
        数据筛选
      </template>
      <el-form>
        <el-form-item label="商品分类">
          <el-select>
            <el-option
              label="全部"
              :value="0"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </app-card>
  </page-container>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">

</style>
