import React, { Component } from 'react';
import EditHeader from './EditHeader';
import EditLeftSide from './EditLeftSide';
import EditMainArea from './EditMainArea';
import EditRightSide from './EditRightSide';
import { EditProvider } from './utils/EditContext';
import './Edit.scss';

class Edit extends Component {
  render() {
    return (
      <EditProvider>
        <EditHeader />
        <EditLeftSide />
        <EditMainArea />
        <EditRightSide />
      </EditProvider>
    );
  }
}
export default Edit;
