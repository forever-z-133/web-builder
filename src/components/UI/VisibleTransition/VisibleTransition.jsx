import React, { Component } from 'react'
import { sleep } from '@/utils/common'

class VisibleTransition extends Component {
  defaultAnimation = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 }
  }

  state = {
    style: null,
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
    if (this.state.style !== nextState.style) {
      return true
    }
    return false
  }

  componentWillUnmount () {
    clearTimeout(this.timer)
  }

  async triggerAnimtion (props) {
    const { visible, duration = 500, enter, leave } = props
    const { entering: e1, entered: e2, exiting: e3, exited: e4 } = this.defaultAnimation

    clearTimeout(this.timer)

    if (visible) {
      this.setState({ needAnimate: false })

      const exited = leave || (e4 || e3)
      this.setState({ style: exited })

      this.timer = await sleep(0)

      const entering = enter || e1
      entering.transition = `all ${duration}ms`
      this.setState({ style: entering, needAnimate: false })

      this.timer = await sleep(duration)

      const entered = enter || (e2 || e1)
      this.setState({ style: entered })
    } else {
      this.setState({ needAnimate: false })

      const exiting = leave || e3
      exiting.transition = `all ${duration}ms`
      this.setState({ style: exiting, needAnimate: false })

      this.timer = await sleep(duration)

      this.setState({ style: null })
    }
  }

  render () {
    const { style } = this.state
    const { style: originStyle } = this.props
    if (style === null) return null
    return React.cloneElement(React.Children.only(this.props.children), {
      style: { ...originStyle, ...style }
    })
  }
}
export default VisibleTransition
