import { NodeId, NodeLinkId, NodeType } from '../types'

// 节点连接类
export interface NodeLinkModel {
  id: NodeLinkId
  enableTypes: NodeType[]
  link: NodeId[]
}
