import path from 'path';

export default (componentName, {filename, cwd}) => {
  const result = path.relative(cwd, path.dirname(filename));
  return result.replace(/^src/, '');
};
