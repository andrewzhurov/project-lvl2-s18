import _ from 'lodash';
import parse from './parsers';

const getStatus = (fElement, sElement) => {
  if ((_.isObject(fElement) && _.isObject(sElement)) || (fElement === sElement)) {
    return 'unchanged';
  }
  if (sElement === undefined) {
    return 'removed';
  }
  if (fElement === undefined) {
    return 'added';
  }

  return 'changed';
};

const gen = (fElement, sElement) => {
  const status = getStatus(fElement, sElement);

  const genChildren = (ft, sd) => {
    const keys = _.union(Object.keys(ft), Object.keys(sd));

    return keys.map(key => ({ ...gen(ft[key], sd[key]), key }));
  };

  switch (status) {
    case 'changed':
      return { status, oldValue: fElement, newValue: sElement };
    case 'added':
      return _.isObject(sElement) ? { status, children: genChildren(sElement, sElement) } :
                                    { status, newValue: sElement };
    case 'removed':
      return _.isObject(sElement) ? { status, children: genChildren(fElement, fElement) } :
                                    { status, oldValue: fElement };
    case 'unchanged':
      return _.isObject(fElement) ? { status, children: genChildren(fElement, sElement) } :
                                    { status, oldValue: fElement };
    default: return 'neverappearing type appeared';
  }
};

const pairToText = (key, val) => `${key}: ${val}\n`;
const diffToText = (t) => {
  const newValue = t.newValue;
  const oldValue = t.oldValue;
  const key = t.key;
  if (t.children) {
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
  const fobj = parse(first);
  const sobj = parse(second);

  const astDiff = gen(fobj, sobj);
  const strDiff = diffToText(astDiff);

  return strDiff;
};
