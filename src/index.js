import React from 'react';
import { pickBy, identity } from 'lodash';
import apply from './_utils/apply';
import defaultPlugins from './plugins.json';
import plugin from './_utils/plugin';

const rndm = (element) => {
  if (!element) return null;
  if (typeof element !== 'object') return element;
  if (Array.isArray(element)) return element.map(rndm);
  const { type, props } = element;
  if (typeof type === 'function' && element.$$typeof) {
    const Item = apply(type, props);
    if (typeof Item.type === 'function') {
      return rndm(Item)
    } else if (!type.displayName){
      return rndm(Item);
    } else {
      return rndm({ type, props });
    }
  }
  const { props: { children: propKids, ...otherProps } = {}, children: baseKids } = element;
  const kids = propKids || baseKids;
  const children = Array.isArray(kids) ? kids.map(rndm) : typeof kids === 'object' ? [rndm(kids)] : rndm(kids);
  return pickBy({
    type: typeof type === 'function' ? type.displayName : type,
    props: {
      ...otherProps,
      children,
    },
  }, identity)
};

export default rndm;

const addPlugins = (plugins = []) => plugins.forEach(p => {
  plugin(require(p).default)
});

addPlugins(defaultPlugins);

export {
  addPlugins,
}
