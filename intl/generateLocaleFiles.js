/* eslint-disable no-console */
import {transformFile} from '@babel/core';
import glob from 'glob';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('.babelrc'));

const options = {
  ...config,
  plugins: [
    'react-intl',
    ...config.plugins,
  ],
};

const messages = [];

const processMessages = (x) => {
  messages.push(...x);
};

const done = () => {
  const data = messages.map(({description, id, defaultMessage}) => {
    return [
      `# ${description}`,
      `${id}: ${defaultMessage}`,
    ].join('\n');
  }).join('\n\n');

  fs.writeFileSync(
    './intl/messages/default.yml',
    data,
  );
};

glob('./src/component/**/*.js', (err, matches) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  let count = matches.length;
  matches.forEach((file) => {
    transformFile(file, options, (err, result) => {
      --count;
      if (!err) {
        processMessages(result.metadata['react-intl'].messages.map((x) => ({
          ...x,
          file,
        })));
      }
      if (count === 0) {
        done();
      }
    });
  });
});
