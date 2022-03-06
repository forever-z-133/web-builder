/**
 * 合并 className
 */
export * as classnames from 'classnames';

/**
 * 判断数据类型
 */
export function typeOf(obj) {
  let typeStr = Object.prototype.toString.call(obj).split(' ')[1];
  return typeStr.substr(0, typeStr.length - 1).toLowerCase();
}
export function isType(obj, type) {
  return typeOf(obj) === type;
}

/**
 * 驼峰或连字符
 */
export function hyphenate(str) {
  return str.replace(/\B([A-Z])/g, '-$1').toLowerCase();
}
export function camelize(str) {
  return str.toLowerCase().replace(/-(\w)/g, (_, s) => (s ? s.toUpperCase() : ''));
}

/**
 * 判断对象是否为空
 */
export function isEmpty(obj) {
  if (typeof obj === 'number' && isNaN(obj)) return true;
  if (typeof obj !== 'number' && !obj) return true;
  for (const key in obj) if ({}.hasOwnProperty.call(obj, key)) return false;
  return true;
}

export function removeNull(obj) {
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (value === null || value === undefined) {
        delete obj[key];
      }
    }
  }
}

/**
 * 自动补零
 */
export function addZero(num, len = 2) {
  let numLen = (num + '').length;
  while (numLen++ < len) {
    num = '0' + num;
  }
  return num + '';
}

/**
 * 随机数
 */
export function random(n1 = 1, n2 = 0) {
  const min = Math.min(n1, n2);
  const max = Math.max(n1, n2);
  return min + Math.random() * (max - min);
}
export function randomInt(n1 = 1, n2 = 0) {
  return random(n1, n2) >> 0;
}

/**
 * 返回非空对象
 * returnObject({});  // null
 */
export function returnObject(obj) {
  if (isEmpty(obj)) return null;
  for (const key in obj) if (Object.hasOwnProperty.call(obj, key)) return obj;
  return obj;
}

/**
 * 返回可用数组
 */
export function returnArray(obj) {
  if (typeof obj === 'string' && obj) return obj.split(',');
  if (typeOf(obj) === 'array') return obj;
  return [];
}

/**
 * 返回可用数字
 */
export function returnNumber(...args) {
  for (let i = 0; i < args.length; i++) {
    const item = args[i];
    const _item = parseFloat(item);
    if (!isNaN(_item)) return _item;
  }
  return NaN;
}

/**
 * 拓展 toFixed 方法
 * 1. 小数亦可有结尾的取整策略，toFixed(1.69, 1, 'round');  // 1.7
 * 2. 修复 166.665.toFixed(2) 不等于 166.67 的问题
 * 3. 返回的不再是字符串，而是数字类型
 */
export function toFixed(num, decimal, mathType) {
  if (isNaN(parseFloat(decimal))) throw new Error('第二位入参有误');
  if (!Math[mathType]) throw new Error('第三位入参有误');

  decimal = decimal != null ? decimal : 2;
  mathType = mathType || 'round'; // ceil 向上取整， floor 向下取整，round 四舍五入

  const pow = Math.pow(10, decimal);
  const mathFunc = Math[mathType];
  return mathFunc(num * pow) / pow;
}

/**
 * 对象转字符串
 * {a:1,b:2} 转为 a=1&b=2
 */
export function objectToString(obj, divide = '&', concat = '=') {
  let result = [];
  for (let key in obj) {
    if (!Object.hasOwnProperty.call(obj, key)) continue;
    let value = obj[key];
    if (value === null || value === undefined) value = '';
    result.push(encodeURIComponent(key) + concat + encodeURIComponent(value));
  }
  result = result.join(divide);
  return result;
}

/**
 * 字符串转对象
 * a=1&b=2 转为 {a:1,b:2}
 */
export function stringToObject(str, divide = '&', concat = '=') {
  if (!str || typeof str !== 'string') return {};
  const arr = str.split(divide);
  return arr.reduce((re, item) => {
    if (!item) return re;
    const temp = item.split(concat);
    const key = temp.shift().trim();
    let value = temp.join(concat).trim();
    if (!key) return re;
    if (['null', 'undefined'].indexOf(value) > -1) value = undefined;
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    re[key] = value;
    return re;
  }, {});
}

/**
 * 对象深拷贝
 */
export function getDataFromUrl(name, url = window.location.href) {
  const obj = stringToObject(url.split('?')[1], /[#?&]/);
  return name ? obj[name] : obj;
}

/**
 * 对象深拷贝
 * addDataToUrl('x.html?a=1', {b:2}) // x.html?a=1&b=2
 */
export function addDataToUrl(url, data) {
  if (!data) return url;
  const concat = /\?/.test(url) ? '&' : '?';
  if (typeof data === 'string') {
    return url + concat + data;
  } else if (typeOf(data) === 'object') {
    return url + concat + objectToString(data);
  } else {
    throw new Error('入参有误');
  }
}

// 节流，不断操作无效，只有停止操作 delta 秒后才触发
export function debounce(fn, delta, context) {
  let timeoutID = null;
  return (...args) => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      fn.apply(context, args);
    }, delta);
    return timeoutID;
  };
}

// 去抖，每隔 delta 秒时触发
export function throttle(fn, delta, context) {
  let safe = true;
  let lastValue = undefined;
  return (...args) => {
    lastValue = args;
    if (!safe) return;
    fn.apply(context, args);
    safe = false;
    setTimeout(() => {
      safe = true;
      fn.apply(context, lastValue);
    }, delta);
  };
}

/**
 * 缓存同步运算结果
 */
export function useCache(fn) {
  const cache = {};
  return function (...args) {
    const key = args.length + JSON.stringify(args);
    if (key in cache) return cache[key];
    else return (cache[key] = fn.apply(this, args));
  };
}

/**
 * 偏函数
 */
function partial(func, ...rawArgs) {
  return function (...args) {
    return func.call(this, ...rawArgs, ...args);
  };
}

/**
 * json 字符串转化
 */
function jsonStringify(obj) {
  let str = JSON.stringify(obj);
  if (![null, undefined, 'null', 'undefined'].some(x => x === str)) return str;
  return JSON.stringify('');
}
function jsonParse(str) {
  let obj;
  try {
    obj = JSON.parse(str);
  } catch (err) {
    // JSON.parse 不成功
  }
  if (![null, undefined, 'null', 'undefined'].some(x => x === obj)) return obj;
  return undefined;
}

/**
 * 缓存相关
 */
function Store(type, method, key, value = '') {
  const store = window[`${type}Storage`];
  if (value === 'null' || value === 'undefined') value = '';
  if (method === 'setItem') {
    if (value === null) value = '';
    store.setItem(key, jsonStringify(value));
  } else if (method === 'getItem') {
    return jsonParse(store.getItem(key));
  } else {
    store[method](key, value);
  }
}
const LocalStore = partial(Store, 'local');
export function setLocal(key, value) {
  return LocalStore('setItem', key, value);
}
export function getLocal(key) {
  return LocalStore('getItem', key);
}
export function removeLocal(key) {
  return LocalStore('removeItem', key);
}
export function clearLocal() {
  return LocalStore('clear');
}

export function sleep(delay) {
  return new Promise(resolve => {
    const timer = setTimeout(() => {
      resolve(timer);
    }, delay);
  });
}
