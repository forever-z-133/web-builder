import React, { Component } from 'react';
import Image from '@/components/UI/Image/Image';
import Icon from '@/components/UI/Icon/Icon';
import { EditContext } from './utils/EditContext';
import { randomInt } from '../../utils/utils';

class EditLeftSide extends Component {
  static contextType = EditContext;

  state = { src: '', ratio: 1 / 2 };

  onClick = () => {
    const arr = [
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      "http://img.daimg.com/uploads/allimg/210516/1-210516230053.jpg",
      "http://xx",
    ];
    this.setState({ src: arr[randomInt(arr.length)] });
  };

  onClick2 = () => {
    this.setState({ ratio: 2 / randomInt(2, 5) });
  };

  render() {
    return (
      <div className="edit-left-side">
        <p>编辑页</p>
        <button onClick={this.onClick}>点击</button>
        <button onClick={this.onClick2}>点击</button>
        <Image src={this.state.src} ratio={this.state.ratio}></Image>
        <Icon src="http://img.daimg.com/uploads/allimg/210516/1-210516230053.jpg" />
      </div>
    );
  }
}
export default EditLeftSide;
