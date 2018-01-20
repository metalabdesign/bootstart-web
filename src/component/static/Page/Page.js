/* @flow */
import React from 'react';
import {filter, map, pipe, defaultTo} from 'ramda';
import serialize from 'htmlescape';

import type {State, AssetMap, Asset} from '/types';

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

type Props = {
  redirect?: string,
  markup: string,
  state: State,
  assets: AssetMap,
};

const Page = ({
  assets,
  markup,
  redirect,
  state,
}: Props) => {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8'/>
        {redirect && (
          <meta httpEquiv='refresh' content={`0;URL='${redirect}'`}/>
        )}
        <title>...</title>
        {styles(assets.index)}
      </head>
      <body>
        <div id='app' dangerouslySetInnerHTML={{__html: markup}}/>
        <script
          type='text/json'
          id='state'
          dangerouslySetInnerHTML={{__html: serialize(state)}}
        />
        {scripts(assets.index)}
      </body>
    </html>
  );
};

export default Page;
