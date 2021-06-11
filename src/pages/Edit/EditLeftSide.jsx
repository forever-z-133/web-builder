import React, { Component } from 'react';
import { EditContext } from './utils/EditContext';

class EditLeftSide extends Component {
  static contextType = EditContext;

  render() {
    return (
      <div className="edit-left-side">
        <p>编辑页</p>
      </div>
    );
  }
}
export default EditLeftSide;
