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
