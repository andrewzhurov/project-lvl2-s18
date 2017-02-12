import fs from 'fs';
import ini from 'ini';

export default path => ini.parse(fs.readFileSync(path, 'utf8'));
