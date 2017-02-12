/* eslint no-nested-ternary: "off",
          no-multiple-empty-lines: "off",
          max-len: "off",
          no-use-before-define: "off",
          arrow-body-style: "off"
*/
// it's a lot of turning off
// "max-len" and "multiple-empty-lines" just for now, I'll strip it

// "neste-ternary" is a style I use... so, do you think it's good: locanic, easy-to-read, clearly obvious how branches structured...
// ... or bleeding eyes? Tho if there is no another way of doing same => only through nested ifs, then I think this style is bloody good
// (lisp-way! hehe! kind of structural homoiconicity! whoho!)

// "no-use-before-define" is a problem to solve, tho I don't want to do it right now, I want it just to work first
// "arrow-body-style" I commented in place
import fs from 'fs';
import _ from 'lodash';

const getType = it => typeof it === 'object' ? 'complex' : 'simple';
const getStatus = (f, s) => {
  const ftype = getType(f);
  const stype = getType(s);
  return ftype === stype && ftype !== 'simple' ? 'unchanged' :
         s === undefined ? 'removed' :
         f === undefined ? 'added' :
         ftype === 'simple' && f === s ? 'unchanged' :
         'changed';
};

const genChildren = (f, s) => {
  const keys = _.union(Object.keys(f), Object.keys(s));

  // LOOKKIRILL how to deal with arrow funcs just returning maps ? linter screams on 'no need of curly brackets',
  // but in 'no-curly'-way I can't return map, it's being read as body :/
  // ... if airbnb-bale for ES5 then nevermind, tho if for ES6 they in need of patch
  const chlds = keys.map((key) => {
    return { ...gen(f[key], s[key]), key };
  });
  console.log(`chlds generated: ${chlds}`);
  return chlds;
};

const gen = (f, s) => {
  const ftype = getType(f);
  const stype = getType(s);
  const status = getStatus(f, s);

  // hold on there!
  return status === 'changed' ? { status, oldValue: f, newValue: s } :
         status === 'added' && stype === 'simple' ? { status, newValue: s } :
         status === 'added' && stype === 'complex' ? { status, children: genChildren(s, s) } :
         status === 'removed' && stype === 'simple' ? { status, oldValue: f } :
         status === 'removed' && stype === 'complex' ? { status, children: genChildren(f, f) } :
         status === 'unchanged' ? ftype === 'simple' ? { status, oldValue: f } :
                                  ftype === 'complex' ? { status, children: genChildren(f, s) } :
                                  'status: unchanged, type: one hell of a dumb type' :
         `wow, the status of node is really weird!\n its: ${status}`;
};

const pairToText = (key, val) => `${key}: ${val}\n`;
const diffToText = (t) => {
  const newValue = _.get(t, 'newValue');
  const oldValue = _.get(t, 'oldValue');
  const key = _.get(t, 'key');
  return _.has(t, 'children') ? `{\n${_.get(t, 'children').map(node => diffToText(node)).reduce((acc, el) => `${acc}${el}`)}}` :
                                _.get(t, 'status') === 'removed' ? `  - ${pairToText(key, oldValue)}` :
                                _.get(t, 'status') === 'added' ? `  + ${pairToText(key, newValue)}` :
                                _.get(t, 'status') === 'unchanged' ? `    ${pairToText(key, oldValue)}` :
                                `${diffToText({ status: 'added', key, newValue })}${diffToText({ status: 'removed', key, oldValue })}`;
};

export default (first, second) => {
  const fobj = JSON.parse(fs.readFileSync(first, 'utf8'));
  const sobj = JSON.parse(fs.readFileSync(second, 'utf8'));

  const astDiff = gen(fobj, sobj);
  const strDiff = diffToText(astDiff);

  return strDiff;
};























































