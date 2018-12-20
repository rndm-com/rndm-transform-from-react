import React from 'react';
import plugins from '../plugins.json';
import * as react from './react';

const initial = {
  react,
};

const examples = plugins.reduce((o, i) => {
  const required = require(i);
  const { key } = required.default;
  return Object.assign(o, {
    [key]: required.Examples || {}
  })
}, initial);

export default examples;
