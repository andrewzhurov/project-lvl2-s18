[![Code Climate](https://codeclimate.com/github/broose/project-lvl2-s18/badges/gpa.svg)](https://codeclimate.com/github/broose/project-lvl2-s18)
[![Test Coverage](https://codeclimate.com/github/broose/project-lvl2-s18/badges/coverage.svg)](https://codeclimate.com/github/broose/project-lvl2-s18/coverage)
[![Issue Count](https://codeclimate.com/github/broose/project-lvl2-s18/badges/issue_count.svg)](https://codeclimate.com/github/broose/project-lvl2-s18)

[![Build Status](https://travis-ci.org/broose/project-lvl2-s18.svg?branch=master)](https://travis-ci.org/broose/project-lvl2-s18)

# Gendiff
A good one structure differ


#Installation
`$ npm install -g broose_gendiff`

#Usage
`$ gendiff -h` for help

`$ gendiff before.json after.json` to see the difference
##As library
`$ npm install -s broose_gendiff`
###ES6
`import gendiff from 'gendiff'`

`gendiff(path1, path2)`
###ES5
`const gendiff = require('gendiff').default;`

`gendiff(path1, path2);`
