import { NodeLinkModel } from '../Models/NodeLinkModel'
import { NodeId } from '../types'

export interface BaseNode {
  // 节点唯一标识
  id: NodeId
  // 英文名
  name: string
  // 中文解释
  desc: string
  // 流程串联
  inLink: NodeLinkModel
  outLink: NodeLinkModel
}
