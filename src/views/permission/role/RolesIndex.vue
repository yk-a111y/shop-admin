<template>
  <page-container>
    <!-- 查询部分 -->
    <app-card>
      <template #header>
        数据筛选
      </template>
      <el-form
        ref="form"
        :inline="true"
        :model="listParams"
        :disabled="listLoading"
        @submit.prevent="handleQuery"
      >
        <el-form-item label="状态">
          <el-select
            v-model="listParams.status"
            placeholder="请选择"
            clearable
          >
            <el-option
              label="全部"
              value=""
            />
            <el-option
              label="显示"
              :value="1"
            />
            <el-option
              label="不显示"
              :value="0"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input
            v-model="listParams.role_name"
            placeholder="请输入角色昵称"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            native-type="submit"
            :disabled="listLoading"
          >
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </app-card>
    <!-- 列表数据 -->
    <app-card>
      <template #header>
        <el-button
          type="primary"
          @click="formVisible = true"
        >
          添加角色
        </el-button>
      </template>
      <el-table
        :data="list"
        v-loading="listLoading"
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="ID"
        />
        <el-table-column
          prop="role_name"
          label="身份昵称"
        />
        <el-table-column
          prop="rules"
          label="权限"
        >
          <template #default="scope">
            <div
              class="text-nowrap"
              :title="scope.row.rules"
            >
              {{ scope.row.rules }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
        >
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactice-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              :loading="scope.row.statusLaoding"
              @change="handleStatusChange(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          min-width="100"
          align="center"
        >
          <template #default="scope">
            <el-button
              type="text"
              @click="handleUpdate(scope.row.id)"
            >
              编辑
            </el-button>
            <el-popconfirm
              title="确认删除吗？"
              @confirm="handleDelete(scope.row.id)"
            >
              <template #reference>
                <el-button type="text">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <app-pagination
        v-model:page="listParams.page"
        v-model:limit="listParams.limit"
        :list-count="listCount"
        :load-list="loadList"
        :disabled="listLoading"
      />
    </app-card>
  </page-container>
  <RoleForm
    v-model="formVisible"
    v-model:role-id="roleId"
    @success="handleFormSuccess"
  />
</template>

<script setup lang="ts">
import { getRoles, deleteRole, updateRoleStatus } from '@/api/role'
import { IListParams, Role } from '@/api/types/role'
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import RoleForm from './RoleForm.vue'

// 列表数据
const list = ref<Role[]>([])
const listParams = reactive({
  page: 1,
  limit: 10,
  role_name: '',
  status: '' as IListParams['status']
})
const listCount = ref(0)
const listLoading = ref(false)
// role-form显示
const formVisible = ref(false)
// 传递给表单的role-id
const roleId = ref<number | null>(null)

// onMounted
onMounted(() => {
  loadList()
})

// 加载表单数据
const loadList = async () => {
  listLoading.value = true
  const data = await getRoles(listParams).finally(() => {
    listLoading.value = false
  })
  list.value = data.list
  listCount.value = data.count
}

// 数据筛选
const handleQuery = async () => {
  listParams.page = 1 // 查询默认从第1页开始
  loadList()
}

// 删除角色
const handleDelete = async (id: number) => {
  await deleteRole(id)
  ElMessage.success('删除成功')
  loadList()
}

// 状态改变
const handleStatusChange = async (data: Role) => {
  data.statusLoading = true
  await updateRoleStatus(data.id, data.status).finally(() => {
    data.statusLoading = false
  })
  ElMessage.success(`${data.status === 1 ? '启用' : '禁用'}成功`)
}

// 编辑处理
const handleUpdate = (id: number) => {
  roleId.value = id
  formVisible.value = true
}

// 表单提交成功处理
const handleFormSuccess = () => {
  formVisible.value = false
  loadList()
}
</script>

<style scoped lang="scss">
::v-deep(.el-card__header) {
  display: flex;
  justify-content: space-between;
}

.el-form {
  display: flex;
  justify-content: left;
}

.box-card {
  margin-bottom: 20px;
}
.text-nowrap {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
