// 封装好element-plus的各种类型供外界使用
import { ElForm, FormItemRule, ElDialog, ElTree } from 'element-plus'

export type IElForm = InstanceType<typeof ElForm>

export type IElDialog = InstanceType<typeof ElDialog>

export type IFormRule = Record<string, FormItemRule[]>

export type IElTree = InstanceType<typeof ElTree>
