import React, { Component } from 'react';
import EditHeader from './EditHeader';
import EditLeftSide from './EditLeftSide';
import EditMainArea from './EditMainArea';
import EditRightSide from './EditRightSide';

class Edit extends Component {
  render() {
    return (
      <>
        <EditHeader />
        <EditLeftSide />
        <EditMainArea />
        <EditRightSide />
      </>
    );
  }
}
export default Edit;
