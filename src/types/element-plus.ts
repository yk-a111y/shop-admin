// 封装好element-plus的各种类型供外界使用
import { ElForm, FormItemRule } from 'element-plus'

export type IElForm = InstanceType<typeof ElForm>

export type IFormRule = Record<string, FormItemRule[]>
