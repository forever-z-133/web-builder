import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { classnames } from '@/utils/utils';
import './Icon.scss';

// export * from '@ant-design/icons';

class Icon extends PureComponent {
  render() {
    const { src, size, className, ...props } = this.props;
    const classNames = classnames('ui-icon', size, className);
    return (
      <div className={classNames} {...props}>
        <img src={src} alt="图标" />
      </div>
    );
  }
}
Icon.propTypes = {
  src: PropTypes.string,
  size: PropTypes.string,
};
export default Icon;
