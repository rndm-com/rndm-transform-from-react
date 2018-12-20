import './polyfill';
import program from 'commander';
import example from './actions/example';
import * as examples from '../src/examples';

const name = 'rndm-from-react';

program
  .version('0.1.0')
  .description('RNDM Transform from React');

program
  .command('example')
  .option('--example <example>', `Select Example:\n - ${Object.keys(examples).join('\n - ')}\n`, e => e)
  .option('--file <file>', 'File to save to (should be a JSON file)', f => f)
  .option('--props <props>', 'JSON Stringified properties to pass to the example', p => JSON.parse(p || {}))
  .action(example);

program.parse(process.argv);
