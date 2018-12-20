import React from 'react';
import { get } from 'lodash';
import fs from 'fs';
import path from 'path';
import examples from '../../../src/examples';
import rndm from '../../../src';

const current = process.cwd();

const Null = () => null;

const getFile = (file) => {
  if (file) {
    const output = file.endsWith('.json') ? file : file + '.json';
    return path.resolve(output)
  }
  return path.join(current, 'example.json')
};

const processExample = (cmd = {}) => {
  const { file, example = 'react.basic', writes = true, props = {} } = cmd;
  const E = get(examples, example, Null);
  const output = rndm(<E {...props}/>);
  if (writes) fs.writeFileSync(getFile(file), JSON.stringify(output, null, 2));
  return output;
};

export default processExample;
