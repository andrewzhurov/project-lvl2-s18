const fs = require('fs');

export default (first, second, format) => {
  const obj = JSON.parse(fs.readFileSync(first, 'utf8'));
  return obj;
};
