import uuid from 'uuid';
import merge from 'lodash/merge';

export function init(data = {}) {
  const defaultData = {
    id: `image-${uuid()}`,
    type: 'image',
    name: '图片',
    content: '',
    props: {},
    css: {}
  };
  return merge(data, defaultData);
}
