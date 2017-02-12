#!/usr/bin/env node
// @flow
import program from 'commander';
import util from 'util';
import gendiff from '../index';

program
  .version('0.0.1')
  .arguments('<first_config> <second_config>')
  .action((f, s) => {
    console.log(util.inspect(gendiff(f, s, program.format), { showHidden: false, depth: null }));
  })
  .option('-f, --format [type]', 'Output format', 'json')
  .parse(process.argv);
