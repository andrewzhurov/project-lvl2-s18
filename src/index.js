/* eslint no-nested-ternary: "off" */
import fs from 'fs';
import _ from 'lodash';

// tree may contain only those types, so not count as 'hardcoded'
const type = it => typeof it !== 'object' ? 'value' :
                     Array.isArray(it) ? 'array' :
                     'map';


const status = (f, s) => {
  const ftype = type(f);
  const stype = type(s);
  return ftype === stype ? 'same' :
         s === undefined ? 'removed' :
         f === undefined ? 'added' :
         'modified';
};

export const gen = (f, s) => {
  const stat = status(f, s);
  const ftype = type(f);
  const stype = type(s);
  return stat === 'modified' ? { stat, from: gen(f, f), to: gen(s, s) } :
         stat === 'added' ? { stat, type: stype, val: gen(s, s) } :
         stat === 'removed' ? { stat, type: ftype, val: gen(f, f) } :
         stat === 'same' // < ended here
};






// ----------------------------- previous try below
// NO ENTER WITH EYES OPENED
const isDifferentType = (f, s) =>
      (typeof f !== typeof s && typeof f !== undefined && typeof s !== undefined) ||
      (Array.isArray(f) && !Array.isArray(s)) ||
      (!Array.isArray(f) && Array.isArray(s));

const diff = (f, s) =>
    f === s ? { status: 'same', value: f } :
    s === undefined ? { status: 'removed', value: f } :
    f === undefined ? { status: 'added', value: s } :
    { status: 'modified', from: gen(f, f), to: gen(s, s)};


export const genold = (f, s) => {
  if (isDifferentType(f, s)) { return diff(f, s); }

  // TODO place array branch here
  if (typeof f === 'object') {
    const ks = _.union(Object.keys(f), Object.keys(s));

    const entries = ks.map((key) => {
      const state = gen(f[key], s[key]);
      return { key, state };
    });

    return { type: 'map', entries };
  }

  return diff(f, s); };


  // TODO that's a dumb realisation only to pass step2
export const diffToText = (d) => {
  const elmts = d.map((el) => null)
        
};
// -----------------------------

export default (first, second) => {
  const fobj = JSON.parse(fs.readFileSync(first, 'utf8'));
  const sobj = JSON.parse(fs.readFileSync(second, 'utf8'));

  const astDiff = gen(fobj, sobj);

  return astDiff;
};
