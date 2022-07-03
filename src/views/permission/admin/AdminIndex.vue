<template>
  <page-container>
    <app-card>
      <template #header>
        数据筛选
      </template>
      <el-form
        :inline="true"
        :model="listParams"
        :disabled="listLoading"
        ref="form"
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
        <el-form-item label="管理员名称">
          <el-input
            v-model="listParams.name"
            placeholder="请输入身份昵称"
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
    <app-card>
      <template #header>
        <el-button
          type="primary"
          @click="formVisible = true"
        >
          添加管理员
        </el-button>
      </template>
      <el-table
        v-loading="listLoading"
        :data="list"
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="ID"
        />
        <el-table-column
          prop="real_name"
          label="姓名"
        />
        <el-table-column
          prop="account"
          label="账号"
        />
        <el-table-column
          prop="roles"
          label="身份"
          min-width="180"
        >
          <template #default="scope">
            <el-space wrap>
              <el-tag
                class="role-tag"
                v-for="(item) in scope.row.roles.split(',')"
                :key="item"
              >
                {{ item }}
              </el-tag>
            </el-space>
          </template>
        </el-table-column>
        <el-table-column
          label="最后一次登录时间"
          prop="last_time"
        />
        <el-table-column
          label="最后一次登录IP"
          prop="last_ip"
        />
        <el-table-column label="状态">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              :loading="scope.row.statusLoading"
              @change="handleSwitchChange(scope.row)"
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
  <admin-form
    v-model="formVisible"
    v-model:admin-id="adminId"
    @success="handleSuccess"
  />
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { getAdmins, deleteAdmin, updateAdminStatus } from '@/api/admin'
import type { IListParams, Admin } from '@/api/types/admin'
import { ElMessage } from 'element-plus'
import AdminForm from './AdminForm.vue'

const list = ref<Admin[]>([])
list.value.forEach(item => {
  item.statusLoading = false
})
const listCount = ref(0)
const listLoading = ref(true)
const listParams = reactive({
  page: 1,
  limit: 5,
  name: '',
  roles: '',
  status: '' as IListParams['status']
})
const formVisible = ref(false)
const adminId = ref<number | null>(null)

onMounted(() => {
  loadList()
})

const loadList = async () => {
  listLoading.value = true
  const data = await getAdmins(listParams)
  list.value = data.list
  listCount.value = data.count
  listLoading.value = false
}

// 按条件查询并加载列表
const handleQuery = async () => {
  loadList()
}

// 编辑
const handleUpdate = (id: number) => {
  formVisible.value = true
  adminId.value = id
}

// 删除管理员
const handleDelete = async (id: number) => {
  await deleteAdmin(id)
  ElMessage.success('删除成功')
  loadList()
}

// 改变选择器状态
const handleSwitchChange = async (item: Admin) => {
  item.statusLoading = true
  await updateAdminStatus(item.id, item.status)
  ElMessage.success('状态修改成功')
  item.statusLoading = false
}

// 表单提交成功
const handleSuccess = () => {
  loadList()
  formVisible.value = false
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
</style>
