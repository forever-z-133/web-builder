import React, { Component } from 'react';
import { Image, Icon, FlipTransition } from '@/components/UI';
import { EditContext } from './utils/EditContext';
import { classnames, randomInt } from '../../utils/utils';

class EditLeftSide extends Component {
  static contextType = EditContext;

  state = { src: '', ratio: 1 / 2, active: false };

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

  onClick3 = () => {
    this.setState({ active: !this.state.active });
  };

  render() {
    return (
      <div className="edit-left-side">
        <p>编辑页</p>
        <button onClick={this.onClick}>点击</button>
        <button onClick={this.onClick2}>点击</button>
        <button onClick={this.onClick3}>点击</button>
        <FlipTransition>
          <div className={classnames('box', { 'active': this.state.active })}></div>
        </FlipTransition>
        <Image src={this.state.src} ratio={this.state.ratio}></Image>
        <Icon src="http://img.daimg.com/uploads/allimg/210516/1-210516230053.jpg" />
      </div>
    );
  }
}
export default EditLeftSide;
