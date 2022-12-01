import { typeOf } from 'utils/index'

/**
 * 日期转为字符串
 */
export function toDate (obj, format = 'yyyy-MM-dd') {
  if (obj instanceof Date) {
    return new Date(obj)
  } else if (typeof obj === 'string') {
    return stringToDate(obj, format)
  } else {
    throw new Error('请传入正确的日期对象')
  }
}

/**
 * 日期转为字符串
 */
export function dateToString (date, format = 'yyyy-MM-dd') {
  const d = toDate(date, format)
  let result = format
  const _config = {
    'y+': d.getFullYear(),
    'M+': d.getMonth() + 1, // 月
    'd+': d.getDate(), // 日
    'h+': d.getHours(), // 小时
    'm+': d.getMinutes(), // 分
    's+': d.getSeconds() // 秒
  }

  for (const reg in _config) {
    if (!new RegExp('(' + reg + ')').test(result)) continue
    const match = RegExp.$1
    let num = _config[reg] + ''
    while (num.length < match.length) {
      num = '0' + num
    }
    result = result.replace(match, num)
  }

  return result
}

/**
 * 日期转为字符串
 */
export function stringToDate (str, format = 'yyyy-MM-dd') {
  let args = [/y+/, /M+/, /d+/, /h+/, /m+/, /s+/]
  args = args.reduce((re, reg, index) => {
    const match = format.match(reg)
    const defaultValue = [1970, 0, 1, 0, 0, 0][index]
    if (!match) return re.concat([defaultValue])
    const flag = match.index
    let num = Number(str.slice(flag).match(/\d+/))
    if (index === 1) num -= 1 // 月份有别
    return re.concat([num])
  }, [])
  args.unshift(null)
  // eslint-disable-next-line new-parens
  return new (Date.bind.apply(Date, args))()
}

/**
 * 日期转简单对象
 */
export function dateToObject (date) {
  date = toDate(date)
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1, // 一月为 1
    date: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    day: (date.getDay() + 7) % 7, // 周日为 0，周一为 1
    quarter: (1 + date.getMonth() / 3) >> 0, // 季度
    week: (2 + (date.getDate() - date.getDay()) / 7) >> 0 // 本月第几周
  }
}

/**
 * 日期加减
 */
export function addDate (date, offset, dateType = 'date') {
  date = toDate(date)
  const _config = {
    year: 'FullYear',
    month: 'Month',
    date: 'Date',
    day: 'Date',
    hour: 'Hours',
    minute: 'Minutes',
    second: 'Seconds'
  }
  const _type = _config[dateType]
  const setFunc = date['set' + _type].bind(date)
  const getFunc = date['get' + _type].bind(date)
  return new Date(setFunc(getFunc() + offset))
}

/**
 * 返回初始化日期，比如今日零时等
 */
export function getSimpleDate (date, dateType = 'date') {
  date = toDate(date)
  const _config = {
    year: '1000000',
    month: '1100000',
    date: '1110000',
    day: '1110000',
    hour: '1111000',
    minute: '1111100',
    second: '1111110'
  }
  _config[dateType].split('').forEach(function (item, index) {
    if (item === '1') return
    index === 1 && date.setMonth(0)
    index === 2 && date.setDate(1)
    index === 3 && date.setHours(0)
    index === 4 && date.setMinutes(0)
    index === 5 && date.setSeconds(0)
    index === 6 && date.setMilliseconds(0)
  })
  return date
}

/**
 * 本月多少天（注意月份为 0-11 哈）
 */
export function getDayNumberInThisMonth (date, month, year) {
  month = (month || date.getMonth()) % 11
  const tempYear = (month / 11) >> 0 // month 可能会超出 11 则再加 1 年
  year = (year || date.getFullYear()) + tempYear
  const m = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  m[1] = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28
  return m[month]
}

/**
 * 获取该 周/月/年 的首日
 */
export function getFirstDate (date, dateType = 'date', offset) {
  offset = offset || 0
  date = toDate(date)
  if (dateType !== 'week') {
    date = getSimpleDate(date, dateType)
    return addDate(date, offset, 'date')
  } else {
    // 注，每周首日为周一，可用 offset 调节
    const over = -1 * date.getDay() + 1 + offset
    return addDate(date, over, 'date')
  }
}

/**
 * 获取两日期间所有日期的数组
 * 注意小时分数等会影响计算，最好用 getSimpleDate
 */
export function getArrayFromTwoDate (a, b, isSimpleDate) {
  const result = []
  const daySecond = 24 * 60 * 60 * 1000
  let start = Math.min(a, b)
  let target = Math.max(a, b)
  if (isSimpleDate) {
    start = getSimpleDate(start)
    target = getSimpleDate(target)
  }
  while (start < target) {
    start = new Date(+start + daySecond)
    result.push(start)
  }
  return result
}

/**
 * 倒计时
 * TimeCount().start(60, 1e3, (num) => console.log(60 - num), () => console.log('end'));
 */
export function TimeCount () {
  let timer = 0
  let now
  function start (target, delta, func, finish) {
    func && func(target)
    now = target
    timer = setInterval(() => {
      now = --target
      func && func(now)
      if (now <= 0) {
        stop()
        finish && finish()
      }
    }, delta)
    return this
  }
  function stop () {
    clearInterval(timer)
    return this
  }
  return { start, stop }
}

/**
 * 获取星期几（注意周日为 0）
 * getWeekName(0, null, 1);  offset 可让 date=0 为周一
 */
export function getWeekName (date, strType, offset) {
  let _config = '日,一,二,三,四,五,六'.split(',')
  if (strType === 1) _config = '周日,周一,周二,周三,周四,周五,周六'.split(',')
  else if (strType === 2) _config = '星期日,星期一,星期二,星期三,星期四,星期五,星期六'.split(',')
  else if (strType === 3) _config = 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(',')
  else if (strType === 4) _config = 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(',')
  else if (typeOf(strType) === 'array') _config = strType

  offset = offset || 0
  let day = toDate(date).getDay()
  day = (day + offset) % 6
  return _config[day]
}

export default {
  dateToString,
  stringToDate,
  dateToObject,
  addDate,
  getSimpleDate,
  getDayNumberInThisMonth,
  getFirstDate,
  getArrayFromTwoDate,
  TimeCount,
  getWeekName
}
