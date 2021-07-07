import React, { Children, cloneElement, PureComponent } from 'react';
import PropTypes from 'prop-types';

class Stage extends PureComponent {
  calculate = () => {
    const { width, height, contentWidth, contentHeight, mode = 'contain' } = this.props;
    // contain 以长边缩放，cover 以短边缩放，fit-* 始终以固定边缩放，max-* 超出容器时才按前面规律缩放
    const wrapperRatio = width / height;
    const contentRatio = contentWidth / contentHeight;
    let scale = 1;
    if (mode === 'contain') {
      if (wrapperRatio > contentRatio) {
        scale = height / contentHeight;
      } else {
        scale = width / contentWidth;
      }
    } else if (mode === 'cover') {
      if (wrapperRatio > contentRatio) {
        scale = width / contentWidth;
      } else {
        scale = height / contentHeight;
      }
    } else if (mode === 'fit-width') {
      scale = width / contentWidth;
    } else if (mode === 'fit-height') {
      scale = height / contentHeight;
    }
    return { scale };
  };

  calculateStyle = () => {
    const { contentWidth, contentHeight, useMargin } = this.props;
    const { scale } = this.calculate();
    let transform = [];

    // 元素居中
    const style = { position: 'absolute', top: '50%', left: '50%', width: contentWidth, height: contentHeight };
    const top = contentWidth / -2;
    const left = contentHeight / -2;
    if (useMargin) {
      Object.assign(style, { marginTop: top, marginLeft: left });
    } else {
      transform.push(`translate(-50%, -50%)`);
    }

    // 元素尺寸
    transform.push(`scale(${scale}, ${scale})`);

    // 合并返回
    Object.assign(style, { transform: transform.join(' ') });
    style.scale = scale;
    return style;
  }

  Children = _props => {
    const { children, ...props } = _props;
    const length = Children.count(children);
    const isFunction = typeof children === 'function';
    if (isFunction) return children(props);
    if (length > 1) return <div {...props}>{children}</div>;
    const { style: originStyle } = children.props;
    props.style = Object.assign({}, originStyle, props.style);
    return cloneElement(children, props);
  };

  render() {
    const { width, height, style: originStyle, children } = this.props;
    const wrapperStyle = Object.assign({}, originStyle, { position: 'relative', width, height });
    const { scale, ...style } = this.calculateStyle();
    return (
      <div style={wrapperStyle}>
        <this.Children scale={scale} style={style}>{children}</this.Children>
      </div>
    );
  }
}
Stage.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  contentWidth: PropTypes.number.isRequired,
  contentHeight: PropTypes.number.isRequired,
  mode: PropTypes.oneOf(['cover', 'contain']),
  useMargin: PropTypes.bool,
};
export default Stage;
