import uuid from 'uuid';
import { merge } from 'lodash';

export function init(data = {}) {
  const defaultData = {
    id: `text-${uuid()}`,
    type: 'text',
    name: '文本',
    content: '请输入文本',
    props: {},
    css: {},
  };
  return merge(data, defaultData);
}
