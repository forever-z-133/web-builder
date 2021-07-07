import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { EditContext } from '@/pages/Edit/utils/EditContext';

class ActiveElement extends PureComponent {
  static contextType = EditContext;

  // TODO: 取消选中需要更换方案，这种每个组件都绑事件不太好，另外并不所有的外界点击都解除激活
  componentDidMount() {
    window.addEventListener('click', this.onClickWindow);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickWindow);
  }

  onClick = e => {
    e.stopPropagation();
    const { data, onClick } = this.props;
    onClick && onClick(e);
    this.context.setActiveElement(data);
  };

  onClickWindow = () => {
    if (this.context.activeElement) {
      this.context.setActiveElement(null);
    }
  };

  render() {
    return (
      <div onClick={this.onClick} style={{ ...(this.context.activeElement?.id === this.props.data?.id ? { color: 'black' }  : undefined) }}>
        {this.props.children}
      </div>
    );
  }
}
ActiveElement.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
export default ActiveElement;
