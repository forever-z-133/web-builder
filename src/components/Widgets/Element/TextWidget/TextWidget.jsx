import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class TextWidget extends PureComponent {
  render() {
    const { data } = this.props;
    const { content } = data;
    return <span>{content}</span>;
  }
}
TextWidget.propTypes = {
  data: PropTypes.object.isRequired,
};
export default TextWidget;
