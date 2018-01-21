import {join, isAbsolute} from 'path';
import fs from 'fs';

import {pipe, uniq, map, filter, concat} from 'ramda';
import compact from 'lodash/fp/compact';

import chalk from 'chalk';
import {ContextReplacementPlugin} from 'webpack';
import {plugin, alias, loader} from 'webpack-partial';
import localeEmoji from 'locale-emoji';

export default ({messagesDir = 'intl/messages'} = {}) => (config) => {
  const messagesDirPath = isAbsolute(messagesDir)
    ? messagesDir
    : join(config.context, messagesDir);

  // Infer the current available locales from the names of the files within the
  // `/locale` directory. This way the current locales are automatically parsed
  // and can be referenced from within the build.
  const localeFiles = filter((name) => {
    return /^[a-z]{2}(-[a-z0-9]{2})?\..*$/i.test(name);
  }, fs.readdirSync(messagesDirPath));

  const locales = pipe(
    map((file) => {
      return /^[a-z]{2}(-[a-z0-9]{2})?/i.exec(file)[0];
    }),
    concat(['en-US']),
    uniq,
  )(localeFiles);

  // Define a default locale, use the env `DEFAULT_LOCALE` if it is among the
  // parsed available locales, otherwise fall back to the default `en`.
  // const defaultLocale = find(eq(process.env.DEFAULT_LOCALE), locales)
  //  || locales[0];

  // Parse the current languages from the current locales by removing the
  // country codes from the locale identifiers. React intl locale-data polyfill
  // modules are defined only by language, not country as well.
  const languages = pipe(map((locale) => locale.split('-')[0]), uniq)(locales);

  // React intl bundles `en` language data by default, so we never want to
  // include id separately.
  // const reactIntlLanguages = reject(eq('en'), languages);

  console.log(`🌐  ${chalk.bold('Build Locales')}\n${pipe(
    map((locale) => `   ${locale} ${localeEmoji(locale)}`),
    compact,
    uniq,
  )(locales).join('\n')}`);

  return pipe(
    // Alias React Intl and Intl to versions that do not bundle all locale
    // data by default.
    alias('react-intl$', require.resolve('react-intl/dist/react-intl.js')),
    alias('intl$', require.resolve('intl/lib/core.js')),
    plugin(new ContextReplacementPlugin(/^react-intl\/locale-data/, (x) => {
      x.regExp = new RegExp(languages.join('|'));
      x.chunkName = 'intl-react-[request]';
    })),
    plugin(new ContextReplacementPlugin(/^intl\/locale-data/, (x) => {
      x.regExp = new RegExp(locales.join('|'));
      x.chunkName = 'intl-polyfill-[request]';
    })),
    plugin(new ContextReplacementPlugin(/intl\/messages/, (x) => {
      x.regExp = new RegExp(locales.join('|'));
      x.chunkName = 'intl-messages-[request]';
      console.log(x);
    })),
    loader({
      test: /intl\/messages\//,
      loader: ['json-loader', 'yaml-loader'],
    })
  )(config);
};
