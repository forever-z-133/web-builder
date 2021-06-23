import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class VisibleTransition extends PureComponent {
  render() {
    return React.cloneElement(React.Children.only(this.props.children));
  }
}
VisibleTransition.propTypes = {
  duration: PropTypes.number,
};
export default VisibleTransition;
