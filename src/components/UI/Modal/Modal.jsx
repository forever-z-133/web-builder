import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import { classnames } from '@/utils/common'
import './Modal.scss'

class CLModal extends Component {
  constructor (props) {
    super(props)

    const el = document.createElement('div')
    el.addEventListener('animationend', this.onAnimationEnd)

    this.state = {
      el,
      className: '',
      isAniming: false,
      lastVisible: false
    }
  }

  static getDerivedStateFromProps (props, state) {
    const { visible } = props
    if (visible !== state.lastVisible) {
      const className = visible ? 'slideIn' : 'slideOut'
      if (className === 'slideIn') document.body.appendChild(state.el)
      return { lastVisible: visible, isAniming: true, className }
    }
    return null
  }

  componentWillUnmount () {
    this.state.el.removeEventListener('animationend', this.onAnimationEnd)
    // TODO: contains 可能有兼容性差异
    document.body.contains(this.state.el) && document.body.removeChild(this.state.el)
  }

  onAnimationEnd = () => {
    if (this.state.className === 'slideOut') document.body.removeChild(this.state.el)
    this.setState({ isAniming: false })
  }

  Modal = () => {
    const { className, isAniming } = this.state
    const { className: originClassName, visible, children } = this.props
    if (!isAniming && !visible) return null // 隐藏且无动画时不显示子级
    return <div className={classnames('modal', originClassName, className)}>{children}</div>
  }

  render () {
    return createPortal(<this.Modal />, this.state.el)
  }
}
export default CLModal
