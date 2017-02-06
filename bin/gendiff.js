#!/usr/bin/env node
// @flow
const program = require('commander');

let firstConfig;
let secondConfig;

program
  .version('0.0.1')
  .arguments('<first_config> <second_config>')
  .action((f, s) => {
    firstConfig = f;
    secondConfig = s;
  })
  .option('-f, --format [type]', 'Output format', 'json')
  .parse(process.argv);

console.log('You wonder of diff between:');
console.log(`first_config - ${firstConfig}`);
console.log(`second_config - ${secondConfig}`);
console.log(`Output in '${program.format}' format`);
