import React, { Component, createContext } from "react";

export const EditContext = createContext({
  layout: [],
  setLayout: () => { },
  activeElement: null,
  setActiveElement: () => { },
});

export class EditProvider extends Component {
  state = {
    layout: [],
    activeElement: null,
  };

  // 当新增或排序时调用，刷新整页
  setLayout = (layout, callback) => {
    this.setState({ layout }, () => {
      typeof callback === 'function' && callback();
    });
  };

  // 当修改时调用，刷新单个数据
  setActiveElement = (element, callback) => {
    const { activeElement } = this.context;
    let state = {};
    if (element !== activeElement) {
      state = { activeElement };
    }
    this.setState(state, () => {
      typeof callback === 'function' && callback();
    });
  };

  render() {
    const { layout, activeElement } = this.state;
    const { setLayout, setActiveElement } = this;
    return (
      <EditContext.Provider value={{ layout, setLayout, activeElement, setActiveElement }}>
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
    )
  }
}
