import React, { Component, createContext } from 'react';

export const EditContext = createContext({});

export class EditProvider extends Component {
  state = {
    layout: [
      { id: 'x1', type: 'text', content: 'xxxxxxx', css: { color: 'green' } },
      { id: 'x2', type: 'text', content: 'yyyyyyy', css: { color: 'red' } }
    ],
    activeElement: null,
    styleRenderType: 'inline',
    mode: 'edit',
  };

  // 当新增或排序时调用，刷新整页
  setLayout = (layout, callback) => {
    this.setState({ layout }, () => {
      typeof callback === 'function' && callback();
    });
  };

  // 当修改时调用，刷新单个数据
  setActiveElement = (element, callback) => {
    const { activeElement } = this.state;
    let state = {};
    if (element !== activeElement) {
      state = { activeElement: element };
    }
    this.setState(state, () => {
      typeof callback === 'function' && callback();
    });
  };

  setStyleRenderType = (styleRenderType, callback) => {
    this.setState({ styleRenderType }, () => {
      typeof callback === 'function' && callback();
    });
  };

  render() {
    const { mode, layout, activeElement, styleRenderType } = this.state;
    const { setLayout, setActiveElement, setStyleRenderType } = this;
    return (
      <EditContext.Provider value={{ mode, layout, setLayout, activeElement, setActiveElement, styleRenderType, setStyleRenderType }}>
        {this.props.children}
      </EditContext.Provider>
    );
  }
}

export class EditConsumer extends Component {
  render() {
    return (
      <EditContext.Consumer>
        {context => {
          if (context === undefined) throw new Error('CountConsumer must be used within a CountProvider');
          return this.props.children(context);
        }}
      </EditContext.Consumer>
    );
  }
}
