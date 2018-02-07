// @flow

// Import modules ==============================================================
import React from 'react';
import {filter, map, pipe, defaultTo} from 'ramda';
import serialize from 'htmlescape';

// Import types ================================================================
import type {AssetMap, Asset} from '/render/types';

const scripts = pipe(
  defaultTo([]),
  filter((asset: Asset) => (
    /\.js$/.test(asset.name)
  )),
  map((asset: Asset) => (
    <script
      src={asset.url}
      key={asset.name}
    />
  )),
);

const styles = pipe(
  defaultTo([]),
  filter((asset: Asset) => (
    /\.css/.test(asset.name)
  )),
  map((asset: Asset) => (
    <link
      rel='stylesheet'
      type='text/css'
      href={asset.url}
      key={asset.name}
    />
  )),
);

type Props<T = void> = {
  rootElementId: string,
  markup: string,
  state: T,
  assets: AssetMap,
};

const Page = <T>({
  rootElementId,
  assets,
  markup,
  state,
}: Props<T>) => {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8'/>
        <title>...</title>
        {styles(assets.index)}
      </head>
      <body>
        <div id={rootElementId} dangerouslySetInnerHTML={{__html: markup}}/>
        {typeof state !== 'undefined' &&
          <script
            type='text/json'
            id='state'
            dangerouslySetInnerHTML={{__html: serialize(state)}}
          />
        }
        {scripts(assets.index)}
      </body>
    </html>
  );
};

export default Page;
