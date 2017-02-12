import parseJSON from './json';
import parseYAML from './yaml';

export default (path) => {
  const extension = path.split('.').pop();
  switch (extension) {
    case 'json':
      return parseJSON(path);
    case 'yaml':
      return parseYAML(path);
    case 'yml':
      return parseYAML(path);
    default:
    // TODO throw an exception here
      return 'blablabl';
  }
};
