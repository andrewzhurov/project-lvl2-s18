/* eslint-disable */
import gendiff, { gen, diffToText } from '../src';
test('gendiff test json', () => {
  const out = '{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  + verbose: true\n}';
    expect(gendiff('__tests__/data/before.json', '__tests__/data/after.json')).toBe(out);
});

test('gendiff test from yaml', () => {
  const out = '{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  + verbose: true\n}';
  expect(gendiff('__tests__/data/before.yaml', '__tests__/data/after.yml')).toBe(out);
});

test('gendiff test from ini', () => {
  const out = '{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  + verbose: true\n}';
  expect(gendiff('__tests__/data/before.ini', '__tests__/data/after.ini')).toBe(out);
});














































// test('gen flat map test, no arrays', () => {
//   const f = { one: 'one', two: 'two', kangaroo: 'kangaroo' };
//   const s = { one: 'one', three: 'three', kangaroo: 'roorooroo!' };
//   // const diff = { one: { same: 'one' },
//   //                two: { removed: 'two' },
//   //                three: { added: 'three' },
//   //                kangaroo: { modified: { from: 'kangaroo', to: 'roorooroo!' } },
//   //              };
//   const diff = { status: 'same',
//                  type: 'map',
//                  entries: [{ status: 'same', key: 'one', val: { type: 'simple', raw: 'one' } },
//                            { status: 'removed', key: 'two', val: { type: 'simple', raw: 'two' } },
//                            { status: 'modified', from: { key: 'kangaroo', val: { type: 'simple', raw: 'kangaroo' } }, to: { key: 'kangaroo', val: { type: 'simple', raw: 'roorooroo!' } } },
//                            { status: 'added', key: 'three', val: { type: 'simple', raw: 'three' } }] };
// 
//   expect(gen(f, s)).toEqual(diff);
// });
// 
// test('gen typemodification test', () => {
//   const f = [];
//   const s = {};
//   const diff = { status: modified, from: { status: 'same', type: 'array', entries: [] }, to: { status: 'same', type: 'map', entries: [] } };
// 
//   expect(gen(f, s)).toEqual(diff);
// });
// 
// test('diffToText simple test', () => {
//   const diff = { num: { modified: { from: 1, to: 2 } } };
//   const text = '{\n  + num: 2\n  - num: 1\n}';
// 
//   expect(diffToText(diff)).toBe(text);
// });

// test('diffToText test complex', () => {
//   const diff = { pairs: [{m: {same: 'John'},
//                           w: {modified: {from: 'Sarah',
//                                          to: 'Jessy'}}},
//                          {removed: {m: 'Danny',
//                                     w: 'Betty'}},
//                          {added: {m: 'Bob',
//                                   w: 'Veronica'}},
//                         ],
//                  single: [{added: 'Sarah'},
//                           {removed: 'Jessy'},
//                           {added: 'Danny'},
//                           {added: 'Betty'},
//                           {removed: 'Bob'},
//                           {removed: 'Veronica'},
//                          ],
//                }
//
//   const text = '{\n\t'
// };
 

// fn gen [in]
// map? in => {(keys in) (map gen (vals in))}
// seq? in => map gen in
// val! => return {state}

// fn gen [in1 in2]
// if map? in1
//    if map? in2
//       {keys : map gen vals}
//       {removed: in1}
//    if map? in2
//       {added: in2}
//
// if seq? in1
//    if seq? in2
//       map gen vals
//       {removed: in1}
//    if seq? in2
//       {added: in2}
//
// val!
//      diff in1 in2
 
//fn gen [in1 in2]
// when (type1 !== type2) => diff in1 in2
// 
// case (type in1)
//      map => {keys : map gen vals}
//      seq => map gen vals
//      else => 

// diff [in1 in2]
// cond
//      (= in1 in2) {:same in1}

// {key val} [val val] val
