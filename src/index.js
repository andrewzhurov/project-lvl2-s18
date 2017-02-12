import fs from 'fs';
import _ from 'lodash';

const getType = it => typeof it === 'object' ? 'complex' : 'simple';
const getStatus = (f, s) => {
  const ftype = getType(f);
  const stype = getType(s);
  if (ftype === stype && ftype !== 'simple') {
    return 'unchanged';
  }
  if (s === undefined) {
    return 'removed';
  }
  if (f === undefined) {
    return 'added';
  }
  if (ftype === 'simple' && f === s) {
    return 'unchanged';
  }

  return 'changed';
};

const gen = (f, s) => {
  const ftype = getType(f);
  const stype = getType(s);
  const status = getStatus(f, s);

  const genChildren = (ft, sd) => {
    const keys = _.union(Object.keys(ft), Object.keys(sd));

    return keys.map(key => ({ ...gen(ft[key], sd[key]), key }));
  };


  switch (status) {
    case 'changed':
      return { status, oldValue: f, newValue: s };
    case 'added':
      return stype === 'simple' ? { status, newValue: s } : { status, children: genChildren(s, s) };
    case 'removed':
      return stype === 'simple' ? { status, oldValue: f } : { status, children: genChildren(f, f) };
    case 'unchanged':
      return ftype === 'simple' ? { status, oldValue: f } : { status, children: genChildren(f, s) };
    default: return 'neverappearing type appeared';
  }
};

const pairToText = (key, val) => `${key}: ${val}\n`;
const diffToText = (t) => {
  const newValue = t.newValue;
  const oldValue = t.oldValue;
  const key = t.key;
  if (t.children && t.children.length > 0) {
    return `{\n${t.children.map(node => diffToText(node)).reduce((acc, el) => `${acc}${el}`)}}`;
  }
  switch (t.status) {
    case 'removed':
      return `  - ${pairToText(key, oldValue)}`;
    case 'added' :
      return `  + ${pairToText(key, newValue)}`;
    case 'unchanged':
      return `    ${pairToText(key, oldValue)}`;
    case 'changed':
      return `${diffToText({ status: 'added', key, newValue })}${diffToText({ status: 'removed', key, oldValue })}`;
    default:
      return 'again that neverappearing type here!';
  }
};

export default (first, second) => {
  const fobj = JSON.parse(fs.readFileSync(first, 'utf8'));
  const sobj = JSON.parse(fs.readFileSync(second, 'utf8'));

  const astDiff = gen(fobj, sobj);
  const strDiff = diffToText(astDiff);

  return strDiff;
};
