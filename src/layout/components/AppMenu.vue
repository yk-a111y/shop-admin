<template>
  <el-menu
    :unique-opened="true"
    active-text-color="#ffd04b"
    background-color="#304156"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#fff"
    router
  >
    <!-- 首页 -->
    <el-menu-item index="/">
      <el-icon><HomeFilled /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <!-- 商品 -->
    <el-sub-menu index="/product">
      <template #title>
        <el-icon><GoodsFilled /></el-icon>
        <span>商品</span>
      </template>
      <el-menu-item index="/product/product_list">
        <template #title>
          <el-icon><Grid /></el-icon>
          <span>商品列表</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/product/product_classify">
        <template #title>
          <el-icon><Goods /></el-icon>
          <span>商品分类</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/product/product_attr">
        <template #title>
          <el-icon><ScaleToOriginal /></el-icon>
          <span>商品规格</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/product/product_reply">
        <template #title>
          <el-icon><Comment /></el-icon>
          <span>商品评论</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
    <!-- 订单 -->
    <el-sub-menu index="/order">
      <template #title>
        <el-icon><Present /></el-icon>
        <span>订单</span>
      </template>
      <el-menu-item index="/order/list">
        <template #title>
          <el-icon><List /></el-icon>
          <span>订单列表</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
    <!-- 媒体 -->
    <el-menu-item index="/media">
      <el-icon><Monitor /></el-icon>
      <span>媒体</span>
    </el-menu-item>
    <!-- 权限 -->
    <el-sub-menu index="/permission">
      <template #title>
        <el-icon><Orange /></el-icon>
        <span>权限</span>
      </template>
      <el-menu-item index="/permission/role">
        <template #title>
          <el-icon><Service /></el-icon>
          <span>角色</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/permission/admin">
        <template #title>
          <el-icon><User /></el-icon>
          <span>管理员</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/permission/rule">
        <template #title>
          <el-icon><Operation /></el-icon>
          <span>权限规则</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
// 图标文件按需加载
import { HomeFilled, GoodsFilled, Grid, Goods, Comment, ScaleToOriginal, Present, List, Monitor, Orange, User, Operation, Service } from '@element-plus/icons-vue'

</script>

<style scoped lang="scss">
.el-menu {
  height: 100vh;
  border-right: none;
}
</style>
