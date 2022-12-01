import React from 'react'
import EditHeader from './EditHeader'
import EditLeftSide from './EditLeftSide'
import EditMainArea from './EditMainArea'
import EditRightSide from './EditRightSide'
import { EditProvider } from './utils/EditContext'
import './Edit.scss'

const Edit = () => {
  return (
    <EditProvider>
      <EditHeader />
      <EditLeftSide />
      <EditMainArea />
      <EditRightSide />
    </EditProvider>
  )
}
export default Edit
