import React, { Component } from 'react';
import { Image, Icon, FlipTransition, VisibleTransition } from '@/components/UI';
import { EditContext } from './utils/EditContext';
import { classnames, randomInt } from '@/utils/utils';
import Render from '@/components/Editor/Render/Render';
import VisibleTransition2 from '@/components/UI/VisibleTransition/VisibleTransition2';

class EditLeftSide extends Component {
  static contextType = EditContext;

  state = { src: '', ratio: 1 / 2, active: false, visible: false };

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

  onClick4 = () => {
    const { activeElement } = this.context;
    if (!activeElement) return;
    activeElement.css.fontSize = `${randomInt(10, 20)}px`;
    this.context.setActiveElement(activeElement);
  }

  render() {
    return (
      <div className="edit-left-side">
        <p>编辑页</p>
        <button onClick={this.onClick}>点击</button>
        <button onClick={this.onClick2}>点击</button>
        <button onClick={this.onClick3}>点击</button>
        <button onClick={this.onClick4}>点击</button>
        <FlipTransition>
          <div className={classnames('box', { 'active': this.state.active })}></div>
        </FlipTransition>
        <Image src={this.state.src} ratio={this.state.ratio}></Image>
        <Icon src="http://img.daimg.com/uploads/allimg/210516/1-210516230053.jpg" />
        <Render layout={this.context.layout} />
        <button onClick={() => this.setState({ visible: !this.state.visible })}>显示</button>
        <VisibleTransition visible={this.state.visible}>
          <p>我是通过 style 做的动画</p>
        </VisibleTransition>
        <VisibleTransition2 visible={this.state.visible}>
          <p>我是通过 class 做的动画</p>
        </VisibleTransition2>
      </div>
    );
  }
}
export default EditLeftSide;
