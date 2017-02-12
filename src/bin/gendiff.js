#!/usr/bin/env node
// @flow
import program from 'commander';
import gendiff from '../index';

program
  .version('0.0.1')
  .arguments('<first_config> <second_config>')
  .action((f, s) => {
    console.log(gendiff(f, s, program.format));
  })
  .option('-f, --format [type]', 'Output format', 'json')
  .parse(process.argv);
