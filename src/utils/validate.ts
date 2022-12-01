
const pswReg = /(?=.*[0-9]|.*[a-zA-Z]).{6,30}/
const phoneReg = /^1\d{10}$/
const emailReg = /^([a-zA-Z0-9]+[_.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
const unitNumberReg = /\d(px|%|em|rem|vw|vh|pt)$/

type validateFunction = (value: string, fallback: (errMsg?: string) => void) => void

export const isPassword: validateFunction = (value, fallback) => {
  if (value.length < 6) return fallback('请输入至少6位')
  if (!pswReg.test(value)) return fallback('密码必须包含字母、数字，至少6个字符，最多30个字符')
  fallback()
}

export const isTel: validateFunction = (value, fallback) => {
  if (phoneReg.test(value)) return fallback('请输入正确的手机号码')
  fallback()
}

export const isMail: validateFunction = (value, fallback) => {
  if (emailReg.test(value)) return fallback('请输入正确的邮箱')
  fallback()
}

export const isPhoneOrMail: validateFunction = (value, fallback) => {
  const isPhone = phoneReg.test(value)
  const isEmail = emailReg.test(value)
  if (!isPhone && !isEmail) return fallback('请输入正确的手机号或邮箱')
  fallback()
}

export function isNumberCode (len = 4): validateFunction {
  return (value, fallback) => {
    const reg = new RegExp(`^\\d{${len}}$`)
    if (!reg.test(value)) return fallback('请输入正确的验证码')
    fallback()
  }
}

export function isUnitNumber (str: string): boolean {
  return unitNumberReg.test(str)
}
