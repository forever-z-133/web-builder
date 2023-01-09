
// 数据类型
export const enum DataType {
  string, // 字符串
  boolean, // 布尔值
  number, // 数字
  array, // 数组
  object, // 对象
  date, // 日期
}

// 数据来源
export const enum DataSource {
  create, // 自定义创建
  location, // 页面链接
  request, // 请求
  argument, // 流程入参
}

// 字符串数据处理类型
export const enum StringDataHandleType {
  add, // 拼凑
  slice, // 截取
}

// 布尔值数据处理类型
export const enum BooleanDataHandleType {
  and, // 与
  or, // 或
  not, // 非
}

// 数字数据处理类型
export const enum NumberDataHandleType {
  add, // 加
  minus, // 减
  multi, // 乘
  divide, // 除
}

// 数字数据处理类型
export const enum ArrayDataHandleType {
  each,
  every,
  some,
  map,
  filter,
}

export type NodeId = string

// 节点类型
export const enum NodeType {
  data, // 数据节点
  handle, // 数据处理节点
  component, // 组件节点
  sdk, // 系统方法节点
  process, // 流程分支节点
}

// 节点行为类型
export const enum NodeActType {
  set, // 设置状态
  get, // 获取状态
  event, // 响应事件
  action, // 自身功能
}

export type NodeLinkId = string