// OLD CODE HERE, NO NEED TO LOOK, I'll STRIP IT, PROMISE :grin:
// SECOND TRY
// const getType = it => typeof it !== 'object' ? 'simple' :
//       Array.isArray(it) ? 'array' :
//       'map';
// const getStatus = (f, s) => {
//   const ftype = getType(f);
//   const stype = getType(s);
//   return ftype === stype && ftype !== 'simple' ? 'unchanged' :
//          s === undefined ? 'removed' :
//          f === undefined ? 'added' :
//          ftype === 'simple' && f === s ? 'unchanged' :
//          'changed';
// };
// 
// const genChildren = (f, s) => {
//   const ftype = getType(f);
//   const stype = getType(s);
//   if (ftype !== stype) {
//     throw { reason: 'cant generate childs from different types', ftype, stype };
//   }
// 
//   if (ftype === 'map') {
//     const keys = _.union(Object.keys(f), Object.keys(s));
// 
//     const chlds = keys.map((key) => {
//       console.log(`key now: ${key}`)
//       console.log(`genned:${gen(f[key], s[key])}`);
//       return { ...gen(f[key], s[key]), key };
//     });
//     console.log(`chlds generated: ${chlds}`);
//     return chlds;
//   }
// };
// 
// const gen = (f, s) => {
//   const type = getType(f);
//   const status = getStatus(f, s);
// 
//   return status === 'changed' ? { status, oldValue: gen(f, f), newValue: gen(s, s) } :
//          status === 'added' ? { status, newValue: gen(s, s) } :
//          status === 'removed' ? { status, oldValue: gen(f, f) } :
//          status === 'unchanged' ? type === 'simple' ? { status, type, oldValue: f } :
//                                   type === 'map' ? { status, type, children: genChildren(f, s) } :
//                                   'status: unchanged, type: one hell of a dumb type' :
//          `wow, the status of node is really weird!\n it's: ${status}`;
// };
// 
// export default (first, second) => {
//   const fobj = JSON.parse(fs.readFileSync(first, 'utf8'));
//   const sobj = JSON.parse(fs.readFileSync(second, 'utf8'));
// 
//   const astDiff = gen(fobj, sobj);
// 
//   return astDiff;
// };
































































// // tree may contain only those types, so not count as 'hardcoded'
// const type = it => typeof it !== 'object' ? 'value' :
//                      Array.isArray(it) ? 'array' :
//                      'map';
// 
// 
// const status = (f, s) => {
//   const ftype = type(f);
//   const stype = type(s);
//   return ftype === stype ? 'same' :
//          s === undefined ? 'removed' :
//          f === undefined ? 'added' :
//          'modified';
// };
// 
// export const gen = (f, s) => {
//   const stat = status(f, s);
//   const ftype = type(f);
//   const stype = type(s);
//   return stat === 'modified' ? { stat, from: gen(f, f), to: gen(s, s) } :
//          stat === 'added' ? { stat, type: stype, val: gen(s, s) } :
//          stat === 'removed' ? { stat, type: ftype, val: gen(f, f) } :
//          stat === 'same' // < ended here
// };
// 
// 
// 
// 
// 
// 
// // ----------------------------- previous try below
// // NO ENTER WITH EYES OPENED
// const isDifferentType = (f, s) =>
//       (typeof f !== typeof s && typeof f !== undefined && typeof s !== undefined) ||
//       (Array.isArray(f) && !Array.isArray(s)) ||
//       (!Array.isArray(f) && Array.isArray(s));
// 
// const diff = (f, s) =>
//     f === s ? { status: 'same', value: f } :
//     s === undefined ? { status: 'removed', value: f } :
//     f === undefined ? { status: 'added', value: s } :
//     { status: 'modified', from: gen(f, f), to: gen(s, s)};
// 
// 
// export const genold = (f, s) => {
//   if (isDifferentType(f, s)) { return diff(f, s); }
// 
//   // TODO place array branch here
//   if (typeof f === 'object') {
//     const ks = _.union(Object.keys(f), Object.keys(s));
// 
//     const entries = ks.map((key) => {
//       const state = gen(f[key], s[key]);
//       return { key, state };
//     });
// 
//     return { type: 'map', entries };
//   }
// 
//   return diff(f, s); };
// 
// 
//   // TODO that's a dumb realisation only to pass step2
// export const diffToText = (d) => {
//   const elmts = d.map((el) => null)
//         
// };
// // -----------------------------
// 
// export default (first, second) => {
//   const fobj = JSON.parse(fs.readFileSync(first, 'utf8'));
//   const sobj = JSON.parse(fs.readFileSync(second, 'utf8'));
// 
//   const astDiff = gen(fobj, sobj);
// 
//   return astDiff;
// };
