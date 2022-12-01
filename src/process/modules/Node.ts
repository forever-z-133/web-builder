import { InputType } from '../types'

interface INode {
  id?: string
  name?: string
  inputs?: InputType[]

}

class Node implements INode {
  id = ''
}
export default Node
