#!/usr/bin/env node
// @flow
import program from 'commander';
import core from '../index';

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

console.log(core(firstConfig, secondConfig, program.format));
