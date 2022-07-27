
const psw_reg = /(?=.*[0-9]|.*[a-zA-Z]).{6,30}/;
const phone_reg = /^1\d{10}$/;
const email_reg = /^([a-zA-Z0-9]+[_.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
const unit_number_reg = /\d(px|%|em|rem|vw|vh|pt)$/;

type validateFunction = (value: string, callback: (errMsg?: string) => void) => void;

export const isPassword:validateFunction = (value, callback) => {
  if (value.length < 6) return callback('请输入至少6位');
  if (!psw_reg.test(value)) return callback('密码必须包含字母、数字，至少6个字符，最多30个字符');
  callback();
};

export const isTel:validateFunction = (value, callback) => {
  if (phone_reg.test(value)) return callback('请输入正确的手机号码');
  callback();
};

export const isMail:validateFunction = (value, callback) => {
  if (email_reg.test(value)) return callback('请输入正确的邮箱');
  callback();
};

export const isPhoneOrMail:validateFunction = (value, callback) => {
  const isPhone = phone_reg.test(value);
  const isEmail = email_reg.test(value);
  if (!isPhone && !isEmail) return callback('请输入正确的手机号或邮箱');
  callback();
};

export function isNumberCode(len = 4):validateFunction {
  return (value, callback) => {
    const reg = new RegExp(`^\\d{${len}}$`);
    if (!reg.test(value)) return callback('请输入正确的验证码');
    callback();
  };
}

export function isUnitNumber(str: string): boolean {
  return unit_number_reg.test(str);
}
