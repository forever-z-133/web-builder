import { ComponentActionModel } from '@/ProcessEditor/Models/ComponentActionModel'
import { ComponentEventModel } from '@/ProcessEditor/Models/ComponentEventModel'
import { ComponentGetModel } from '@/ProcessEditor/Models/ComponentGetModel'
import { ComponentSetModel } from '@/ProcessEditor/Models/ComponentSetModel'
import { BaseNode } from '../BaseNode'

// 组件节点
export interface ComponentNode extends BaseNode {
  gets: ComponentGetModel[]
  sets: ComponentSetModel[]
  events: ComponentEventModel[]
  actions: ComponentActionModel[]
}
