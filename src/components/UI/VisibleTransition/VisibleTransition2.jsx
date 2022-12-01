import React, { Component } from 'react'
import { classnames, sleep } from '@/utils/common'

class VisibleTransition2 extends Component {
  state = {
    className: '',
    needAnimate: false,
    lastVisible: false
  }

  timer = null

  static getDerivedStateFromProps (props, state) {
    if (props.visible !== state.lastVisible) {
      return { lastVisible: props.visible, needAnimate: true }
    }
    return null
  }

  componentDidMount () {
    if (this.state.needAnimate) {
      this.triggerAnimtion(this.props)
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextState.needAnimate) {
      this.triggerAnimtion(nextProps)
      return true
    }
    if (this.state.className !== nextState.className) {
      return true
    }
    return false
  }

  async triggerAnimtion (props) {
    const { visible, duration = 500 } = props
    clearTimeout(this.timer)
    if (visible) {
      this.setState({ needAnimate: false })
      this.setState({ className: 'exited' })
      this.timer = await sleep(0)
      this.setState({ className: 'entering' })
      this.timer = await sleep(duration)
      this.setState({ className: 'entered' })
    } else {
      this.setState({ needAnimate: false })
      this.setState({ className: 'exiting' })
      this.timer = await sleep(duration)
      this.setState({ className: '' })
    }
  }

  render () {
    const { className } = this.state
    const { className: originClassName } = this.props
    if (!className) return null
    return React.cloneElement(React.Children.only(this.props.children), {
      className: classnames(originClassName, className)
    })
  }
}
export default VisibleTransition2
