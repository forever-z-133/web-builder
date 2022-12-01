import React, { PureComponent } from 'react'
import { EditContext } from '@/pages/Edit/utils/EditContext'
import { hyphenate } from '@/utils/common'

class StyleRender extends PureComponent {
  static contextType = EditContext

  componentDidMount () {
    const { data } = this.props
    if (!data) return
    this.changeStyle(data)
  }

  componentDidUpdate () {
    const { data } = this.props
    if (!data) return
    this.changeStyle(data)
  }

  componentWillUnmount () {
    const { data } = this.props
    if (!data) return
    const { id } = data
    const dom = document.querySelector(`#style-${id}`)
    if (!dom) return
    const head = document.getElementsByTagName('head')[0]
    head.removeChild(dom)
  }

  // 更新 style
  changeStyle = data => {
    const { styleRenderType } = this.context
    if (styleRenderType === 'inline') return

    const { id } = data
    let dom = document.querySelector(`#style-${id}`)
    if (!dom) {
      dom = document.createElement('style')
      dom.id = `style-${id}`
      const head = document.getElementsByTagName('head')[0]
      head.appendChild(dom)
    }

    const styleString = this.convertDataToStyleString(data)

    if (dom.styleSheet) {
      dom.styleSheet.cssText = styleString
    } else {
      while (dom.firstChild) dom.removeChild(dom.firstChild)
      dom.appendChild(document.createTextNode(styleString))
    }
  }

  // 将整个组件数据转化为 style 字符串
  convertDataToStyleString = data => {
    const { items } = data
    let str = this._toStyleString(data)
    if (items && items.length) {
      str += items.map(e => this._toStyleString(e, data.id))
    }
    return str
  }

  // 将单条数据转为 style 字符串
  _toStyleString = (data, parentId) => {
    const { id, css = {} } = data
    const selector = parentId ? `#${parentId} > #${id}` : `#${id}`
    let result = []
    Object.keys(css).forEach(key => {
      let value = css[key]
      if (value === null || value === undefined) value = ''
      result.push(`${hyphenate(key)}: ${value}`)
    })
    result = result.join('; ')
    return `${selector} { ${result} }`
  }

  render () {
    const { data } = this.props
    const { styleRenderType } = this.context
    const { id, css } = data || {}
    return (
      <div id={id} style={{ ...(styleRenderType === 'inline' ? css : undefined) }}>
        {this.props.children}
      </div>
    )
  }
}
export default StyleRender
