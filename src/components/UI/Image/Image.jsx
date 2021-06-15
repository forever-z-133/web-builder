import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { LoadingOutlined, WarningOutlined } from '@/components/UI/Icon/Icon';
import { classnames } from '@/utils/utils';
import './Image.scss';

class Image extends PureComponent {
  state = {
    status: 'LOADING', // OK LOADING ERROR
  };

  componentDidUpdate(prevProps) {
    if (prevProps.src === this.props.src) return;
    if (this.state.status === 'LOADING') return;
    this.setState({ status: 'LOADING' });
  }

  getImageRef = img => {
    if (this.state.status !== 'LOADING') return;
    if (img?.complete && (img.naturalWidth || img.naturalHeight)) {
      this.onLoad();
    }
  };

  onLoad = e => {
    this.setState({ status: 'OK' });
    const { onLoad } = this.props;
    onLoad && onLoad(e);
  };

  onError = e => {
    this.setState({ status: 'ERROR' });
    const { onError } = this.props;
    onError && onError(e);
  };

  render() {
    const { src, ratio, alt, className, children, ...props } = this.props;
    const { status } = this.state;
    const classNames = classnames('ui-image', { 'is-ratio': ratio !== undefined }, className);
    const { getImageRef, onLoad, onError } = this;
    return (
      <div className={classNames} {...props}>
        {ratio && <div className="ratio-temp" style={{ paddingTop: `${ratio * 100}%` }}></div>}
        <img src={src} ref={getImageRef} {...(
          status === 'LOADING' ? {
            className: "img-temp",
            onLoad,
            onError,
          } : {
            className: "img",
            alt,
          }
        )} />
        {status !== 'OK' && <div className="placeholder">
          {ratio && status === 'LOADING' && <LoadingOutlined />}
          {status === 'ERROR' && <WarningOutlined />}
        </div>}
        {children}
      </div>
    );
  }
}
Image.propTypes = {
  src: PropTypes.string.isRequired,
  ratio: PropTypes.number,
  alt: PropTypes.string,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
};
export default Image;
