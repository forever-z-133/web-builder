import React, { PureComponent } from 'react'

class TextWidget extends PureComponent {
  render () {
    const { data } = this.props
    const { content } = data
    return <span>{content}</span>
  }
}
export default TextWidget
