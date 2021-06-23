import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class FlipTransition extends PureComponent {
  dom = null;
  firstData = null;
  lastData = null;
  keyFrames = [];
  animationOptions = {
    duration: 300,
    easing: 'ease-in-out',
    fill: 'both',
  };
  animate = null;

  constructor(props) {
    super(props);
    const { duration, easing } = this.props;
    if (duration !== undefined) this.animationOptions.duration = duration;
    if (easing !== undefined) this.animationOptions.easing = easing;
  }

  getDomRef = ref => {
    this.props.ref && this.props.ref(ref);
    if (!ref) return;
    this.dom = ref;
  }

  getSnapshotBeforeUpdate() {
    this._first();
    return null;
  }

  componentDidUpdate() {
    this._last();
    this._invert();
    this._play();
  }

  _first() {
    if (!this.dom) return;
    this.firstData = this._getDomData(this.dom);
    this.props.onFisrt && this.props.onFisrt(this.lastData);
  }
  _last() {
    if (!this.dom) return;
    this.lastData = this._getDomData(this.dom);
    this.props.onLast && this.props.onLast(this.lastData);
  }
  _invert() {
    if (!this.firstData || !this.lastData) return;
    const first = this.firstData;
    const last = this.lastData;
    const deltaX = first.left - last.left;
    const deltaY = first.top - last.top;
    const deltaW = first.width / last.width;
    const deltaH = first.height / last.height;
    this.keyFrames = [{
      transformOrigin: 'top left',
      transform: `translate(${deltaX}px, ${deltaY}px) scale(${deltaW}, ${deltaH})`,
      opacity: first.opacity,
    }, {
      transformOrigin: 'top left',
      transform: 'none',
      opacity: last.opacity,
    }];
    this.props.onInvert && this.props.onInvert(this.keyFrames);
  }
  _play() {
    if (!this.dom) return;
    const anim = this.dom.animate(this.keyFrames, this.animationOptions);
    this.props.onPlay && this.props.onPlay(anim);
    this.animate = anim;
    anim.onfinish = () => {
      this.animate= null;
      this.props.onFinish && this.props.onFinish();
    };
  }
  _getDomData(dom) {
    if (!dom) return null;
    const rect = dom.getBoundingClientRect();
    const { top, left, width, height } = rect;
    const style = window.getComputedStyle(dom, null);
    const { opacity } = style;
    return { top, left, width, height, opacity };
  }

  render() {
    return React.cloneElement(React.Children.only(this.props.children), {
      ref: this.getDomRef
    });
  }
}
FlipTransition.propTypes = {
  duration: PropTypes.number,
  easing: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  onFisrt: PropTypes.func,
  onLast: PropTypes.func,
  onInvert: PropTypes.func,
  onPlay: PropTypes.func,
  onFinish: PropTypes.func,
};
export default FlipTransition;
