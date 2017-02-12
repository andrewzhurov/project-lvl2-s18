import read from 'read-yaml';

export default path => read.sync(path);
