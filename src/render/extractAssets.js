// @flow

// Import modules ==============================================================
import {prop, groupBy, chain, map, pipe, reject} from 'ramda';

// Import types ================================================================
import type {AssetMap, WebpackStats} from '/render/types';

const extractAssets = (stats: WebpackStats): AssetMap => {
  if (!stats) {
    return {};
  }
  const {assets: base, publicPath} = stats;
  const rootPath = publicPath.replace(/\/$/, '');
  return pipe(
    reject((asset) => /hot-update\.\w+$/.test(asset.name)),
    map((asset) => ({
      ...asset,
      url: `${rootPath}/${asset.name}`,
    })),
    chain((asset) => map(
      (chunkName) => ({...asset, chunkName}),
      asset.chunkNames
    )),
    groupBy(prop('chunkName')),
  )(base);
};

export default extractAssets;
