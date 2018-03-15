// @flow

// Import modules ==============================================================
import React from 'react';
import {filter, map, pipe, defaultTo} from 'ramda';
import serialize from 'htmlescape';

// Import types ================================================================
import type {AssetMap, AssetWithUrl} from '/render/types';

const scripts = pipe(
  defaultTo([]),
  filter((asset: AssetWithUrl) => /\.js$/.test(asset.name)),
  map((asset: AssetWithUrl) => <script src={asset.url} key={asset.name} />),
);

const styles = pipe(
  defaultTo([]),
  filter((asset: AssetWithUrl) => /\.css$/.test(asset.name)),
  map((asset: AssetWithUrl) => (
    <link rel="stylesheet" type="text/css" href={asset.url} key={asset.name} />
  )),
);

type Props<T = void> = {
  rootElementId: string,
  markup: string,
  state?: T,
  assets: AssetMap,
  head: React$Node,
};

const Page = <T>({rootElementId, assets, markup, state, head}: Props<T>) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>...</title>
        {styles(assets.index)}
        {head}
      </head>
      <body>
        <div
          id={rootElementId}
          className="root"
          dangerouslySetInnerHTML={{__html: markup}}
        />
        {typeof state !== 'undefined' && (
          <script
            type="text/json"
            id="state"
            dangerouslySetInnerHTML={{__html: serialize(state)}}
          />
        )}
        {scripts(assets.index)}
      </body>
    </html>
  );
};

export default Page;
