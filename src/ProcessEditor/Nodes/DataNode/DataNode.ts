import { DataModel } from '@/ProcessEditor/Models/DataModel'
import { BaseNode } from '../BaseNode'

export interface DataNode extends BaseNode {
  inData: DataModel[]
  outData: DataModel[]
}
